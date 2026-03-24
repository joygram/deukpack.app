# DeukNavigation

**One-liner**: **Recast/Detour-based NavMesh** with a **shared Deuk wire format** (.dpk) for **Unity and server**. Same mesh data and query API on client and C++/C# server — pathfinding, crowd simulation, and baking in one package.

**Web & blog (planned):** a **DeukNavigation**-focused hub on **deukpack.app** via **domain overloading**. Candidate hostnames: **deuknavigation.deukpack.app** · **navigation.deukpack.app** (one or both, per ops).

--8<-- "_includes/product-notices-landing-navigation.en.md"

---

## What you get

- **Client–server shared format** — One navmesh binary (Deuk .dpk) and the same query/agent API on Unity and native server. No client/server mesh mismatch; **Unreal or C++/C# servers** can load the same .dpk.
- **Native C++ core** — Recast/Detour runs in C++; the C# layer is a thin P/Invoke wrapper. Pathfinding and crowd updates avoid the cost of pure-C# ports.
- **Unity AI–style API** — **DeukNavAgent**: `SetDestination`, `RemainingDistance`, `IsStopped`, `Warp`, `Speed`, `PathStatus`, `HasReachedDestination`. **CrowdContext**: `AddAgent`, `SamplePosition`, `RandomPoint`, `Raycast`, avoidance config. Single entry point: **DeukNavRuntime** (mesh + crowd in one component).
- **Baking & tools** — Unity Editor: full build pipeline (input → NMGen → tile bake → Save/Load .dpk). **DeukNaviTool**: standalone C++ tool for SoloMesh/TileMesh, export .dpk or legacy .bin. Same Recast/Detour and Deuk wire as Unity.

---

## Features

| Category | Content |
|----------|---------|
| **Runtime** | **DeukNavRuntime** (single component: Navmesh + CrowdContext). **DeukNavAgent** (Unity NavMeshAgent-like). **CrowdContext** (crowd simulation, avoidance, queries). |
| **Mesh format** | **Deuk wire (.dpk)** — cross-platform; C# parse + native tiles or full C++ loader. Same format for Unity and server. |
| **Unity Editor** | BakedNavmesh, INavmeshData, Build/Save/Load/Clear. Recast params, tile build, input compilation. |
| **Standalone tool** | **DeukNaviTool** (C++) — build mesh, load/save .obj, export .dpk or .bin. |
| **Migration** | Re-bake scene in DeukNavigation; runtime API mirrors Unity NavMeshAgent for step-by-step swap. |

---

## Structure (package)

| Layer | Role |
|-------|------|
| **Runtime/Core** | Engine-agnostic: Navmesh, CrowdContext, DeukNavAgent, queries. Shared by Unity and server. |
| **Runtime/Unity** | BakedNavmesh, DeukNavRuntime, DeukNavAgentComponent, INavmeshBuildSettings. |
| **Editor** | Build pipeline, RecastDetourBuilder, NavMesh build window, Save/Load .dpk. |
| **Native/** | Recast/Detour C++ source, **`RecastInterop/`** tree (CMake target **`deuk_recast_navigation`**), DeukNaviTool. Plugins (e.g. `deuk_recast_navigation.dll`, `libdeuk_recast_navigation.so`) built here. |

---

## Relation to DeukPack

- **Deuk wire format** — NavMesh container and tile layout are defined with DeukPack tooling; .dpk is the shared serialization format.
- **Same product line** — DeukNavigation lives alongside DeukPack (e.g. under `i/DeukNavigation`). Use **Pipeline · Unity** to feed definition/code into your game; use **DeukNavigation** for NavMesh data, baking, and runtime pathfinding/crowd.

**Legacy application** — Re-bake from Unity NavMesh (no binary read); swap to DeukNavAgent step by step. Or move from .bin to .dpk. **DeukNavRuntime** simplifies the old NavManagerProvider + AgentGroupSettings chain.

**AI / agent use** — **SamplePosition**, **RandomPoint**, **Raycast** for validity and placement; **CrowdContext** for multi-agent simulation; same .dpk for server-side agents and automation. Fits DeukPack IDL/schema for path/position payloads.

For integration with game controllers, crowd, and migration from legacy NavMesh, see the internal docs: *DeukPack/docs/DEUKPACK_DeukNavigation_게임연동_통합_가이드.md*, *DEUKPACK_DeukNavigation_베이킹_및_런타임_통합_개선.md* (in the DeukPack repo). **Features, differentiators, legacy, and AI summary**: *DeukNavigation/docs/FEATURES_DIFFERENTIATORS_LEGACY_AI.md* (in the DeukNavigation repo).
