# Protocol & serialization

DeukPack splits wires into **two families**: **interop** (Thrift-compatible bytes) and **Deuk native** (`pack` / `json` / `yaml`). Pick the family first, then the `protocol` string. The full matrix is in [Wire protocol families](../reference/wire-protocols.md).

---

## 1. Families and protocol names

### Deuk native (`wireFamily: deuk`)

| Protocol | CLI example | Role |
|----------|-------------|------|
| **`pack`** | `--protocol pack` (default-ish codegen hint) | Tagged binary. **npm** `serialize` default |
| **`json`** | `--protocol json` | UTF-8 JSON, values only (not the same as **`tjson`** / Thrift JSON) |
| **`yaml`** | `--protocol yaml` | UTF-8 YAML, values only |

### Interop — Thrift side (`wireFamily: interop`)

| Protocol | CLI example | Role |
|----------|-------------|------|
| **`tbinary`** | `--protocol tbinary` | Thrift Binary compatible |
| **`tcompact`** | `--protocol tcompact` | Thrift Compact |
| **`tjson`** | `--protocol tjson` | Thrift JSON (`DpJsonProtocol`) |

**JS:** **`pack` / `json` / `yaml`** need no extra metadata. **`tbinary` / `tcompact` / `tjson`** require **`interopRootStruct`** (+ **`interopStructDefs`** for nested named structs) on `SerializationOptions`, or use **`serializeInteropStruct`**. **Generated C# / C++** remains the usual path for services.

One `--protocol` hint per codegen output; split folders or use `--pipeline` for multiple wires.

---

## 2. Serialization flow (concept)

1. **Write**: struct/object → **Writer** (or npm `serialize`) → bytes or text.
2. **Read**: bytes/text → **Reader** (or npm `deserialize`) → struct/object.

**Same schema, same `protocol`, same family** → cross-language bytes match. **Different families** → different byte layouts.

---

## 3. How to choose

- **New Node/browser tooling, JS only:** **`pack`** or `json` / `yaml` (Deuk native).
- **Byte-compatible with existing Thrift Binary/Compact:** **`tbinary`** or **`tcompact`** — **generated C# / C++** (or JS with schema options).
- **Human-readable logs with Deuk native JSON:** **`json`** (deuk). For Thrift JSON wire, use **`tjson`**.

Details: [Protocol](../products/protocol.md), [Interop vs native wire](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md), [core protocol policy](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_PROTOCOL_POLICY.md).

---

## 4. Codegen

```bash
npx deukpack ./schema.deuk ./gen --csharp --protocol pack
npx deukpack ./schema.deuk ./gen-interop --csharp --protocol tbinary
npx deukpack ./schema.deuk ./gen-json --csharp --protocol json
```

Generated C#/C++ includes Read/Write for the selected protocol (and family).

---

## 5. npm one-liners (Deuk native)

```ts
import { serialize, deserialize } from 'deukpack';
const bytes = serialize(obj);       // default = pack
const again = deserialize(bytes);
```

Interop binary is **not** produced through this path alone. See [Wire protocol families](../reference/wire-protocols.md).

---

## 6. msgId & ProtocolRegistry (C#)

To dispatch by **msgId**, use generated **ProtocolRegistry**. Read msgId from the buffer, resolve the type, then **Read**.  
See [C# guide](csharp-guide.md) and [Protocol](../products/protocol.md).

---

## 7. Next steps

- [Wire protocol families](../reference/wire-protocols.md) — matrix & JS limits
- [C# guide](csharp-guide.md)
- [C++ guide](cpp-guide.md)
- [API reference](../reference/api.md)
