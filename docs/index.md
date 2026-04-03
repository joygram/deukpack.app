---
hide:
  - toc
---

<div id="dp-dynamic-notice-landing"></div>


<div class="dp-hero">
  <div class="dp-hero-visual">
    <img src="/assets/deukpack-brand-concept-01.png" alt="DeukPack brand concept - a dog carrying data packs" loading="eager" decoding="async" />
  </div>
  <div class="dp-hero-copy">
    <p class="dp-eyebrow">DeukPack — The perfect contract between AI Agents and Unity</p>
    <h1>Infinite server flexibility<br>Extreme client performance</h1>
    <p class="dp-tagline">Dynamic JS/AI Flexibility × Zero-Allocation C# Performance</p>
    <p class="dp-lead"><strong>A hybrid schema engine breaking the limits of AI agent automation.</strong><br><br>In an era where AI holds data sovereignty, DeukPack consolidates fragmented IDLs into a single 'semantic spine'. In Node.js servers, slice and dice JSON objects freely. DeukPack uses schemas (.deuk) as filters to pack only the necessary fields into the leanest, most powerful binary.<br><br>On the Unity client, this binary is instantly reassembled via <strong>Zero-Allocation C#</strong>, leaving not a single byte of garbage behind. The ultimate asymmetric compromise of flexibility and performance—this is where the DeukPack saga begins.</p>
    <div class="dp-pills">
      <span class="dp-pill">Zero-Alloc C# Parser</span>
      <span class="dp-pill">Dynamic JS/TS Masking</span>
      <span class="dp-pill">AI-Native JSON Wire</span>
      <span class="dp-pill">MCP-based AI Guardrail</span>
    </div>
    <div class="dp-actions">
      <a href="products/core-engine/" class="md-button md-button--primary">Use the core now</a>
      <a href="products/" class="md-button">Products overview</a>
      <a href="deukpack-kits/" class="md-button">DeukPack kits lineup</a>
    </div>
  </div>
</div>

!!! tip "Language switcher (한국어 ↔ English)"
    - **Korean:** Site root. **English:** **`/en/…`** prefix.
    - **Switcher:** Top-right **language** menu.
    - **GitHub README:** [README.md](https://github.com/joygram/DeukPack/blob/main/README.md) · [README.ko.md](https://github.com/joygram/DeukPack/blob/main/README.ko.md).

---

## ⚡ What it looks like (At a glance)

**1. Import OpenAPI (or write `.deuk` IDL)**
```deuk
// Feed your existing OpenAPI (Swagger) to the CLI, OR write a clean IDL:
struct Hero {
    1: int32 id;
    2: string name;
    3: float hp;
}
```

**2. Server (JS/TS): Direct POJO Serialization**
```typescript
// pack() → binary (default). pack(obj, 'json') → JSON string.
const payload = gameApi.Hero.pack({ id: 1, name: "Arthur" });
network.send(payload);
```

**3. Client (C# Unity): Zero-Alloc Read & Override Write**
```csharp
Hero cachedHero = new Hero(); // Allocated ONCE, never again

void OnNetworkMessage(byte[] inputData) {
    // Zero-Alloc Unpack — overwrites existing instance, no GC
    cachedHero.Unpack(inputData);
    Debug.Log($"Hero: {cachedHero.name}, HP: {cachedHero.hp}");

    // Pack to binary (default) and send — no new allocations
    cachedHero.hp = 99f;
    byte[] outputData = cachedHero.Pack();
}
```

---

## Product lineup

| Product | One-line Definition | Intro Doc |
|---------|----------------------|-----------|
| **DeukPack Core · Engine** | **Mixed-IDL Hybrid Serializer**: Next-gen engine that accepts any IDL and extracts both AI semantic meta and multi-lang code. | [CORE_ENGINE →](products/core-engine.md) |
| **DeukPack Protocol** | **Messaging Runtime**: Real-time communication engine providing high-performance serialization and AI guardrails. | [PROTOCOL →](products/protocol.md) |
| **DeukPack Excel Add-in** | **Schema-Driven Editor**: Excel tool for validating and syncing planning data based on schemas. | [EXCEL_ADDIN →](products/excel-addin.md) |
| **DeukPack Pipeline** | **AI-Native Pipeline**: Automated toolchain from builds to custom code generation in one command. | [PIPELINE →](products/pipeline-unity.md) |
| **DeukPackMcp** | **Universal AI Hub (Coming Soon)**: Unified bridging of .proto, .deuk, OpenAPI and more as AI skills. | [MCP_HUB →](products/mcp-hub.md) |
| **DeukNavigation** | Unity/server shared Deuk wire (.dpk) based Recast/Detour NavMesh solution. | [NAVIGATION →](products/navigation.md) |
| **Extension products** | DB migrator, EF support, Google Sheets, Unreal/Elixir, and more. | [EXTENSIONS →](products/index.md) |

→ See the [Architecture diagram](architecture.md) for data/schema flow between products. Details in [Products overview](products/index.md) and each product page. **Stack-specific ready-to-use examples** in [DeukPack kits lineup](deukpack-kits.md).

---

## About this page

**deukpack.app** is the **canonical source** for DeukPack **brand, products, tutorials, and reference**.

The **free, open-source core** is available on npm and [**GitHub (joygram/DeukPack)**](https://github.com/joygram/DeukPack).

For **hands-on labs** or the **"Ruins of the Beginning" saga journey**, go to **[kits.deukpack.app](https://kits.deukpack.app/en/)**. The repo README, this site, and the kits site show **the same product at different depths**. See [Documentation index](documentation-index.md) for the relationship table.

**To use the core now**, click **"Use the core now"** above or go to [Core · engine](products/core-engine.md). That page links to **install/CLI**, this site's **install/quickstart/IDL/C#/C++/pipeline/kits lineup**, and **GitHub** (README, releases).

Source, issues, and contributions: [GitHub repository](https://github.com/joygram/DeukPack). Linking and citation are free for both commercial and non-commercial use.

---

## 🚀 How is it different from existing tech? (Key Features)

These are the **three irreplaceable weapons of DeukPack** compared to Protobuf, FlatBuffers, and JSON.

1. **Zero-Copy Override without Allocation**
   - **Legacy limits:** Protobuf or Thrift forces you to allocate (`new`) a completely separate DTO class every time you want to mask or override specific fields for different users.
   - **DeukPack advantage:** With just ONE generated C# object, a single `Write(oprot, overrides)` function emits 100 different payload variations without generating any garbage (GC).
2. **Direct POJO Processing without Classes**
   - **Legacy limits:** Even in JS environments, they force heavy class wrappers like `new Message()` or complex offset Builder patterns like FlatBuffers.
   - **DeukPack advantage:** Simple JavaScript objects (`{ id: 1 }`) thrown by AI are immediately packed into byte arrays. **Infinitely flexible in the AI environment, flawlessly strict on the client.**
3. **'AI Semantic Spine' beyond a simple spec sheet**
   - **Legacy limits:** Traditional IDLs are merely 1-dimensional byte conversion shells for communication.
   - **DeukPack advantage:** The `.deuk` file natively supports `extends` (multi-level inheritance) and `tablelink` (DB/Meta table references). It acts as the most condensed **Knowledge Graph (RAG context)** that allows AI (LLMs) to grasp the ERD relationship of an entire project at a glance.

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
  <div class="dp-card dp-card--highlight dp-card--mcp">
    <h3>DeukPackMcp: Universal AI Hub 🚧</h3>
    <p>Seamlessly integrate <strong>.proto, .deuk, OpenAPI</strong> and <strong>ALL DeukPack products</strong> (Core, Excel, Nav, etc.) as real-time skills for AI agents. The next-gen gateway to transform your assets into AI skills.</p>
    <p><strong>🚧 COMING SOON:</strong> From Unity engine control to enterprise tool integration, all in one bridge.</p>
    <p><a href="products/mcp-hub.md">Deep dive into AI Hub Strategy →</a></p>
  </div>
  <div class="dp-card dp-card--highlight dp-card--ai">
    <h3>The Victory of Asymmetric Architecture</h3>
    <p>Agents and servers dynamically weave dozens of fields to fill a blank canvas, and the result is packed into the most powerful binary—<strong>Zero-Allocation C#</strong>—delivered to Unity without any garbage (GC). It is the <strong>perfect asymmetric compromise of flexibility and raw performance</strong>.</p>
    <ul style="font-size: 0.9em; margin-top: 10px; opacity: 0.9;">
      <li><strong>Zero-alloc Override:</strong> Completely eliminate clone-based memory garbage with a single <code>Write(oprot, overrides)</code>.</li>
      <li><strong>Pure JSON Compatibility:</strong> Flexibly assemble POJOs directly without heavy wrapper classes in JS/TS pipelines.</li>
      <li><strong>AI Knowledge Graph:</strong> The <code>.deuk</code> IDL embraces the full project ERD context via <code>tablelink</code>, transcending simple protocols.</li>
    </ul>
    <p><a href="ai-pipeline-integration.md">AI Guardrail Practical Strategy →</a> &nbsp; | &nbsp; <a href="positioning.md#irreplaceable-architecture-why-deukpack">Irreplaceable Serialization Comparison →</a></p>
  </div>
</div>

- **IDL · Definition**: **.deuk** native; Protobuf and legacy .thrift parsing. OpenAPI, JSON Schema, CSV, DB import for mixed builds. **struct extends**: define common fields in parent once, children add only unique fields (multi-level inheritance, field ID conflict checks).
- **Protocol · Serialization**: Binary, Compact, JSON. Zero-copy (optional). `msgId` · `ProtocolRegistry` **native message handling** — message ID and dispatch auto-generated from IDL declarations.
- **Code generation**: C#, C++, TypeScript, JavaScript. SQLite DDL and access code. All structs get **FieldId constants** (no magic numbers, compile-time safety).
- **Selection · Override · Projection**: **`Write(oprot, fieldIds, overrides?)`** (per-recipient value override, field subset serialization from the same instance), **Wire Profile** (build-time subset types by profile). Combine for fan-out, partial transfer, DTO separation.
- **Tables · Metadata**: Schema-based metadata editing, validation, diff (Excel add-in). Single key, composite key. `MetaTableRegistry` for runtime table loading and validation.
- **Pipeline · Integration**: Definition · metadata → code · schema · tables → Unity/server validation · loading. Same schema and protocol for server and real-time game integration.

---

## 🛡️ Security & Reliability (OOM Defense / Anti-DDoS)

As a fundamental infrastructure component that constantly parses external network byte payloads, DeukPack implements strict defense-in-depth mechanisms against **network-layer parsing vulnerabilities (OOM, Buffer Flooding, Infinite Recursion)**.

- **Universal OOM (Out-of-Memory) Defense (v1.7.0+)**: For all supported engines (JS, C#, C++, Java, Elixir), DeukPack enforces absolute validation boundaries during streaming—`MAX_SAFE_LENGTH` (10MB) and `MAX_ELEMENT_COUNT` (1,000,000) limits. Even if malicious clients transmit artificially pumped list headers, packets are instantly discarded (Fail-Fast) before any memory allocation takes place, preventing process crashing.
- **Progressive Chunk Validation (JSON Flood Defense)**: Completely replacing legacy `ReadToEnd()` methods, stream endpoints now implement length pre-evaluations, neutralizing both giant string bombs and multi-bracket JSON stack flooding vulnerabilities in Node.js and Java backends.
- **Continuous DDoS Fuzzer Suite**: Integrated seamlessly into the CI pipeline, the `test-fuzz-oom.js` automation bombards all parsers with 2GB+ abnormal buffers and unbounded structural trees to officially certify the library's resilience.

---

## Supported Protocols & Languages (v1.6.0)

| Language / Platform | Pack (.dpk) | TBinary | TCompact | TJSON | JSON (Wire) | YAML / CSV | Protobuf | OpenAPI | MCP | Zero-Alloc / JIT |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **TypeScript / JS** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.6) |
| **C# (.NET / Unity)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (v1.2.7) | ✅ | ✅ | - | ✅ |
| **C++** | ✅ | ✅ | ✅ (v1.5) | - | ✅ (v1.5) | 🚧 | ✅ | - | - | ✅ (v1.4.2) |
| **Java** | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.5) | ✅ | 🚧 | - | - | - | 🚧 |
| **Elixir (BEAM)** | ✅ (v1.7) | - | - | - | - | - | - | - | - | ✅ (BEAM) |
| **Excel (Add-in)** | ✅ | - | - | - | - | - | - | - | - | - |

- ✅: Full Support / Production Ready
- ⚠️: Preview / Partial Support
- 🚧: Pilot / Development in Progress
- -: Not Currently Supported

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

## 🔥 Performance Goals (v1.6.0 Benchmark)

DeukPack is engineered for **extreme scalability** and **low-latency**. Average **60–100% memory allocation reduction** vs industry formats, JS parsing speed improved by **250%**.

| Environment | Metric | Industry Tag-based | Industry RPC-based | **DeukPack** |
| :--- | :--- | :---: | :---: | :---: |
| **C# / Unity** | Speed | ~ 45 ms | ~ 85 ms | ~ **28 ms** |
| | Memory | +4.5 MB | +12.0 MB | **0 MB (Zero)** |
| **C++ (Native)** | Speed | ~ 14 ms | ~ 22 ms | ~ **12 ms** |
| | Memory | Heap Alloc | Heap Alloc | **Manual Pool** |
| **Java (Backend)** | Speed | ~ 25 ms | ~ 38 ms | ~ **35 ms** |
| | Memory | Continuous | Large Objects | **+2.1 MB (Min)** |
| **JavaScript (V8)** | Speed | ~ 54 ms | ~ 190 ms | ~ **158 ms** |
| | Memory | +4.2 MB | -1.9 MB | **Immediate Reclaim** |
| **Elixir (BEAM)** | Speed | - | - | ~ **31 ms** |
| | Memory | - | - | **0 MB (Native Match)** |

!!! tip "Test Environment"
    Based on 10,000 Rows Payload decoding stress test. Results may vary by environment.

👉 **[View the Full Benchmark Matrix](journal/performance-matrix.md)**

---

## Next steps

- [**Use the core library**](products/core-engine.md) — npm/GitHub links, install/CLI/tutorials for immediate use
- [**DeukPack kits lineup**](deukpack-kits.md) — stack-specific samples, repo links, ready-to-use examples
- [Products overview](products/index.md) — roles and scope of each product
- [Architecture diagram](architecture.md) — product relationships and data flow
- [Tutorial](tutorial/index.md) — quick start and step-by-step guides
- [Reference guide](reference/index.md) — API and type reference
- [Positioning](positioning.md) — target and position
- [License · Pricing · Support](license.md) — terms, pricing, and how to support development (PayPal, Ko-fi)
