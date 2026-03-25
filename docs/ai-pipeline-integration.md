# AI & Agent Pipeline Integration

This document describes **where DeukPack fits** in a workflow where AI agents **generate code and specs**.  
When dividing responsibilities with an agent, it shows the **integration points** for letting DeukPack handle **schemas and contracts**.

---

## 1. What agents cannot do (or struggle with)

Agents are strong at **spec drafts, business logic, and code sketches**, but the following are **hard to guarantee** or **hard to get right in one pass**. These are safer when handled by a **dedicated tool (DeukPack)**.

| What agents struggle with | Why |
|---------------------------|-----|
| **Deterministic output** | Hard to guarantee **identical code and byte layout** for the same schema every run. Field order, names, and style may vary. |
| **Wire / protocol compatibility** | Maintaining **byte compatibility** with standards like **Protobuf, Binary/Compact** requires spec-conformant serialization. Agent-generated serialization may produce mismatched field IDs and encodings. |
| **Multi-language / multi-platform simultaneous alignment** | Generating types from the **same schema** for C#, C++, TypeScript, Unity, and server is better done by a **single pipeline**. Generating per-language with agents risks field omissions and type mismatches. |
| **Build / CI reproducibility** | **Same IDL → same artifacts** is required for stable build caches and CI. Agent output is not reproducible, causing "same schema but different build results." |
| **Runtime schema & validation** | Exposing schema metadata at runtime via `GetSchema()` — for validation, documentation, and agent context — is most reliable when codegen and runtime library are a matched set. Agent-only code tends to scatter metadata and versions. |
| **Alignment with legacy / existing specs** | Matching **field IDs and bytes** against running Protobuf, OpenAPI, or legacy specs is best verified by a **codegen tool (DeukPack)**. Agents cannot reliably guarantee byte compatibility. |

→ **Summary**: Agents excel at "what to send (spec drafts)." **"Which bytes, which types, which language to emit"** is safer with a **deterministic tool**. That is why **DeukPack is needed**.

---

## 2. Why it matters (reinforced)

- A **layer that locks contracts and schemas into "one definition → deterministic multi-output"** lets agents generate **only logic** based on those results, reducing hallucination and inconsistency.
- Even if agents **create or modify** schemas, turning them into **executable types, serialization, and multi-language code** is safer with a **dedicated tool (DeukPack)**. Agents just call the tool.
- **Matching existing systems (Protobuf, servers, Unity clients, meta tables) at the byte and type level** requires "same schema → same generation rules." An **IDL → codegen pipeline (DeukPack)** handles this safely.

---

## 3. Role separation — agent vs DeukPack

| Actor | Responsibility |
|-------|---------------|
| **Agent (AI)** | Natural language / requirements → spec / schema **drafts**, business logic, code generation. Output may vary between runs. |
| **DeukPack** | **Schema / IDL** → **deterministic** code, serialization, validation. Same input always produces same output. |

→ Even if agents **generate or modify schema/IDL**, having DeukPack **turn that into executable types, serialization, and multi-language code** reduces agent hallucination and inconsistency. DeukPack handles what §1 describes, and agents focus on spec drafts and logic.

---

## 4. Integration points in AI pipelines

### 4.1 Input — agent output as DeukPack input

| Integration point | Description |
|-------------------|-------------|
| **.deuk / .proto / .thrift files** | Pass agent-generated/modified IDL to DeukPack. Parsing, AST, and codegen are performed by DeukPack. |
| **OpenAPI / JSON Schema** | Import agent-created OpenAPI specs or JSON Schemas into the DeukPack AST via **import**, then generate C# / C++ / TS in the same pipeline. |
| **Schema JSON** | (Depending on implementation) Feed **schema objects or JSON** directly for code and serialization generation. |

### 4.2 Invocation — agents using DeukPack as a tool

| Method | Description |
|--------|-------------|
| **Node / TypeScript API** | `import { DeukPack } from 'deukpack'` then call `parseFiles()`, `generateCode()`, etc. Used in **agent-controlled scripts**. |
| **CLI / build scripts** | Agents **invoke** project-integrated **build scripts**. (Agent = orchestration, DeukPack = execution.) |
| **Future HTTP / API** | If an IDL / codegen SaaS edition provides a **REST API** ("upload file → generate code"), agents integrate via **HTTP calls**. |

### 4.3 Output — what DeukPack produces

| Output | Use in agent pipeline |
|--------|----------------------|
| **Generated code** (C# / C++ / TS / JS) | Agents generate **only the logic that uses these types**. Serialization and type definitions are fixed by DeukPack. |
| **GetSchema() / schema meta** | Read schema at runtime for **validation, documentation, and passing context back to agents**. |
| **Serialization / deserialization** | Consistent format (binary, JSON, etc.) for message exchange. Agent-generated "logic" simply uses this format. |

---

## 5. Summary — at a glance

| Area | Content |
|------|---------|
| **Input** | Agent-produced **.deuk / .proto / .thrift / OpenAPI / JSON Schema** → DeukPack **parse / import** → AST. |
| **Invocation** | **Node API** (`DeukPack` instance) or **CLI / build scripts**. (Future REST API possible.) |
| **Output** | **Deterministic code, serialization, GetSchema()** → agents generate "logic using these types/schemas" only. |
| **Value** | Contracts, types, and serialization are **locked in one place (DeukPack)** → agents focus on **business logic and spec drafts**. |

---

## 6. Related

- [AI coding tools integration guide](ai-ide-tools-guide.md) — Antigravity · Cursor · GitHub Copilot · ChatGPT (Codex) + GitHub
- [Core · engine](products/core-engine.md) — Engine and codegen overview
- [Positioning](positioning.md) — Target and position
- [Tutorial · Quick start](tutorial/quickstart.md)
- npm package: [deukpack](https://www.npmjs.com/package/deukpack)
