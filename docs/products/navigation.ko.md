# DeukNavigation

`한 줄`: `Recast/Detour 기반 NavMesh`와 `공유 Deuk 와이어 포맷`(.dpk)으로 `Unity와 서버`에서 동일 메시·쿼리 API를 사용. 경로 탐색·크라우드 시뮬레이션·베이킹을 한 패키지에서 제공.

`웹·블로그 (예정):** **deukpack.app` 에서 `도메인 오버로딩`으로 이 제품 전용 허브를 둘 예정입니다. 후보: **deuknavigation.deukpack.app** · **navigation.deukpack.app** (운영에서 하나 또는 병행 선택).

<div class="dp-dynamic-notice-product" data-product="navigation"></div>

---

## 제공 내용

- `클라이언트·서버 공용 포맷` — 하나의 navmesh 바이너리(Deuk .dpk)와 동일한 쿼리/에이전트 API를 Unity와 네이티브 서버에서 사용. 클라이언트/서버 메시 불일치 없음; `Unreal 또는 C++/C# 서버`도 동일 .dpk 로드 가능.
- **네이티브 C++ 코어** — Recast/Detour는 C++에서 동작; C# 레이어는 얇은 P/Invoke 래퍼. 경로 탐색·크라우드 업데이트는 순수 C# 포트 비용을 피함.
- **Unity AI 수준 API** — **DeukNavAgent**: `SetDestination`, `RemainingDistance`, `IsStopped`, `Warp`, `Speed`, `PathStatus`, `HasReachedDestination`. **CrowdContext**: `AddAgent`, `SamplePosition`, `RandomPoint`, `Raycast`, 회피 설정. 단일 진입점: **DeukNavRuntime**(메시 + 크라우드를 한 컴포넌트에서 제공).
- **베이킹·도구` — Unity 에디터: 풀 빌드 파이프라인(입력 → NMGen → 타일 베이크 → Save/Load .dpk). `DeukNaviTool**: SoloMesh/TileMesh용 독립 C++ 도구, .dpk 또는 레거시 .bin 내보내기. Unity와 동일한 Recast/Detour 및 Deuk 와이어.

---

## 기능

| 구분 | 내용 |
|------|------|
| **런타임` | `DeukNavRuntime**(단일 컴포넌트: Navmesh + CrowdContext). **DeukNavAgent**(Unity NavMeshAgent 유사). **CrowdContext**(크라우드 시뮬레이션, 회피, 쿼리). |
| **메시 포맷` | `Deuk 와이어(.dpk)** — 크로스 플랫폼; C# 파싱 + 네이티브 타일 또는 전체 C++ 로더. Unity·서버 동일 포맷. |
| **Unity 에디터** | BakedNavmesh, INavmeshData, Build/Save/Load/Clear. Recast 파라미터, 타일 빌드, 입력 컴파일. |
| **독립 도구` | `DeukNaviTool**(C++) — 메시 빌드, .obj 로드/저장, .dpk 또는 .bin 내보내기. |
| **마이그레이션** | DeukNavigation에서 씬 재베이크; 런타임 API는 Unity NavMeshAgent와 대응해 단계별 교체 가능. |

---

## 패키지 구조

| 계층 | 역할 |
|------|------|
| **Runtime/Core** | 엔진 비의존: Navmesh, CrowdContext, DeukNavAgent, 쿼리. Unity·서버 공유. |
| **Runtime/Unity** | BakedNavmesh, DeukNavRuntime, DeukNavAgentComponent, INavmeshBuildSettings. |
| **Editor** | 빌드 파이프라인, RecastDetourBuilder, NavMesh 빌드 윈도우, Save/Load .dpk. |
| **Native/** | Recast/Detour C++ 소스, **`RecastInterop/`** (CMake 타깃 **`deuk_recast_navigation`**), DeukNaviTool. 플러그인(`deuk_recast_navigation.dll` / `libdeuk_recast_navigation.so` 등)은 여기서 빌드. |

---

## DeukPack과의 관계

- **Deuk 와이어 포맷** — NavMesh 컨테이너·타일 레이아웃은 DeukPack 도구로 정의; .dpk가 공유 직렬화 포맷.
- `동일 제품 라인` — DeukNavigation은 DeukPack과 나란히 배치(예: `i/DeukNavigation`). `파이프라인·Unity`로 정의·코드를 게임에 반영하고, `DeukNavigation`으로 NavMesh 데이터·베이킹·런타임 경로 탐색/크라우드를 사용.

`레거시 적용` — Unity NavMesh에서 재베이크(바이너리 직접 읽기 없음); DeukNavAgent로 단계적 교체. 또는 .bin → .dpk 전환. `DeukNavRuntime`으로 기존 NavManagerProvider + AgentGroupSettings 체인 단순화.

`AI·에이전트 활용` — `SamplePosition**, **RandomPoint**, **Raycast`로 유효성·배치 검증; `CrowdContext`로 다중 에이전트 시뮬레이션; 서버 측 에이전트·자동화에 동일 .dpk 사용. DeukPack IDL/스키마와 연동해 경로·위치 페이로드 주고받기 적합.

게임 컨트롤러·크라우드 연동 및 레거시 NavMesh 마이그레이션은 DeukPack 저장소 내부 문서 참고: *DeukPack/docs/DEUKPACK_DeukNavigation_게임연동_통합_가이드.md*, *DEUKPACK_DeukNavigation_베이킹_및_런타임_통합_개선.md*. **특징·차별점·레거시·AI 요약**: *DeukNavigation/docs/FEATURES_DIFFERENTIATORS_LEGACY_AI.md* (DeukNavigation 저장소).
