# DeukPack Excel Add-in

**Distribution**: The Excel protocol and Excel add-in are **distributed separately** from the DeukPack core (npm). The core includes IDL, codegen, and Binary/Compact/JSON; use this product separately when Excel integration is needed.

**One-liner**: An add-in for **schema-based meta editing** (header generation, validation, schema diff, Apply, sheet editing) inside Excel.

--8<-- "_includes/product-notices-landing-excel-addin.en.md"

---

## What you get

- **Schema alignment**: Match Excel sheet headers, types, and validation against the schema produced by IDL/codegen.
- **Planning & balance meta integration**: Edit game meta and planning tables in Excel and connect them to builds, Unity, and servers using the same schema.
- **Single & composite keys**: Supports single-key (tuid, etc.) and composite-key (cid + level, etc.) sheet configurations.

---

## Features

| Category | Content |
|----------|---------|
| **Header generation** | Auto-generate sheet headers (field names, types) from schema. |
| **Validation** | Validate sheet data against schema (types, required fields, defaults). |
| **Schema diff** | Compare current sheet against the latest schema. |
| **Apply** | Apply schema changes to the sheet. |
| **Sheet-based meta editing** | Edit and save meta data per sheet. |

Core codegen, server packet handling, and Unity runtime loading are covered by [Core · engine](core-engine.md), [Protocol](protocol.md), and [Pipeline · Unity](pipeline-unity.md) respectively.
