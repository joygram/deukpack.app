# Quick start

Install DeukPack, define one IDL, and **generate C#, C++, and TS code** in a few steps (about 5 minutes).

**한국어**: Use the language switcher (top right).

---

## 1. Install

**Node.js 18+** required.

```bash
# Add as dependency
npm install deukpack

# Or install CLI globally (optional)
npm i -g deukpack
```

To run once without installing, use `npx deukpack` only.

---

## 2. Add an IDL file

Put a `.deuk` or `.thrift` / `.proto` file in your project folder, e.g. `schema.deuk`:

```thrift
namespace * deuk.tutorial

struct HelloRequest {
  1: string name
}

struct HelloResponse {
  1: string message
}
```

For `.deuk` syntax, see the [reference](../reference/) and the core repo [docs](https://github.com/joygram/DeukPack/tree/main/docs).

---

## 3. Run code generation

Specify the **output folder** and language options:

```bash
# Generate C# + C++
npx deukpack ./schema.deuk ./gen --csharp --cpp

# With include paths
npx deukpack ./schema.deuk ./gen -I ./idl --csharp --cpp

# Protocol (binary / compact / json)
npx deukpack ./schema.deuk ./gen --csharp --protocol binary
```

Output goes under `./gen` (or your path), e.g. `gen/csharp/`, `gen/cpp/`.

---

## 4. Use the generated code

- **C#**: Add generated `*.cs` and reference **DeukPack.Protocol** (or `node_modules/deukpack/dist/csharp`). See [API reference](../reference/api.md).
- **C++**: Add the generated headers/sources to your build and include path.

---

## 5. Next steps

- **C# / Unity**: Include generated code in your solution and wire serialization using [Protocol](../products/protocol.md). Use npm `dist/csharp` runtime or [Starter kits](../starter-kits.md).
- **Pipeline**: For multiple IDL/outputs, use [pipeline mode](https://github.com/joygram/DeukPack#simple-usage-cli) (`--pipeline ./deukpack-pipeline.json`).
- **Excel / Unity**: See [Excel add-in](../products/excel-addin.md), [Pipeline·Unity](../products/pipeline-unity.md).

---

*Full CLI options: `npx deukpack --help` or [API reference](../reference/api.md).*
