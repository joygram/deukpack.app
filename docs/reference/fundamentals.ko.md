# 기본 구성 (IDL·CLI·파싱)

`.deuk`(및 가져온 `.proto`·`.thrift` 등)를 엔진이 어떻게 **구조화**하는지, **명령줄**에서 무엇을 줄 수 있는지 요약합니다.

---

## IDL 선언 종류 (`declarationKind`)

파서는 struct 계열 선언을 네 가지로 태그합니다. **와이어 레이아웃**은 대부분 `record`와 동일하게 취급할 수 있고, **코드 생성·검증**에서 구분됩니다.

| 키워드 | 의미 (요약) |
|--------|----------------|
| **`struct` / `record`** | 일반 DTO·행 데이터. 기본 `declarationKind`는 `record`. |
| **`message`** | 네트워크 메시지·프로토콜 쪽 이름 관례. `ProtocolRegistry`·msgId 매핑과 함께 쓰기 좋음. |
| **`table`** | 테이블 정의·메타 테이블(`header`+`infos` 패턴 등). `MetaTableRegistry`·로드 경로와 연결. |
| **`entity`** | DB 영속 행 스키마. `[Table]`/`[Key]`/`[Column]` 등 **C# 데이터 어노테이션** 생성. `--ef` 시 `DbContext`까지. |

그 외 AST에는 **enum**, **typedef**, **const**, **service**(Thrift RPC 호환), **namespace** 등이 올 수 있습니다.

---

## CLI·include (어디까지 공통인가)

- **진입:** `npx deukpack <IDL파일> <출력폴더> [옵션]` 또는 `--pipeline <config.json>`.
- **include:** `-I` / `-i` (경로 하나), `-r` / `--include-recursive` (해당 경로 및 모든 하위 디렉터리, 깊은 재귀).
- **IDL 루트 이름:** `--define-root` (기본 `_deuk_define`, 레거시 `_thrift`).
- **코드 생성:** `--csharp`, `--cpp`, `--ts`, `--js` (조합 가능).
- **C# 부가:** `--csharp-project-name`, `--csharp-nullable`, `--no-csharp-csproj`, `--allow-multi-namespace`, `--brace-less-namespace`.
- **기타:** `--protocol`, `--endianness`, `--convert-to-deuk`, `--emit-per-file`, `--wire-profile`, OpenAPI/표 형식 머지·출력(아래 통합 절).

**전체 표와 설명:** [API·타입 참조 — CLI](api.md#cli).

---

## 프로그램 방식 (Node 라이브러리)

- **파싱·AST:** `DeukPackEngine` 등으로 동일 규칙을 코드에서 호출 가능.
- **다언어 emit:** v1에서는 **CLI 사용**을 권장합니다 ([v1 범위](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_V1_RELEASE_SCOPE.md)).

---

## 와이어 패밀리 한 줄

- **득팩 전용 (`deuk`):** `pack`, `json`, `yaml` — npm **JS** `WireSerializer`·`serialize()` 기본(`pack`)이 여기.
- **호환 (`interop`, Thrift):** **`tbinary`**, **`tcompact`**, **`tjson`** — **C#·C++** 중심, **JS** 는 **`interopRootStruct`** 로 동일 와이어 지원.

표·npm 단순 API: [와이어 프로토콜 계열](wire-protocols.md). 스펙 문서: [호환 vs 네이티브 와이어](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md).

---

## 타입·상속

**확장 타입·Protobuf/Thrift 대조**는 [API·타입 참조 — Extended types](api.md#extended-types)에 표로 정리했습니다. **`extends`**(다단 상속)는 [튜토리얼: 통합 Write](../tutorial/write-with-overrides.md)와 [메시지·와이어](messages.md)에서 이어집니다.

---

## 손으로 익히기

- [제1장 · 입구의 십자로](https://kits.deukpack.app/journey/part-01-threshold/) — 한 줄기 정의가 갈라지는 지도.
- [와이어·직렬화 개요](https://kits.deukpack.app/topics/serialization/) — 표·메시지·스택을 짧은 글로 잇기.

다음: [테이블](tables.md) · [메시지·와이어](messages.md) · [DB·엔티티](database.md).
