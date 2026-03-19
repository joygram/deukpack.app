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
| **ProtocolRegistry** | Message type ↔ identifier (msgId) mapping. Used for dispatch and serialization. |
| **MetaTableRegistry** | Table / meta type registration. Table-based load and validation. |
| **IDeukPackReader / IDeukPackWriter** | Read/write per protocol (Binary/Compact/JSON). Serialize / deserialize. |

Protocol and wire format: [Protocol](../products/protocol.md). Excel and meta rules: [Excel add-in](../products/excel-addin.md).

---

## Product docs

| Area | Doc |
|------|-----|
| **Core·engine** | [Core·engine](../products/core-engine.md) — IDL input, codegen, schema, SQLite |
| **Protocol** | [Protocol](../products/protocol.md) — Binary/Compact/JSON, msgId, serialization |
| **Excel·Unity** | [Excel add-in](../products/excel-addin.md), [Pipeline·Unity](../products/pipeline-unity.md) |
