# 메시지·와이어 (`message`)

패킷·RPC·게이트웨이에서 쓰는 **메시지 타입**, **msgId**, **직렬화**, **필드 일부만 보내기 / 덮어쓰기**까지 묶어서 봅니다.

**프로토콜 문자열이 호환인지 득팩 전용인지**는 [와이어 프로토콜 계열](wire-protocols.md)에서 먼저 구분합니다.

---

## IDL에서

- **`message`** 는 네트워크 쪽 명명 관례에 맞춘 struct입니다. 필드 번호·필수 여부는 Thrift/득팩 규칙을 따릅니다.
- **서비스:** Thrift 스타일 `service` / 메서드는 RPC 정의로 AST에 남습니다(스택별 구현은 생성기·런타임에 따름).

---

## 프로토콜·레지스트리

- **`ProtocolRegistry`:** 메시지 타입 ↔ **msgId**(및 관련 식별자) 매핑. 디스패치·직렬화 라우팅에 사용.
- **CLI `--protocol`·`wireFamily`:** [와이어 프로토콜 계열](wire-protocols.md) 표 참고. Thrift 호환(`tbinary` 등)은 **생성 C#·C++** 중심이며, **JS** 는 **`interopRootStruct`** 로 동일 와이어를 쓰거나 스키마 없이 **`pack`·`json`·`yaml`** 을 씁니다.
- **C#:** `IDeukPackReader` / `IDeukPackWriter` 로 프로토콜별 읽기·쓰기.
- **`--wire-profile`:** 필드 서브셋·DTO 노출용 생성물. [와이어 프로파일](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WIRE_PROFILE_SUBSET.md).

---

## 필드 골라내기·오버라이드

- **WriteFields / projectFields / toJsonWithFields:** 페이로드 축소·민감 필드 제외.
- **WriteWithOverrides / applyOverrides / toJsonWithOverrides:** 동일 struct로 수신자별·요청별로 일부 필드만 값 교체.

튜토리얼: [WriteWithOverrides·WriteFields·extends](../tutorial/write-with-overrides.md)  
상세 API: [DEUKPACK_WRITE_WITH_OVERRIDES_API](https://github.com/joygram/DeukPack/blob/main/docs/internal/DEUKPACK_WRITE_WITH_OVERRIDES_API.md)  
표 형식 요약: [API·타입 참조 — WriteFields / WriteWithOverrides](api.md#writefields-and-writewithoverrides).

---

## 손으로 익히기

- [제4장 · 네트워크 터널](https://kits.deukpack.app/journey/part-04-network/) — msgId와 복도.
- [메시지 온 와이어](https://kits.deukpack.app/topics/serialization/messages-on-wire/) · [크로스 스택](https://kits.deukpack.app/topics/serialization/cross-stack/).

제품 설명: [프로토콜](../products/protocol.md).
