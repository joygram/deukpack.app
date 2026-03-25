# DeukPack Protocol

**One-liner**: **Two wire families** — (1) **Interop** (Thrift): **`tbinary`**, **`tcompact`**, **`tjson`**; (2) **Deuk native**: `pack`, `json`, `yaml`. On top: **msgId**, **ProtocolRegistry**, and serializers for C#, C++, and JS (interop on JS needs **`interopRootStruct`** metadata). **Protobuf byte wire** (`protv2` / `protv3` profiles) is **planned**, not shipped yet.

**Reference table (interop vs native, per language):** [Wire protocol families](../reference/wire-protocols.md) — CLI, default npm `serialize`, and JS limits in one place.

--8<-- "_includes/product-notices-landing-protocol.md"

---

## What you get

- **Memory & performance**: Buffer reuse and minimal reflection keep runtime allocations minimal. (Optional) zero-copy returns views without copying on read. Targets ~10× faster serialization/deserialization for the same payload.
- **Convenience**: Declare data once and get Read/Write and validation. C# and C++ can target **interop** or **Deuk native** wires. The npm **JS** `WireSerializer` implements **Deuk native** (`pack` / `json` / `yaml`) without extra metadata, and **Thrift interop** (`tbinary` / `tcompact` / `tjson`) when you pass **`interopRootStruct`** (+ optional **`interopStructDefs`**). In **server and real-time game** scenarios, client and server can share the same schema for packets and meta.

---

## What Protobuf doesn't have — what you get here

| Area | DeukPack Protocol |
|------|-------------------|
| **Meta data & tables** | Manage game meta and planning tables aligned with the schema. Directly connected to Excel, SQLite, CSV/JSON pipeline. |
| **Native message handling** | Numeric msgId + ProtocolRegistry for O(1) dispatch and handler mapping from packets alone. |
| **Schema differentiation** | GetSchema() recovers fields, annotations, defaults, and comments at runtime. Ties into Excel header, validation, and type-string integration. |

Use types from the core engine; mix `.deuk`, `.proto`, and `.thrift` in one build — keep **Protobuf-aligned Binary/Compact** when talking to legacy services, and prefer **Deuk native `pack`** for **greenfield JS/Node** tools.

---

## Features

| Category | Content |
|----------|---------|
| **Wire (interop)** | Thrift-compatible **`tbinary`**, **`tcompact`**, **`tjson`** only. **C# / C++** generated code is primary; **JS** supports the same wire with **struct schema** on `SerializationOptions`. |
| **Wire (Deuk native)** | **`pack`** (tagged binary), **`json`**, **`yaml`** — supported by npm **JS** serialize/deserialize. CLI codegen default hint is effectively **`pack`**. |
| **Family alignment** | `wireFamily`: `interop` \| `deuk` must match `protocol`. See [Interop vs native wire](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md). |
| **Schema meta** | GetSchema(), field schema, protocol type strings. Excel header/validation tool integration. |
| **Database** | SQLite (DpSqliteProtocol): DDL and C# access code generation. |

Zero-copy protocol is an **opt-in option** — used only when explicitly selected. See the dedicated spec for buffer lifetime and immutability caveats.

---

## Read next

- [Wire protocol families (reference)](../reference/wire-protocols.md)
- [Tutorial · Protocol & serialization](../tutorial/protocol-serialization.md)
- [Core protocol policy](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_PROTOCOL_POLICY.md)
