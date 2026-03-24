# Install (Windows · Linux)

When using **only the distribution**, install via **npm** and use the CLI with **`npx`**. No source clone required.

---

## Distribution = npm package

DeukPack is distributed **via npm**. Use **`npm install deukpack`** in your **project root** and run commands as **`npx deukpack …`**. **`npm deukpack`** is not valid — the binary lives in `node_modules/.bin`.

**Node.js 18+** recommended (16+ may work).

---

## Common

```bash
npm install deukpack
npx deukpack init
npx deukpack run
```

One-shot codegen without a pipeline file:

```bash
npx deukpack ./schema.deuk ./out --csharp --cpp
```

Global install (`npm i -g deukpack`) is **not** the documented default; prefer a **local** dependency and **`npx`**.

---

## Windows

### Install Node.js

- Download **LTS** from [nodejs.org](https://nodejs.org/) — check "Add to PATH".
- Or **winget**: `winget install OpenJS.NodeJS.LTS`
- Or **Chocolatey**: `choco install nodejs-lts`

Open a new terminal and run `node -v`, `npm -v`.

### Use CLI

```powershell
npm install deukpack
npx deukpack init
npx deukpack .\schema.deuk .\out -I .\idl --csharp --cpp
```

### Install from .tgz (Release / Artifact)

- Download `deukpack-x.y.z.tgz` from [GitHub Releases](https://github.com/joygram/DeukPack/releases).
- Or Actions → run on main → Artifacts → `deukpack-npm-tarball-<sha>`.

```powershell
npm install .\Downloads\deukpack-x.y.z.tgz
npx deukpack init
```

---

## Linux

### Install Node.js

- **Ubuntu/Debian**: `sudo apt update && sudo apt install nodejs npm`
- **Fedora**: `sudo dnf install nodejs npm`
- **nvm**: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash` → `nvm install --lts`

Check `node -v`, `npm -v`.

### Use CLI

```bash
npm install deukpack
npx deukpack init
npx deukpack ./idl/root.deuk ./out -I ./idl --csharp --cpp
```

### Install from .tgz (Release / Artifact)

- [GitHub Releases](https://github.com/joygram/DeukPack/releases) or Actions Artifacts.

```bash
npm install ./deukpack-x.y.z.tgz
npx deukpack init
```

---

## Next

- [Quick start](quickstart.md) — init + run + one-shot codegen
- [Pipeline guide](pipeline-guide.md) — `deukpack.pipeline.json`, `defineScope: "all"`
- [Core · engine](../products/core-engine.md) — npm · GitHub links
- Repo and source build: [GitHub DeukPack](https://github.com/joygram/DeukPack). Install/tutorial docs live on this site only.
