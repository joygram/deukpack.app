# Fundamentals (IDL · CLI · parsing)

How `.deuk` (and imported `.proto` / `.thrift`, etc.) is structured in the engine, and what you can pass on the **CLI**.

---

## IDL declaration kinds (`declarationKind`)

The parser tags struct-like declarations in four ways. **Wire layout** can mostly follow the same rules as `record`; **codegen and checks** differ.

| Keyword | Meaning (short) |
|---------|------------------|
| **`struct` / `record`** | Plain DTO / row data. Default `declarationKind` is `record`. |
| **`message`** | Naming convention for network payloads. Pairs well with `ProtocolRegistry` / msgId. |
| **`table`** | Table definitions / meta tables (`header` + `infos`, etc.). Ties into `MetaTableRegistry` and loaders. |
| **`entity`** | DB persistence rows. Emits C# **data annotations** (`[Table]`, `[Key]`, `[Column]`). With `--ef`, also `DbContext`. |

The AST also carries **enum**, **typedef**, **const**, **service** (Thrift RPC compatibility), **namespace**, and more.

---

## CLI & includes

- **Entry:** `npx deukpack <idl_file> <out_dir> [options]` or `--pipeline <config.json>`.
- **Includes:** `-I` / `-i` (one path), `-r` / `--include-recursive` (that directory and all nested subfolders).
- **IDL root folder name:** `--define-root` (default `_deuk_define`, legacy `_thrift`).
- **Emit:** `--csharp`, `--cpp`, `--ts`, `--js` (combinable).
- **C# extras:** `--csharp-project-name`, `--csharp-nullable`, `--no-csharp-csproj`, `--allow-multi-namespace`, `--brace-less-namespace`.
- **More:** `--protocol`, `--endianness`, `--convert-to-deuk`, `--emit-per-file`, `--wire-profile`, OpenAPI / flat-file merge & emit (see Schema I/O below).

**Full table:** [API reference — CLI](api.md#cli).

---

## Programmatic use (Node library)

- **Parse / AST:** use `DeukPackEngine` (or the same entry points) from code.
- **Multi-language emit:** v1 recommends the **CLI** ([v1 scope](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_V1_RELEASE_SCOPE.md)).

---

## Wire families (one line)

- **Deuk native (`deuk`):** `pack`, `json`, `yaml` — npm **JS** `WireSerializer` and `serialize()` default (`pack`).
- **Interop (Thrift):** **`tbinary`**, **`tcompact`**, **`tjson`** — **generated C# / C++** plus **JS** with **`interopRootStruct`** on options.

Matrix & simple npm API: [Wire protocol families](wire-protocols.md). Spec: [Interop vs native wire](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md).

---

## Types & inheritance

**Extended types vs Protobuf/Thrift:** [API reference — Extended types](api.md#extended-types). **`extends`:** [Unified Write tutorial](../tutorial/write-with-overrides.md) and [Messages & wire](messages.md).

> [!IMPORTANT]
> **Dynamic vs Native (Structural Null & Initialization Semantics)**
> - When a dynamically typed language (e.g., **JavaScript**) transmits `null` for a nested struct field, native backends strictly mapping memory structures (e.g., **C#**, **Java**) deserialize and initialize this empty payload into the language's **default structural instance** (which cascades to default nested fields like `""` or `0`).
> - **In-memory routing (Multi-Pass):** When you pass the deserialized objects through hundreds of handlers internally, always utilize generated functions like `.clone()` (C# / Java) or immutable structural upgrades (`%{obj | ...}` in Elixir) to safely map values without mutating caller scope references.

---

## Hands-on (DeukPack Kits)

- [Part I — Threshold](https://kits.deukpack.app/en/journey/part-01-threshold/) — where one IDL line splits into stacks.
- [Wire & serialization topics](https://kits.deukpack.app/en/topics/serialization/) — short reads linking tables, messages, stacks.

Next: [Tables](tables.md) · [Messages & wire](messages.md) · [Database & entities](database.md).
