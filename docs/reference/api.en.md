# API & type reference

**CLI**, **IDL kinds**, and **C# / C++ / JavaScript** surfaces for the DeukPack core. Implementation details: [GitHub core](https://github.com/joygram/DeukPack) `src/` and `docs/`.

**한국어:** Use the site **language** menu → **한국어**.

---

## On this page

- [CLI](#cli) — full option table (`npx deukpack` = `scripts/build_deukpack.js`)
- [IDL declaration kinds](#idl-declaration-kinds) — `record` / `message` / `table` / `entity`
- [Tables](#tables) — table axis (short)
- [Messages and wire](#messages-and-wire) — message axis (short)
- [Wire protocol families](wire-protocols.md) — interop vs native matrix (separate page)
- [Database and entities](#database-and-entities) — DB axis (short)
- [Schema import and export](#schema-import-and-export) — OpenAPI, CSV, JSON, Excel
- [Generated C# APIs](#generated-c-apis)
- [Generated C++ APIs](#generated-c-apis)
- [Extended types](#extended-types)
- [Cross-cutting features](#cross-cutting-features)
- [WriteFields and WriteWithOverrides](#writefields-and-writewithoverrides)
- [JavaScript (`--js`)](#javascript-js)
- [Related product docs](#related-product-docs)

Shorter topic pages: [Reference overview](index.md) · [Fundamentals](fundamentals.md) · [Tables](tables.md) · [Messages & wire](messages.md) · [Database & entities](database.md).

---

## CLI

**Form**

```bash
npx deukpack <entry_idl_path> <output_directory> [options]
npx deukpack --pipeline <pipeline_config.json>
```

**Options** (from `scripts/build_deukpack.js`; if something is missing, run `npx deukpack --help`)

| Option | Description |
|--------|-------------|
| `-I` / `-i <path>` | Include path (repeatable) |
| `-r` / `--include-recursive <path>` | Include path and **all nested subdirectories** (deep recursion) |
| `--define-root <name>` | IDL root folder name (default `_deuk_define`, legacy `_thrift`) |
| `--csharp` | Emit C# (emits `DeukDefine.csproj` by default) |
| `--csharp-project-name <name>` | Assembly / project filename (default `DeukDefine`) |
| `--csharp-nullable` | Enable nullable reference style in emitted C# |
| `--no-csharp-csproj` | Skip `.csproj` |
| `--allow-multi-namespace` | Allow multiple namespace blocks in one `.deuk` file |
| `--brace-less-namespace` | Omit `namespace { }` braces for single-namespace output (indented) |
| `--cpp` | Emit C++ |
| `--ts` | Emit TypeScript (first stage; apps continue via tsc/bundler) |
| `--js` | Emit JavaScript directly (Node/tools path) |
| `--ef` | EF Core: `DbContext`, fluent config, meta/entity alignment |
| `--protocol <name>` | Wire hint. **Deuk native:** `pack` (default), `json`, `yaml` — **Interop (Thrift):** **`tbinary`**, **`tcompact`**, **`tjson`**. Table & JS: [Wire protocol families](wire-protocols.md) · [interop vs native](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md) |
| `--endianness little\|big` | Endianness |
| `--wire-profile <name>` | Profile names, repeat or comma-separated. [Wire profile subset](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WIRE_PROFILE_SUBSET.md) |
| `--convert-to-deuk [subdir]` | Also emit `.deuk` from parsed `.thrift` (subdir default `deuk`) |
| `--emit-per-file` | Emit per-`sourceFile` `.deuk` slices (split server DB IDL, etc.) |
| `--import-openapi <file>` | Merge OpenAPI 3.x into AST |
| `--openapi <file>` | Emit OpenAPI 3.x from AST |
| `--import-csv` / `--import-psv` / `--import-json` / `--import-excel` `<file>` | Merge schema from first row/keys |
| `--csv` / `--psv` / `--json` / `--excel` `<file>` | Emit schema file from AST (round-trip) |

**Examples**

```bash
npx deukpack ./schema.deuk ./gen --csharp --cpp -I ./idl
npx deukpack ./api.deuk ./out --csharp --protocol tbinary
npx deukpack --pipeline ./deukpack-pipeline.json
```

---

## IDL declaration kinds

| Keyword | AST `declarationKind` | Role |
|---------|-------------------------|------|
| `struct` / `record` | `record` | Plain struct / DTO |
| `message` | `message` | Network types, msgId / registry |
| `table` | `table` | Table defs, meta containers, `MetaTableRegistry` |
| `entity` | `entity` | DB rows, `[Table]`/`[Key]`/`[Column]`, optional `--ef` |

---

## Tables

- See the [Tables guide](tables.md) for `MetaTableRegistry`, row key rules, reserved field IDs, `GetSchema()`.

---

## Messages and wire

- See [Messages & wire](messages.md) for `ProtocolRegistry`, `--protocol`, readers/writers, WriteFields/overrides. **Interop vs native protocol table:** [Wire protocol families](wire-protocols.md).

---

## Database and entities

- See [Database & entities](database.md) for `entity`, `--ef`, `tablelink`.

---

## Schema import and export

Flags are the `--import-*` and `--csv` / `--psv` / `--json` / `--excel` rows in [CLI](#cli). Semantics: [DEUKPACK_OPENAPI_ROUNDTRIP.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_OPENAPI_ROUNDTRIP.md), [DEUKPACK_SCHEMA_FORMAT_ROUNDTRIP.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_SCHEMA_FORMAT_ROUNDTRIP.md), etc.

**Hands-on:** [Part III — API & web](https://kits.deukpack.app/en/journey/part-03-api-web/) · [serialization topics](https://kits.deukpack.app/en/topics/serialization/).

---

## Programmatic (library)

Use **DeukPackEngine** (or the same entry) in Node for **parse / AST**. For **multi-language emit**, v1 recommends the **CLI** ([v1 scope](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_V1_RELEASE_SCOPE.md)).

---

## Generated C# APIs

| Item | Purpose |
|------|---------|
| **GetSchema()** | Recover schema from generated types (meta, validation, Excel). |
| **WriteWithOverrides(oprot, overrides)** | `Dictionary<int, object>` field-ID overrides for one write; null/empty ⇒ same as `Write`. |
| **WriteFields(oprot, fieldIds, overrides?)** | Serialize only listed fields; optional overrides. |
| **FieldId** | `public const int` — `StructName.FieldId.PropertyName`. |
| **ProtocolRegistry** | Message type ↔ msgId mapping. |
| **MetaTableRegistry** | Table/meta type registration. |
| **IDeukPackReader / IDeukPackWriter** | Protocol-specific read/write. |

**struct extends:** IDL `extends`. Tutorial: [Overrides · WriteFields · extends](../tutorial/write-with-overrides.md). Deep dive: [DEUKPACK_WRITE_WITH_OVERRIDES_API](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## Generated C++ APIs

| Item | Purpose |
|------|---------|
| **apply_overrides(std::unordered_map<int, std::any>)** | Apply per-field-ID values before your serialize step. Uses `<any>`, `<unordered_map>`. |
| **kFieldId_\*** | `static constexpr int` — `StructName::kFieldId_PropertyName`. |

---

## Extended types

**One line:** `int8`–`int64`, `uint8`–`uint64`, `float`/`double`, `bool`, `string`/`binary`, `list`/`set`/`map`, **tablelink**, `datetime`/`decimal`, **struct extends**.

| Type / feature | DeukPack | Protobuf | Thrift |
|----------------|----------|----------|--------|
| int8 / int16 / int32 / int64 | ✓ | int32/int64 (no int8/int16) | i8/i16/i32/i64 ✓ |
| uint8 / uint16 / uint32 / uint64 | ✓ | uint32/uint64 (no uint8/uint16) | byte only (uint8) |
| float / double | ✓ | ✓ | ✓ |
| bool, string, binary | ✓ | ✓ (bytes) | ✓ |
| list / set / map | ✓ | repeated/map | list/set/map ✓ |
| **tablelink** | ✓ | — | — |
| **datetime** | ✓ | — | — |
| **decimal** | ✓ | — | — |
| **struct extends** | ✓ | oneof / nesting | — |

---

## Cross-cutting features

- **extends:** merge parent fields with wire compatibility.
- **FieldId:** used by WriteFields / overrides in C# and JS.
- **Wire profiles:** `--wire-profile` + `wireProfiles` annotation. [DEUKPACK_WIRE_PROFILE_SUBSET](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WIRE_PROFILE_SUBSET.md).
- **Annotations such as `geometry`:** may emit C# `deuk` partials (per generator).

---

## WriteFields and WriteWithOverrides

**WriteFields** — send a subset; optionally override those fields only.

- **C#:** `WriteFields(stream, obj, fieldIds, overrides?)`
- **JS:** `projectFields`, `toJsonWithFields`

**WriteWithOverrides** — serialize with per-field replacements **without cloning** the source object (C# view-based).

- **C#:** `WriteWithOverrides(stream, obj, overrides)`
- **JS:** `applyOverrides`, `toJsonWithOverrides`

Tutorial: [../tutorial/write-with-overrides.md](../tutorial/write-with-overrides.md)

---

## JavaScript (`--js`)

Helpers in `js/generated_deuk.js`:

| Item | Purpose |
|------|---------|
| **applyOverrides** | Shallow copy + apply field-ID map. |
| **toJsonWithOverrides** | Above + Thrift JSON string. |
| **projectFields** / **toJsonWithFields** | Subset + optional overrides. |
| **FieldId** | `{ PropertyName: id, ... }` |

---

## Related product docs

| Area | Doc |
|------|-----|
| **Core · engine** | [Core · engine](../products/core-engine.md) |
| **Protocol** | [Protocol](../products/protocol.md) |
| **Excel · Unity** | [Excel add-in](../products/excel-addin.md), [Pipeline · Unity](../products/pipeline-unity.md) |
