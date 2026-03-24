# 테이블 (`table`)

기획·메타를 **행**으로 다루는 쪽 — `table` 키워드, 메타 테이블 패턴, 생성되는 **레지스트리**까지 한 덩어리로 보면 됩니다.

---

## IDL에서

- **`table`** 로 선언된 struct는 테이블 정의·메타 컨테이너로 취급됩니다.
- **행(row)** 은 보통 별도 struct(`record` 등)로 정의되고, 테이블 쪽 `infos` 맵 등으로 묶입니다.
- **키:** `(key = "필드명")` 또는 복합키 `(key = "a,b")` — 파서가 `keyFieldNames`로 넘깁니다. 없으면 기본으로 `tuid` 계열을 가정하는 흐름이 있습니다.
- **행 레코드**로 쓰는 struct는 **필드 ID 1–4**가 테이블 헤더 예약(`tuid`, `tid`, `name`, `note`)으로 쓰이는 경우가 있어, **5 이상**에 사용자 필드를 두는 규칙이 코드 생성에서 검사됩니다.

---

## 생성 코드·런타임

- **`MetaTableRegistry`:** 테이블·메타 타입을 등록해 **리플렉션 없이** 타입별 로드·검증 경로를 잡는 데 쓰입니다.
- **`GetSchema()`:** 생성 타입에서 스키마 JSON을 뽑아 메타·툴·Excel 쪽과 맞출 수 있습니다.

세부 시그니처·옵션: [API·타입 참조 — Generated C# APIs](api.md#generated-c-apis).

---

## 다른 절과의 경계

- **와이어로 테이블 바이트를 보내는 이야기**는 [메시지·와이어](messages.md) 및 [와이어·직렬화 — 테이블](https://kits.deukpack.app/topics/serialization/tables-on-wire/)와 겹칩니다.
- **DB에 붙는 행 스키마**는 `entity` 중심으로 [DB·엔티티](database.md)를 보세요.

---

## 손으로 익히기

- [제2장 · 테이블 던전](https://kits.deukpack.app/journey/part-02-tables/) — 숫자가 타입이 되는 서사.
- [테이블 온 와이어](https://kits.deukpack.app/topics/serialization/tables-on-wire/) — 짧은 기술 메모.
- 스타터 방: [《지하 실록》 편람](https://kits.deukpack.app/starter-course/outline/)에서 테이블·시즌1 방 README로 이동.

법전: [API·타입 참조](api.md) · [IDL 가이드](../tutorial/idl-guide.md).
