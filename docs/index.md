---
hide:
  - toc
---

# DeukPack

## IDL·코드생성·직렬화·메타를 한 스택으로

**득팩(DeukPack)** 은 Thrift·Protobuf·Excel 메타를 하나의 파이프라인으로 다루는 제품군입니다.  
무엇을 할 수 있는지, 어떤 이점을 얻을 수 있는지를 중심으로 소개합니다.

[제품군 개요 →](products/index.md){ .md-button .md-button--primary }
[포지셔닝](positioning.md){ .md-button }

---

## 제품군 요약

| 제품 | 핵심 역할 |
|------|-----------|
| **득팩 코어·엔진** | IDL 파싱, AST, 코드 생성, 스키마·메타의 중심 엔진. Thrift·Protobuf·OpenAPI 통합. |
| **득팩 프로토콜** | Binary/Compact/JSON 직렬화, msgId·ProtocolRegistry, 제로카피 옵션. |
| **득팩 Excel 애드인** | Excel에서 스키마 기반 메타 작업 — 헤더 생성, 검증, 스키마 비교. |
| **득팩 파이프라인·Unity** | IDL/Excel → 코드·스키마·테이블 → Unity 검증·로드 통합. |
| **확장 제품군** | EF, DB 마이그레이터, Google Sheets, Unreal/Elixir 등 부가 제품. |

→ 자세한 내용은 [제품군 개요](products/index.md)와 각 제품 페이지를 참고하세요.

---

## 무엇을 할 수 있나요

- **IDL·정의**: Thrift(.thrift), DeukPack(.deuk), Protobuf(.proto) 파싱. OpenAPI/JSON Schema/CSV 임포트. 한 빌드에서 혼합 사용·점진적 전환 가능.
- **프로토콜·직렬화**: Binary, Compact, JSON(Thrift 와이어 호환). 제로카피(선택). msgId·ProtocolRegistry 네이티브 메시지 핸들링.
- **코드 생성**: C#, C++, TypeScript, JavaScript. SQLite DDL·접근 코드.
- **Excel·메타**: Excel 애드인(헤더 생성·검증·스키마 비교). 단일 키·복합키 지원.
- **파이프라인**: IDL/Excel → 코드·스키마·테이블 → Unity 검증·로드.

---

## 다음 단계

- [제품군 개요](products/index.md) — 제품별 역할·포함 범위
- [포지셔닝](positioning.md) — 타깃·포지션
- [라이선스·비용](license.md) — 이용 조건·비용 안내
