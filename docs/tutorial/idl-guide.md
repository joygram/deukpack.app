# IDL guide

DeukPack accepts **.deuk** (native), **.thrift**, and **.proto** as input. This guide covers the **IDL syntax** needed to define messages and types, at the Thrift/Protobuf level.

---

## 1. Files and namespaces

**Entry file**: The root IDL specified at codegen time (e.g. `schema.deuk`, `api.thrift`). This file and everything it `include`s merge into a single AST.

**Namespace** (maps to the generated code's package/namespace):

```thrift
namespace csharp MyApp.Protocol
namespace cpp myapp.protocol
```

In `.deuk` you can use the same syntax or a wildcard namespace like `namespace * MyApp`. This determines the namespace/package of the generated C#/C++ types.

---

## 2. Basic types

| IDL type | Description | C# mapping | C++ mapping |
|----------|-------------|------------|-------------|
| `bool` | true/false | `bool` | `bool` |
| `byte` | unsigned 8-bit | `byte` | `uint8_t` |
| `i16` | 16-bit integer | `short` | `int16_t` |
| `i32` | 32-bit integer | `int` | `int32_t` |
| `i64` | 64-bit integer | `long` | `int64_t` |
| `double` | 64-bit float | `double` | `double` |
| `string` | UTF-8 string | `string` | `std::string` |
| `binary` | byte array | `byte[]` | `std::string` / buffer |

---

## 3. Struct

Messages and DTOs are defined as **struct**. Each field requires a **field ID** (number) used for **schema evolution** when adding or removing fields later.

```thrift
struct DemoPoint {
    > 1 x
    > 2 y
}

struct DemoUser {
    > 1 id
    > 2 name
    > 3 home    // nested struct
}
```

- **Field ID**: 1, 2, 3, … — used to identify fields on the wire. Once assigned, do not change an ID.
- **Optional fields**: Depending on the syntax/version, `optional` may be supported. (See the core repo [docs](https://github.com/joygram/DeukPack/tree/main/docs).)
- **Default values**: Defaults specified in IDL are reflected in generated code and schema.

---

## 4. Enum

```thrift
enum Status {
  Unknown = 0
  Active = 1
  Inactive = 2
}

struct Item {
    > 1 id
    > 2 name
    > 3 status = Status.Unknown
}
```

Enum values (numbers) are used as-is during serialization — avoid changing previously used values.

---

## 5. Containers: list, set, map

```thrift
struct Example {
    > 1 ids
    > 2 tags
    > 3 uniqueNames
  4: map<i32, string> idToName
}
```

- **list**: ordered collection.
- **set**: unique values.
- **map**: key–value pairs. Key type must be supported by the protocol (integers, strings, etc.).

---

## 6. include — splitting across files

Use **include** to import other IDL files. Specify **include paths** (`-I`) at codegen time.

```thrift
// api.thrift
include "shared.thrift"

struct Request {
    > 1 id
  2: shared.CommonHeader header
}
```

```bash
npx deukpack ./api.thrift ./gen -I ./idl --csharp --cpp
```

The entry file is `api.thrift`; `shared.thrift` is resolved under `-I ./idl`.

---

## 7. .deuk vs .thrift vs .proto

| Item | .deuk | .thrift | .proto |
|------|-------|---------|--------|
| **Role** | DeukPack native | Apache Thrift compatible | Protobuf compatible |
| **Mixing** | One build can include .deuk + .thrift + .proto together | | |
| **Syntax** | Similar to Thrift + extensions like table | Standard Thrift | Standard Protobuf |

Use existing .thrift and .proto files via **include** as-is; write new files in .deuk to access extended syntax (tables, meta, etc.). For details, see [Core · engine](../products/core-engine.md) and [GitHub docs](https://github.com/joygram/DeukPack/tree/main/docs).

---

## 8. Next steps

- [Quick start](quickstart.md) — Create a file with this syntax and run codegen
- [Protocol & serialization](protocol-serialization.md) — Choose Binary/Compact/JSON and serialize
- [C# guide](csharp-guide.md) / [C++ guide](cpp-guide.md) — Use generated code
