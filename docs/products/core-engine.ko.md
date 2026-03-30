# DeukPack: AI-Native 유니버설 스키마 멀티 허브 (Protobuf, Thrift, OpenAPI 통합)

**득팩 코어 엔진**은 Protobuf, Thrift, OpenAPI 등 파편화된 인터페이스 규격을 하나로 통합하는 **고성능 유니버설 스키마 멀티 허브(Multi-hub)**이며, AI 지능형 컨텍스트(Knowledge) 추출에 최적화되어 있습니다.

<div class="dp-dynamic-notice-product" data-product="core-engine"></div>

---

## 🚀 릴리스 로드맵 (Roadmap)

득팩(DeukPack)은 언어·플랫폼 지원 확대 시마다 마이너 버전을 갱신하며, 현재 **v1.5.x 시리즈**를 통해 생태계를 확장 중입니다.

| 버전 | 주요 목표 (Milestones) | 상태 |
| :--- | :--- | :--- |
| **v1.4.0** | MCP Protobuf 확장, C#/C++/JS 코어 런타임 안정화 | **DONE** |
| **v1.5.0** | **Java & Core Parity**: 상속 지원, Compact/TJSON 추가, 전수 보안 가드 및 **MCP 코어 분리** | **Current** |
| **v1.5.1** | C++ 저지연(Zero-Alloc) 최적화 및 DDL 생성기 보강 | In Progress |
| **v1.6.0** | **Elixir Expansion Pilot**: BEAM 기반 초고성능 분산 백엔드 지원 | **Teaser** |

---

## ⚡ 성능: 병목 없는 지능형 코어 (Zero-Bottleneck Foundation)

득팩은 단순히 빠른 것을 넘어, AI 에이전트가 수만 줄의 IDL 지식을 실시간으로 다루어도 시스템에 부하를 주지 않는 **"지연 없는 지능형 코어"**를 지향합니다.

| 작업 항목 | 기존 레거시 워크플로 | **DeukPack (v1.5.0)** | 핵심 이점 |
| :--- | :---: | :---: | :--- |
| **IDL 트리 파싱** | 초(s) 단위 (다단계 빌드) | **밀리초(ms) 단위** | **AI 실시간 인터랙션 최적화** |
| **런타임 오버헤드** | 객체 할당 및 GC 발생 | **Zero-Allocation** | **고빈도 데이터 통신(HFT) 지원** |
| **메모리 점유** | 무거운 프로세스 독립 실행 | **경량 AST 지식 캐싱** | **대규모 지식 추출 시 저부하** |

> [!TIP]
> 위 수치는 대규모 프로젝트 환경(500+ IDL 파일)에서의 일반적인 관측치를 기반으로 하며, 사용자 환경 및 IDL 복잡도에 따라 차이가 있을 수 있습니다. 상세 벤치마크 방법론은 [성능 문서](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_BENCHMARKING.ko.md)를 참고하세요.


---

## 기능 지원 매트릭스 (Feature Matrix)

각 타겟 플랫폼별 지원 현황 및 계획입니다.

| 카테고리 | 기능 | TS / JS | C# / Unity | C++ | Java | Elixir |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **IDL 코어** | 기본 타입 / 타입 별칭 | ✅ | ✅ | ✅ | ✅ | 🚧 (v1.6) |
| **상속** | `extends` 지원 | ✅ | ✅ | ✅ | ✅ (v1.5) | 🚧 (v1.6) |
| **프로토콜** | Native Pack (.dpk) | ✅ | ✅ | ✅ | ✅ | 🚧 (v1.6) |
| | Protobuf Compatible | ✅ | ✅ | 🚧 (v1.4) | ✅ | - |
| | Thrift Compatible (T-Series) | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.5) | - |
| | JSON (Tagged / POJO) | ✅ | ✅ | ✅ (v1.5) | ✅ | - |
| | YAML / CSV | ✅ | ✅ (v1.2.7) | 🚧 | 🚧 | - |
| **최적화**| Zero-Alloc 파싱 | ⚠️ | ✅ | ✅ (v1.4.2) | 🚧 | 🚧 (BEAM) |
| | `Write` 로직 오버라이드 | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.5) | - |
| **데이터/메타** | `tablelink` / MetaTable | ✅ | ✅ | ✅ (v1.5) | ✅ | - |
| | DB 연동 (EF / SQL) | ⚠️ (1) | ⚠️ (2) | ⚠️ (3) | 🚧 (v1.5) | - |
| **AI & IDE 통합** | 도구 자동 생성 (Skill) | ✅ (v1.5 MCP 분리) | 🚧 | - | - | - |
| | 지능형 컨텍스트 (Knowledge) | ✅ (Core Ready) | ✅ | ✅ | ✅ | ✅ |
| | IDE 인코더/인텔리센스 | ✅ | ✅ | ✅ | ✅ | ✅ |

- ✅: 정식 지원 / Production Ready
- ⚠️: 프리뷰 / 일부 기능 지원 또는 제약 있음
- 🚧: 파일럿 / 개발 진행 중
- -: 현재 미지원

> [!CAUTION]
> **데이터베이스 연동 (⚠️) 상세 제약 사항:**
> 1. **TS / JS**: JSON/Binary 직렬화 기반 저장 위주. 관계형 매핑은 제한적(Blob 중심).
> 2. **C# (EF Core)**: `entity` 키워드를 통한 테이블 생성 지원. 단, **중첩 컬렉션(List/Map/Set)** 필드는 SQL 컬럼 자동 매핑 미지원 (Blob 저장 또는 수동 Converter 필요).
> 3. **C++**: DDL(SQL) 생성 위주. 런타임 ORM 연동은 지원되지 않음.
> 4. **공통**: 스키마 구조 변경에 따른 DB Migration(변경 관리) 로직은 제공되지 않음.

---

## 🏗️ Next Generation: Elixir Expansion Pilot (v1.6.0+)

득팩의 차차기 주요 이정표는 **Elixir 및 Erlang/BEAM** 생태계로의 확장입니다.

- **BEAM 최적화**: Erlang 가상 머신(BEAM)의 바이너리 처리 방식에 최적화된 고성능 직렬화 엔진 개발.
- **Actor Model Interop**: 득팩 서비스를 Elixir의 경량 프로세스(Actor)와 즉시 연동하여 초고성능 분산 백엔드 구축 지원.
- **Isomorphic Reliability**: Elixir 백엔드와 Unity/C++/TS 클라이언트 간의 완벽한 타입 및 데이터 정합성 보장.

---

## 핵심 차별점

### 1. Universal IDL Gateway & Interop
다양한 인터페이스 정의 언어를 하나의 파이프라인에서 통합 관리하고, 진영 간 경계를 허뭅니다.
- **다중 입력 지원**: `.deuk`(네이티브), `.thrift`(레거시), `.proto`(Protobuf), OpenAPI, JSON Schema, CSV.
- **Cross-Protocol Interop**: Thrift로 정의된 데이터를 Protobuf 와이어로 전송하거나 그 반대로 변환하는 **무손실 라운드트립** 지원.
- **점진적 마이그레이션**: 기존 IDL을 유지하면서 득팩의 고도화된 기능(상속, 오버라이드)을 결합하여 현대적인 스택으로 자연스럽게 전환 가능합니다.

### 2. 고도화된 타임 시스템 (IDL Architecture)
단순한 데이터 전송을 넘어, 복잡한 비즈니스 엔티티를 표현할 수 있는 풍부한 언어적 기능을 제공합니다.
- **구조체 상속 (`extends`)**: 공통 필드를 부모 구조체에 정의하고 자식이 이를 상속받아 확장하는 객체 지향적 설계.
- **데이터 프로젝션 (`Write Overrides`)**: 동일한 메모리 인스턴스를 유지하면서 수신자별로 특정 필드만 선택하여 직렬화하거나 값을 교체.
- **풍부한 내장 타입**: `tablelink`(테이블 참조), `datetime`, `decimal` 등 게임 및 기획 도구에 최적화된 타입 기본 제공.

### 3. AI 시맨틱 매핑 (AI-Ready Mapping)
인터페이스 정의를 AI 에이전트가 신뢰할 수 있는 결정론적 지식 베이스로 변환합니다.
- **시맨틱 익스포트**: 주석 기반의 의도(Intent)와 비즈니스 제약 조건을 AI가 이해할 수 있는 컨텍스트로 추출.
- **결정론적 코드젠**: AI의 가변적인 출력을 득팩 엔진이 정교하고 예측 가능한 다언어 코드로 실체화.

---

## 제공 기능 요약

| 구분 | 내용 |
|------|------|
| **코어 라이브러리** | AST 빌더, 고성능 파서, 다언어 코드 제너레이터 (C#, C++, TS, JS) |
| **코드 생성** | 구조체, 열거형, 서비스 인터페이스, 필드 상수 및 스키마 메타데이터 |
| **CLI 도구** | `deukpack init`, `run`, `build`, `export:ai-context` |
| **AI 연동** | AI 시맨틱 익스포터, MCP 기반 런타임 가드레일 지원 |

---

## 다음에 읽을 문서

- [득팩 프로토콜 (런타임)](protocol.ko.md)
- [Excel 메타툴](excel-addin.ko.md)
- [AI 시대의 돌파구 전략](../ai-pipeline-integration.ko.md)

### 설치·실행 (한 줄)

| 채널 | 링크 | 용도 |
|------|------|------|
| **npm** | [deukpack](https://www.npmjs.com/package/deukpack) | `npm install deukpack` / `npx deukpack` — 배포본만 사용 시 |
| **GitHub** | [joygram/DeukPack](https://github.com/joygram/DeukPack) | 소스·이슈·기여·릴리스. 클론·로컬 빌드 시 |

```bash
# 프로젝트에 추가
npm install deukpack

# CLI로 코드 생성 (설치 없이 한 번 실행)
npx deukpack ./idl/root.deuk ./gen --csharp --cpp --js -I ./idl
```

### 이 사이트에서 더 보기

| 문서 | 내용 |
|------|------|
| [설치 (Windows·Linux)](../tutorial/install-os.md) | Node 설치, 배포본(npm)·.tgz 설치 |
| [빠른 시작](../tutorial/quickstart.md) | IDL 하나로 C#, C++, TS 생성까지 단계별 |
| [IDL 가이드](../tutorial/idl-guide.md) | .deuk·.thrift 문법·네임스페이스 |
| [C# 가이드](../tutorial/csharp-guide.ko.md) | C# 생성물·프로토콜·참조 |
| [C++ 가이드](../tutorial/cpp-guide.ko.md) | C++ 빌드·include·실행 |
| [파이프라인 만들기](../tutorial/pipeline-guide.ko.md) | 여러 잡·설정 JSON |
| [득팩 키트 라인업](../deukpack-kits.md) | Unity·C++·Console·EF·TS 등 샘플 |
| [문서 안내](../documentation-index.md) | 한글·영문 문서 위치 |

### GitHub 저장소

| 문서 | 내용 |
|------|------|
| [배포본 vs 소스본](../tutorial/distribution-vs-source.md) | npm 사용 vs 클론·빌드 (이 사이트) |
| [README (한글)](https://github.com/joygram/DeukPack/blob/main/README.ko.md) | 저장소 진입·요약 |
| [릴리스용 문서 목록](https://github.com/joygram/DeukPack/blob/main/docs/RELEASE_DOCS_INDEX.md) | 배포·사용자용 문서 인덱스 |

---

## 코어 라이브러리 요약

- **공식 OSS**: [github.com/joygram/DeukPack](https://github.com/joygram/DeukPack) — 소스, README, 이슈, 기여, 릴리스. 클론·로컬 빌드·기여는 저장소의 README·RELEASING을 참고하세요.
- **C#·Unity**: npm 패키지의 `dist/csharp` 런타임 참조 또는 [키트 라인업](../deukpack-kits.md) 샘플.

---

## 무엇을 얻을 수 있나요

- **메모리**: 전체를 메모리에 올릴 필요 없음 — SQLite·스트리밍·(선택) 제로카피로 대용량·저메모리 구성 가능. 버퍼 재사용·리플렉션 최소로 런타임 할당이 작습니다.
- **성능**: 대량 IDL도 수십 배 빠른 파싱·코드 생성. 런타임 직렬화/역직렬화도 약 10배 빠른 수준을 목표로 합니다.
- **편의성**: 한 번 정의·한 번 빌드로 코드·메타·DB·검증이 맞춰짐. 기존 .proto·OpenAPI·CSV·.thrift 를 **득팩으로 흡수**할 수 있습니다.
- **확장성**: 여러 파일·네임스페이스, C#·C++·TS·JS 동시 생성. 스키마·코드·DB·Excel을 한 소스에서 확장.

---

## 기존 정의·스펙과 함께

- **.deuk** 우선; **Protobuf·.thrift** 를 한 AST에서 혼합할 수 있습니다.
- **OpenAPI 3.x·JSON Schema·CSV** 임포트로 기존 스펙을 AST로 불러와 코드·메타·테이블을 한 툴체인에서 다룹니다.
- **Universal Gateway:** .proto·.thrift 파일을 그대로 가져와 단일 AST에서 혼합하고, 진영에 구애받지 않는 통합 핸들러를 구성할 수 있습니다.

---

### 언어별 주요 특징

*   **C# (.NET / Unity)**: 게임 클라이언트를 위한 **Zero-Allocation** 파서, 백엔드 연동을 위한 **EF Core** 지원(제약사항 참고), 그리고 IDL 기반 설정 관리를 위한 **MetaTable Registry**, **YAML 프로토콜**(v1.2.7) 기능을 제공합니다.
*   **TypeScript / JSON**: AI 도구 호출을 위한 **MCP (Model Context Protocol)** 플러그인 대응 및 지능형 컨텍스트 추출, 순수 JS 객체(**POJO**) 기반의 유연한 매핑, 그리고 v1.5.0에서 분리된 **DeukPackMcp**를 통한 도구 실행 환경을 지원합니다.
*   **C++**: **저지연(Low-latency)** 및 **임베디드** 환경에 최적화되어 있으며, v1.5.0에서 안정화된 **Binary/Compact** 및 **JSON** 프로토콜 호환성과 최소한의 메모리 점유율에 집중합니다.
*   **Java**: 다양한 플랫폼 간의 상호운용성을 보장하며, v1.5.0에서 추가된 **상속(extends)** 지원과 **Compact/TJSON** 프로토콜을 통해 Thrift 생태계와의 완전한 패리티를 달성했습니다.

---

한 번의 정의로 다언어·다출력 동시 생성과 고속 빌드를 얻을 수 있고, 기존 정의를 그대로 재사용할 수 있습니다.
