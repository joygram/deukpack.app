# Products overview

DeukPack covers **IDL, schema, code generation, serialization, meta, and pipelines**, extending to **server integration and real-time game networking** with the same schema and protocol. The product family is organized into **Core · engine / Protocol / Spreadsheet add-in (Excel, etc.) / Pipeline · Unity / Extensions**. For inter-product relationships and data flow, see the [Architecture](../architecture.md) diagram.

---

## Product roles

| Product | Core role | Scope | Details |
|---------|-----------|-------|---------|
| **DeukPack Core · engine** | IDL parsing, AST, code generation, schema/meta — the central engine. **Apache-2.0**, **ready to use** | .deuk/.proto/.thrift, OpenAPI/JSON Schema/CSV/JSON/DB import, C#/C++/TS/JS codegen, SQLite generation | [Core · engine](core-engine.md) |
| **DeukPack Protocol** | Serialization runtime and messaging protocol | Binary/Compact/JSON, msgId, ProtocolRegistry, zero-copy option, packet body serialization | [Protocol](protocol.md) |
| **DeukPack Excel add-in** | Schema-based meta editing in Excel | Header generation, validation, schema diff, Apply, sheet-based meta editing | [Excel add-in](excel-addin.md) |
| **DeukPack Pipeline · Unity** | Connect artifacts to projects/Unity/servers | IDL/Excel → code/schema/tables → Unity/server validation & load. Server integration, real-time game networking | [Pipeline · Unity](pipeline-unity.md) |
| **Extensions** | Add-on products on top of core | EF, DB migrator, Google Sheets, Unreal/Elixir, plugins | [Extensions](extension.md) |

---

## Product selection guide

- **Want to use the core right now** → [Core · engine](core-engine.md) — **Use the core library now** section at top (npm/GitHub links, install, CLI)
- **Want to unify definitions and schemas in one toolchain, integrating existing IDL, OpenAPI, CSV, DB** → [Core · engine](core-engine.md)
- **Need packet/meta serialization, server integration, real-time game networking** → [Protocol](protocol.md)
- **Want to manage planning/balance meta in spreadsheets according to schema** → [Excel add-in](excel-addin.md)
- **Want to apply definition/meta artifacts to Unity/server and enable server or real-time game integration** → [Pipeline · Unity](pipeline-unity.md)
