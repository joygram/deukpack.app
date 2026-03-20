# Protocol & Serialization

DeukPack supports three serialization protocols: **Binary**, **Compact**, and **JSON**. Select one with `--protocol` at codegen time; the matching Reader/Writer is generated.

---

## 1. Protocol types

| Protocol | Option | Use case | Characteristics |
|----------|--------|----------|----------------|
| **Binary** | `--protocol binary` | Binary communication between server and client, Thrift Binary compatible | Field-ID/type-based, fast serialization and parsing |
| **Compact** | `--protocol compact` | Bandwidth/storage savings | Smaller payload than Binary |
| **JSON** | `--protocol json` | REST, debugging, logging | Human-readable, text-based |

One protocol per IDL generation. If multiple protocols are needed, generate into separate output folders or define multiple jobs in a pipeline config.

---

## 2. Serialization flow (concept)

1. **Write**: In-memory struct/object → passed to **Writer** → byte stream (or JSON string) output.
2. **Read**: Byte stream (or JSON string) → parsed by **Reader** → struct/object restored.

With the same schema and protocol, bytes written in C# can be read in C++ and vice versa (wire compatibility).

---

## 3. Protocol selection guide

- **Game / real-time server, performance critical**: **Binary** or **Compact**.
- **Compatibility with existing Thrift Binary services**: **Binary**.
- **HTTP/REST, logs, monitoring**: **JSON**.
- **Minimize storage/bandwidth**: **Compact**.

For detailed specs and field encoding, see [Protocol](../products/protocol.md) and [core repo protocol policy](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_PROTOCOL_POLICY.md).

---

## 4. Specifying at codegen

```bash
npx deukpack ./schema.deuk ./gen --csharp --protocol binary
npx deukpack ./schema.deuk ./gen-json --csharp --protocol json
```

Generated C#/C++ code includes Read/Write implementations for the selected protocol.

---

## 5. msgId & ProtocolRegistry (C#)

To dispatch by message type using **msgId**, the generated **ProtocolRegistry** pairs each type with its ID. Read msgId from the receive buffer, look up the type in the Registry, then call **Read** to deserialize.  
For detailed usage, see [C# guide](csharp-guide.md) and [Protocol](../products/protocol.md).

---

## 6. Next steps

- [C# guide](csharp-guide.md) — Read/Write usage in C#
- [C++ guide](cpp-guide.md) — Serialization in C++
- [API reference](../reference/api.md) — CLI and generated API summary
