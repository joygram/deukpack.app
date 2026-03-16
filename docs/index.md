---
hide:
  - toc
---

<div class="dp-hero">
  <div class="dp-hero-visual">
    <img src="/assets/deukpack-brand-concept-01.png" alt="DeukPack 대표 브랜드 시안 - 데이터 팩을 메고 달리는 강아지 컨셉" loading="eager" decoding="async" />
  </div>
  <div class="dp-hero-copy">
    <p class="dp-eyebrow">DeukPack Brand Concept</p>
    <h1>이득을 묶어 전달하는<br>개발자용 제품 팩</h1>
    <p class="dp-lead"><strong>득팩(DeukPack)</strong> 은 <strong>IDL·스키마 정의, 코드 생성, 직렬화·프로토콜, 메타·테이블, 스프레드시트·에디터 연동</strong>을 한 파이프라인으로 제공하는 제품군입니다.<br>Thrift·Protobuf·OpenAPI·CSV·DB 등 기존 정의·데이터 소스를 그대로 가져와 연동할 수 있어, 팀 생산성을 높입니다.</p>
    <div class="dp-pills">
      <span class="dp-pill">IDL + Schema</span>
      <span class="dp-pill">Protocol + Runtime</span>
      <span class="dp-pill">스키마·메타 파이프라인</span>
    </div>
    <p class="dp-actions">
      <a href="products/" class="md-button md-button--primary">제품군 개요 →</a>
      <a href="positioning/" class="md-button">포지셔닝</a>
    </p>
  </div>
</div>

---

## 제품군 요약

| 제품 | 핵심 역할 |
|------|-----------|
| **득팩 코어·엔진** | IDL 파싱, AST, 코드 생성, 스키마·메타의 중심 엔진. 기존 정의 연동: Thrift·Protobuf·OpenAPI·CSV·JSON·DB. |
| **득팩 프로토콜** | Binary/Compact/JSON 직렬화, msgId·ProtocolRegistry, 제로카피 옵션. |
| **득팩 Excel 애드인** | 스키마 기반 메타 작업(헤더·검증·비교) — Excel 등 스프레드시트에서 제공. |
| **득팩 파이프라인·Unity** | 정의·메타 → 코드·스키마·테이블 → Unity·서버 검증·로드 통합. |
| **확장 제품군** | EF, DB 마이그레이터, Google Sheets, Unreal/Elixir 등 부가 제품. |

→ [제품 관계도](architecture.md)에서 제품 간 데이터·스키마 흐름을 다이어그램으로 볼 수 있습니다. 자세한 내용은 [제품군 개요](products/)와 각 제품 페이지를 참고하세요.

---

## 왜 DeukPack인가

<div class="dp-value-grid">
  <div class="dp-card">
    <h3>정의를 한 번에</h3>
    <p>한 번 정의한 스키마로 코드·직렬화·메타·검증이 맞춰지고, Thrift·Protobuf·OpenAPI·CSV·DB 등 기존 소스를 그대로 가져와 점진적 전환이 가능합니다.</p>
  </div>
  <div class="dp-card">
    <h3>런타임까지 연결</h3>
    <p>Binary, Compact, JSON 직렬화와 <code>msgId</code>, <code>ProtocolRegistry</code> 기반 메시지 처리를 함께 제공합니다.</p>
  </div>
  <div class="dp-card">
    <h3>메타 작업을 더 빠르게</h3>
    <p>스키마 기반 메타 편집·검증부터 Unity·서버 로드 파이프라인까지 이어지는 실제 작업 흐름 중심 구성입니다.</p>
  </div>
</div>

- **IDL·정의**: 득팩 IDL(.deuk) 및 Thrift·Protobuf 파싱. OpenAPI·JSON Schema·CSV·DB 임포트로 기존 스펙을 한 빌드에서 혼합·점진적 전환.
- **프로토콜·직렬화**: Binary, Compact, JSON. 제로카피(선택). `msgId`·`ProtocolRegistry` 네이티브 메시지 핸들링.
- **코드 생성**: C#, C++, TypeScript, JavaScript. SQLite DDL·접근 코드.
- **메타·스프레드시트**: 스키마 기반 헤더·검증·비교(Excel 애드인 등). 단일 키·복합키 지원.
- **파이프라인**: 정의·메타 → 코드·스키마·테이블 → Unity·서버 검증·로드.

---

## 다음 단계

- [제품군 개요](products/) — 제품별 역할·포함 범위
- [제품 관계도](architecture.md) — 제품 간 관계·데이터 흐름 다이어그램
- [레퍼런스 가이드](reference/) — API·타입 참조
- [튜토리얼](tutorial/) — 빠른 시작·단계별 가이드
- [포지셔닝](positioning/) — 타깃·포지션
- [라이선스·비용](license/) — 이용 조건·비용 안내
