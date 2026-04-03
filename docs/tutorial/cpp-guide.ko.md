# C++ 가이드

득팩으로 생성한 **C++ 헤더·소스**를 프로젝트에서 사용하는 방법입니다. 서버·네이티브 툴에 적용할 때 참고하세요.

---

## 1. 코드 생성

IDL에서 C++를 뽑을 때는 `--cpp` 를 지정합니다.

```bash
npx deukpack ./schema.deuk ./gen --cpp --protocol tbinary
```

생성물은 `gen/cpp/` (또는 지정한 출력 폴더) 아래에 IDL 소스당 `<stem>_deuk.h`, `<stem>_deuk.cpp` 가 생성됩니다(`_deuk` 접미사로 수동 작성 `Foo.h` 와 이름 충돌을 피함). **include만 있는** `.deuk`은 **umbrella** `<stem>_deuk.h`에 나열된 include에 대응하는 `*_deuk.h`만 앞으로 `#include`합니다(바깥 C++ `namespace`로 감싸지 않음). C++17을 전제로 합니다.

---

## 2. 빌드에 포함

- **include 경로**: 생성된 헤더가 있는 디렉터리를 include path에 추가합니다 (예: `gen/cpp`, `gen/cpp/include` — 구조는 생성 결과에 따름).
- **소스**: 생성된 `*_deuk.cpp` 파일을 빌드 대상에 넣습니다.

**CMake 예시**:

```cmake
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/../gen/cpp)
set(GEN_SOURCES
  ../gen/cpp/DemoPoint_deuk.cpp
  ../gen/cpp/DemoUser_deuk.cpp
  # 또는 file(GLOB ...) 로 생성 *_deuk.cpp 수집
)
add_executable(demo main.cpp ${GEN_SOURCES})
```

실제 파일명·경로는 IDL 구조에 따라 다릅니다. **동작 예제**는 [코어 저장소 examples/consumer-cpp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-cpp)를 참고하세요.

---

## 3. 직렬화·역직렬화

생성된 C++ 타입은 **Read** / **Write** (또는 프로토콜별 인터페이스)로 직렬화·역직렬화합니다. 버퍼·스트림은 런타임이 제공하는 방식에 맞춰 사용합니다.

**개념 예시**:

```cpp
#include "gen/cpp/DemoUser_deuk.h"  // 실제 경로·헤더명은 생성 결과에 따름

// 쓰기
DemoUser user;
user.id = 1;
user.name = "Alice";
user.home.x = 10;
user.home.y = 20;
// 프로토콜별 Writer로 user.Write(...) 호출 → 버퍼/스트림에 직렬화

// 읽기
// 버퍼/스트림에서 Reader로 DemoUser::Read(...) 호출 → 인스턴스 복원
```

정확한 API는 생성 코드와 코어 C++ 런타임 문서를 확인하세요.

---

## 4. kFieldId · pack/바이너리 쓰기 · extends

생성된 각 `struct`에 다음이 포함됩니다:

- **`kFieldId_*`** — `static constexpr int` 필드 ID 상수. `StructName::kFieldId_PropertyName`으로 참조.
- **생성된 pack/바이너리(또는 Thrift 호환) 쓰기 헬퍼** — C#/JS와 동일한 필드 ID 모델; 팬아웃·부분 전송 시 타입 옆 헬퍼 사용(별도 `Pack` 단계 없음).
- **struct extends** — IDL에서 `extends`로 부모 필드를 자식에 자동 병합. 코드젠 시 플랫 구조로 생성.

튜토리얼·비교표: [통합 Write](write-with-overrides.ko.md) · [API·타입 참조](../reference/api.ko.md).

---

## 5. 프로토콜 (Binary / Compact / JSON)

생성 시 `--protocol tbinary`(또는 `tcompact`, `tjson`, `pack`, `json` 등)에 따라 사용하는 Reader/Writer가 달라집니다.  
- **binary**: Thrift Binary 프로토콜과 호환되는 바이너리 포맷.  
- **compact**: 공간 효율이 좋은 바이너리.  
- **json**: 디버깅·REST 연동 시 유용.

자세한 선택 기준은 [프로토콜·직렬화](protocol-serialization.ko.md)를 참고하세요.

---

## 6. 다음 단계

- [통합 Write](write-with-overrides.ko.md) — 오버라이드·필드 선택·extends
- [프로토콜·직렬화](protocol-serialization.ko.md) — 프로토콜별 차이와 사용 흐름
- [API·타입 참조](../reference/api.ko.md) — CLI 옵션·생성물 개요
- [코어 examples/consumer-cpp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-cpp) — CMake + 실행 가능한 C++ 샘플
