# Messages & wire (`message`)

**Message types**, **msgId**, **serialization**, and **partial-field send / overrides** — the network-facing bundle.

**Which protocol strings are interop vs Deuk native:** start at [Wire protocol families](wire-protocols.md).

---

## In IDL

- **`message`** is a struct shaped for network naming conventions; field IDs and required rules follow Thrift/Deuk rules.
- **Services:** Thrift-style `service` / methods stay in the AST as RPC definitions (bindings depend on generators/runtime).

---

## Protocols & registries

- **`ProtocolRegistry`:** maps message types ↔ **msgId** (and related ids) for dispatch and serialization routing.
- **CLI `--protocol` / `wireFamily`:** see the table in [Wire protocol families](wire-protocols.md). Interop Thrift (`tbinary`, etc.) is centered on **generated C# / C++**; **JS** can use the same wire with **`interopRootStruct`** on options, or **`pack` / `json` / `yaml`** without schema.
- **C#:** `IDeukPackReader` / `IDeukPackWriter` per protocol.
- **`--wire-profile`:** subset / DTO-style emit. See [Wire profile subset](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WIRE_PROFILE_SUBSET.md).

---

## Unified Write (subset fields & overrides)

- **C#:** `Write(oprot, fieldIds, overrides?)` — `fieldIds` non-null ⇒ only those fields; `overrides` ⇒ per-field ID replacement values; use **`null`** for unused parameters.
- **JavaScript:** `toJson` / `toBinary` (and pack helpers) with the same **`(obj, fieldIds, overrides)`** shape.

Tutorial: [Unified Write tutorial](../tutorial/write-with-overrides.md)  
Deep API: [DEUKPACK_WRITE_WITH_OVERRIDES_API](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WRITE_WITH_OVERRIDES_API.md)  
Tables in [API reference — Unified Write](api.md#unified-write-field-selection--overrides).

---

## Hands-on (DeukPack Kits)

- [Part IV — Network tunnel](https://kits.deukpack.app/en/journey/part-04-network/).
- [Messages on the wire](https://kits.deukpack.app/en/topics/serialization/messages-on-wire/) · [Cross-stack](https://kits.deukpack.app/en/topics/serialization/cross-stack/).

Product story: [Protocol](../products/protocol.md).
