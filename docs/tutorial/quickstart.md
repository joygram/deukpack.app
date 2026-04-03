# Quick start

Install DeukPack, initialize your project, and **generate C#, C++, TypeScript, and JavaScript** in a few steps (about 5 minutes).

**한국어**: Use the language switcher (top right).

---

## 1. Install

**Node.js 18+** required.

```bash
npm install deukpack
```

Optional: `npm init -y` first if you need a `package.json`.

---

## 2. Initialize project

```bash
npx deukpack init
```

This creates:
- **`deukpack.pipeline.json`** — build configuration
- **`.deukpack/workspace.json`** — workspace manifest
- Attempts to install the **Deuk IDL VSIX** for VS Code / Cursor / Antigravity (use `--skip-vsix` for CI)

---

## 3. Run code generation

```bash
npx deukpack run
```

This reads `deukpack.pipeline.json` and generates code for all configured languages (C#, C++, TS, JS).

---

## 4. Define your IDL

Create a `.deuk` file (e.g., `schema.deuk`):

```thrift
namespace * deuk.tutorial

struct HelloRequest {
    > 1 name
}

struct HelloResponse {
    > 1 message
}
```

Edit `deukpack.pipeline.json` to point to your IDL root, then run `npx deukpack run` again.

For `.deuk` syntax, see the [reference](../reference/index.md) and the core repo [docs](https://github.com/joygram/DeukPack/tree/main/docs).

---

## 5. Use the generated code

- **C#**: Add generated `*.cs` and reference **DeukPack.Protocol** (or `node_modules/deukpack/dist/csharp`). See [API reference](../reference/api.md).
- **C++**: Add the generated headers/sources to your build and include path.

---

## 6. Next steps

- **C# / Unity**: Include generated code in your solution and wire serialization using [Protocol](../products/protocol.md). Use npm `dist/csharp` runtime or the [kits lineup](../deukpack-kits.md).
- **Pipeline**: [Pipeline guide](pipeline-guide.md) — `defineScope: "all"`, `defineRoot`, `exclude`.
- **Serialization**: one **`Write`** surface with **field IDs** + **overrides** — [Overrides · field selection · extends](write-with-overrides.md).
- **Excel / Unity**: [Excel add-in](../products/excel-addin.md), [Pipeline·Unity](../products/pipeline-unity.md).

---

## Appendix: One-shot CLI (single file)

For quick tests without `init`:

```bash
npx deukpack ./schema.deuk ./out --csharp --cpp
```

Options:

```bash
# With include paths
npx deukpack ./schema.deuk ./out -I ./idl --csharp --cpp

# TypeScript / JavaScript
npx deukpack ./schema.deuk ./out --csharp --ts --js

# Protocol selection
npx deukpack ./schema.deuk ./out --csharp --protocol tbinary
```

*Full CLI options: `npx deukpack --help` or [API reference](../reference/api.md). Interop vs native matrix: [Wire protocol families](../reference/wire-protocols.md).*
