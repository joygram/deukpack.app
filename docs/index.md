---
hide:
  - toc
---

<div class="dp-hero">
  <div class="dp-hero-copy">
    <p class="dp-eyebrow">DeukPack Brand Concept</p>
    <h1>득을 묶어 전달하는<br>개발자용 제품 팩</h1>
    <p class="dp-lead"><strong>득팩(DeukPack)</strong> 은 Thrift·Protobuf·Excel 메타를 하나의 파이프라인으로 다루는 제품군입니다.<br>코드 생성, 프로토콜, 테이블, 툴링을 하나로 묶어 팀의 생산성을 높입니다.</p>
    <div class="dp-pills">
      <span class="dp-pill">IDL + Schema</span>
      <span class="dp-pill">Protocol + Runtime</span>
      <span class="dp-pill">Excel + Meta Pipeline</span>
    </div>
    <p class="dp-actions">
      <a href="products/index.md" class="md-button md-button--primary">제품군 개요 →</a>
      <a href="positioning.md" class="md-button">포지셔닝</a>
    </p>
  </div>
  <div class="dp-hero-visual">
    <img src="/assets/deukpack-brand-concept-01.png" alt="DeukPack 대표 브랜드 시안 - 데이터 팩을 메고 달리는 강아지 컨셉" loading="eager" decoding="async" />
  </div>
</div>

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

## 왜 DeukPack인가

<div class="dp-value-grid">
  <div class="dp-card">
    <h3>정의를 한 번에</h3>
    <p>Thrift, DeukPack, Protobuf, OpenAPI, CSV를 하나의 흐름 안에서 연결하고 점진적으로 전환할 수 있습니다.</p>
  </div>
  <div class="dp-card">
    <h3>런타임까지 연결</h3>
    <p>Binary, Compact, JSON 직렬화와 <code>msgId</code>, <code>ProtocolRegistry</code> 기반 메시지 처리를 함께 제공합니다.</p>
  </div>
  <div class="dp-card">
    <h3>메타 작업을 더 빠르게</h3>
    <p>Excel 애드인, 검증, 스키마 비교, Unity 로드 파이프라인까지 이어지는 실제 작업 흐름 중심 구성입니다.</p>
  </div>
</div>

- **IDL·정의**: Thrift(.thrift), DeukPack(.deuk), Protobuf(.proto) 파싱. OpenAPI/JSON Schema/CSV 임포트. 한 빌드에서 혼합 사용·점진적 전환 가능.
- **프로토콜·직렬화**: Binary, Compact, JSON(Thrift 와이어 호환). 제로카피(선택). `msgId`·`ProtocolRegistry` 네이티브 메시지 핸들링.
- **코드 생성**: C#, C++, TypeScript, JavaScript. SQLite DDL·접근 코드.
- **Excel·메타**: Excel 애드인(헤더 생성·검증·스키마 비교). 단일 키·복합키 지원.
- **파이프라인**: IDL/Excel → 코드·스키마·테이블 → Unity 검증·로드.

---

## 다음 단계

- [제품군 개요](products/index.md) — 제품별 역할·포함 범위
- [포지셔닝](positioning.md) — 타깃·포지션
- [라이선스·비용](license.md) — 이용 조건·비용 안내
