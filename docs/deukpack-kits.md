# DeukPack kits lineup

![docs/deukpack-kits Cover](/assets/kits-lineup-cover.png){: style="display: block; margin: 0 auto 2rem auto; max-width: 500px;"}


**Lineup & portal (overview):** stack introductions, **clone URLs**, and **shared prerequisites**—what each kit is and where it lives. (URL: `/deukpack-kits/`)

!!! info "Overview vs kits documentation site"
    **This page (deukpack.app/deukpack-kits/):** **overview**—what to clone and what you need up front.  
    **Hands-on labs, copy-paste drills, the *Ruins* course, saga journey, and topic pages** for **walking the kits end-to-end** live on the official kits site **[kits.deukpack.app](https://kits.deukpack.app/en/)** (same navigation as the `StarterKit/` READMEs).

!!! note "Growing under “Kits” (roadmap)"
    **Main-line kits (`StarterKit/`)** and the **app-kit (`AppKit/`) teaser** are expected to **open and deepen over time** under the **DeukPack Kits** umbrella—docs, templates, and teaser areas **without a fixed product ship calendar**. Watch **[kits.deukpack.app](https://kits.deukpack.app/en/)** for what unlocks next.

Each kit lives in a **separate repository from the core** (or a folder in the unified repo); its README lists **required tools, codegen commands, and build steps**.

> **Note:** Some kits may not have repositories yet. If a link shows `TBD`, try the [DeukPack OSS GitHub](https://github.com/joygram/DeukPack) · [DeukPackKits (unified)](https://github.com/joygram/DeukPackKits) · [DeukPackKitsOSS](https://github.com/joygram/DeukPackKitsOSS) · [npm `deukpack`](https://www.npmjs.com/package/deukpack) · core [examples](https://github.com/joygram/DeukPack/tree/main/examples) first.

**Unified kits repository (GitHub)**  
- [joygram/DeukPackKits](https://github.com/joygram/DeukPackKits) — Unity, C++, Network, TypeScript, and other stack samples in one repo. `git clone https://github.com/joygram/DeukPackKits.git`  
- **Kits docs site (hands-on · journey):** [kits.deukpack.app](https://kits.deukpack.app/en/) — public MkDocs (KO/EN); in-site links match the repo README scheme.  
- [joygram/DeukPackKitsOSS](https://github.com/joygram/DeukPackKitsOSS) — OSS-oriented clone. `git clone https://github.com/joygram/DeukPackKitsOSS.git`

---

## Prerequisites

**Each starter is stack-specific (Unity, C++, Console, TS, etc.), so you install DeukPack inside each starter repo.**  
Before that, you need **Node.js, npm, and other environment prerequisites**.

### Required setup & automatic checks

| Item | Description |
|------|-------------|
| **Node.js** | v16+ required, v18+ recommended. [nodejs.org](https://nodejs.org/) |
| **npm** | Included with Node. Verify with `npm -v` |
| **DeukPack CLI** | `npm install deukpack` in the repo, then `npx deukpack`. Match the version in the kit README |
| **Per-starter** | C# → .NET SDK, C++ → CMake & compiler, Unity → Unity Editor, etc. See each kit README |
| **IDL** | `.thrift` / `.deuk` files — included in the kit or as submodules |

**DeukPackKits** provides `npm run check-env` to verify Node (≥16) and npm automatically; `npm run init` or `npm run bootstrap` (same as setup) runs the same check first. If requirements are not met, an **OS-specific** install guide is shown.

**OS-specific initial setup**: Only Node/npm installation varies by OS; after that, `npm run check-env` / `npm run init` are the same.  
- **Windows**: nodejs.org or `winget install OpenJS.NodeJS.LTS`  
- **macOS**: nodejs.org or `brew install node`  
- **Linux**: nodejs.org or distro package

After setup, run `npm install` → codegen → build from the **project (repo) root**.

### Recommended approach: per-starter independence

**We recommend treating each starter as "one project = one repository" and installing DeukPack inside that repo.**  
Copy only the starter you want into a new repo, then run `npm install deukpack` → codegen → build/run from **that repo root**.

**Use the unified repo (full DeukPackKits clone) only** when you want all starters together; in that case, run initialization from the root.

**Basic flow after cloning**

```bash
git clone <repo URL below>
cd <project folder>
# 1) Verify Node.js / npm prerequisites
# 2) npm install (or npm install deukpack) in the repo
# 3) Follow kit README → codegen → build
```

### DeukPackKits one-time initialization (after cloning the unified repo)

After cloning the full [DeukPackKits](https://github.com/joygram/DeukPackKits), run the following **once** — it will attempt to install Node if missing, then initialize:

```bash
git clone https://github.com/joygram/DeukPackKits.git
cd DeukPackKits
```

**One-shot init — Linux / macOS**

```bash
./scripts/bootstrap.sh
```

**Windows (cmd)**

```bat
scripts\bootstrap.cmd
```

- **bootstrap.sh / bootstrap.cmd:** runs setup when Node exists; otherwise tries nvm, winget, or Docker first.

**Node already installed — interactive setup** (registry vs sibling source, R vs K)

```bash
npm run init
```

(Same: `node scripts/setup.js`, `npm run bootstrap`)

**Non-interactive / CI — defaults**

```bash
npm run init -- --skip-prompt
```

**Non-interactive — source + per-kit (env)**

```bash
export DEUKPACK_BOOTSTRAP_CHANNEL=source
export DEUKPACK_KIT_RUNTIME=per-kit
export DEUKPACK_SRC=../DeukPack
npm run init -- --skip-prompt
```

**Non-interactive — flags only**

```bash
npm run init -- --use-source --kit-runtime=per-kit --skip-prompt
```

**Core-dev shortcut**

```bash
npm run bootstrap:dev
```

**Relink source only**

```bash
npm run install:from-source
```

**Version + C# DLL check**

```bash
npm run check-env -- --versions
```

**Then:** open a room under **`StarterKit/…`** and follow its README. Example:

```bash
cd StarterKit/csharp/prologue
npx deukpack _deuk_define/csharp.deuk generated -I _deuk_define --csharp
```

- **Copying one starter** into its own repo — from **that** project root:

```bash
npm install deukpack
```

Then paste the `npx deukpack …` line from that kit’s README.

Details: [DeukPackKits README](https://github.com/joygram/DeukPackKits/blob/main/README.md).

---

## Unity

**For** teams that want to use **C# types and protocol** generated by DeukPack in the client/editor.

**Includes (examples)**  

- Sample IDL → codegen script (or documented `npx deukpack` commands)  
- Paths and asmdef guidance for placing generated code in a Unity project  
- (Optional) minimal send/receive/load demo  

**Requirements**  

- Unity Editor version (LTS recommended) — specified in README  
- .NET / Player settings summary  

| | |
|--|--|
| **Repository (HTTPS)** | `TBD` — will be updated to `https://github.com/joygram/DeukPack.git` or a dedicated starter repo |
| **Clone** | `git clone TBD_URL` |
| **Docs** | Repo root `README.md` → prerequisites → generate → open in Unity |

---

## C++

**For** teams that want to quickly validate **IDL → C++ headers/sources** for servers or toolchains.

**Includes (examples)**  

- Minimal CMake (or team-standard build) target to compile generated artifacts  
- Include paths, C++17, etc. specified in README  

**Requirements**  

- CMake, MSVC / GCC / Clang  

| | |
|--|--|
| **Repository** | `TBD` |
| **Clone** | `git clone TBD_URL` |
| **Docs** | `README.md` → codegen → `cmake --build` |

---

## Network (client + server)

**For** teams that want to wire a minimal **echo/ping** level with the **same IDL** on both C# and C++ (or any language combination).

**Includes (examples)**  

- One shared IDL  
- Server start, client connect, one or two message round-trips  

**Requirements**  

- Depends on kit: Unity + server binary, or console client/server only  

| | |
|--|--|
| **Repository** | `TBD` |
| **Clone** | `git clone TBD_URL` |
| **Docs** | `README.md` — port, protocol (binary/compact), execution order |

---

## Fan-out & per-recipient fields (messenger pattern)

**For** chat, push, or any flow where **one in-memory message** goes to **many recipients** and only **a few fields** differ (display name, read flag, locale).

**Built into codegen** (no IDL change):

- **C#**: `Write(oprot, fieldIds, overrides?)` on every struct — see [Unified Write tutorial](tutorial/write-with-overrides.md) and [API reference](reference/api.md).
- **JavaScript** (`--js`): `toJson` / `toBinary` (and pack helpers) with `(obj, fieldIds, overrides)` on each struct helper in `generated_deuk.js`.
- **C++**: **`kFieldId_*`** constants and the generated pack/binary write path next to each struct (same field-ID model as C#/JS).

**Kit sample authors**: in send loops, prefer **`Write(oprot, null, overrides)`** + a small overrides map per recipient instead of **Clone()** per user. Full spec: [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## TypeScript / Node

**For** teams using **CLI codegen** or **parsing API** in BFF, internal tools, or **AI agent** scripts.

**Includes (examples)**  

- `package.json` + codegen npm script  
- (Optional) TS sample using `DeukPackCodec` parsing only  
- Example of running `npx deukpack` in CI  

**Requirements**  

- Node 18+  

| | |
|--|--|
| **Repository** | `TBD` |
| **Clone** | `git clone TBD_URL` |
| **Docs** | `README.md` → `npm install` → `npm run codegen` |

---

## Web App (deukpack-webapp)

**Status**: To be added to the kits lineup.

**Location**: [`starters/deukpack-webapp/`](https://github.com/joygram/DeukPackKits/tree/main/starters/deukpack-webapp) folder in the [DeukPackKits](https://github.com/joygram/DeukPackKits) repository. Clone the unified repo, then navigate to that path.

**For** teams that need a **ready-to-use** base for building **web apps with DeukPack**: Next.js (TS) frontend + C# REST API backend, microservice-style.

**Included features**  

- **Authentication** (login / logout)  
- **Sign-up**, user profile view / edit  
- Next.js (TypeScript) FE + C# REST API BE — **currently** OpenAPI (Orval/NSwag) codegen for type/DTO alignment, **planned** to unify under DeukPack schema/codegen  
- Admin / dashboard are separate (security / role separation recommended)

**What the included features enable**

| Feature | What it enables | Practical value |
|---------|-----------------|-----------------|
| **Authentication** | Session management, API access control, login/logout flow | ✅ Required by most web apps. Ready to use. |
| **Sign-up** | New user registration, terms / validation flow | ✅ Core requirement for production services. |
| **User profile** | View / edit my info, profile | ✅ Core requirement for production services. |
| **Next.js + C# REST** | Same schema for FE/BE type/DTO alignment; one codegen updates both sides | ✅ Key value when adopting DeukPack. Immediately useful after schema setup. |
| **Separate admin** | Separate admin app/domain for management features | ✅ Recommended for security and operations. Useful during design. |

**Is it useful when AI agents are involved?**

- **Agents are good at**: Spec drafts, API design suggestions, business logic and code generation.  
- **Agents struggle with**: Deterministic type/wire layouts, FE/BE and multi-language simultaneous alignment, build reproducibility, and end-to-end flows like sessions and auth working out of the box.  
- **What this kit does**: Provides **working base flows** (auth, sign-up, profile) and **DeukPack schema/codegen** so that "agent-generated specs → same types/contracts in code" just works.  
- **Summary**: Use agents for spec/logic generation; this kit handles **actual type/API/runtime alignment** and **ready-to-use auth/user flows**, making it **useful even alongside AI agents**.

**Requirements**  

- Node 18+, .NET (specified in kit README), (optional) Docker  

| | |
|--|--|
| **Repository** | [joygram/DeukPackKits](https://github.com/joygram/DeukPackKits) — path `starters/deukpack-webapp/` |
| **Clone** | `git clone https://github.com/joygram/DeukPackKits.git` then `cd DeukPackKits/starters/deukpack-webapp` |
| **Docs** | [`README-FRAMEWORK.md`](https://github.com/joygram/DeukPackKits/blob/main/starters/deukpack-webapp/README-FRAMEWORK.md) in the folder — pnpm, `codegen:all`, web & backend run order |

---

## Java

**For** teams aligning **Protobuf / legacy** contracts with JVM services and preparing for future DeukPack Java emit/integration.

**Includes (examples)**  

- v1 baseline: **Field ID / wire alignment** guide with existing **Apache Thrift Java** or similar stacks  
- **Contract checklist** for teams sharing the same IDL with C# / C++  

**Requirements**  

- JDK, (per guide) Protobuf/Thrift compilation or existing artifacts  

| | |
|--|--|
| **Repository** | `TBD` |
| **Clone** | `git clone TBD_URL` |
| **Docs** | `README.md` — procedure for **byte compatibility** with types generated by DeukPack |

---

## At a glance (clone URLs)

| Kit | Repository URL | Status |
|-----|----------------|--------|
| Unity | *See table above* | Updated when ready |
| C++ | *See above* | Updated when ready |
| Network | *See above* | Updated when ready |
| TypeScript / Node | *See above* | Updated when ready |
| **Web App** (deukpack-webapp) | [DeukPackKits/starters/deukpack-webapp](https://github.com/joygram/DeukPackKits/tree/main/starters/deukpack-webapp) | Planned |
| Java | *See above* | Updated when ready |

---

## Starting with core only

- **Minimal codegen smoke test**: [examples](https://github.com/joygram/DeukPack/tree/main/examples)  
- **CI / pipeline docs**: [DEUKPACK_CI_CD_AND_DEV_PIPELINE.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_CI_CD_AND_DEV_PIPELINE.md)  
- **Lineup policy (internal)**: [DEUKPACK_STARTER_KITS_LINEUP.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_STARTER_KITS_LINEUP.md)

---

## Related

- [Tutorial · Quick start](tutorial/quickstart.md)
- [Products overview](products/index.md)
