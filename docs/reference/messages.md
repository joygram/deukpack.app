# Messages & wire (`message`)

**Message types**, **msgId**, **serialization**, and **partial-field send / overrides** — the network-facing bundle.

**Which protocol strings are interop vs Deuk native:** start at [Wire protocol families](wire-protocols.md).

---

## In IDL

## In IDL

- **`message`** is the opinionated framework keyword for standard DeukPack network routing. Beyond basic field IDs and rules, the compiler implicitly **auto-injects a routing header (e.g., `MsgInfo`) at the top of the wire payload** for seamless runtime routing.
- **Services:** Thrift-style `service` / methods stay in the AST as RPC definitions (bindings depend on generators/runtime).

---

## ⚠️ Architectural Guide: `message` vs `record` (Header Overhead)

When adopting DeukPack, ensure you choose the correct keyword for your architectural needs.

**1. Pure Data Serialization (0% Header Overhead) ➡️ Use `record` or `struct`**
If your network stack (TCP/UDP) already utilizes a proprietary framing or routing standard and you simply want DeukPack to strictly parse payloads, use `record` or `struct`. DeukPack will generate pure serialization logic with absolutely **`0 bytes overhead`** (it does not inject any headers).

**2. Utilizing DeukPack's Routing Backbone (Auto-Injected Header) ➡️ Use `message<ID>`**
Assigning an ID to a message, like `message<1000>`, implies integration with DeukPack's official router. The engine will **automatically inject the header struct (`MsgInfo`)** into your wire transmission for out-of-the-box C#/Elixir router switch generation.
> The injected header is set to `required: false` (Optional). If clients explicitly drop or nullify it at runtime, the byte allocation will still shrink to 0.

**[Blueprint: Global Custom Headers (`message_header`)]**
In an upcoming release, DeukPack will support global header substitution via a `message_header MyCustomHeader` declaration in any `.deuk` file (e.g., `deukpack_override.deuk`), seamlessly overriding the default `MsgInfo` structure to fit your proprietary framework protocols without changing your message architectures.

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
