# 득팩 코어 엔진 (Universal IDL Gateway)

**득팩 코어 엔진**은 Thrift, Protobuf, OpenAPI 등 파편화된 인터페이스 규격을 단일한 **득팩 AST(Superset AST)**로 통합하고, 서로 다른 프로토콜 진영 간의 완벽한 상호 운용성(Interop)을 보장하는 **Universal IDL Gateway**입니다.

--8<-- "_includes/product-notices-landing-core-engine.ko.md"

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
- [AI 시대의 돌파구 전략](../DEUKPACK_AI_BREAKTHROUGH.ko.md)

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
| [설치 (Windows·Linux)](../tutorial/install-os.ko.md) | Node 설치, 배포본(npm)·.tgz 설치 |
| [빠른 시작](../tutorial/quickstart.ko.md) | IDL 하나로 C#, C++, TS 생성까지 단계별 |
| [IDL 가이드](../tutorial/idl-guide.ko.md) | .deuk·.thrift 문법·네임스페이스 |
| [C# 가이드](../tutorial/csharp-guide.ko.md) | C# 생성물·프로토콜·참조 |
| [C++ 가이드](../tutorial/cpp-guide.ko.md) | C++ 빌드·include·실행 |
| [파이프라인 만들기](../tutorial/pipeline-guide.ko.md) | 여러 잡·설정 JSON |
| [득팩 키트 라인업](../deukpack-kits.ko.md) | Unity·C++·Console·EF·TS 등 샘플 |
| [문서 안내](../documentation-index.ko.md) | 한글·영문 문서 위치 |

### GitHub 저장소

| 문서 | 내용 |
|------|------|
| [배포본 vs 소스본](../tutorial/distribution-vs-source.ko.md) | npm 사용 vs 클론·빌드 (이 사이트) |
| [README (한글)](https://github.com/joygram/DeukPack/blob/main/README.ko.md) | 저장소 진입·요약 |
| [릴리스용 문서 목록](https://github.com/joygram/DeukPack/blob/main/docs/RELEASE_DOCS_INDEX.md) | 배포·사용자용 문서 인덱스 |

---

## 코어 라이브러리 요약

- **공식 OSS**: [github.com/joygram/DeukPack](https://github.com/joygram/DeukPack) — 소스, README, 이슈, 기여, 릴리스. 클론·로컬 빌드·기여는 저장소의 README·RELEASING을 참고하세요.
- **C#·Unity**: npm 패키지의 `dist/csharp` 런타임 참조 또는 [키트 라인업](../deukpack-kits.ko.md) 샘플.

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

## 제공 기능

| 구분 | 내용 |
|------|------|
| **IDL 입력** | **Deuk(.deuk)**, Protobuf(.proto), .thrift 파싱. 한 빌드에서 혼합 가능. |
| **스키마 임포트** | OpenAPI 3.x → AST, JSON Schema → AST, CSV → AST(스키마 추론). |
| **코드 생성** | C#, C++, TypeScript, JavaScript. GetSchema(), ProtocolRegistry, MetaTableRegistry 등 생성. |
| **데이터베이스** | SQLite: AST → DDL + C# 접근 코드. EF 연동 코드 생성. |
| **상속** | 구조체 `extends` — 다단계·와이어 호환; 부모 필드 코드 생성 시 자식에 병합. |
| **타입 시스템** | float, double, int8–int64, bool, string, binary, list/set/map, tablelink, datetime, decimal — 언어 간 일관. |

한 번의 정의로 다언어·다출력 동시 생성과 고속 빌드를 얻을 수 있고, 기존 정의를 그대로 재사용할 수 있습니다.
