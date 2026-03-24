# C# 가이드

득팩으로 생성한 **C# 코드**를 프로젝트에서 사용하는 방법입니다. .NET·Unity 공통으로 참고할 수 있습니다.

---

## 1. 코드 생성

IDL에서 C#을 뽑을 때는 `--csharp` 를 지정합니다.

```bash
npx deukpack ./schema.deuk ./gen --csharp --protocol tbinary
```

생성물은 보통 `gen/csharp/` (또는 지정한 출력 폴더) 아래에 IDL 소스당 `<stem>_deuk.cs` 형태로 나옵니다(수동 작성 `Player.cs` 등과 이름 충돌 완화). `MetaTableRegistry.g.cs` 등 공용 파일명은 기존과 같습니다.  
**런타임**은 npm 패키지의 `dist/csharp` 또는 [DeukPack 코어 저장소](https://github.com/joygram/DeukPack)의 `DeukPack.Protocol` 프로젝트를 참조해야 합니다. 생성 코드만으로는 동작하지 않습니다.

---

## 2. 프로젝트에 참조 추가

- **생성된 `.cs`**: 출력 폴더의 모든 C# 파일을 프로젝트에 포함하거나, 해당 폴더를 포함하는 디렉터리를 참조합니다.
- **런타임**: `DeukPack.Protocol` (또는 게임 솔루션에 이미 있는 동등 런타임)을 프로젝트 참조로 추가합니다.

예 (`.csproj`):

```xml
<ItemGroup>
  <Compile Include="..\gen\csharp\**\*.cs" />
</ItemGroup>
<ItemGroup>
  <ProjectReference Include="..\path\to\DeukPack.Protocol\DeukPack.Protocol.csproj" />
</ItemGroup>
```

npm만 설치한 경우: `node_modules/deukpack/dist/csharp` 에 있는 런타임 소스를 참조하거나, 팀에서 사용하는 DeukPack 런타임 어셈블리를 사용합니다.

---

## 3. 직렬화·역직렬화 (읽기/쓰기)

생성된 타입은 **IDeukPackReader** / **IDeukPackWriter** (또는 프로토콜별 Reader/Writer)로 직렬화·역직렬화합니다. 프로토콜은 생성 시 `--protocol tbinary`(또는 `tcompact`, `tjson`, `pack`, `json` 등)에 맞춰 선택합니다.

**쓰기 예시 (개념)**:

```csharp
var value = new DemoUser { Id = 1, Name = "Alice", Home = new DemoPoint { X = 10, Y = 20 } };
using var stream = new MemoryStream();
var writer = /* Binary/Compact/JSON Writer 생성 (생성 코드·런타임 API 참고) */;
value.Write(writer);
byte[] bytes = stream.ToArray();
```

**읽기 예시 (개념)**:

```csharp
using var stream = new MemoryStream(bytes);
var reader = /* 해당 프로토콜 Reader 생성 */;
var value = DemoUser.Read(reader);
```

실제 클래스명·메서드는 생성된 코드와 런타임 버전에 따라 다릅니다. **동작하는 전체 예제**는 [코어 저장소 examples/consumer-csharp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-csharp)를 참고하세요.

---

## 4. GetSchema()

생성된 타입에는 **GetSchema()** (또는 유사 API)가 있어, 필드·타입·기본값 등 **스키마 메타**를 런타임에 가져올 수 있습니다. Excel·검증·에디터 연동에 활용합니다.

```csharp
var schema = DemoUser.GetSchema();
// schema 로 필드 목록, 타입, 기본값 등 조회
```

---

## 5. ProtocolRegistry·메시지 디스패치

**ProtocolRegistry**는 메시지 타입 ↔ 식별자(msgId 등) 매핑을 제공합니다. 서버·클라이언트에서 패킷 타입에 따라 다른 핸들러를 호출할 때 사용합니다.

- 생성 코드에 등록된 타입과 ID 목록을 확인하고, 수신 바이트에서 msgId를 읽은 뒤 **ProtocolRegistry**로 해당 타입을 찾아 **Read** 호출하는 패턴을 사용합니다.
- 상세: [프로토콜](../products/protocol.md) 문서와 코어 저장소 [docs](https://github.com/joygram/DeukPack/tree/main/docs) 참고.

---

## 6. WriteWithOverrides · WriteFields · extends

생성된 struct마다 다음 API가 포함됩니다:

- **`WriteWithOverrides(oprot, overrides)`** — 필드 ID → 대체 값으로 Clone 없이 직렬화 (팬아웃).
- **`WriteFields(oprot, fieldIds, overrides?)`** — 지정한 필드만 직렬화 (런타임 projection).
- **`FieldId` nested class** — `StructName.FieldId.PropertyName`으로 필드 ID 참조. 매직 넘버 제거.
- **struct extends** — IDL에서 부모 필드를 자식에 자동 병합.

튜토리얼·비교표: [WriteWithOverrides·WriteFields·extends](write-with-overrides.md). API 표: [API·타입 참조](../reference/api.md). 코어 명세: [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## 7. Unity에서

- 생성 C# + **DeukPack.Protocol** (또는 Unity용 런타임)을 Unity 프로젝트에 포함합니다.
- asmdef가 있다면 생성 코드·런타임을 같은 어셈블리 또는 참조 관계로 두면 됩니다.
- **키트 라인업**: [deukpack.app 득팩 키트 라인업](../starter-kits.md)의 Unity·Web App 항목에서 샘플·경로 안내를 확인할 수 있습니다.

---

## 8. 다음 단계

- [프로토콜·직렬화](protocol-serialization.md) — Binary/Compact/JSON 차이와 선택
- [API·타입 참조](../reference/api.md) — CLI·WriteWithOverrides·WriteFields·FieldId·GetSchema·ProtocolRegistry
- [WriteWithOverrides·WriteFields·extends](write-with-overrides.md) — 교체·선택·상속 패턴
- [코어 examples/consumer-csharp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-csharp) — 실행 가능한 C# 샘플
