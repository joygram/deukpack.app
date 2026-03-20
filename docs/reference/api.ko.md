# API·타입 참조

득팩 코어의 **CLI 사용법**과 **생성 코드·런타임에서 쓰는 API** 요약입니다. 상세는 [GitHub 코어 저장소](https://github.com/joygram/DeukPack)와 제품별 문서를 참고하세요.

**English**: Use the language switcher (top right).

---

## CLI

**명령 형식**

```bash
npx deukpack <진입_IDL_경로> <출력_디렉터리> [옵션]
```

**주요 옵션**

| 옵션 | 설명 |
|------|------|
| `--csharp` | C# 코드 생성 |
| `--cpp` | C++ 코드 생성 |
| `--js` | JavaScript 코드 생성 (도구·BFF 등) |
| `-I <경로>` | include 경로 (여러 개 가능) |
| `--protocol <binary\|compact\|json>` | 직렬화 프로토콜 지정 |
| `--pipeline <config.json>` | 파이프라인 설정 파일로 여러 작업 일괄 실행 |
| `--wire-profile <name>` | 와이어 프로파일 서브셋 타입·JS 헬퍼 생성 (반복 또는 쉼표 구분). [와이어 프로파일 서브셋](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_PROFILE_SUBSET.md) 참고. |

**예시**

```bash
npx deukpack ./schema.deuk ./gen --csharp --cpp -I ./idl
npx deukpack ./api.deuk ./out --csharp --protocol binary
npx deukpack --pipeline ./deukpack-pipeline.json
```

전체 옵션은 `npx deukpack --help` 로 확인할 수 있습니다.

---

## 프로그램 방식 (라이브러리)

Node에서 **파싱·AST**까지 쓰려면 `DeukPackEngine`(또는 해당 진입점)을 사용합니다. **다언어 코드 생성**은 v1에서 **CLI 사용**을 권장합니다. ([v1 범위](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_V1_RELEASE_SCOPE.md))

- **코어 저장소**: `src/` 및 [docs](https://github.com/joygram/DeukPack/tree/main/docs) 참고.

---

## 생성 코드에서 쓰는 API (C#)

득팩이 생성하는 C# 코드에서 자주 참조하는 것들입니다.

| 항목 | 용도 |
|------|------|
| **GetSchema()** | 생성된 타입에서 스키마(필드·타입·기본값 등)를 복구하는 API. 메타·검증·Excel 연동에 사용. |
| **WriteWithOverrides(oprot, overrides)** | Clone 없이 직렬화: `Dictionary<int, object>`의 키는 **필드 ID**, 값은 해당 쓰기에서만 프로퍼티를 대체. `overrides`가 null이거나 비어 있으면 **`Write(oprot)`**와 동일. |
| **WriteFields(oprot, fieldIds, overrides?)** | 풀 레코드에서 `fieldIds`에 포함된 필드만 직렬화. `overrides`(선택)로 값 교체도 가능. partial 타입 없이 런타임 projection. |
| **FieldId (nested class)** | 모든 struct에 자동 생성되는 `public const int` 상수. `StructName.FieldId.PropertyName`으로 참조. 매직 넘버 제거, 컴파일 타임 안전. |
| **ProtocolRegistry** | 메시지 타입 ↔ 식별자(msgId 등) 매핑. 디스패치·직렬화 시 참조. |
| **MetaTableRegistry** | 테이블·메타 타입 등록. 테이블 기반 데이터 로드·검증에 사용. |
| **IDeukPackReader / IDeukPackWriter** | Binary/Compact/JSON 등 프로토콜별 읽기·쓰기. 직렬화·역직렬화 시 사용. |

**struct extends**: IDL에서 `extends`로 부모 필드를 자식에 자동 병합. 다단 상속·필드 ID 충돌 검사 지원.

튜토리얼(교체·선택·상속): [WriteWithOverrides·WriteFields·extends](../tutorial/write-with-overrides.md). 상세 API: [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

프로토콜 상세·와이어 포맷은 [프로토콜](../products/protocol.md) 문서를, Excel·메타 규칙은 [Excel 애드인](../products/excel-addin.md)을 참고하세요.

---

## 생성 코드 API (C++)

| 항목 | 용도 |
|------|------|
| **apply_overrides(std::unordered_map<int, std::any>)** | 생성된 각 `struct` 멤버: 필드 ID별 값 적용 후 프로젝트에서 직렬화. 헤더에 `<any>`, `<unordered_map>` 포함. |
| **kFieldId_\*** | 각 struct에 `static constexpr int` 필드 ID 상수 생성. `StructName::kFieldId_PropertyName`. |

---

## 확장 데이터 타입 (Protobuf / Thrift 대비)

**한 줄 요약:** `int8`–`int64`, `uint8`–`uint64`, `float`/`double`, `bool`, `string`/`binary`, `list`/`set`/`map`, **tablelink**, `datetime`/`decimal`, **struct extends**.

| 타입 / 기능 | 득팩 | Protobuf | Thrift |
|-------------|------|----------|--------|
| int8 / int16 / int32 / int64 | ✓ | int32/int64 (int8/int16 없음) | i8/i16/i32/i64 ✓ |
| uint8 / uint16 / uint32 / uint64 | ✓ | uint32/uint64 (uint8/uint16 없음) | byte만(uint8) |
| float / double | ✓ | ✓ | ✓ |
| bool, string, binary | ✓ | ✓ (bytes) | ✓ |
| list / set / map | ✓ | repeated/map | list/set/map ✓ |
| **tablelink** | ✓ (DB/테이블 행 참조) | — | — |
| **datetime** | ✓ (확장) | — | — |
| **decimal** | ✓ (확장) | — | — |
| **struct extends** | ✓ (다단계, 와이어 호환) | oneof/메시지 중첩 | — |

의미(기본값, 와이어 포맷, C#/C++/JS 매핑)는 IDL 및 코드생성에서 타입별로 정의됨; 생성 코드와 스키마 참고.

---

## 확장 기능

- **구조체 상속(extends):** 베이스/파생 구조체, 다단계; 와이어 레이아웃 호환으로 구버전 클라이언트는 알 수 없는 필드 생략 가능.
- **FieldId 상수:** 각 구조체에 정적 `FieldId` 제공 (C#: `StructName.FieldId.FieldName`, JS: `StructName.FieldId.PropertyName`) — **WriteFields**, **WriteWithOverrides**에서 사용.
- **와이어 프로파일:** Binary/Compact/JSON 및 선택적 msgId; 프로토콜 레지스트리로 버전 관리.
- **커스텀/플러그인 코드생성:** 코드생성은 스크립트 기반(예: `build_deukpack.js`); 새 타깃·규칙을 위해 생성기 확장·교체 가능.

---

## 골라보내기 (WriteFields)

**일부 필드만** 보내고, 필요 시 해당 필드만 **덮어쓰기**할 수 있음.

- **C#:** `WriteFields(stream, obj, fieldIds, overrides?)` — 지정한 필드 ID만 직렬화; `overrides`는 `Dictionary<int, object>`로 직렬화 전 적용(WriteWithOverrides와 동일 의미).
- **JS:** `projectFields(obj, fieldIds, overrides?)` — 해당 필드만 가진 객체 반환; `toJsonWithFields(obj, fieldIds, overrides?)` — 그 결과를 Thrift JSON으로 직렬화.

**용도:** 페이로드 축소(예: 모바일) 또는 민감 필드 제외. overrides로 선택 필드만 다른 값으로 치환(예: PII 마스킹) 가능.

**예시(개념):** `fieldIds = [StructName.FieldId.Name, StructName.FieldId.Level]` → 두 필드만 직렬화; 선택적으로 `overrides: { [FieldId.Name]: "***" }`로 `Name` 값만 교체.

---

## 일부 교체 (WriteWithOverrides)

**필드별 오버라이드**(수신자별·요청별 치환)로 직렬화하며, **원본 구조체를 복제하지 않음**.

- **C#:** `WriteWithOverrides(stream, obj, overrides)`, `overrides`는 `Dictionary<int, object>`. `overrides`에 있는 키만 직렬화 시 치환되고 나머지는 `obj` 값 사용. 구현은 가상 뷰(오버라이드를 직렬화 시점에 적용)로 쓰므로 원본 `obj`는 변경되지 않음.
- **JS:** `applyOverrides(obj, overrides)` — 오버라이드 적용한 얕은 복사 반환; `toJsonWithOverrides(obj, overrides)` — 그 후 Thrift JSON 직렬화.

**용도:** 동일 논리 구조체를 수신자별(예: A는 `price`, B는 `"***"`) 또는 요청별(예: 서버 타임스탬프 덮어쓰기)로 일부 필드만 바꿔 직렬화. 하나의 베이스 객체로 여러 직렬화 결과 생성.

**예시(개념):** `overrides = { [StructName.FieldId.Price]: 0, [StructName.FieldId.Timestamp]: serverNow }` → 직렬화 결과에서 `Price`·`Timestamp`만 해당 값으로, 나머지는 원본 값.

---

## 생성 코드 API (JavaScript, `--js`)

`javascript/generated.js`의 struct 헬퍼마다:

| 항목 | 용도 |
|------|------|
| **applyOverrides(obj, overrides)** | `obj` 얕은 복사 후 `{ 필드ID: 값 }` 적용. 원본 `obj`는 변경하지 않음. |
| **toJsonWithOverrides(obj, overrides)** | 위와 동일 후 Thrift JSON 문자열로 직렬화. |
| **projectFields(obj, fieldIds, overrides?)** | `fieldIds`에 포함된 필드만 추출한 새 객체 반환. `overrides`(선택)로 값 교체. |
| **toJsonWithFields(obj, fieldIds, overrides?)** | 위와 동일 후 Thrift JSON 문자열로 직렬화. |
| **FieldId** | `StructName.FieldId = { PropertyName: id, ... }`. 각 struct의 필드 ID 상수 객체. |

내부 헬퍼: `_applyOverrides(obj, overrides, schema)`, `_projectFields(obj, fieldIds, schema, overrides)`.

---

## 제품별 문서

| 구분 | 문서 |
|------|------|
| **코어·엔진** | [코어·엔진](../products/core-engine.md) — IDL 입력, 코드 생성, 스키마·SQLite |
| **프로토콜** | [프로토콜](../products/protocol.md) — Binary/Compact/JSON, msgId, 직렬화 |
| **Excel·Unity** | [Excel 애드인](../products/excel-addin.md), [파이프라인·Unity](../products/pipeline-unity.md) |
