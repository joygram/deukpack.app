# Quick start

Install DeukPack, define one IDL, and **generate C#, C++, TypeScript, and JavaScript** in a few steps (about 5 minutes).

**한국어**: Use the language switcher (top right).

---

## 1. Install

**Node.js 18+** required.

**Recommended (project-local):** add `deukpack` as a dependency and run the CLI with **`npx`**. Do **not** use `npm deukpack` — that is not an npm subcommand.

```bash
npm install deukpack
```

Optional: `npm init -y` first if you need a `package.json`. Global `npm install -g deukpack` is **not** the default workflow; prefer **`npx deukpack`** from the project that lists the dependency.

---

## 2. Recommended: init + pipeline (real projects)

From the **project root** (where your `_deuk_define` or IDL tree lives):

```bash
npm install deukpack
npx deukpack init    # writes deukpack.pipeline.json, .deukpack/workspace.json, then installs bundled VSIX (code/cursor/antigravity) unless --skip-vsix
npx deukpack run     # same as npx deukpack --pipeline ./deukpack.pipeline.json when cwd is project root
```

- **`npx deukpack init`** creates **`deukpack.pipeline.json`**, runs **bootstrap** (workspace manifest under **`.deukpack/`**), then **attempts** the Deuk IDL VSIX install. Re-run init after dependency updates; edit the JSON files for advanced options (`exclude`, `includePaths`, `outputLangSubdirs`, etc.).
- Use **`--skip-vsix`** if you must skip editor install (CI, headless).

For tarball / link installs, see [Install (OS)](install-os.md).

---

## 3. One-shot: single IDL file (try-out)

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

For `.deuk` syntax, see the [reference](../reference/index.md) and the core repo [docs](https://github.com/joygram/DeukPack/tree/main/docs).

---

## 4. Run code generation (single entry)

Specify the **output folder** and language options:

```bash
# Generate C# + C++
npx deukpack ./schema.deuk ./gen --csharp --cpp

# With include paths
npx deukpack ./schema.deuk ./gen -I ./idl --csharp --cpp

# TypeScript / JavaScript emit under ./gen/ts and ./gen/js (not typescript/ / javascript/)
npx deukpack ./schema.deuk ./gen --csharp --ts --js

# Protocol: interop → tbinary / tcompact / tjson; Deuk native → pack / json / yaml (default pack)
npx deukpack ./schema.deuk ./gen --csharp --protocol tbinary
npx deukpack ./schema.deuk ./gen-native --csharp --protocol pack
```

If **`deukpack.pipeline.json`** is missing in the current directory, the CLI **warns** and suggests **`npx deukpack init`**; the one-shot build still runs.

---

## 5. Use the generated code

- **C#**: Add generated `*.cs` and reference **DeukPack.Protocol** (or `node_modules/deukpack/dist/csharp`). See [API reference](../reference/api.md).
- **C++**: Add the generated headers/sources to your build and include path.

---

## 6. Next steps

- **C# / Unity**: Include generated code in your solution and wire serialization using [Protocol](../products/protocol.md). Use npm `dist/csharp` runtime or the [kits lineup](../starter-kits.md).
- **Pipeline**: [Pipeline guide](pipeline-guide.md) — `defineScope: "all"`, `defineRoot`, `exclude`, `npx deukpack run`.
- **Serialization**: one **`Write`** surface with **field IDs** + **overrides** — [Overrides · field selection · extends](write-with-overrides.md).
- **Excel / Unity**: [Excel add-in](../products/excel-addin.md), [Pipeline·Unity](../products/pipeline-unity.md).

---

*Full CLI options: `npx deukpack --help` or [API reference](../reference/api.md). Interop vs native matrix: [Wire protocol families](../reference/wire-protocols.md).*
