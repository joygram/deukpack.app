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
- [Unified Write (field selection & overrides)](#unified-write-field-selection--overrides)
- [JavaScript (`--js`)](#javascript-js)
- [Related product docs](#related-product-docs)

Shorter topic pages: [Reference overview](index.md) · [Fundamentals](fundamentals.md) · [Tables](tables.md) · [Messages & wire](messages.md) · [Database & entities](database.md).

---

## CLI

**Forms**

```bash
npx deukpack <entry_idl_path> <output_directory> [options]
npx deukpack --pipeline <pipeline_config.json>
npx deukpack run [pipeline.json]    # default: ./deukpack.pipeline.json in cwd
npx deukpack init [options]         # writes pipeline JSON, bootstrap, VSIX (unless --skip-vsix)
npx deukpack bootstrap [options]    # same as: npx deukpack init --workspace-only
```

Use **`npx`** (or **`npm exec deukpack --`**). **`npm deukpack`** is not an npm subcommand.

**Init / workspace (short)**

| Command / flag | Role |
|----------------|------|
| `init` | Creates **`deukpack.pipeline.json`**, runs **bootstrap** (`.deukpack/workspace.json`), then **installs bundled VSIX** via `code` / `cursor` / `antigravity` unless **`--skip-vsix`**. |
| `init --non-interactive` | Default pipeline when `_deuk_define` has `.deuk`; then bootstrap; VSIX install attempted. |
| `init --workspace-only` | Bootstrap (+ VSIX) only. |
| `bootstrap` | Same as **`init --workspace-only`**. |
| Default **`installKind`** | **`package`**. Use **`--kind src`** **with** **`--engine-root`** for engine-linked layout; **`--engine-root` alone** does not imply `src`. |

After init, one line reminds you: re-run **`npx deukpack init`** on updates; edit **`deukpack.pipeline.json`** / **`.deukpack/workspace.json`** for details; then **`npx deukpack run`**.

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
npx deukpack --pipeline ./deukpack.pipeline.json
npx deukpack run
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

- See [Messages & wire](messages.md) for `ProtocolRegistry`, `--protocol`, readers/writers, unified **Write**. **Interop vs native protocol table:** [Wire protocol families](wire-protocols.md).

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
| **Write(oprot)** | Full struct write (same as `Write(oprot, null, null)`). |
| **Write(oprot, fieldIds, overrides?)** | Optional **`ICollection<int>? fieldIds`** — only those fields; optional **`Dictionary<int, object>? overrides`** — per field ID replacement values. Pass **`null`** for unused parameters. |
| **FieldId** | `public const int` — `StructName.FieldId.PropertyName`. |
| **ProtocolRegistry** | Message type ↔ msgId mapping. |
| **MetaTableRegistry** | Table/meta type registration. |
| **IDeukPackReader / IDeukPackWriter** | Protocol-specific read/write. |

**struct extends:** IDL `extends`. Tutorial: [Unified Write · field selection · extends](../tutorial/write-with-overrides.md). Deep dive: [DEUKPACK_WRITE_WITH_OVERRIDES_API](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## Generated C++ APIs

| Item | Purpose |
|------|---------|
| **kFieldId_\*** | `static constexpr int` — `StructName::kFieldId_PropertyName`. |
| **Binary / pack emit** | Generated sources follow the same **field-ID** model as C#/JS; use the emitted pack/binary helpers next to your types (no separate `apply_overrides` step). |

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
- **FieldId:** used by **Write** field selection and overrides in C# and JS.
- **Wire profiles:** `--wire-profile` + `wireProfiles` annotation. [DEUKPACK_WIRE_PROFILE_SUBSET](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WIRE_PROFILE_SUBSET.md).
- **Annotations such as `geometry`:** may emit C# `deuk` partials (per generator).

---

## Unified Write (field selection & overrides)

One **`Write`**-style surface across targets:

- **C#:** `Write(oprot, fieldIds, overrides)` — `fieldIds` null ⇒ all fields; `overrides` null/empty ⇒ no replacements.
- **JavaScript:** `toJson(obj, fieldIds, overrides)`, `toBinary(obj, fieldIds, overrides)` (and pack/runtime equivalents) on struct helpers.
- **TypeScript:** same pattern on generated helpers.

Legacy separate methods (**`WriteWithOverrides`**, **`WriteFields`**, **`applyOverrides`**, **`toJsonWithFields`**, etc.) are **removed**; use **`null`** for unused parameters instead.

Tutorial: [../tutorial/write-with-overrides.md](../tutorial/write-with-overrides.md)

---

## JavaScript (--js) {: #javascript-js }

Helpers in generated JS (e.g. `js/generated_deuk.js`):

| Item | Purpose |
|------|---------|
| **toJson(obj, fieldIds, overrides)** | JSON wire; `fieldIds` null ⇒ all fields. |
| **toBinary(obj, fieldIds, overrides)** | Binary/pack path with same parameters. |
| **FieldId** | `{ PropertyName: id, ... }` |

---

## Related product docs

| Area | Doc |
|------|-----|
| **Core · engine** | [Core · engine](../products/core-engine.md) |
| **Protocol** | [Protocol](../products/protocol.md) |
| **Excel · Unity** | [Excel add-in](../products/excel-addin.md), [Pipeline · Unity](../products/pipeline-unity.md) |
