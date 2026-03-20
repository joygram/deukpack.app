# Products overview

DeukPack covers **IDL, schema, code generation, serialization, meta, and pipelines**, extending to **server integration and real-time game networking** with the same schema and protocol. The product family is organized into **Core · engine / Protocol / Spreadsheet add-in (Excel, etc.) / Pipeline · Unity / Extensions**. For inter-product relationships and data flow, see the [Architecture](../architecture.md) diagram.

---

## Product roles

| Product | Core role | Scope | Details |
|---------|-----------|-------|---------|
| **DeukPack Core · engine** | IDL parsing, AST, code generation, schema/meta — the central engine. **Apache-2.0**, **ready to use**. **Differentiators:** struct inheritance (extends), rich types (float, DB model, tablelink). | .deuk/.proto/.thrift, OpenAPI/JSON Schema/CSV/JSON/DB import, C#/C++/TS/JS codegen, SQLite generation | [Core · engine](core-engine.md) |
| **DeukPack Protocol** | Serialization runtime and messaging protocol | Binary/Compact/JSON, msgId, ProtocolRegistry, zero-copy option, packet body serialization | [Protocol](protocol.md) |
| **DeukPack Excel add-in** | Schema-based meta editing in Excel | Header generation, validation, schema diff, Apply, sheet-based meta editing | [Excel add-in](excel-addin.md) |
| **DeukPack Pipeline · Unity** | Connect artifacts to projects/Unity/servers | IDL/Excel → code/schema/tables → Unity/server validation & load. Server integration, real-time game networking | [Pipeline · Unity](pipeline-unity.md) |
| **Extensions** | Add-on products on top of core | EF, DB migrator, Google Sheets, Unreal/Elixir, plugins | [Extensions](extension.md) |

---

## Key feature highlights

| Feature | One-liner | Problem solved |
|---------|-----------|----------------|
| **Tables & meta** | Schema-based `MetaTableRegistry`, Excel add-in | Validate, load, and edit meta data in sync with schema |
| **Native messages** | Auto-generated `msgId` · `ProtocolRegistry` | No manual message ID or dispatch registration |
| **Inheritance (extends)** | Auto-merge parent struct fields | Eliminate field duplication, multi-level inheritance, wire compat |
| **Selection (WriteFields)** | Serialize only chosen fields from a full record | Runtime projection without partial types |
| **Replacement (WriteWithOverrides)** | Per-recipient field values without cloning | Memory/perf optimization for fan-out and push |
| **Rich data types** | float, double, int8–int64, list/set/map, **tablelink** (DB row ref), datetime, decimal | DB model, numeric precision, and meta/table schemas in one type system |

→ **Extended data types (vs Protobuf/Thrift), one line:** `int8–int64`, `uint8–uint64`, `float`/`double`, `bool`, `string`/`binary`, `list`/`set`/`map`, **tablelink**, `datetime`/`decimal`, **struct extends**. Full list and semantics: [Reference → API](reference/api.md).  
→ **Core differentiators**: **struct inheritance (extends)** and the above type set (including DB model support) are built into the engine. The three serialization features (WriteFields, WriteWithOverrides, Wire Profile) are **composable**. Details: [Overrides · WriteFields · extends](../tutorial/write-with-overrides.md), [API reference](../reference/api.md).

---

## Product selection guide

- **Want to use the core right now** → [Core · engine](core-engine.md) — **Use the core library now** section at top (npm/GitHub links, install, CLI)
- **Want to unify definitions and schemas in one toolchain, integrating existing IDL, OpenAPI, CSV, DB** → [Core · engine](core-engine.md)
- **Need packet/meta serialization, server integration, real-time game networking** → [Protocol](protocol.md)
- **Want to manage planning/balance meta in spreadsheets according to schema** → [Excel add-in](excel-addin.md)
- **Want to apply definition/meta artifacts to Unity/server and enable server or real-time game integration** → [Pipeline · Unity](pipeline-unity.md)
