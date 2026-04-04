# IDL 가이드

득팩은 `.deuk**(네이티브)와 **.thrift**·**.proto** 를 입력으로 받습니다. 여기서는 메시지·타입을 정의하는 데 필요한 **IDL 문법`을 Thrift·Protobuf 수준으로 정리합니다.

---

## 1. 파일과 네임스페이스

**진입 파일**: 코드 생성 시 지정하는 루트 IDL 하나 (예: `schema.deuk`, `api.thrift`). 이 파일과 `include` 하는 모든 파일이 한 AST로 합쳐집니다.

**네임스페이스** (생성 코드의 패키지/네임스페이스에 대응):

```thrift
namespace csharp MyApp.Protocol
namespace cpp myapp.protocol
```

`.deuk` 에서는 동일 문법 또는 `namespace MyApp` 처럼 공통 네임스페이스를 쓸 수 있습니다. 생성되는 C#/C++ 타입의 네임스페이스/패키지가 여기서 정해집니다.

---

## 2. 기본 타입

| IDL 타입 | 설명 | C# 대응 | C++ 대응 |
|----------|------|---------|----------|
| `bool` | 참/거짓 | `bool` | `bool` |
| `byte` | 8비트 부호 없음 | `byte` | `uint8_t` |
| `int16` | 16비트 정수 | `short` | `int16_t` |
| `int32` | 32비트 정수 | `int` | `int32_t` |
| `int64` | 64비트 정수 | `long` | `int64_t` |
| `double` | 64비트 부동소수 | `double` | `double` |
| `string` | UTF-8 문자열 | `string` | `std::string` |
| `binary` | 바이트 배열 | `byte[]` | `std::string` / 버퍼 |

---

## 3. 구조체 (struct)

메시지·DTO는 `struct` 로 정의합니다. 필드마다 `필드 ID`(숫자)를 부여해야 하며, 나중에 필드를 추가·삭제할 때 `스키마 진화`에서 이 ID가 사용됩니다.

```thrift
struct DemoPoint {
    > 1 x
    > 2 y
}

struct DemoUser {
    > 1 id
    > 2 name
    > 3 home    // 중첩 구조체
}
```

- **필드 ID**: 1, 2, 3, … — 프로토콜에서 필드 식별에 사용. 한 번 배정한 ID는 변경하지 않는 것이 안전합니다.
- **선택 필드**: 문법에 따라 `optional` 등이 지원될 수 있습니다. (구현·버전에 따라 상이 — 코어 저장소 [docs](https://github.com/joygram/DeukPack/tree/main/docs) 참고.)
- **기본값**: IDL에서 기본값을 지정하면 생성 코드·스키마에 반영됩니다.

---

## 4. 열거형 (enum)

```thrift
enum Status {
  Unknown = 0
  Active = 1
  Inactive = 2
}

struct Item {
    > 1 id
    > 2 name
    > 3 status = Status.Unknown
}
```

enum 값(숫자)은 직렬화 시 그대로 쓰이므로, 기존에 쓰이던 값을 바꾸지 않는 것이 좋습니다.

---

## 5. 컨테이너: list, set, map

```thrift
struct Example {
    > 1 ids
    > 2 tags
    > 3 uniqueNames
  4> map<int32, string> idToName
}
```

- **list**: 순서 있는 목록.
- **set**: 유일한 값들의 집합.
- **map**: 키-값 쌍. 키 타입은 정수·문자열 등 프로토콜에서 지원하는 타입.

---

## 6. include — 여러 파일로 나누기

한 파일에서 다른 IDL 파일을 가져올 때 **include** 를 씁니다. 코드 생성 시 **include 경로** (`-I`)를 지정해야 합니다.

```thrift
// api.thrift
include "shared.thrift"

struct Request {
    > 1 id
  2> shared.CommonHeader header
}
```

```bash
npx deukpack ./api.thrift ./gen -I ./idl --csharp --cpp
```

진입 파일은 `api.thrift`, `shared.thrift` 는 `-I ./idl` 아래에서 찾습니다.

---

## 7. .deuk vs .thrift vs .proto

| 항목 | .deuk | .thrift | .proto |
|------|-------|---------|--------|
| **역할** | 득팩 네이티브 | Apache Thrift 호환 | Protobuf 호환 |
| **혼합** | 한 빌드에서 .deuk + .thrift + .proto include 가능 | | |
| **문법** | Thrift와 유사 + table 등 확장 | Thrift 표준 | Protobuf 표준 |

기존 .thrift·.proto 파일은 **그대로** include 하고, 새로 작성할 때는 .deuk 를 쓰면 확장 문법(테이블·메타 등)을 쓸 수 있습니다. 상세는 [코어·엔진](../products/core-engine.ko.md)과 [GitHub docs](https://github.com/joygram/DeukPack/tree/main/docs)를 참고하세요.

---

## 8. 다음 단계

- [빠른 시작](quickstart.ko.md) — 이 문법으로 파일을 만들고 코드 생성하기
- [프로토콜·직렬화](protocol-serialization.ko.md) — Binary/Compact/JSON 선택과 직렬화
- [C# 가이드](csharp-guide.ko.md) / [C++ 가이드](cpp-guide.ko.md) — 생성 코드 사용
