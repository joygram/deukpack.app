!!! tip "Recent notices (this product line)"
    **2026-03-25** — 1.2.3 — init flow, bootstrap, VSIX order, Antigravity

    - **init**: fewer prompts; bootstrap always; `--skip-workspace` removed.
    - **VSIX**: after bootstrap; auto-install `code`→`cursor`→`antigravity`.
    - **Docs**: `npx` vs `npm deukpack`.

    **2026-03-24** — 1.2.2 — pipeline all-deuk scan, output paths, ts/js dirs

    - **Pipeline**: `defineScope: all` (default), `exclude`, short-lived bundle entry.
    - **Output**: omit `outputDir` → same as `defineRoot`; default subdirs `csharp`/`cpp`/`ts`/`js`; rename via `outputLangSubdirs`.
    - **init / docs / examples**: defaults and paths aligned.

    **2026-03-24** — 1.2.1 — README, pipeline warning, VSIX auto on version bump

    - **README**: local install code blocks; drop global `-g` from guide; **DeukPack Tale** label for kits.
    - **CLI**: warn on one-shot runs when default pipeline JSON is missing; nudge **`npx deukpack init`**.
    - **init/bootstrap/VSIX**: auto VSIX attempt on npm version mismatch; Unity-aware prompts; non-interactive ensure.

    **2026-03-23** — 1.2.0 — bundled VSIX, npm wire, Unity integration docs

    - **VS Code extension**: npm tarball ships **`bundled/deuk-idl.vsix`**; **postinstall**, **bootstrap**, and **`sync-to-oss --build`** wired (`bundled/README.md`).
    - **npm**: `serialize` / `deserialize` use `WireExtras` / `WireDeserializeExtras` (legacy overload removed).
    - **TypeScript wire**: `BinaryReader`, `wireTags`, `SerializationWarnings`; Deuk native and interop protocols stay paired.
    - **Docs & layout**: Unity UPM / `clientDeukDefinePath` aligned with release scope (§0.1).
    - **Codegen & CI**: C++/TS/JS templates and Deuk-oriented JS schema labeling; C# protocol CI stabilized.
