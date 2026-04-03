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
- [Generated Java APIs](#generated-java-apis)
- [Generated Elixir APIs](#generated-elixir-apis)
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
| `--java` | Java 생성 (패키지 구조체, DpProtocol 포함) |
| `--elixir` | Elixir 생성 (BEAM 패턴매칭, 불변성 구조체 포함) |
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

Node에서 **파싱·AST**까지 쓰려면 `DeukPackCodec`(또는 동일 진입점)을 사용합니다. **다언어 코드 생성**은 v1에서 **CLI** 권장 ([v1 범위](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_V1_RELEASE_SCOPE.md)).

---

## Generated C# APIs

### 직렬화 — 2-Method 표준 (v1.7.6+)

| 메서드 | 시그니처 | 용도 |
| :--- | :--- | :--- |
| **Pack** | `byte[] Pack(DpFormat format = Binary, fieldIds?, overrides?)` | 바이너리/JSON 직렬화 및 필드 치환 |
| **Unpack** | `void Unpack(byte[] data, DpFormat format = Binary)` | **현재 인스턴스**에 역직렬화 (Zero-Alloc) |
| **Unpack** *(파사드)* | `T Unpack<T>(byte[] data, DpFormat format = Binary)` | **신규 인스턴스** 생성 |

```csharp
// 바이너리로 팩
byte[] bin = hero.Pack();

// JSON으로 팩
var json = DeukPackCodec.Pack(hero, DpFormat.Json);

// 신규 인스턴스로 언팩
Hero h = DeukPackCodec.Unpack<Hero>(bin);

// 기존 인스턴스에 언팩 — Zero-Alloc (GC 없음)
hero.Unpack(bin);
hero.Unpack(bin, DpFormat.Json);
```

> **Deprecated (그대로 동작):** `DeukPackCodec.UnpackInto(obj, data)` → `DeukPackCodec.Unpack(obj, data)`. `DeukPackCodec.Serialize(obj)` → `DeukPackCodec.Pack(obj)`. `DeukPackCodec.Deserialize<T>(data)` → `deukPack.Unpack<T>(data)`.

### 기타 생성 항목

| 항목 | 용도 |
|------|
| **GetSchema()** | 생성 타입에서 스키마 복구. 메타·검증·Excel. |
| **FieldId** | `public const int` — `StructName.FieldId.PropertyName`. |
| **ProtocolRegistry** | 메시지 타입 ↔ msgId 등. |
| **MetaTableRegistry** | 테이블·메타 타입 등록. |
| **Hero.Unpack(hero, bin)** | 🌟 **Unity Hotpath용 (강제 권장 최적화)**: 미리 생성해둔 인스턴스의 값을 덮어씁니다. GC 스파이크와 프레임 드랍을 완벽히 방지하는 **Zero-Allocation** 방식입니다. |
| **Hero.Unpack(bin)** | ⚠️ **Factory 메서드**: 새 인스턴스를 할당하여 반환합니다. 초기화/설정 파일 등에만 사용하고 인게임 핫패스 루프에서는 사용을 금지합니다. |

**struct extends:** IDL `extends` — 상속·필드 ID 검사. 튜토리얼: [통합 Write·필드 선택·extends](../tutorial/write-with-overrides.ko.md).

---

## Generated C++ APIs

| 항목 | 용도 |
|------|------|
| **kFieldId_\*** | `static constexpr int` — `StructName::kFieldId_PropertyName`. |
| **Binary / pack 출력** | 생성 소스가 C#/JS와 동일한 **필드 ID** 모델을 따름; 스마트 포인터(`std::shared_ptr`)를 지원하여 얕은 복사본 수정 시 사이드 이펙트를 차단하는 분리 접근(detach) 메커니즘을 지원합니다. |
| **Hero::Unpack(hero, bin)** | 🌟 **동적 컨테이너 재사용 (성능 극대화)**: `std::vector` 등 내부 컬렉션의 예약된 용량(Capacity)을 파괴하지 않고 재활용하여 비용이 큰 OS 레벨 힙 메모리 할당 락(Lock)을 방지합니다. |
| **Hero::Unpack(bin)** | ⚠️ **Factory 메서드**: 스택 메모리상에 객체를 복사 없이 RVO(반환값 최적화)로 던져줍니다. 빠르지만 내부의 벡터/앱 배열은 여전히 힙 할당을 일으키므로 핫패스 사용에 유의해야 합니다. |

---

## Generated Java APIs

| 항목 | 용도 |
|------|------|
| **Getters/Setters** | Java Bean 패턴 규격의 필드 접근자. |
| **clone()** | 배열(List) 및 컬렉션을 아우르는 **안전한 깊은 복사(Deep Copy)** 기본 지원. 100만 회 이상의 Multi-pass 메모리 라우팅에서 GC 오버헤드 없이 원본 객체의 불변성을 입증합니다. |
| **Binary / pack 출력** | C#과 1> 1 완벽 호환되는 프로토콜 클래스를 지니며, 엄격한 Struct 객체 생성을 통해 빈 구조체 접근을 네이티브하게 방어합니다. |
| **Hero.unpack(hero, bin)** | 🌟 **네트워크 Hotpath용 (Zero-Allocation)**: 사전 할당된 객체를 오버라이딩하여 Netty 등의 초고성능 NIO 서버에서 동시성 GC 부하를 차단합니다. |
| **Hero.unpack(bin)** | ⚠️ **Factory 메서드**: 새로운 인스턴스를 할당하여 반환합니다. IO가 폭주하는 환경에서는 가비지 처리를 늦추므로 사용을 지양하세요. |

---

## Generated Elixir APIs

| 항목 | 용도 |
|------|------|
| **defstruct** | 컴파일 타임에 필드 오프셋이 고정된 Elixir 고성능 불변 `Map` 생성(`%Struct{}`). |
| **encode/decode** | BEAM VM의 네이티브 **Bitstring 바이너리 패턴 매칭**을 사용하여 JSON 파싱 없이 수백만 번의 이진 패킷을 초단위로 해석합니다. |
| **무결성 보안 (Security Guard)** | 최대 깊이 초과(`MAX_RECURSION_DEPTH`) 및 배열/문자열 초과 길이(`MAX_SAFE_LENGTH`)를 선제적으로 Block(OOM Raise)하는 방어 로직이 내장되어 있습니다. |
| **unpack(bin)** | 🌟 **BEAM 최적화 표준 (Factory)**: Elixir는 순수 불변(Immutable) 객체이므로 매번 새로운 구조체를 반환하는 이 메서드가 가장 표준적이며 빠릅니다. |
| **unpack(struct, bin)** | ⚠️ **깊은 병합 (Merge)**: 기존 객체의 일부 속성들을 덮어쓰기할 때 쓰이지만, BEAM 아키텍처 특성상 여전히 내부적으로는 새로운 메모리를 생성합니다. |

---

## Extended types

**한 줄:** `int8`–`int64`, `uint8`–`uint64`, `float`/`double`, `bool`, `string`/`binary`, `list`/`set`/`map`, **tablelink**, `datetime`/`decimal`, **struct extends**.

| 타입 / 기능 | 득팩 | Protobuf | Thrift |
|-------------|------|----------|--------|
| int8 / int16 / int32 / int64 | ✓ | int32/int64 (int8/int16 없음) | int8/int16/int32/int64 ✓ |
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

- **C#:** `Pack(format, fieldIds, overrides)` — `fieldIds` null 이면 전체 필드; `overrides` null/비어 있으면 치환 없음.
- **JavaScript/TypeScript:** struct 헬퍼의 `pack(obj, format?, fieldIds, overrides)`.

구버전 별도 API (**`Write`**, **`Pack`** 등)는 **제거**되거나 내부 전용으로 숨김 처리되었습니다. 

튜토리얼: [../tutorial/write-with-overrides.ko.md](../tutorial/write-with-overrides.ko.md)

---

## JavaScript (--js) {: #javascript-js }

### 직렬화 — 2-Method 표준 (v1.7.6+)

| 메서드 | 시그니처 | 용도 |
| :--- | :--- | :--- |
| **pack** | `pack(obj, format?, fieldIds?, overrides?)` | 바이너리 또는 JSON 문자열로 직렬화 |
| **unpack** | `unpack(buf, format?)` | **신규** 객체 생성 |
| **unpack** *(zero-alloc)* | `unpack(obj, buf, format?)` | **기존** 객체에 덮어쓰기 |

```js
const bin  = Hero.pack(hero);               // → Uint8Array (바이너리)
const json = Hero.pack(hero, 'json');        // → JSON 문자열
const h1   = Hero.unpack(bin);              // ← 신규 인스턴스
Hero.unpack(cached, bin);                   // ← 기존 인스턴스에 덮어쓰기 (Zero-Alloc)
```

> **Deprecated (그대로 동작):** `Hero.toBinary(obj)` → `Hero.pack(obj)`. `Hero.toJson(obj)` → `Hero.pack(obj, 'json')`. `Hero.fromBinary(buf)` → `Hero.unpack(buf)`. `Hero.fromJson(str)` → `Hero.unpack(str, 'json')`. `Hero.unpackInto(obj, buf)` → `Hero.unpack(obj, buf)`.

| 항목 | 용도 |
|------|------|
| **FieldId** | `{ PropertyName: id, ... }` 객체. |
| **getSchema()** | 런타임 스키마 조회. |

---

## Related product docs

| 구분 | 문서 |
|------|------|
| **코어·엔진** | [코어·엔진](../products/core-engine.ko.md) |
| **프로토콜** | [프로토콜](../products/protocol.ko.md) |
| **Excel·Unity** | [Excel 애드인](../products/excel-addin.ko.md), [파이프라인·Unity](../products/pipeline-unity.ko.md) |
