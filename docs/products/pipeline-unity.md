# DeukPack Pipeline · Unity

**One-liner**: The product family that **connects definition and meta artifacts** to real projects, Unity, and servers. Builds, copies, and applies code, schemas, and tables so Unity and servers can validate and load them — extending to **server integration and real-time game networking** with the same schema and protocol.

--8<-- "_includes/product-notices-landing-pipeline-unity.md"

---

## What you get

- **End-to-end integration**: Definition/meta change → DeukPack codegen → artifacts reflected in Unity/server → assets reference both schema and C# in a single pipeline. The same generated types and schemas can be used for **server and real-time game integration**.
- **Validation & load**: Generated C# types and schema JSON validate CSV/JSON data and load tables/meta at runtime.

---

## Features

| Category | Content |
|----------|---------|
| **Build & copy** | IDL/Excel → codegen artifacts (code, schema, tables) built and copied to target paths. |
| **Unity integration** | Artifacts reflected in Unity project paths. Asset and script references updated. |
| **Validation** | Schema and CSV/JSON validation for data consistency. |
| **Load** | Load meta and tables at runtime using generated C# types. |

Core language design, Excel editing UI, and full protocol policy are covered by [Core · engine](core-engine.md), [Excel add-in](excel-addin.md), and [Protocol](protocol.md) respectively.
