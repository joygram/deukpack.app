# DeukPack Pipeline · Unity (AI-Native Pipeline)

**DeukPack Pipeline** is an **AI-Native build chain** that connects everything from interface definitions (IDL) to multi-language code, game metadata, and the semantic information required by AI agents in a single flow.

<div class="dp-dynamic-notice-product" data-product="pipeline-unity"></div>

---

## Core Values

### 1. Intelligent Pipeline (`deukpack.pipeline.json`)
Controls the entire build process with a single configuration file.
- **Unified Jobs**: Automatically detects all `.deuk`, `.thrift`, and `.proto` files in a directory and integrates them into a single build unit.
- **Multi-Language Simultaneous Output**: Deploys C#, C++, TypeScript, and JavaScript artifacts to their respective platform paths with a single build command.

### 2. Optimized Unity Integration
Provides optimized integration for the Unity editor and runtime.
- **Automatic Table Loader**: Automatically generates registry code to load Excel data into Unity with optimal performance as soon as it's built.
- **EF Core Support**: Manages DB entity information in IDL to maintain perfect data model consistency between Unity and the server.

### 3. AI Semantic Metadata Scaling (Exporter)
Builds an environment where AI agents can accurately understand the system architecture.
- **Automatic AI Guide Generation**: Extracts IDL comment information to generate an AI-only knowledge base (Markdown/JSON) at the pipeline stage.
- **Data Lineage**: Helps AI track the flow of data from definition to code and database.

---

## Feature Summary

| Category | Content |
|----------|---------|
| **Build Automation** | Batch generation of code, schemas, and binaries via `deukpack build`. |
| **Unity Integration** | C# code generation and table handling runtime libraries for Unity. |
| **Multi-IDL Integration** | Unifies Thrift, Protobuf, and OpenAPI definitions into a single pipeline. |
| **AI Context** | Semantic export for AI agents and support for MCP server integration. |

---

## Next Steps

- [Core Engine Introduction](core-engine.md)
- [DeukPack Kits Lineup](../deukpack-kits.md)
- [Positioning Strategy](../positioning.md)
