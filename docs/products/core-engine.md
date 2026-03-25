# DeukPack Core · Engine

**One-liner**: Centered on the **DeukPack native IDL (.deuk)**, provides **parsing, AST, code generation, schema, and meta** in a single engine. Outputs C#, C++, TS, JS; Protobuf, OpenAPI, CSV, and legacy .thrift are **inputs to the same pipeline**.

--8<-- "_includes/product-notices-landing-core-engine.md"

---

## Core differentiators

| Area | What DeukPack offers |
|------|----------------------|
| **Inheritance** | **Struct extends** — multi-level inheritance, parent fields merged at codegen; wire-compatible, no duplicate field IDs. |
| **Data types** | **Primitives**: bool, byte, int8–int64, float, double, string, binary; **containers**: list, set, map; **tablelink** (DB/table row reference); datetime, decimal. Same type set across C#, C++, TS, JS. |
| **DB model** | SQLite DDL from AST; EF-ready attributes and codegen; table/container in IDL for meta and row types. |

---

## Use the core now { #use-core }

The DeukPack **core** is **free (Apache-2.0)** and **ready to install**. CLI, codegen, and C# runtime are available from a single npm package.

### Install & run (one-liner)

| Channel | Link | Use case |
|---------|------|----------|
| **npm** | [deukpack](https://www.npmjs.com/package/deukpack) | `npm install deukpack` / `npx deukpack` — distribution only |
| **GitHub** | [joygram/DeukPack](https://github.com/joygram/DeukPack) | Source, issues, contributions, releases. Clone & local build |

```bash
# Add to project
npm install deukpack

# Run CLI codegen (without installing)
npx deukpack ./idl/root.deuk ./gen --csharp --cpp --js -I ./idl
```

### More on this site

| Document | Content |
|----------|---------|
| [Install (Windows · Linux)](../tutorial/install-os.md) | Node install, distribution (npm) / .tgz install |
| [Quick start](../tutorial/quickstart.md) | Step-by-step: one IDL → C#, C++, TS generation |
| [IDL guide](../tutorial/idl-guide.md) | .deuk / .thrift syntax, namespaces |
| [C# guide](../tutorial/csharp-guide.md) | C# generated code, protocol, references |
| [C++ guide](../tutorial/cpp-guide.md) | C++ build, include, execution |
| [Pipeline guide](../tutorial/pipeline-guide.md) | Multiple jobs, config JSON |
| [Kits lineup](../deukpack-kits.md) | Unity, C++, Console, EF, TS, etc. |
| [Documentation](../documentation-index.md) | Korean / English document locations |

### GitHub repository

| Document | Content |
|----------|---------|
| [Distribution vs source](../tutorial/distribution-vs-source.md) | npm usage vs clone & build (this site) |
| [README (Korean)](https://github.com/joygram/DeukPack/blob/main/README.ko.md) | Repo entry / summary |
| [Release docs index](https://github.com/joygram/DeukPack/blob/main/docs/RELEASE_DOCS_INDEX.md) | Distribution / user doc index |

---

## Core library summary

- **Official OSS**: [github.com/joygram/DeukPack](https://github.com/joygram/DeukPack) — source, README, issues, contributions, releases. See the repo README and RELEASING for clone, local build, and contribution.
- **C# / Unity**: Reference the npm package's `dist/csharp` runtime or see the [kits lineup](../deukpack-kits.md) samples.

---

## What you get

- **Memory**: No need to load everything into memory — SQLite, streaming, and (optional) zero-copy enable large-scale, low-memory configurations. Buffer reuse and minimal reflection keep runtime allocations small.
- **Performance**: Parsing and code generation are orders of magnitude faster even for large IDL sets. Runtime serialization/deserialization targets ~10× faster throughput.
- **Convenience**: One definition, one build aligns code, meta, DB, and validation. Absorb existing .proto, OpenAPI, CSV, .thrift **into DeukPack**.
- **Extensibility**: Multiple files and namespaces, simultaneous C# / C++ / TS / JS generation. Extend schema, code, DB, and Excel from a single source.

---

## Alongside existing definitions & specs

- **.deuk** first; **Protobuf and .thrift** can be mixed in the same AST.
- **OpenAPI 3.x, JSON Schema, and CSV** import bring existing specs into the AST, handling code, meta, and tables in one toolchain.
- Import .proto and .thrift files as-is for gradual integration.

---

## Features

| Category | Content |
|----------|---------|
| **IDL input** | **Deuk (.deuk)**, Protobuf (.proto), .thrift parsing. Mixable in one build. |
| **Schema import** | OpenAPI 3.x → AST, JSON Schema → AST, CSV → AST (schema inference). |
| **Code generation** | C#, C++, TypeScript, JavaScript. GetSchema(), ProtocolRegistry, MetaTableRegistry, etc. |
| **Database** | SQLite: AST → DDL + C# access code. EF-ready codegen. |
| **Inheritance** | Struct `extends` — multi-level, wire-compatible; parent fields merged into child at codegen. |
| **Type system** | float, double, int8–int64, bool, string, binary, list/set/map, tablelink, datetime, decimal — consistent across languages. |

One definition yields multi-language, multi-output simultaneous generation with fast builds, and existing definitions can be reused as-is.
