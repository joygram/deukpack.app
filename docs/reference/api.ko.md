# API·타입 참조

득팩 코어 **CLI**, **IDL 선언 종류별** 생성·런타임 요약, **C# / C++ / JavaScript** 생성 API입니다. 상세 구현은 [GitHub 코어](https://github.com/joygram/DeukPack) `src/`·`docs/`를 보세요.

**English:** 사이트 상단 **언어** 메뉴에서 **English**.

---

## 이 문서 구성

- [CLI](#cli) — 전체 옵션표 (`npx deukpack` = `scripts/build_deukpack.js` 기준)
- [IDL declaration kinds](#idl-declaration-kinds) — `record` / `message` / `table` / `entity`
- [Tables](#tables) — 테이블 축 요약
- [Messages and wire](#messages-and-wire) — 메시지·프로토콜 축 요약
- [와이어 프로토콜 계열](wire-protocols.ko.md) — 호환 vs 득팩 전용 표(별 페이지)
- [Database and entities](#database-and-entities) — DB·엔티티 축 요약
- [Schema import and export](#schema-import-and-export) — OpenAPI·CSV·JSON·Excel
- [Generated C# APIs](#generated-c-apis)
- [Generated C++ APIs](#generated-c-apis)
- [Extended types](#extended-types)
- [Cross-cutting features](#cross-cutting-features)
- [통합 Write (필드 선택·오버라이드)](#통합-write-필드-선택오버라이드)
- [JavaScript (`--js`)](#javascript-js)
- [Related product docs](#related-product-docs)

분류별 짧은 안내: [레퍼런스 개요](index.ko.md) · [기본 구성](fundamentals.ko.md) · [테이블](tables.ko.md) · [메시지·와이어](messages.ko.md) · [DB·엔티티](database.ko.md).

---

## CLI

**형식**

```bash
npx deukpack <진입_IDL_경로> <출력_디렉터리> [옵션]
npx deukpack --pipeline <pipeline_config.json>
npx deukpack run [pipeline.json]    # 기본: cwd의 ./deukpack.pipeline.json
npx deukpack init [옵션]            # 파이프라인 JSON, bootstrap, VSIX (--skip-vsix 제외)
npx deukpack bootstrap [옵션]       # init --workspace-only 와 동일
```

**`npx`** 또는 **`npm exec deukpack --`** 를 쓰세요. **`npm deukpack`** 은 npm 서브커맨드가 아닙니다.

**Init / 워크스페이스 (요약)**

| 명령 / 플래그 | 역할 |
|---------------|------|
| `init` | **`deukpack.pipeline.json`** 생성, **bootstrap** (`.deukpack/workspace.json`), **`code` / `cursor` / `antigravity`** 로 동봉 VSIX 설치 시도 (**`--skip-vsix`** 제외). |
| `init --non-interactive` | `_deuk_define` 에 `.deuk` 있으면 기본 파이프라인; bootstrap; VSIX 설치 시도. |
| `init --workspace-only` | bootstrap (+ VSIX) 만. |
| `bootstrap` | **`init --workspace-only`** 와 동일. |
| 기본 **`installKind`** | **`package`**. **`--kind src`** 는 **`--engine-root`** 와 함께; **`--engine-root` 만**으로는 `src` 가 되지 않음. |

init 후 한 줄 안내: 업데이트 시 **`npx deukpack init`** 재실행; **`deukpack.pipeline.json`** / **`.deukpack/workspace.json`** 편집; 그다음 **`npx deukpack run`**.

**주요 옵션** (소스 `scripts/build_deukpack.js` 기준, 누락 시 `npx deukpack --help`로 확인)

| 옵션 | 설명 |
|------|------|
| `-I` / `-i <path>` | include 경로 (여러 번 가능) |
| `-r` / `--include-recursive <path>` | 해당 경로 및 **모든 하위 디렉터리**(깊은 재귀) include |
| `--define-root <name>` | IDL 루트 폴더명 (기본 `_deuk_define`, 레거시 `_thrift`) |
| `--csharp` | C# 생성 (기본으로 `DeukDefine.csproj` 동봉) |
| `--csharp-project-name <name>` | 어셈블리·프로젝트 파일명 (기본 `DeukDefine`) |
| `--csharp-nullable` | 생성 C#에 `#nullable enable` 계열 활성 |
| `--no-csharp-csproj` | `.csproj` 생성 생략 |
| `--allow-multi-namespace` | 단일 `.deuk` 파일에 namespace 블록 여러 개 허용 |
| `--brace-less-namespace` | 단일 namespace일 때 출력에서 `namespace { }` 중괄호 생략(들여쓰기) |
| `--cpp` | C++ 생성 |
| `--ts` | TypeScript 1차 산출 (앱은 tsc/번들로 이어짐) |
| `--js` | JavaScript 직접 생성 (Node·도구용 경로) |
| `--ef` | EF Core: `DbContext`·Fluent 등 엔티티/메타 정합 경로 활성 |
| `--protocol <name>` | 와이어 힌트. **득팩 전용:** `pack`(기본값), `json`, `yaml` — **호환(Thrift):** **`tbinary`**, **`tcompact`**, **`tjson`**. 표·JS: [와이어 프로토콜 계열](wire-protocols.ko.md) · [interop vs native](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md) |
| `--endianness little\|big` | 엔디안 |
| `--wire-profile <name>` | 프로파일 이름 반복 또는 쉼표 구분. [와이어 프로파일](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WIRE_PROFILE_SUBSET.md) |
| `--convert-to-deuk [subdir]` | 파싱된 `.thrift` 등에서 `.deuk` 추가 출력 (하위 폴더 기본 `deuk`) |
| `--emit-per-file` | AST의 `sourceFile`별 `.deuk` 추가 출력(서버 메시지 DB 등 분할용) |
| `--import-openapi <file>` | OpenAPI 3.x를 AST에 머지 |
| `--openapi <file>` | AST에서 OpenAPI 3.x 파일 생성 |
| `--import-csv` / `--import-psv` / `--import-json` / `--import-excel` `<file>` | 첫 행/키로 스키마 머지 |
| `--csv` / `--psv` / `--json` / `--excel` `<file>` | AST에서 해당 형식으로 스키마보내기(라운드트립용) |

**예시**

```bash
npx deukpack ./schema.deuk ./gen --csharp --cpp -I ./idl
npx deukpack ./api.deuk ./out --csharp --protocol tbinary
npx deukpack --pipeline ./deukpack.pipeline.json
npx deukpack run
```

---

## IDL declaration kinds

| 키워드 | AST `declarationKind` | 용도 요약 |
|--------|-------------------------|-----------|
| `struct` / `record` | `record` | 일반 struct / DTO |
| `message` | `message` | 네트워크 메시지·msgId·Registry와 연계 |
| `table` | `table` | 테이블 정의·메타 컨테이너·`MetaTableRegistry` |
| `entity` | `entity` | DB 행, `[Table]`/`[Key]`/`[Column]`, 선택 `--ef` |

---

## Tables

- **`MetaTableRegistry`**, 행 struct의 키·예약 필드 ID 규칙, `GetSchema()` 요약은 [테이블 가이드](tables.ko.md)를 보세요.

---

## Messages and wire

- **`ProtocolRegistry`**, `--protocol`, `IDeukPackReader` / `IDeukPackWriter`, 통합 **Write** 요약은 [메시지·와이어](messages.ko.md)를 보세요. **호환 vs 전용 프로토콜 표**는 [와이어 프로토콜 계열](wire-protocols.ko.md).

---

## Database and entities

- **`entity`**, `--ef`, `tablelink` 요약은 [DB·엔티티](database.ko.md)를 보세요.

---

## Schema import and export

OpenAPI·CSV·PSV·JSON·Excel로 **스키마를 먹이거나 뱉는** 플래그는 위 [CLI](#cli) 표의 `--import-*` / `--csv` 등 행과 같습니다. 라운드트립·의미는 [DEUKPACK_OPENAPI_ROUNDTRIP.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_OPENAPI_ROUNDTRIP.md), [DEUKPACK_SCHEMA_FORMAT_ROUNDTRIP.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_SCHEMA_FORMAT_ROUNDTRIP.md) 등 기술 문서를 참고하세요.

**실습·서사:** [제3장 · 광장과 시장표](https://kits.deukpack.app/journey/part-03-api-web/) · [serialization topics](https://kits.deukpack.app/topics/serialization/).

---

## Programmatic (library)

Node에서 **파싱·AST**까지 쓰려면 `DeukPackEngine`(또는 동일 진입점)을 사용합니다. **다언어 코드 생성**은 v1에서 **CLI** 권장 ([v1 범위](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_V1_RELEASE_SCOPE.md)).

---

## Generated C# APIs

| 항목 | 용도 |
|------|------|
| **GetSchema()** | 생성 타입에서 스키마(필드·타입·기본값 등) 복구. 메타·검증·Excel. |
| **Write(oprot)** | 전체 필드 쓰기 (`Write(oprot, null, null)` 과 동일). |
| **Write(oprot, fieldIds, overrides?)** | 선택 **`ICollection<int>? fieldIds`** — 나열된 필드만; 선택 **`Dictionary<int, object>? overrides`** — 필드 ID별 치환값. 안 쓰는 인자는 **`null`**. |
| **FieldId** | `public const int` — `StructName.FieldId.PropertyName`. |
| **ProtocolRegistry** | 메시지 타입 ↔ msgId 등. |
| **MetaTableRegistry** | 테이블·메타 타입 등록. |
| **IDeukPackReader / IDeukPackWriter** | Binary/Compact/JSON 등 프로토콜별 읽기·쓰기. |

**struct extends:** IDL `extends` — 다단 상속·필드 ID 충돌 검사. 튜토리얼: [통합 Write·필드 선택·extends](../tutorial/write-with-overrides.ko.md). 상세: [DEUKPACK_WRITE_WITH_OVERRIDES_API](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## Generated C++ APIs

| 항목 | 용도 |
|------|------|
| **kFieldId_\*** | `static constexpr int` — `StructName::kFieldId_PropertyName`. |
| **Binary / pack 출력** | 생성 소스가 C#/JS와 동일한 **필드 ID** 모델을 따름; 타입 옆에 나오는 pack/바이너리 헬퍼 사용(별도 `apply_overrides` 단계 없음). |

---

## Extended types

**한 줄:** `int8`–`int64`, `uint8`–`uint64`, `float`/`double`, `bool`, `string`/`binary`, `list`/`set`/`map`, **tablelink**, `datetime`/`decimal`, **struct extends**.

| 타입 / 기능 | 득팩 | Protobuf | Thrift |
|-------------|------|----------|--------|
| int8 / int16 / int32 / int64 | ✓ | int32/int64 (int8/int16 없음) | i8/i16/i32/i64 ✓ |
| uint8 / uint16 / uint32 / uint64 | ✓ | uint32/uint64 (uint8/uint16 없음) | byte만(uint8) |
| float / double | ✓ | ✓ | ✓ |
| bool, string, binary | ✓ | ✓ (bytes) | ✓ |
| list / set / map | ✓ | repeated/map | list/set/map ✓ |
| **tablelink** | ✓ | — | — |
| **datetime** | ✓ | — | — |
| **decimal** | ✓ | — | — |
| **struct extends** | ✓ | oneof/중첩 | — |

---

## Cross-cutting features

- **extends:** 와이어 호환 유지하며 부모 필드를 자식에 병합.
- **FieldId:** C#·JS에서 **Write** 필드 선택·오버라이드에 사용.
- **와이어 프로파일:** `--wire-profile` + 어노테이션 `wireProfiles`. [DEUKPACK_WIRE_PROFILE_SUBSET](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WIRE_PROFILE_SUBSET.md).
- **지오메트리 등 어노테이션:** IDL `geometry` 등 확장은 생성 C# `deuk` partial 등으로 이어질 수 있음(코드 생성기 구현 기준).

---

## 통합 Write (필드 선택·오버라이드)

타깃 공통으로 **`Write`** 계열 한 가지:

- **C#:** `Write(oprot, fieldIds, overrides)` — `fieldIds` 가 null 이면 전체 필드; `overrides` 가 null/비어 있으면 치환 없음.
- **JavaScript:** struct 헬퍼의 `toJson(obj, fieldIds, overrides)`, `toBinary(obj, fieldIds, overrides)` (및 pack/런타임 동등 API).
- **TypeScript:** 생성 헬퍼에서 동일 패턴.

구버전 별도 API (**`WriteWithOverrides`**, **`WriteFields`**, **`applyOverrides`**, **`toJsonWithFields`** 등)는 **제거**됨; 안 쓰는 인자는 **`null`** 로 통일.

튜토리얼: [../tutorial/write-with-overrides.md](../tutorial/write-with-overrides.ko.md)

---

## JavaScript (--js) {: #javascript-js }

생성 JS(예: `js/generated_deuk.js`) struct 헬퍼:

| 항목 | 용도 |
|------|------|
| **toJson(obj, fieldIds, overrides)** | JSON 와이어; `fieldIds` null 이면 전체 필드. |
| **toBinary(obj, fieldIds, overrides)** | 동일 인자의 바이너리/pack 경로. |
| **FieldId** | `{ PropertyName: id, ... }` 객체. |

---

## Related product docs

| 구분 | 문서 |
|------|------|
| **코어·엔진** | [코어·엔진](../products/core-engine.ko.md) |
| **프로토콜** | [프로토콜](../products/protocol.ko.md) |
| **Excel·Unity** | [Excel 애드인](../products/excel-addin.ko.md), [파이프라인·Unity](../products/pipeline-unity.ko.md) |
