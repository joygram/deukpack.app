!!! tip "Recent notices (this product line)"
    **2026-04-01** — 1.6.0 — JS JIT Codegen, C# Zero-Alloc architecture

    - **JavaScript**: Introduced V8 JIT inline optimization using pre-compiled `_readPack` (250% speed boost & GC defense).
    - **C# / Unity**: Achieved literal zero (0) heap allocation via Value Type encapsulation and structural statically-allocated lambdas.
    - **Benchmark**: Provided cross-language, comprehensive memory and parsing latency matrices.
    - **Roadmap**: Elixir (Erlang BEAM) support officially promoted to the v1.7.0 minor release.

    **2026-03-30** — 1.5.0 — Java parity, MCP decoupling, security guards

    - **Java**: Added support for `extends` (inheritance), `TCompact`, and `TJSON` protocols.
    - **Architecture**: Decoupled MCP server logic into a standalone `DeukPackMcp` plugin.
    - **Security**: Implemented `MAX_SAFE_LENGTH` and `MAX_RECURSION_DEPTH` guards across all language runtimes.
    - **Docs**: Synchronized deukpack.app and repository READMEs with v1.5.0 status.

    **2026-03-23** — 1.2.0 — bundled VSIX, npm wire, Unity integration docs

    - **VS Code extension**: npm tarball ships **`bundled/deuk-idl.vsix`**; **postinstall** and **bootstrap** wired (`bundled/README.md`).
    - **npm**: `serialize` / `deserialize` use `WireExtras` / `WireDeserializeExtras` (legacy overload removed).
    - **TypeScript wire**: `BinaryReader`, `wireTags`, `SerializationWarnings`; Deuk native and interop protocols stay paired.
    - **Docs**: Unity UPM integration documented on **deukpack.app**.
    - **Codegen & CI**: C++/TS/JS templates and schema labeling; C# protocol CI stabilized.
