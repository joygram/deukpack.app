# 메시지·와이어 (`message`)

패킷·RPC·게이트웨이에서 쓰는 `메시지 타입`, `msgId`, `직렬화`, `필드 일부만 보내기 / 덮어쓰기`까지 묶어서 봅니다.

`프로토콜 문자열이 호환인지 득팩 전용인지`는 [와이어 프로토콜 계열](wire-protocols.ko.md)에서 먼저 구분합니다.

---

## IDL에서

## IDL에서

- ``message`` 는 득팩 표준 네트워크 라우팅 규격을 따르는 예약 프레임워크 키워드입니다. 필드 번호와 필수 여부를 넘어서, 생성기(Parser) 단에서 런타임 라우팅을 위한 `헤더(ex: `MsgInfo`)를 와이어 페이로드 최상단에 자동 주입`합니다.
- **서비스:** Thrift 스타일 `service` / 메서드는 RPC 정의로 AST에 남습니다(스택별 구현은 생성기·런타임에 따름).

---

## ⚠️ 아키텍처 가이드: `message` vs `record` (헤더 오버헤드 구조)

득팩을 아키텍처에 도입할 때 목적에 맞춰 키워드를 분리해야 합니다.

**1. 순수 데이터 직렬화 (헤더 오버헤드 0%) ➡️ `record` 또는 `struct` 사용**
네트워크 스택(TCP/UDP)에서 이미 고유의 라우팅 프레임 규격을 가지고 있고, 순수 페이로드(Payload)만 득팩 엔진으로 파싱하고 싶다면 `record` 키워드를 사용하세요. 이 키워드는 득팩이 단 1비트의 헤더도 개입하지 않는 순수한 직렬화 바이트(`0 bytes overhead`)를 생성합니다.

**2. 득팩 라우팅 뼈대 활용 (사전 헤더 주입) ➡️ `message<ID>` 사용**
`message<1000>`과 같이 ID 명세를 추가하는 경우, 이는 득팩 공식 라우터와 연계됨을 의미하며 엔진이 와이어상에 `자동으로 헤더(MsgInfo)를 포함`하여 용량을 할당시킵니다 (내장 스위치/라우터 코딩 편의성 목적).
> 헤더의 경우 `required: false` (Optional)이므로, 사용자가 런타임에 명시적으로 파기(null)하면 바이트 사이즈를 0으로 줄일 수는 있습니다.

**[블루프린트: 글로벌 헤더 사용자 정의 (`message_header`)]**
향후 엔진 스펙을 통해 프로젝트 전역으로 사용할 헤더 뼈대를 `deukpack_override.deuk` 파일이나 문서 상단에서 `message_header MyCustomHeader`로 선언하여 기본 `MsgInfo`를 사용자 입맛대로 덮어씌우는 메커니즘을 지원할 예정입니다.

---

## 프로토콜·레지스트리

- **`ProtocolRegistry`:** 메시지 타입 ↔ **msgId**(및 관련 식별자) 매핑. 디스패치·직렬화 라우팅에 사용.
- `CLI `--protocol`·`wireFamily`:** [와이어 프로토콜 계열](wire-protocols.ko.md) 표 참고. Thrift 호환(`tbinary` 등)은 `생성 C#·C++** 중심이며, **JS** 는 **`interopRootStruct`** 로 동일 와이어를 쓰거나 스키마 없이 **`pack`·`json`·`yaml`** 을 씁니다.
- **C#:** `IDeukPackReader` / `IDeukPackWriter` 로 프로토콜별 읽기·쓰기.
- **`--wire-profile`:** 필드 서브셋·DTO 노출용 생성물. [와이어 프로파일](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WIRE_PROFILE_SUBSET.md).

---

## 통합 Write (필드 서브셋·오버라이드)

- **C#:** `Write(oprot, fieldIds, overrides?)` — `fieldIds`가 null이 아니면 해당 필드만; `overrides`로 필드 ID별 치환; 안 쓰는 인자는 **`null`**.
- **JavaScript:** 동일하게 **`(obj, fieldIds, overrides)`** 형태의 `toJson` / `toBinary`(및 pack 헬퍼).

튜토리얼: [통합 Write](../tutorial/write-with-overrides.ko.md)  
상세 API: [DEUKPACK_WRITE_WITH_OVERRIDES_API](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WRITE_WITH_OVERRIDES_API.md)  
표 형식 요약: [API·타입 참조 — 통합 Write](api.ko.md) (문서 내 «통합 Write» 절).

---

## 손으로 익히기

- [제4장 · 네트워크 터널](https://kits.deukpack.app/journey/part-04-network/) — msgId와 복도.
- [메시지 온 와이어](https://kits.deukpack.app/topics/serialization/messages-on-wire/) · [크로스 스택](https://kits.deukpack.app/topics/serialization/cross-stack/).

제품 설명: [프로토콜](../products/protocol.ko.md).
