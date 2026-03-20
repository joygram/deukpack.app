# 튜토리얼: WriteWithOverrides (클론 없이 팬아웃)

**소요**: 약 10분 · **선행**: [빠른 시작](quickstart.md) 또는 [C# 가이드](csharp-guide.md)

**English**: Use the language switcher (top right).

---

## 언제 쓰나

**큰 메시지 인스턴스 하나**를 **많은 수신자**에게 보내야 하고, 수신자마다 **소수의 필드만** 다를 때(표시 이름, 읽음 여부, 로케일별 문구 등). 전체를 **N번 Clone**하면 비용이 큽니다.

득팩은 C# 생성 struct마다 **`WriteWithOverrides`**를 넣습니다. **필드 ID → 대체 값**으로 직렬화하며, 메시지 객체를 바꾸거나 통째로 복제하지 않습니다.

---

## 1. IDL의 필드 ID

Thrift / 득팩 struct는 **숫자 필드 ID**를 씁니다.

```thrift
struct ChatMessage {
  1: i32 msgId;
  2: string body;
  3: string displayNameForRecipient;
  4: bool isReadForRecipient;
}
```

`npx deukpack ... --csharp` 후 생성된 클래스에는 nested **`FieldId`** 클래스가 자동 포함됩니다. 숫자를 직접 쓸 필요 없이 `ChatMessage.FieldId.DisplayNameForRecipient`처럼 이름으로 참조합니다. IDL이 바뀌면 재생성 시 컴파일 타임에 깨집니다.

---

## 2. C# 사용법

```csharp
var msg = BuildMessageOnce(); // 무거운 작업은 한 번

var overrides = new Dictionary<int, object>
{
    { ChatMessage.FieldId.DisplayNameForRecipient, "Alice (you)" },
    { ChatMessage.FieldId.IsReadForRecipient, false }
};
msg.WriteWithOverrides(oprot, overrides);
```

규칙:

- **키** = `StructName.FieldId.PropertyName` (생성된 `const int`). 숫자 직접 사용 금지.
- **값** = 생성된 프로퍼티와 같은 CLR 타입 (타입이 맞지 않으면 캐스트 예외).
- `overrides`가 **null**이거나 **비어 있으면** **`Write(oprot)`**와 동일.
- 필드가 **다른 struct**이거나 **list/map**이면 값은 **그 필드 타입 전체 인스턴스**(또는 컬렉션 전체)로 넘긴다. 안쪽 멤버만 골라 바꾸는 중첩 키 API는 없다. → 코어 [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md) **§1.3**.

전체 API 표·C++/JS: [API·타입 참조](../reference/api.md) · 코어 저장소 [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## 3. JavaScript (`--js`)

`javascript/generated.js`에 struct 헬퍼마다 **`applyOverrides`**, **`toJsonWithOverrides`**, **`FieldId`**가 붙습니다.

```javascript
var F = ChatMessage.FieldId;
var patched = ChatMessage.applyOverrides(msg, { [F.DisplayNameForRecipient]: "Bob" });
var json = ChatMessage.toJsonWithOverrides(msg, { [F.DisplayNameForRecipient]: "Bob", [F.IsReadForRecipient]: true });
```

---

## 4. C++

각 struct에 **`kFieldId_*`** 상수와 **`apply_overrides(const std::unordered_map<int, std::any>&)`**가 생성됩니다:

```cpp
std::unordered_map<int, std::any> o;
o[ChatMessage::kFieldId_DisplayNameForRecipient] = std::string("Bob");
msg.apply_overrides(o);
```

[API·타입 참조](../reference/api.md) 참고.

---

## 5. WriteFields — 필드 선택 직렬화

`WriteFields`는 풀 레코드에서 **지정한 필드만** 직렬화한다. partial 타입을 만들거나 필드를 하나씩 복사할 필요 없이, 런타임에 원하는 컬럼만 골라 보낸다.

```csharp
var full = LoadFullUser();
full.WriteFields(oprot, new[] {
    UserRecord.FieldId.DisplayName,
    UserRecord.FieldId.Level,
    UserRecord.FieldId.AvatarUrl
});
```

`overrides`와 결합도 가능하다:

```csharp
full.WriteFields(oprot, new[] {
    UserRecord.FieldId.DisplayName,
    UserRecord.FieldId.Level
}, new Dictionary<int, object> {
    { UserRecord.FieldId.DisplayName, r.LocalizedName }
});
```

JavaScript에서는 `projectFields`와 `toJsonWithFields`를 사용한다:

```javascript
var F = UserRecord.FieldId;
var partial = UserRecord.projectFields(full, [F.DisplayName, F.Level]);
var json = UserRecord.toJsonWithFields(full, [F.DisplayName, F.Level]);
```

---

## 6. struct extends — 상속

IDL에서 `extends`를 쓰면 부모 필드를 자식에 자동 병합한다. 공통 필드를 한 곳에 정의하고, 자식은 고유 필드만 추가하면 된다.

```thrift
struct UserBase {
  1: i32 id;
  2: string displayName;
}

struct UserFull extends UserBase {
  3: i32 level;
  4: string avatarUrl;
}
```

생성된 `UserFull`은 필드 4개(1~4)를 모두 갖는다. 다단 상속(A → B → C)도 지원하며 필드 ID 충돌 시 빌드 에러가 난다.

---

## 7. 관련: 와이어 프로파일(서브셋 타입)

**다른 목적**: 클라이언트 프로파일마다 **필드 자체를 숨김** → `wireProfiles` annotation과 `--wire-profile`. [DEUKPACK_WIRE_PROFILE_SUBSET.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_PROFILE_SUBSET.md).

---

## 8. 기능 비교표

| | WriteWithOverrides | WriteFields | Wire Profile | extends |
|---|---|---|---|---|
| 목적 | 전 필드 전송, 일부 **값만** 교체 | 선택한 필드**만** 전송 | 빌드 타임 서브셋 타입 | 공통 필드 상속 |
| 결정 시점 | 런타임 | 런타임 | 빌드 타임 | IDL 정의 시 |
| 결합 | — | `overrides` 파라미터 | — | 모든 기능과 |
| 동적 선택 | 가능 | 가능 | 불가 | — |

---

## 9. 코어 저장소 샘플

- IDL 스니펫·필드 ID 설명: [examples/write-with-overrides/README.md](https://github.com/joygram/DeukPack/tree/main/examples/write-with-overrides)
- C# 스모크: [examples/consumer-csharp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-csharp) — `DemoUser.FieldId.Name`, `DemoUser.FieldId.Home` 등 사용
