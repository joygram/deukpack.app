# Positioning & Target

![docs/positioning Cover](/assets/positioning-cover.png){: style="display: block; margin: 0 auto 2rem auto; max-width: 500px;"}


A summary of DeukPack's **product position** and **target audience**. This site (deukpack.app) introduces the product as a **brand concept**, providing a **free, ready-to-use core library** via npm and GitHub.

---

## Position

- Provides **IDL / schema definition, code generation, serialization / protocol, meta / tables, and spreadsheet / editor integration** in a **single stack**.
- **Gradually integrate existing definitions** from Protobuf, OpenAPI, CSV, JSON, DB, legacy .thrift, and more — import them as-is.
- Cover **packets, meta, planning tables, editors, and Unity** across **games, services, REST, and messaging** with **one toolchain**. Use the same schema and protocol for **server integration and real-time game networking** between client and server.

---

## Target audience

| Audience | Description |
|----------|-------------|
| **Teams with custom servers and protocols** | Want to unify existing IDL, OpenAPI, DB, meta, tables, and spreadsheets in one toolchain. |
| **Unity / client teams applying meta & tables** | Need a definition → meta → code / schema → Unity validation & load pipeline. |
| **Teams wanting to optimize while keeping legacy formats** | Mix .deuk, .proto, .thrift, OpenAPI, CSV, JSON, DB in one build for gradual migration. |
| **Teams wanting easy data modeling with future extensibility** | Define IDL, schema, and meta in one place; extend to protocol, DB, and tools as needed. |
| **Teams starting small but keeping future possibilities open** | Start with CSV / JSON / spreadsheets and scale up to IDL, OpenAPI, and DB gradually. |
| *(Small)* **Teams needing a single toolchain for packets & meta** | Manage IDL, schema, and meta in one stack to reduce build and deployment burden. |
| *(Small)* **Prototype / MVP teams using CSV / spreadsheets only** | Schema inference and header generation connect directly to code and validation; upgrade to IDL later. |
| *(Medium)* **Teams sharing schema / IDL across server, client, and planning** | One definition syncs C# / C++ / TS / JS code, meta, Unity, and server. |
| *(Medium)* **Teams adding meta / editor / Unity integration on top of existing IDL** | Keep legacy definitions intact and integrate only meta tables and editor pipelines via DeukPack. |
| *(Large)* **Multi-project / multi-stack teams unifying legacy and new under one definition source** | Mix .deuk, .proto, .thrift, OpenAPI, CSV, DB in one build for gradual migration and standardization. |
| *(Large)* **Teams needing a standardized protocol / meta pipeline across OpenAPI, DB, and multiple runtimes** | Codegen, serialization, meta, and validation in one toolchain, reusable across teams and projects. |
| *(Game scale)* **Hyper-casual, casual, mid-core, core, and MMORPG teams** | Easily structure existing systems, tables, and schemas while minimizing data management and implementation risk. |
| *(REST API)* **REST API and web service teams** | Define API specs with OpenAPI / JSON Schema and unify codegen, serialization, and meta in one pipeline. |
| *(REST API)* **Teams optimizing existing REST API DTOs with minimal changes** | Import OpenAPI / JSON Schema or redefine only core types in IDL, keep existing contracts (JSON, paths) intact, and generate REST-specific DTOs for gradual, low-risk migration. *(Review: possible)* |
| *(Messaging)* **Chat, messenger, and real-time messaging teams** | Define packet / message schemas in IDL and reduce implementation risk with Binary / Compact / JSON serialization, msgId, and ProtocolRegistry. |

For detailed target and market segmentation, see [Products overview](products/index.md).

---

## Next steps

- [Products overview](products/index.md) — Roles and scope of each product
- [Tutorial](tutorial/index.md) — Quick start
- [Reference](reference/index.md) — API and type reference
- [License](license.md) — Terms and pricing
