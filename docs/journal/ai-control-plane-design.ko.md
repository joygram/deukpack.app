# 설계 고민이 언어가 되기까지: DeukPack IDL의 탄생

![DeukPack Brand Image](https://deukpack.app/assets/deukpack-brand-concept-01.png)

"그냥 Thrift 쓰면 안 돼? Protobuf는?"

득팩을 처음 소개할 때 가장 많이 듣는 말입니다. 맞습니다. Thrift와 Protobuf는 수년간 검증된 훌륭한 도구입니다. 우리도 오랫동안 그 도구들을 잘 써왔습니다. 문제는 **"잘 쓰다 보니 보이기 시작한 것들"** 에 있었습니다.

이 글은 새로운 IDL 도구를 소개하는 글이 아닙니다. **"기존 도구들과 씨름하면서 축적된 고민이 어떻게 하나의 설계 철학으로 굳어졌고, 그 철학이 어떻게 기술로 구현될 수 있었는지"** 를 기술한 엔지니어링 스토리입니다.

## 1. 고민의 시작: "이 `message`가 뭔지 아무도 모른다"

규모가 커질수록 `message`라는 단어가 주는 정보가 부족하다는 걸 체감하기 시작했습니다.

```protobuf
// 기존 Protobuf IDL — 이게 DB 테이블인가? 네트워크 패킷인가? 엑셀 데이터인가?
message Item {
  int64 item_id = 1;
  string name = 2;
  int32 quantity = 3;
}
```

실무에서 이 `Item`은 세 곳에서 동시에 쓰였습니다.

- **서버**: 클라이언트로 보내는 인벤토리 조회 응답 패킷
- **기획 툴**: 디자이너가 엑셀로 관리하는 아이템 마스터 데이터
- **DB**: 유저 인벤토리를 저장하는 테이블의 행(row)

하지만 `.proto` 파일은 이 세 가지를 전혀 구분하지 않습니다. AI 코딩 어시스턴트에게 "이 `Item`을 다루는 코드를 짜줘"라고 하면, AI는 세 가지 맥락 중 하나를 추측해서 코드를 생성합니다. 그리고 **그 추측이 종종 틀립니다**.

더 근본적인 문제는, 틀렸다는 것을 알아채기까지 시간이 걸린다는 것입니다.

## 2. 해결책의 탐색: "기존 도구를 버려야 할까?"

처음엔 간단하게 생각했습니다. "그러면 더 표현력이 풍부한 IDL을 쓰거나, 주석으로 구분하면 되지 않을까?"

하지만 두 가지 현실 앞에서 막혔습니다.

1. **레거시의 무게**: 이미 수만 줄의 `.proto`나 `.thrift` 파일이 쌓여 있었습니다. "다 버리고 새 IDL로 전환하자"는 말은 개발팀에게 할 수 없는 선택이었습니다.
2. **아무것도 강제하지 않는 주석**: 주석으로 의도를 표현하면, 그게 강제되지 않습니다. AI도, 컴파일러도, 동료 개발자도 무시할 수 있습니다.

이때 설계 방향이 결정되었습니다.

> **"레거시를 버리지 않는다. 대신 레거시가 표현하지 못하는 것을 위에 얹는다."**

## 3. 설계 철학: '데이터의 신분증'을 IDL 문법에 내장하다

이 철학에서 출발한 것이 득팩의 **선언적 키워드(Declaration Kinds)** 설계입니다.

기존 IDL이 모든 것을 `struct`로 퉁쳤다면, 득팩은 데이터의 **사용 목적**을 문법 수준에서 구분합니다.

```
namespace game

// 아이템 마스터 데이터 — 파일에서 읽히고, 엑셀로 관리된다.
record ItemMaster {
  1> int64 itemId
  2> string name
  3> int32 maxStack
}
table<ItemMaster> = { key: "itemId" }

// 인벤토리 DB 행 — 유저별 영속 상태를 관리한다.
entity UserInventory {
  1> [key] int64 userId
  2> int64 itemId
  3> int32 quantity
}

// 아이템 조회 응답 패킷 — 일회성 전송 페이로드.
keyword message_scope 10000
message<10001> ItemQueryResponse {
  1> list<ItemInfo> items
  2> int32 totalCount
}
```

이 구분이 가져오는 실질적인 변화는 세 방향에서 동시에 나타납니다.

- **컴파일러**: `table`은 엑셀 직렬화 코드를, `entity`는 DB 매핑 코드를, `message<N>`은 최적화된 바이너리 직렬화 코드를 각각 다르게 생성합니다.
- **AI 코딩 도구**: 선언 키워드만으로도 이 데이터가 어떤 맥락에서 쓰이는지를 즉시 파악합니다. 잘못된 맥락의 코드를 생성할 가능성이 원천적으로 줄어듭니다.
- **개발자**: 코드를 처음 보는 사람도 이 `struct`가 무엇인지 추측하는 시간을 낭비하지 않습니다.

## 4. "그러면 레거시는?" — 혼합(Mixed) 아키텍처의 답

설계 철학이 정해지면 다음 질문이 옵니다.

> "이미 운영 중인 `.proto`나 `.thrift` 파일은 어떻게 하나요?"

득팩의 엔진은 `.proto`, `.thrift`, `.deuk` 파일을 **동시에** 읽어들일 수 있도록 설계했습니다. 기존 파일을 그대로 가져와 `include`하고, 그 위에 득팩만의 피처를 추가하는 방식으로 공존합니다.

```
// 기존 Protobuf 파일을 그대로 include — 파일 수정 없음
include "legacy/item_base.proto"

// 레거시 타입을 그대로 사용하고, 유효한 피처(테이블)만 추가 등록
table<item_base.Item> = { key: "item_id" }
```

레거시 파일은 한 줄도 수정하지 않습니다. 득팩 엔진이 두 파일을 함께 파싱해서 하나의 **Unified AST**로 병합하고, 여기에서 C#, TypeScript, C++ 등 원하는 언어의 코드를 생성합니다.

## 5. "어떻게 가능한가?" — Unified AST 허브의 기술적 구조

이 모든 것이 가능한 이유는 득팩 엔진의 내부에서 모든 IDL이 **하나의 공통 AST 구조**로 변환되기 때문입니다.

```
   [Input Sources]                 [Unified AST Hub]          [Output Code]
           
   legacy.proto (Protobuf)  ----+
                                |
   legacy.thrift (Thrift)   ----+--> [ DeukPack Engine ] --> C# / TS / C++
                                |           (AST)
   new_logic.deuk (Deuk)    ----+
```

`.thrift` 파서와 `.deuk` 파서는 각각 존재하지만, 두 파서의 출력은 모두 동일한 `DeukPackAST`로 수렴합니다. 코드 제네레이터는 이 AST만 바라봅니다. 입력 파일의 형식이 무엇이든 상관하지 않습니다.

AST에는 타입 정보뿐만 아니라 `declarationKind`(`record`, `entity`, `message`, `table`), 브라켓 속성(`[key]`, `[split]` 등), 그리고 주석까지 모두 보존됩니다. 코드 제네레이터는 이 풍부한 메타데이터를 읽어 각 선언의 의도(Intent)에 맞는 코드를 정확히 생성합니다.

## 결론: 고민이 쌓여 설계가 되고, 설계가 굳어 언어가 된다

득팩 IDL이 Thrift나 Protobuf와 겉으로는 비슷해 보이지만 그 안에 담긴 철학이 다른 이유는, **"레거시가 해결하지 못한 고민을 정확히 겨냥한 설계"** 에서 출발했기 때문입니다.

모든 것을 버리고 새로 시작하는 것은 쉽습니다. 하지만 잘 돌아가는 것을 그대로 두면서, 그 위에서 부족했던 것을 채우는 방식이 실무에서는 더 어렵고 더 가치 있습니다.

---

### 🔗 DeukPack Ecosystem

* **Official Website**: [deukpack.app](https://deukpack.app)
* **GitHub (OSS)**: [DeukPack](https://github.com/deukpack/DeukPack) — 누구나 기여할 수 있는 오픈소스 엔진입니다.

**DeukPack**은 복잡한 시스템의 파편화를 막고, AI와 인간 개발자가 함께 성장하는 기술 생태계를 지향합니다.
