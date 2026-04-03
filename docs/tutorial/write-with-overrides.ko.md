# 튜토리얼: 통합 Write — 오버라이드와 필드 선택

**소요**: 약 10분 · **선행**: [빠른 시작](quickstart.ko.md) 또는 [C# 가이드](csharp-guide.ko.md)

**English**: Use the language switcher (top right).

---

## 언제 쓰나

**큰 메시지 인스턴스 하나**를 **많은 수신자**에게 보내야 하고, 수신자마다 **소수의 필드만** 다를 때(표시 이름, 읽음 여부, 로케일별 문구 등). 전체를 **N번 Clone**하면 비용이 큽니다.

득팩은 C# 생성 struct마다 **`Pack(format, fieldIds, overrides?)`** 를 추가합니다. **`fieldIds`에 `null`**이면 **전체 필드**를 보내고, 선택적으로 **`Dictionary<int, object>`**로 필드 ID별 치환값을 넘기며, 메시지 객체를 바꾸거나 통째로 복제하지 않습니다.

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

## 2. C# — 오버라이드(전체 필드)

```csharp
var msg = BuildMessageOnce(); // 무거운 작업은 한 번

var overrides = new Dictionary<int, object>
{
    { ChatMessage.FieldId.DisplayNameForRecipient, "Alice (you)" },
    { ChatMessage.FieldId.IsReadForRecipient, false }
};
byte[] bin = msg.Pack(DpFormat.Binary, null, overrides);
network.Send(bin);
```

규칙:

- **키** = `StructName.FieldId.PropertyName` (생성된 `const int`). 숫자 직접 사용 금지.
- **값** = 생성된 프로퍼티와 같은 CLR 타입 (타입이 맞지 않으면 캐스트 예외).
- `overrides`가 **null**이거나 **비어 있으면** 일반 **`Pack()`** 과 동일하게 전체가 쓰입니다.
- 필드가 **다른 struct**이거나 **list/map**이면 값은 **그 필드 타입 전체 인스턴스**(또는 컬렉션 전체)로 넘긴다. 안쪽 멤버만 골라 바꾸는 중첩 키 API는 없다. → 코어 [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md) **§1.3**.

전체 API 표·C++/JS: [API·타입 참조](../reference/api.ko.md) · 코어 저장소 [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## 3. JavaScript (`--js`)

`js/generated_deuk.js` struct 헬퍼마다 **`pack`**, **`unpack`**, **`FieldId`**가 붙는다 (*v1.7.6+ 표준; `toBinary`/`toJson`은 deprecated alias*):

```javascript
var F = ChatMessage.FieldId;
// JSON으로 pack (오버라이드 포함)
var json = ChatMessage.pack(msg, 'json', null, {
  [F.DisplayNameForRecipient]: "Bob",
  [F.IsReadForRecipient]: true
});
// 바이너리로 pack
var bin = ChatMessage.pack(msg, undefined, null, {
  [F.DisplayNameForRecipient]: "Bob"
});
```

```javascript
var F = ChatMessage.FieldId;
var json = ChatMessage.toJson(msg, null, {
  [F.DisplayNameForRecipient]: "Bob",
  [F.IsReadForRecipient]: true
});
```

---

## 4. C++

각 struct에 C#/JS와 맞는 **`kFieldId_*`** 상수가 있습니다. 타입 옆에 생성된 **pack/바이너리(또는 Thrift 호환) 쓰기 경로**를 쓰면 되며, 현재 생성물에는 별도 **`apply_overrides`** 단계가 없습니다.

[API·타입 참조](../reference/api.ko.md) 참고.

---

## 5. 필드 선택

**`Pack(format, fieldIds, overrides?)`** 에서 `fieldIds`가 null이 아니면 **나열된 필드만** 직렬화합니다. partial 타입이나 필드 단위 복사가 필요 없습니다.

```csharp
var full = LoadFullUser();
byte[] bin = full.Pack(DpFormat.Binary, new[] {
    UserRecord.FieldId.DisplayName,
    UserRecord.FieldId.Level,
    UserRecord.FieldId.AvatarUrl
});
```

선택과 오버라이드를 함께:

```csharp
byte[] bin2 = full.Pack(DpFormat.Binary, new[] {
    UserRecord.FieldId.DisplayName,
    UserRecord.FieldId.Level
}, new Dictionary<int, object> {
    { UserRecord.FieldId.DisplayName, r.LocalizedName }
});
```

JavaScript — 인자 형태 동일:

```javascript
var F = UserRecord.FieldId;
var ids = [F.DisplayName, F.Level];
var json = UserRecord.pack(full, 'json', ids, null);
var json2 = UserRecord.pack(full, 'json', ids, { [F.DisplayName]: r.LocalizedName });
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

| | 오버라이드(전체 필드) | 필드 서브셋 | Wire Profile | extends |
|---|---|---|---|---|
| 목적 | 전 필드 전송, 일부 **값만** 교체 | 선택한 필드**만** 전송 | 빌드 타임 서브셋 타입 | 공통 필드 상속 |
| 결정 시점 | 런타임 | 런타임 | 빌드 타임 | IDL 정의 시 |
| API | `Write(oprot, null, overrides)` | `Write(oprot, fieldIds, overrides?)` | — | 모든 기능과 |
| 동적 선택 | 가능 | 가능 | 불가 | — |

---

## 9. 코어 저장소 샘플

- IDL 스니펫·필드 ID 설명: [examples/write-with-overrides/README.ko.md](https://github.com/joygram/DeukPack/tree/main/examples/write-with-overrides)
- C# 스모크: [examples/consumer-csharp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-csharp) — `DemoUser.FieldId.Name`, `DemoUser.FieldId.Home` 등 사용

---

## 다음 단계

- [C# 가이드](csharp-guide.ko.md) — 읽기/쓰기, GetSchema, 런타임 참조
- [API·타입 참조](../reference/api.ko.md) — CLI·`--wire-profile` 포함
- [키트 라인업](../deukpack-kits.ko.md) — 네트워크·채팅 키트의 팬아웃 안내
