# DeukPack: AI-Native Universal Schema Multi-hub

**DeukPack Core Engine** is a **High-Performance Universal Schema Multi-hub** that unifies fragmented interface specifications such as Protobuf, Thrift, and OpenAPI, optimized for real-time AI Knowledge extraction and interoperability.

<div class="dp-dynamic-notice-product" data-product="core-engine"></div>

---

## 🚀 Release Roadmap

DeukPack increments the **Minor** version for each new language or platform support. We are currently expanding the ecosystem through the **v1.5.x series**.

| Version | Key Milestones | Status |
| :--- | :--- | :--- |
| **v1.4.0** | MCP Protobuf expansion, C#/C++/JS core runtime stabilization | **DONE** |
| **v1.5.0** | **Java & Core Parity**: Inheritance support, Compact/TJSON protocols, Universal security guards, and **MCP Core Decoupling** | **DONE** |
| **v1.6.0** | **Data Parser Shift**: JS JIT Codegen / C# Zero-Alloc & C++ DDL | **DONE** |
| **v1.7.0** | **Elixir Engine Support**: Native Erlang BEAM pattern matching & **Universal Protocol Security Shield** | **Current** |
| **v1.8.0** | Unreal Engine 5 C++ Native Support & Blueprint Bridges | **Teaser** |

---

## ⚡ Performance: The Zero-Bottleneck Foundation

DeukPack goes beyond simple speed; it aims to be a **"No-Latency Intelligent Core"** that doesn't bottleneck even when an AI agent processes tens of thousands of lines of IDL knowledge in real-time.

| Workload | Legacy Industry Flow | **DeukPack (v1.5.0)** | Key Advantage |
| :--- | :---: | :---: | :--- |
| **IDL Tree Parsing** | Seconds (Multi-step) | **Milliseconds (ms)** | **Real-time AI Integration** |
| **Runtime Overhead** | GC & Allocations | **Zero-Allocation** | **High-Frequency (HFT) Support** |
| **Memory Footprint** | Heavy CLI Processes | **Lightweight AST** | **Low-overhead Knowledge Export** |

> [!TIP]
> Figures are based on typical observations in large-scale environments (500+ IDL files). Actual results may vary depending on IDL complexity and Node.js runtime. For detailed methodology, see [Benchmarking Docs](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_BENCHMARKING.md).

---

## Feature Matrix

Current support status and plans for each target platform.

| Category | Feature | TS / JS | C# / Unity | C++ | Java | Elixir |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **IDL Core** | Basic Types / Aliases | ✅ | ✅ | ✅ | ✅ | ✅ (v1.7) |
| **Inheritance** | `extends` support | ✅ | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.7) |
| **Protocols** | Native Pack (.dpk) | ✅ | ✅ | ✅ | ✅ | ✅ (v1.7) |
| | Protobuf Compatible | ✅ | ✅ | 🚧 (v1.4) | ✅ | - |
| | Thrift Compatible (T-Series) | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.5) | - |
| | JSON (Tagged / POJO) | ✅ | ✅ | ✅ (v1.5) | ✅ | - |
| | YAML / CSV | ✅ | ✅ (v1.2.7) | 🚧 | 🚧 | - |
| **Optimizations**| Zero-Alloc Parsing | ✅ (JIT) | ✅ | ✅ | 🚧 | ✅ (BEAM) |
| | `Write` Logic Overrides | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.5) | - |
| **Data/Meta** | `tablelink` / MetaTable | ✅ | ✅ | ✅ (v1.5) | ✅ | - |
| | DB Interop (EF / SQL) | ⚠️ (1) | ⚠️ (2) | ⚠️ (3) | 🚧 (v1.5) | - |
| **AI Agent & IDE Integration** | Tool Auto-Generation (Skill) | ✅ (v1.5 MCP Decoupling) | 🚧 | - | - | - |
| | Intelligent Context (Knowledge) | ✅ (Core Ready) | ✅ | ✅ | ✅ | ✅ |
| | IDE Encoder/Intelligentsense | ✅ | ✅ | ✅ | ✅ | ✅ |

- ✅: Full Support / Production Ready
- ⚠️: Preview / Partial Support or Constraints
- 🚧: Pilot / Development in Progress
- -: Not Currently Supported

> [!CAUTION]
> **Database Integration (⚠️) 상세 제약 사항:**
> 1. **TS / JS**: JSON/Binary 직렬화 기반 저장 위주. 관계형 매핑은 제한적(Blob 중심).
> 2. **C# (EF Core)**: `entity` 키워드를 통한 테이블 생성 지원. 단, **중첩 컬렉션(List/Map/Set)** 필드는 SQL 컬럼 자동 매핑 미지원 (Blob 저장 또는 수동 Converter 필요).
> 3. **C++**: DDL(SQL) 생성 위주. 런타임 ORM 연동은 지원되지 않음.
> 4. **공통**: 스키마 구조 변경에 따른 DB Migration(변경 관리) 로직은 제공되지 않음.

---

## Key Highlights

### 1. Universal IDL Gateway & Interop
Unify multiple interface definitions into one pipeline.
- **Multi-Input**: `.deuk`, `.thrift`, `.proto`, OpenAPI, JSON Schema, CSV.
- **Cross-Protocol Interop**: Lossless round-trips between Thrift data and Protobuf wires.

### 2. Advanced Type System
Rich linguistic features to express complex business entities.
- **Structural Inheritance (`extends`)**: Object-oriented design with shared parent fields.
- **Data Projection**: Dynamic field selection or value replacement per receiver.

### 3. AI Semantic Mapping
Transform interface definitions into deterministic knowledge bases for AI agents.
- **Semantic Export**: Extract intent and constraints for AI context.
- **Deterministic Codegen**: Realize AI outputs into predictable multi-language code.

---

### Language Specific Features

*   **C# (.NET / Unity)**: **Zero-Allocation** parser for games, **EF Core** support (with constraints), **MetaTable Registry**, and **YAML protocol**(v1.2.7).
*   **TypeScript / JSON**: **MCP (Model Context Protocol)** plugin support and intelligent context extraction, **POJO**-based flexible mapping, and tool execution environment through **DeukPackMcp** (decoupled in v1.5.0).
*   **C++**: Optimized for **Low-latency** and **Embedded** systems, focusing on **Binary/Compact** and **JSON** protocol compatibility stabilized in v1.5.0.
*   **Java**: Ensures cross-platform interoperability with full **Thrift-compatible** TBinary/TJSON support and **inheritance (extends)** added in v1.5.0.

---

## What You Get

- **Low Memory**: No need to load everything into memory. 
- **High Performance**: 10x faster serialization target.
- **Developer Experience**: Define once, build once for Code/Meta/DB.
- **Scalability**: Multi-file, multi-namespace, multi-output (C#, C++, TS, JS).

---

### Installation & Quick Start

```bash
# Add to your project
npm install deukpack

# Generate code from IDL
npx deukpack ./idl/root.deuk ./gen --csharp --cpp --js -I ./idl
```
