# C++ 가이드

득팩으로 생성한 **C++ 헤더·소스**를 프로젝트에서 사용하는 방법입니다. 서버·네이티브 툴에 적용할 때 참고하세요.

---

## 1. 코드 생성

IDL에서 C++를 뽑을 때는 `--cpp` 를 지정합니다.

```bash
npx deukpack ./schema.deuk ./gen --cpp --protocol binary
```

생성물은 `gen/cpp/` (또는 지정한 출력 폴더) 아래에 `*_types.h`, `*_types.cpp` 등이 생성됩니다. C++17을 전제로 합니다.

---

## 2. 빌드에 포함

- **include 경로**: 생성된 헤더가 있는 디렉터리를 include path에 추가합니다 (예: `gen/cpp`, `gen/cpp/include` — 구조는 생성 결과에 따름).
- **소스**: `*_types.cpp` 등 생성된 `.cpp` 파일을 빌드 대상에 넣습니다.

**CMake 예시**:

```cmake
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/../gen/cpp)
set(GEN_SOURCES
  ../gen/cpp/DemoPoint_types.cpp
  ../gen/cpp/DemoUser_types.cpp
  # 또는 file(GLOB ...) 로 생성 *.cpp 수집
)
add_executable(demo main.cpp ${GEN_SOURCES})
```

실제 파일명·경로는 IDL 구조에 따라 다릅니다. **동작 예제**는 [코어 저장소 examples/consumer-cpp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-cpp)를 참고하세요.

---

## 3. 직렬화·역직렬화

생성된 C++ 타입은 **Read** / **Write** (또는 프로토콜별 인터페이스)로 직렬화·역직렬화합니다. 버퍼·스트림은 런타임이 제공하는 방식에 맞춰 사용합니다.

**개념 예시**:

```cpp
#include "gen/cpp/DemoUser_types.h"  // 실제 경로·헤더명은 생성 결과에 따름

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

## 4. apply_overrides · kFieldId · extends

생성된 각 `struct`에 다음이 포함됩니다:

- **`apply_overrides(const std::unordered_map<int, std::any>&)`** — 직렬화 전에 필드 ID로 멤버를 덮어씀 (팬아웃).
- **`kFieldId_*`** — `static constexpr int` 필드 ID 상수. `StructName::kFieldId_PropertyName`으로 참조.
- **struct extends** — IDL에서 `extends`로 부모 필드를 자식에 자동 병합. 코드젠 시 플랫 구조로 생성.

튜토리얼·비교표: [WriteWithOverrides·WriteFields·extends](write-with-overrides.md) · [API·타입 참조](../reference/api.md).

---

## 5. 프로토콜 (Binary / Compact / JSON)

생성 시 `--protocol binary`(또는 compact, json)에 따라 사용하는 Reader/Writer가 달라집니다.  
- **binary**: Thrift Binary 프로토콜과 호환되는 바이너리 포맷.  
- **compact**: 공간 효율이 좋은 바이너리.  
- **json**: 디버깅·REST 연동 시 유용.

자세한 선택 기준은 [프로토콜·직렬화](protocol-serialization.md)를 참고하세요.

---

## 6. 다음 단계

- [WriteWithOverrides·WriteFields·extends](write-with-overrides.md) — 교체·선택·상속 패턴
- [프로토콜·직렬화](protocol-serialization.md) — 프로토콜별 차이와 사용 흐름
- [API·타입 참조](../reference/api.md) — CLI 옵션·생성물 개요
- [코어 examples/consumer-cpp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-cpp) — CMake + 실행 가능한 C++ 샘플
