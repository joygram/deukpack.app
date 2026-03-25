# Database & entities (`entity`)

**Entity rows** for SQL/ORM, **`tablelink`**, and **EF Core** outputs — one axis.

---

## In IDL

- **`entity`:** persistence row schema. Emits C# **data annotations** (`[Table]`, `[Key]`, `[Column]`) with **`--csharp` alone**.
- **`record`:** same syntax, `declarationKind` stays `record` — use when the type is mainly a DTO/wire shape.
- **`tablelink`:** reference to another table row (design/DB boundary). Type comparison: [API reference — Extended types](api.md#extended-types).

---

## CLI `--ef`

- **`--ef`:** turns on the **EF Core** path (`DbContext`, fluent config, etc.) for server-side ORM output.
- **Meta table rows (`*_meta`, etc.)** align with this path in the generator (see core codegen notes).

Full flags: [API reference — CLI](api.md#cli).

---

## Generated code

- Entities can still use the **same struct serialization APIs**, but many teams reason about them from **storage/migrations** first.
- **`GetSchema()`** is shared with meta/validation flows.

---

## Hands-on (DeukPack Kits)

- [Part V — C# dungeon](https://kits.deukpack.app/en/journey/part-05-dungeon-csharp/).
- [Records and DTOs](https://kits.deukpack.app/en/topics/serialization/records-and-dto/).

Product: [Core · engine](../products/core-engine.md) · [Pipeline · Unity](../products/pipeline-unity.md).
