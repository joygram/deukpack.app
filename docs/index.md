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
    <p class="dp-eyebrow">DeukPack — A robust contract between AI Agents and Unity</p>
    <h1>Server flexibility<br>Stable client performance</h1>
    <p class="dp-tagline">Dynamic JS/AI Flexibility × High-Performance In-place Reuse Performance</p>
    <p class="dp-lead"><strong>A hybrid schema engine for AI agent automation.</strong><br><br>In an era where AI holds data sovereignty, DeukPack consolidates fragmented IDLs into a single 'semantic spine'. In Node.js servers, slice and dice JSON objects freely. DeukPack uses schemas (.deuk) as filters to pack only the necessary fields into a compact binary.<br><br>On the Unity client, this binary is instantly reassembled via <strong>In-place Unpack</strong>, significantly reducing garbage (GC) by reusing instances and containers. An efficient asymmetric compromise of flexibility and performance—this is the core architecture of DeukPack.</p>
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

!!! warning "🚨 [MUST READ] Core Architecture Consolidation & Migration Notice (v1.9.0)"
    The core module structures for each language have been completely optimized and unified into **`DeukPackCodec`**!

    - **Ultra-Simple Unified API:** No more verbose factories. All languages now intuitively use the struct-based **`Hero.Pack()`** and **`Hero.Unpack()`** (2-Method) syntax.
    - **⚠️ Caution (C# / Unity Users):** If you have been manually copying `.cs` runtime files without using UPM, **you MUST delete all existing runtime folders** before copying the new code to prevent name collisions.

---

## ⚡ What it looks like (At a glance)

**1. Import OpenAPI (or write `.deuk` IDL)**
```deuk
// Feed your existing OpenAPI (Swagger) to the CLI, OR write a clean IDL:
namespace Dto

struct Hero {
    1> int32 id
    2> string name
    3> float hp
}
```

**2. Server (JS/TS): Direct POJO Serialization**
```typescript
// pack() → binary (default). pack(obj, 'json') → JSON string.
const payload = Dto.Hero.pack({ id: 1, name: "Arthur" });
network.send(payload);
```

**3. Client (C# Unity): In-place Read & Override Write**
```csharp
Dto.Hero cachedHero = new Dto.Hero(); // Allocated ONCE, never again

void OnNetworkMessage(byte[] inputData) {
    // Optimized Unpack — overwrites existing instances and lists to minimize GC
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

These are the **three main features of DeukPack** compared to Protobuf, FlatBuffers, and JSON.

1. **Zero-Copy Override without Allocation**
   - **Legacy limits:** Protobuf or Thrift requires allocating (`new`) a separate DTO class every time you want to mask or override specific fields for different users.
   - **DeukPack advantage:** With just ONE generated C# object, a single `Write(oprot, overrides)` function generates variable payloads without GC (GC).
2. **Direct POJO Processing without Classes**
   - **Legacy limits:** Even in JS environments, they force heavy class wrappers like `new Message()` or complex offset Builder patterns like FlatBuffers.
   - **DeukPack advantage:** Simple JavaScript objects (`{ id: 1 }`) thrown by AI are immediately packed into byte arrays. **Flexible in the JS environment, statically typed on the client.**
3. **'AI Semantic Spine' beyond a simple spec sheet**
   - **Legacy limits:** Traditional IDLs are basic byte conversion mappings for communication.
   - **DeukPack advantage:** The `.deuk` file natively supports `extends` (multi-level inheritance) and `tablelink` (DB/Meta table references). It acts as the most condensed **Knowledge Graph (RAG context)** that allows AI (LLMs) to grasp the ERD relationship of an entire project at a glance.

---

## 🛡️ Security & Reliability (OOM Defense / Anti-DDoS)

As a fundamental infrastructure component that constantly parses external network byte payloads, DeukPack implements defense mechanisms against **network-layer parsing vulnerabilities (OOM, Buffer Flooding, Infinite Recursion)**.

- **Universal OOM (Out-of-Memory) Defense (v1.7.0+)**: For all supported engines (JS, C#, C++, Java, Elixir), DeukPack enforces validation boundaries during streaming—`MAX_SAFE_LENGTH` (10MB) and `MAX_ELEMENT_COUNT` (1,000,000) limits. Even if malicious clients transmit artificially pumped list headers, packets are discarded (Fail-Fast) before any memory allocation takes place, preventing process crashing.
- **Progressive Chunk Validation (JSON Flood Defense)**: Completely replacing legacy `ReadToEnd()` methods, stream endpoints now implement length pre-evaluations, neutralizing both giant string bombs and multi-bracket JSON stack flooding vulnerabilities in Node.js and Java backends.
- **Continuous DDoS Fuzzer Suite**: Integrated seamlessly into the CI pipeline, the `test-fuzz-oom.js` automation injects parsers with 2GB+ abnormal buffers and unbounded structural trees to verify resilience.

---

## Supported Protocols & Languages (v1.9.0)

| Language / Platform | Pack (.dpk) | TBinary | TCompact | TJSON | JSON (Wire) | YAML / CSV | Protobuf | OpenAPI | MCP | In-place / JIT |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **TypeScript / JS** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.6) |
| **C# (.NET / Unity)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (v1.2.7) | ✅ | ✅ | - | ✅ |
| **C++** | ✅ | ✅ | ✅ (v1.5) | - | ✅ (v1.5) | 🚧 | ✅ | - | - | ✅ (v1.4.2) |
| **Java** | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.5) | ✅ | 🚧 | - | - | - | 🚧 |
| **Elixir (BEAM)** | ✅ (v1.7) | - | - | - | - | - | - | - | - | ✅ (BEAM) |
| **Excel (Add-in)** | ✅ | - | - | - | - | - | - | - | - | - |
| **Python** | ✅ (Pure/Rust) | 🚧 | - | - | ✅ | - | 🚧 | - | - | ✅ (v1.9) |

- ✅: Full Support / Production Ready
- ⚠️: Preview / Partial Support
- 🚧: Pilot / Development in Progress
- -: Not Currently Supported

---

## ⚡ Performance & Benchmarks

> **Notice: Benchmark Data Under Revision**
> We have identified an inconsistency between the highly-optimized protocol implementations and the aggregated result table. The performance metrics matrix and cross-language benchmarking details are currently being revised and will be republished once the evaluation is complete.

To ensure objective performance testing, we have adopted industry-standard benchmarks such as `BenchmarkDotNet`, `mitata`, and `pytest-benchmark`. Achieving **60-100% reduction in memory allocation** and **2.5x to 5x faster parsing speeds** compared to legacy industry formats. If you find any errors or have suggestions regarding the benchmark scenarios, please let us know.

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
