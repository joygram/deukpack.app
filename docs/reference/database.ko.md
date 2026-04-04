# DB·엔티티 (`entity`)

SQL·ORM·행 저장에 붙는 **엔티티 행`, ``tablelink`**, **EF Core** 생성물을 한 축으로 모았습니다.

---

## IDL에서

- ``entity`:` 영속 행 스키마. C# 쪽으로 `[Table]`, `[Key]`, `[Column]` 등 `데이터 어노테이션`이 나갑니다 (`--csharp`만으로도).
- **`record`:** 같은 문법이지만 `declarationKind`가 `record` — DTO·와이어 중심일 때 구분용.
- **`tablelink` 타입:** 다른 테이블 행을 가리키는 참조(기획·DB 경계에서 사용). 확장 타입 대조는 [API·타입 참조 — Extended types](api.md#extended-types).

---

## CLI `--ef`

- **`--ef`:** Entity Framework Core용 **`DbContext`·Fluent 설정** 등 서버 쪽 ORM 생성 경로를 켭니다.
- **메타 테이블 행(`*_meta` 등)** 과의 정합은 `--ef` 조합에서 맞추는 부분이 있습니다(코어 생성기 주석 기준).

전체 플래그: [API·타입 참조 — CLI](api.md#cli).

---

## 생성 코드에서

- 엔티티는 `일반 struct 직렬화 API`와 함께 쓰일 수 있으나, 제품 관점에서는 `저장소·마이그레이션`과 먼저 연결해서 보는 경우가 많습니다.
- 스키마 반환 **`GetSchema()`** 는 메타·검증과 공통입니다.

---

## 손으로 익히기

- [제5장 · C# 성채](https://kits.deukpack.app/journey/part-05-dungeon-csharp/) — .NET·EF 지하실 쪽 서사.
- [레코드와 DTO](https://kits.deukpack.app/topics/serialization/records-and-dto/) — 행·전송 객체 경계 짧은 글.

제품: [코어·엔진](../products/core-engine.ko.md) · [파이프라인·Unity](../products/pipeline-unity.ko.md).
