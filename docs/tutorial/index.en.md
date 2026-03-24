# Tutorial (English)

Step-by-step guides for using DeukPack. If you have Thrift/Protobuf experience, start with the [IDL guide](idl-guide.md); otherwise start with [Quick start](quickstart.md).

Use the **language switcher** (top) for 한국어.

---

## Getting started

| Order | Doc | Content |
|-------|-----|---------|
| 1 | [**Quick start**](quickstart.md) | Install → one IDL → generate code → check output (~5 min) |
| 2 | [**IDL guide**](idl-guide.md) | .deuk / .thrift syntax: types, struct, enum, namespace, include |
| 3 | [**Protocol & serialization**](protocol-serialization.md) | Binary / Compact / JSON, read/write flow |
| 4 | [**Unified Write · extends**](write-with-overrides.md) | Overrides (per-recipient values), field selection, `extends`. Comparison table. |

---

## By language

| Doc | For | Content |
|-----|-----|---------|
| [**C# guide**](csharp-guide.md) | .NET / Unity | Generated code, Read/Write, unified **Write**, GetSchema, ProtocolRegistry |
| [**C++ guide**](cpp-guide.md) | Native / server | Generated headers/sources, CMake, serialization |
| *(TBD)* | Excel / Unity pipeline | Meta tables, Unity load |
| *(TBD)* | Thrift/Protobuf migration | Mixed IDL, gradual adoption |

---

## Suggested paths

- **Try the core only**: [Quick start](quickstart.md) → [API reference](../reference/api.md)
- **IDL & protocol**: [IDL guide](idl-guide.md) → [Protocol & serialization](protocol-serialization.md)
- **C#**: [Quick start](quickstart.md) → [C# guide](csharp-guide.md)
- **Fan-out messaging**: [Unified Write](write-with-overrides.md) → [API reference](../reference/api.md)
- **C++**: [Quick start](quickstart.md) → [C++ guide](cpp-guide.md)

---

## Prerequisites

- **Core**: Node.js 18+, `npm install deukpack` or `npx deukpack`
- **C#**: .NET SDK, generated code + [DeukPack.Protocol](https://github.com/joygram/DeukPack) runtime
- **C++**: CMake, C++17, generated headers/sources
- **Excel / Unity**: See each product page

Product overview: [Products](../products/index.md). Full reference: [Reference](../reference/index.md).
