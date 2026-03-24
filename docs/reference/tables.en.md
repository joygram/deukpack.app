# Tables (`table`)

Everything that treats design/meta as **rows**: the `table` keyword, meta-table shapes, and generated **registries**.

---

## In IDL

- Structs declared with **`table`** are treated as table definitions / meta containers.
- **Rows** are usually separate structs (`record`, etc.) grouped via `infos` maps (and similar patterns).
- **Keys:** `(key = "field")` or composite `(key = "a,b")` — the parser stores `keyFieldNames`. If omitted, flows often assume a `tuid`-style default.
- **Row structs** may reserve field IDs **1–4** for header columns (`tuid`, `tid`, `name`, `note`); codegen enforces **user fields from ID 5 upward**.

---

## Generated code & runtime

- **`MetaTableRegistry`:** registers table/meta types so loaders can resolve types **without reflection**.
- **`GetSchema()`:** recovers schema JSON from generated types for tools, meta, Excel, etc.

Signatures and flags: [API reference — Generated C# APIs](api.md#generated-c-apis).

---

## Boundaries

- **Putting table bytes on the wire** overlaps with [Messages & wire](messages.md) and [Tables on the wire](https://kits.deukpack.app/en/topics/serialization/tables-on-wire/).
- **Rows bound to a database** are mostly `entity` — see [Database & entities](database.md).

---

## Hands-on (DeukPack Kits)

- [Part II — Tables dungeon](https://kits.deukpack.app/en/journey/part-02-tables/).
- [Tables on wire](https://kits.deukpack.app/en/topics/serialization/tables-on-wire/).
- Starter rooms: [Chronicle spine](https://kits.deukpack.app/en/starter-course/outline/) → table / season bundles READMEs.

Canon: [API & type reference](api.md) · [IDL guide](../tutorial/idl-guide.md).
