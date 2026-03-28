## Product-line notices (newest first)

### 2026-03-28 — Core · engine · Extension · Pipeline · Unity

**1.2.6 — schema strings, C# codegen, C++ CI, verify**

- **Schema**: DeukPack **`type`** strings; **JSON wire** keys (`i32`, `tf`, …) unchanged.
- **C#**: **`DpSchemaType`** **`Int16`/`Int32`/`Int64`**, codegen property defaults.
- **CI**: C++ **`ctest`** on Ubuntu and Windows.
- **Tooling**: **`npm run verify`**.

---

### 2026-03-27 — Core · engine · Extension · Pipeline · Unity

**1.2.5 — npm/GitHub index alignment, C# CS8767**

- **Package `index`**: same public API on **npm** and **GitHub** (`serialize`/`deserialize`, interop, `packStructWire`, etc.). Excel-only protocol not in the open-source tree.
- **C#**: **`WriteString`/`WriteBinary`** nullable on protocol impls; **`DpMetaInfosWrapper.TryGetValue`** **`[MaybeNullWhen(false)]`** (CS8767).

---

### 2026-03-26 — Core · engine · Extension · Pipeline · Unity

**1.2.4 — GitHub README links, deps, Node 18, audit**

- **README (GitHub)**: documentation links point to **deukpack.app**.
- **Dependencies**: Jest 30, protobufjs 8, node-addon-api 8, yaml/nan, rimraf 6, cmake-js 8, node-gyp 12, etc.
- **Security / runtime**: **`npm audit fix`** (minimatch); **`engines`** and setup minimum **Node 18**.

---

### 2026-03-25 — Core · engine · Extension · Pipeline · Unity

**1.2.3 — init flow, bootstrap, VSIX order, Antigravity**

- **init**: fewer prompts; bootstrap always; `--skip-workspace` removed.
- **VSIX**: after bootstrap; auto-install `code`→`cursor`→`antigravity`.
- **Docs**: `npx` vs `npm deukpack`.

---

### 2026-03-24 — Core · engine · Extension · Pipeline · Unity

**1.2.2 — pipeline all-deuk scan, output paths, ts/js dirs**

- **Pipeline**: `defineScope: all` (default), `exclude`, short-lived bundle entry.
- **Output**: omit `outputDir` → same as `defineRoot`; default subdirs `csharp`/`cpp`/`ts`/`js`; rename via `outputLangSubdirs`.
- **init / docs / examples**: defaults and paths aligned.

---

### 2026-03-24 — Core · engine · Extension · Pipeline · Unity

**1.2.1 — README, pipeline warning, VSIX auto on version bump**

- **README**: local install code blocks; drop global `-g` from guide; **DeukPack Tale** label for kits.
- **CLI**: warn on one-shot runs when default pipeline JSON is missing; nudge **`npx deukpack init`**.
- **init/bootstrap/VSIX**: auto VSIX attempt on npm version mismatch; Unity-aware prompts; non-interactive ensure.

---

### 2026-03-23 — Core · engine · Protocol · Pipeline · Unity · Extension

**1.2.0 — bundled VSIX, npm wire, Unity integration docs**

- **VS Code extension**: npm tarball ships **`bundled/deuk-idl.vsix`**; **postinstall** and **bootstrap** wired (`bundled/README.md`).
- **npm**: `serialize` / `deserialize` use `WireExtras` / `WireDeserializeExtras` (legacy overload removed).
- **TypeScript wire**: `BinaryReader`, `wireTags`, `SerializationWarnings`; Deuk native and interop protocols stay paired.
- **Docs**: Unity UPM integration documented on **deukpack.app**.
- **Codegen & CI**: C++/TS/JS templates and schema labeling; C# protocol CI stabilized.

---

### 2026-03-20 — Core · engine

**1.1.0 — C++ uint types, legacy message block, CLI**

- **C++ (`--cpp`)**: `uint8` … → `<cstdint>` aliases.
- **IDL**: legacy Thrift-style `message { … }` blocks.
- **CLI**: delegates to `scripts/build_deukpack.js`.

---
