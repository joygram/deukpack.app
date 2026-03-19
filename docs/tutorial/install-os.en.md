# Install (Windows · Linux)

When using **only the distribution**, install via **npm** and use the CLI. No source clone required.

---

## Distribution = npm package

DeukPack is distributed **via npm** only. To **use only the binary**, run `npm install deukpack` or `npx deukpack` to use the package (Node.js 16+ required, 18+ recommended).

---

## Common

```bash
npm install deukpack
npx deukpack ./schema.deuk ./out --csharp --cpp
```

Global: `npm i -g deukpack` then `deukpack --help`

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
npx deukpack .\idl\root.deuk .\out -I .\idl --csharp --cpp
```

### Install from .tgz (Release / Artifact)

- Download `deukpack-x.y.z.tgz` from [GitHub Releases](https://github.com/joygram/DeukPack/releases).
- Or Actions → run on main → Artifacts → `deukpack-npm-tarball-<sha>`.

```powershell
npm install .\Downloads\deukpack-1.0.5.tgz
npx deukpack .\schema.deuk .\out --csharp
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
npx deukpack ./idl/root.deuk ./out -I ./idl --csharp --cpp
```

### Install from .tgz (Release / Artifact)

- [GitHub Releases](https://github.com/joygram/DeukPack/releases) or Actions Artifacts.

```bash
npm install ./deukpack-1.0.5.tgz
npx deukpack ./schema.deuk ./out --csharp
```

---

## Next

- [Quick start](quickstart.md) — IDL → C#, C++, TS example
- [Core · engine](../products/core-engine.md) — npm · GitHub links
- Full doc in repo: [GitHub joygram/DeukPack](https://github.com/joygram/DeukPack) — `docs/INSTALL_OS.md`
