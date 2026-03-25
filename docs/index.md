---
hide:
  - toc
---

--8<-- "_includes/deukpack-release-notice.md"


<div class="dp-hero">
  <div class="dp-hero-visual">
    <img src="/assets/deukpack-brand-concept-01.png" alt="DeukPack brand concept - a dog carrying data packs" loading="eager" decoding="async" />
  </div>
  <div class="dp-hero-copy">
    <p class="dp-eyebrow">DeukPack — Brand Concept</p>
    <h1>Pack the gains,<br>ship the code</h1>
    <p class="dp-tagline">Free · Open · Ready-to-use core</p>
    <p class="dp-lead"><strong>Free</strong>, <strong>open</strong>, and <strong>ready to use</strong> — the core is available now.<br><br><strong>DeukPack</strong> is a <strong>standalone product</strong> that handles <strong>native IDL (.deuk)</strong>, <strong>code generation, serialization, protocol, and schema metadata</strong> in a single engine.<br><br>Protobuf, OpenAPI, CSV, DB, legacy .thrift, etc. are just <strong>inputs to the same pipeline</strong>. It's more than a "Thrift replacement."<br><br>Servers, real-time games, and internal tools can all share the <strong>same contract</strong>.</p>
    <div class="dp-pills">
      <span class="dp-pill">Free · Apache-2.0 · Ready to use</span>
      <span class="dp-pill">IDL + Schema</span>
      <span class="dp-pill">Protocol + Runtime</span>
      <span class="dp-pill">Schema · Metadata pipeline</span>
      <span class="dp-pill">AI · Agent pipeline integration</span>
    </div>
    <p class="dp-actions">
      <a href="products/core-engine/#use-core" class="md-button md-button--primary">Use the core now</a>
      <a href="products/" class="md-button">Products overview</a>
      <a href="deukpack-kits/" class="md-button">DeukPack kits lineup</a>
      <a href="positioning/" class="md-button">Positioning</a>
    </p>
  </div>
</div>

!!! tip "Language switcher (한국어 ↔ English)"
    - **Korean:** Site root. **English:** **`/en/…`** prefix.
    - **Switcher:** Top-right **language** menu.
    - **GitHub README:** [README.md](https://github.com/joygram/DeukPack/blob/main/README.md) · [README.ko.md](https://github.com/joygram/DeukPack/blob/main/README.ko.md).

---

## Product lineup

| Product | Core role |
|---------|-----------|
| **DeukPack Core · Engine** | **Apache-2.0**, **ready to use**. .deuk-centric IDL, AST, codegen, schema · metadata. **Differentiators:** struct inheritance (extends), rich types (float, DB model, tablelink). Multi-input: Protobuf, OpenAPI, CSV, JSON, DB, .thrift, etc. |
| **DeukPack Protocol** | Binary/Compact/JSON serialization, msgId · ProtocolRegistry, zero-copy option. |
| **DeukPack Excel Add-in** | Schema-based metadata editing (headers, validation, diff) in Excel and spreadsheets. |
| **DeukPack Pipeline · Unity** | Definition · metadata → code · schema · tables → Unity/server validation · loading. Same schema for server and real-time game integration. |
| **DeukNavigation** | Unity/server shared Deuk wire (.dpk) based Recast/Detour NavMesh. DeukNavRuntime, CrowdContext, DeukNavAgent, baking, DeukNaviTool. |
| **Extension products** | Deuk UI, editor tools, EF, DB migrator, Google Sheets, Unreal/Elixir, etc. |

→ See the [Architecture diagram](architecture.md) for data/schema flow between products. Details in [Products overview](products/index.md) and each product page. **Stack-specific ready-to-use examples** in [DeukPack kits lineup](deukpack-kits.md).

---

## About this page

**deukpack.app** is the **canonical source** for DeukPack **brand, products, tutorials, and reference**.

The **free, open-source core** is available on npm and [**GitHub (joygram/DeukPack)**](https://github.com/joygram/DeukPack).

For **hands-on labs** or the **"Ruins of the Beginning" saga journey**, go to **[kits.deukpack.app](https://kits.deukpack.app/en/)**. The repo README, this site, and the kits site show **the same product at different depths**. See [Documentation index](documentation-index.md) for the relationship table.

**To use the core now**, click **"Use the core now"** above or go to [Core · engine](products/core-engine.md). That page links to **install/CLI**, this site's **install/quickstart/IDL/C#/C++/pipeline/kits lineup**, and **GitHub** (README, releases).

Source, issues, and contributions: [GitHub repository](https://github.com/joygram/DeukPack). Linking and citation are free for both commercial and non-commercial use.

---

## Why DeukPack

<div class="dp-value-grid">
  <div class="dp-card">
    <h3>Define once</h3>
    <p>One schema definition aligns code, serialization, metadata, and validation. Existing .proto, OpenAPI, CSV, etc. can be pulled in and <strong>progressively unified in the DeukPack pipeline</strong>.</p>
  </div>
  <div class="dp-card">
    <h3>Runtime · Server · Real-time game</h3>
    <p>Binary, Compact, JSON serialization with <code>msgId</code> and <code>ProtocolRegistry</code> message handling. Same types and schema for packets and metadata across server and real-time game integration.</p>
  </div>
  <div class="dp-card">
    <h3>Faster metadata work</h3>
    <p>Schema-based metadata editing and validation flow straight into the Unity/server load pipeline — structured around real workflows.</p>
  </div>
  <div class="dp-card">
    <h3>Tables · Native messages</h3>
    <p>Schema-based <code>MetaTableRegistry</code> for metadata validation and loading. <code>msgId</code> · <code>ProtocolRegistry</code> auto-generated from IDL.</p>
  </div>
  <div class="dp-card">
    <h3>Inheritance · Selection · Override</h3>
    <p><code>extends</code> for field merging, single <code>Write</code> for field selection and override. Per-recipient serialization without Clone.</p>
  </div>
  <div class="dp-card">
    <h3>Rich types</h3>
    <p><strong>tablelink</strong>, datetime, decimal, and more — one type system from DB models to metadata. <a href="tutorial/write-with-overrides/">Tutorial →</a></p>
  </div>
  <div class="dp-card dp-card--highlight dp-card--ai">
    <h3>Why it matters in the AI era</h3>
    <p>Agents are strong at <strong>spec drafts and logic</strong>, but <strong>deterministic output, wire compatibility, multi-language consistency, and build reproducibility</strong> are hard to guarantee. DeukPack handles that. With the schema as a single source, <strong>same input → same code/serialization</strong> — agents create specs and logic; DeukPack turns them into "executable types and pipelines."</p>
    <p><a href="ai-pipeline-integration.md">What agents can't do · Integration summary →</a></p>
  </div>
</div>

- **IDL · Definition**: **.deuk** native; Protobuf and legacy .thrift parsing. OpenAPI, JSON Schema, CSV, DB import for mixed builds. **struct extends**: define common fields in parent once, children add only unique fields (multi-level inheritance, field ID conflict checks).
- **Protocol · Serialization**: Binary, Compact, JSON. Zero-copy (optional). `msgId` · `ProtocolRegistry` **native message handling** — message ID and dispatch auto-generated from IDL declarations.
- **Code generation**: C#, C++, TypeScript, JavaScript. SQLite DDL and access code. All structs get **FieldId constants** (no magic numbers, compile-time safety).
- **Selection · Override · Projection**: **`Write(oprot, fieldIds, overrides?)`** (per-recipient value override, field subset serialization from the same instance), **Wire Profile** (build-time subset types by profile). Combine for fan-out, partial transfer, DTO separation.
- **Tables · Metadata**: Schema-based metadata editing, validation, diff (Excel add-in). Single key, composite key. `MetaTableRegistry` for runtime table loading and validation.
- **Pipeline · Integration**: Definition · metadata → code · schema · tables → Unity/server validation · loading. Same schema and protocol for server and real-time game integration.

---

## Why DeukPack matters in the AI era

### What agents can't do (or struggle with)

Agents are strong at spec drafts and business logic, but the following are **hard to guarantee or get right in one shot**. It's safer to let **DeukPack** handle these.

| Hard for agents | Why |
|-----------------|-----|
| **Deterministic output** | Hard to guarantee **identical code and byte layout** for the same schema across runs. |
| **Wire · Protocol** | When bytes must match **DeukPack's spec**, agents easily produce different encodings each time. |
| **Multi-language/platform consistency** | To use **types from the same schema** in C#, C++, TS, Unity, and server, a one-definition multi-output pipeline is better. |
| **Build · CI reproducibility** | **Same IDL → same artifacts** is needed for stable build cache and CI. Agent output is not reproducible. |
| **Legacy · Existing specs** | Matching **field IDs and bytes** with existing .proto or wire specs is better left to a **codegen tool (DeukPack)**. |

### Why you need DeukPack

- **Locking contracts/schemas with "define once → deterministic multi-output"** lets agents generate **only logic** on top of the **resulting types/schemas**, reducing inconsistencies.
- **Integration point**: Pass agent-generated **.deuk, .proto, .thrift, OpenAPI** as **DeukPack input** and generate code/types/serialization via CLI. Agents just write "logic using those types."
- Even if agents **create or modify schemas**, converting them to **"executable types, serialization, multi-language code"** is safer with a **dedicated tool (DeukPack)**. Agents call that tool as a **tool**.

→ Details: [What agents can't do · AI pipeline integration](ai-pipeline-integration.md)

---

## Next steps

- [**Use the core library**](products/core-engine/#use-core) — npm/GitHub links, install/CLI/tutorials for immediate use
- [**DeukPack kits lineup**](deukpack-kits.md) — stack-specific samples, repo links, ready-to-use examples
- [Products overview](products/index.md) — roles and scope of each product
- [Architecture diagram](architecture.md) — product relationships and data flow
- [Tutorial](tutorial/index.md) — quick start and step-by-step guides
- [Reference guide](reference/index.md) — API and type reference
- [Positioning](positioning.md) — target and position
- [License · Pricing · Support](license.md) — terms, pricing, and how to support development (PayPal, Ko-fi)
