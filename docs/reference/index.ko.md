# 레퍼런스 가이드

**이름·옵션·생성 API**를 빠르게 찾을 때 쓰는 문서입니다. 제품이 **무엇을 하는지**는 [제품군 개요](../products/index.md), **따라 하기**는 [튜토리얼](../tutorial/index.md)을 보세요.

---

## 분류별로 보기

| 분류 | 무엇을 다루나 | 문서 |
|------|----------------|------|
| **기본 구성** | IDL 키워드(`record`·`message`·`table`·`entity`), CLI·include, 라이브러리 파싱 | [기본 구성](fundamentals.md) |
| **테이블** | `table`·메타 테이블, 행 레코드, `MetaTableRegistry`, `GetSchema` | [테이블](tables.md) |
| **메시지·와이어** | `message`, `ProtocolRegistry`, `Write`/`Read`, 필드 골라내기·오버라이드 | [메시지·와이어](messages.md) |
| **와이어·프로토콜 계열** | Thrift 호환(`tbinary`·`tcompact`·`tjson`) vs 득팩 전용(`pack`·`json`·`yaml`), JS+스키마, npm `serialize` 기본값 | [와이어 프로토콜 계열](wire-protocols.md) |
| **DB·엔티티** | `entity`, `--ef`, `tablelink`, ORM 어노테이션 | [DB·엔티티](database.md) |
| **통합 참조** | CLI 전 옵션표, C#/C++/JS API 표, 타입 대조표 | [API·타입 참조](api.md) |

**스키마 입출력**(OpenAPI·CSV·JSON·Excel 머지/보내기)은 [API·타입 참조 — Schema I/O](api.md#schema-import-export)에 모았습니다.

---

## 제품 문서와의 차이

- **제품 소개**: 가치·범위·도입 관점.
- **레퍼런스**: 실제 **플래그 이름**, **생성 타입 메서드**, **IDL 키워드** 확인.

---

## 손으로 익히기 (DeukPack Kits)

법전만 읽기 지치면, 같은 주제를 **실습·서사**로 이어집니다.

- **저니 지도:** [득팩 서사 저니](https://kits.deukpack.app/journey/)
- **와이어·직렬화 주제:** [topics/serialization](https://kits.deukpack.app/topics/serialization/)
- **표지·방 목록:** [《시작의 폐허》](https://kits.deukpack.app/starter-course/)

**English:** 사이트 상단 **언어** 메뉴에서 **English**를 선택하면 동일 목차의 영문 페이지로 이동합니다.
