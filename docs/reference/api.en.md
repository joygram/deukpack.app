# API & type reference

Summary of **CLI usage** and **APIs used in generated code and runtime**. For details see the [GitHub core repo](https://github.com/joygram/DeukPack) and product docs.

**한국어**: Use the language switcher (top right).

---

## CLI

**Command form**

```bash
npx deukpack <entry_IDL_path> <output_directory> [options]
```

**Main options**

| Option | Description |
|--------|-------------|
| `--csharp` | Generate C# code |
| `--cpp` | Generate C++ code |
| `--js` | Generate JavaScript (tools, BFF, etc.) |
| `-I <path>` | Include path (multiple allowed) |
| `--protocol <binary\|compact\|json>` | Serialization protocol |
| `--pipeline <config.json>` | Run multiple jobs from a pipeline config |
| `--wire-profile <name>` | Emit wire-profile subset types / JS helpers (repeat or comma-separated). See [Wire profile subset](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_PROFILE_SUBSET.md). |

**Examples**

```bash
npx deukpack ./schema.deuk ./gen --csharp --cpp -I ./idl
npx deukpack ./api.deuk ./out --csharp --protocol binary
npx deukpack --pipeline ./deukpack-pipeline.json
```

Run `npx deukpack --help` for all options.

---

## Programmatic (library)

Use **DeukPackEngine** (or the same entry point) in Node for **parse / AST**. For **multi-language codegen**, v1 recommends **CLI** ([v1 scope](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_V1_RELEASE_SCOPE.md)).

- **Core repo**: `src/` and [docs](https://github.com/joygram/DeukPack/tree/main/docs).

---

## Generated code API (C#)

Common APIs in generated C# code:

| Item | Purpose |
|------|---------|
| **GetSchema()** | Recover schema (fields, types, defaults) from generated types. Used for meta, validation, Excel. |
| **WriteWithOverrides(oprot, overrides)** | Serialize without cloning: `Dictionary<int, object>` keys are **field IDs**; values replace `this.Property` for that write only. If `overrides` is null or empty, same as **`Write(oprot)`**. |
| **WriteFields(oprot, fieldIds, overrides?)** | Serialize only the fields in `fieldIds`. Optional `overrides` to replace values. Runtime projection without partial types. |
| **FieldId (nested class)** | Auto-generated `public const int` constants on every struct. Use `StructName.FieldId.PropertyName`. Compile-time safe, no magic numbers. |
| **ProtocolRegistry** | Message type ↔ identifier (msgId) mapping. Used for dispatch and serialization. |
| **MetaTableRegistry** | Table / meta type registration. Table-based load and validation. |
| **IDeukPackReader / IDeukPackWriter** | Read/write per protocol (Binary/Compact/JSON). Serialize / deserialize. |

**struct extends**: Use `extends` in IDL to auto-merge parent fields into child structs. Multi-level inheritance and field ID collision checks.

Tutorial (replace · select · inherit): [Overrides · WriteFields · extends](../tutorial/write-with-overrides.md). Full reference: [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

Protocol and wire format: [Protocol](../products/protocol.md). Excel and meta rules: [Excel add-in](../products/excel-addin.md).

---

## Generated code API (C++)

| Item | Purpose |
|------|---------|
| **apply_overrides(std::unordered_map<int, std::any>)** | Member on each generated `struct`: apply per-field-ID values before your own serialization step. Header includes `<any>` and `<unordered_map>`. |
| **kFieldId_\*** | `static constexpr int` field ID constants on each struct. `StructName::kFieldId_PropertyName`. |

---

## Extended data types (vs Protobuf / Thrift)

**One-line summary:** `int8`–`int64`, `uint8`–`uint64`, `float`/`double`, `bool`, `string`/`binary`, `list`/`set`/`map`, **tablelink**, `datetime`/`decimal`, **struct extends**.

| Type / feature | DeukPack | Protobuf | Thrift |
|----------------|----------|----------|--------|
| int8 / int16 / int32 / int64 | ✓ | int32/int64 (no int8/int16) | i8/i16/i32/i64 ✓ |
| uint8 / uint16 / uint32 / uint64 | ✓ | uint32/uint64 (no uint8/uint16) | byte only (uint8) |
| float / double | ✓ | ✓ | ✓ |
| bool, string, binary | ✓ | ✓ (bytes) | ✓ |
| list / set / map | ✓ | repeated/map | list/set/map ✓ |
| **tablelink** | ✓ (DB/table row ref) | — | — |
| **datetime** | ✓ (extension) | — | — |
| **decimal** | ✓ (extension) | — | — |
| **struct extends** | ✓ (multi-level, wire-compatible) | oneof / message nesting | — |

Semantics (defaults, wire format, C#/C++/JS mapping) are defined per type in the IDL and codegen; see generated code and schema for details.

---

## Extension features

- **Struct inheritance (extends):** Base/derived structs; multi-level; wire layout remains compatible so older clients can skip unknown fields.
- **FieldId constants:** Every struct gets a static `FieldId` (C#: `StructName.FieldId.FieldName`, JS: `StructName.FieldId.PropertyName`) for use in **WriteFields** and **WriteWithOverrides**.
- **Wire profiles:** Binary/Compact/JSON and optional msgId; protocol registry for versioning.
- **Custom / plug-in codegen:** Codegen is script-driven (e.g. `build_deukpack.js`); generators can be extended or replaced for new targets or conventions.

---

## Selection (WriteFields — “골라보내기”)

Send only a **subset of fields**; optionally override some of them.

- **C#:** `WriteFields(stream, obj, fieldIds, overrides?)` — serializes only the given field IDs; `overrides` is `Dictionary<int, object>` applied before writing (same semantics as WriteWithOverrides).
- **JS:** `projectFields(obj, fieldIds, overrides?)` returns an object with only those fields; `toJsonWithFields(obj, fieldIds, overrides?)` serializes that to Thrift JSON.

**Typical use:** Reduce payload (e.g. mobile) or hide sensitive fields by omitting them from `fieldIds`. Overrides let you substitute values for selected fields (e.g. mask PII) without cloning the whole object elsewhere.

**Example (concept):** `fieldIds = [StructName.FieldId.Name, StructName.FieldId.Level]` → only those two fields are written; optional `overrides: { [FieldId.Name]: "***" }` to replace the value for `Name`.

---

## Partial replacement (WriteWithOverrides — “일부 교체”)

Serialize with **per-field overrides** (e.g. per-recipient or per-request substitution) **without cloning** the original struct.

- **C#:** `WriteWithOverrides(stream, obj, overrides)` where `overrides` is `Dictionary<int, object>`. Only the keys present in `overrides` are replaced for serialization; the rest come from `obj`. The implementation writes from a virtual view (overrides applied on the fly), so the original `obj` is not mutated.
- **JS:** `applyOverrides(obj, overrides)` returns a shallow copy with overrides applied; `toJsonWithOverrides(obj, overrides)` does that then Thrift JSON.

**Typical use:** Same logical struct, different values for some fields per recipient (e.g. A gets `price`, B gets `"***"`) or per request (e.g. server timestamp overwrite). One base object, many serialized variants.

**Example (concept):** `overrides = { [StructName.FieldId.Price]: 0, [StructName.FieldId.Timestamp]: serverNow }` → serialized output uses those values for `Price` and `Timestamp`, and original values for all other fields.

---

## Generated code API (JavaScript, `--js`)

Each struct helper in `javascript/generated.js`:

| Item | Purpose |
|------|---------|
| **applyOverrides(obj, overrides)** | Shallow copy of `obj`, then apply `{ fieldId: value }`. Does not mutate `obj`. |
| **toJsonWithOverrides(obj, overrides)** | Same as above, then Thrift JSON string via `_toThriftJson`. |
| **projectFields(obj, fieldIds, overrides?)** | Extract only `fieldIds` fields into a new object. Optional `overrides`. |
| **toJsonWithFields(obj, fieldIds, overrides?)** | Same as above, then Thrift JSON string. |
| **FieldId** | `StructName.FieldId = { PropertyName: id, ... }`. Field ID constants object per struct. |

Global helpers: `_applyOverrides(obj, overrides, schema)`, `_projectFields(obj, fieldIds, schema, overrides)` (internal).

---

## Product docs

| Area | Doc |
|------|-----|
| **Core·engine** | [Core·engine](../products/core-engine.md) — IDL input, codegen, schema, SQLite |
| **Protocol** | [Protocol](../products/protocol.md) — Binary/Compact/JSON, msgId, serialization |
| **Excel·Unity** | [Excel add-in](../products/excel-addin.md), [Pipeline·Unity](../products/pipeline-unity.md) |
