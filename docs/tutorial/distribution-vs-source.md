# Distribution vs source — when to use which

When to use the **distribution (npm package)** and when to use the **source (clone and build)**.

---

## At a glance

| | Distribution | Source |
|--|--------------|--------|
| **Meaning** | Install only the npm package `deukpack` and use CLI, generated code, runtime | Clone the repo, build, and run scripts directly |
| **Install** | `npm install deukpack` or `npx deukpack` | `git clone` → `npm ci` → `npm run build` |
| **CLI** | `npx deukpack ...` or `deukpack ...` (if global) | `node scripts/build_deukpack.js ...` (from repo root or submodule path) |
| **Location** | Project’s `node_modules/deukpack` | Cloned directory or submodule (e.g. `third_party/DeukPack`) |
| **Update** | `npm update deukpack` or reinstall with version | `git pull` / submodule `git checkout` then `npm run build` |
| **Pin version** | `"deukpack": "1.0.5"` in package.json | Submodule commit or tag |
| **In CI** | `npm ci` then `npx deukpack ...` | Submodule `update --init`, build, then `node <path>/scripts/build_deukpack.js ...` |

---

## Use the distribution when

You want to use the CLI, codegen, and C# runtime **without cloning** the repo.

### Good fit when

- You only need **code generation** and do not change DeukPack itself
- You want the **same version** in CI and on other machines (pinned in package.json)
- You want a **simple setup** with only Node.js and no repo layout to manage
- You want the **same install steps** on Windows and Linux (npm)

### Install and run

```bash
npm install deukpack
npx deukpack ./schema.deuk ./out --csharp --cpp
```

- **Details**: [Install (Windows · Linux)](install-os.md) — npm install, CLI, .tgz
- **Quick start**: [Quick start](quickstart.md) — IDL → C#, C++, TS

### What you get

- `bin/deukpack.js` (CLI), `dist/` (built JS), `dist/csharp` (C# runtime), `scripts/build_deukpack.js`

### What you don’t get

- TypeScript source (`src/`), tests, examples, internal docs. For immediate changes you need the source.

---

## Use the source when

You **clone** the repo and **build** it, then run scripts by path.

### Good fit when

- You **contribute**, **debug**, or **fork** and need to run with local changes
- You add DeukPack as a **submodule** and keep pipeline config only in your project
- CI should use a **fixed submodule path** and build from source
- You need a **specific commit or branch** not published on npm

### Install and run

```bash
git clone https://github.com/joygram/DeukPack.git
cd DeukPack
npm ci
npm run build
node scripts/build_deukpack.js ./examples/sample_idl/sample.thrift ./examples/generated --csharp --cpp --js
```

- **Details**: [GitHub — source and submodule](https://github.com/joygram/DeukPack/blob/main/docs/README.md) — clone, build, submodule in repo docs

### What you get

- Full source, tests, examples, docs. Edit and run `npm run build` to refresh `dist/`.

### Note

- **Build is required**: CLI and pipeline do not work without `dist/`. Run `npm run build` once after clone.

---

## Quick choice

| Goal | Use |
|------|-----|
| Use codegen only, no changes to DeukPack | **Distribution** (npm) |
| Reproducible codegen in CI | **Distribution** (pin version in package.json) |
| Same install on Windows and Linux | **Distribution** (npm) |
| Modify source, contribute, debug | **Source** (clone and build) |
| Submodule in your project, pipeline config in project only | **Source** (submodule) |
| Use a specific commit or branch | **Source** (clone or submodule) |

---

## Related docs

| Doc | Purpose |
|-----|---------|
| [Install (Windows · Linux)](install-os.md) | Distribution install, Node, .tgz |
| [Quick start](quickstart.md) | IDL → C#, C++, TS, by language |
| [GitHub DeukPack docs](https://github.com/joygram/DeukPack/tree/main/docs) | Source, submodule, release docs (repo) |
