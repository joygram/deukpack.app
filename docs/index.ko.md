---
hide:
  - toc
---

<div class="dp-hero">
  <div class="dp-hero-visual">
    <img src="/assets/deukpack-brand-concept-01.png" alt="DeukPack 대표 브랜드 시안 - 데이터 팩을 메고 달리는 강아지 컨셉" loading="eager" decoding="async" />
  </div>
  <div class="dp-hero-copy">
    <p class="dp-eyebrow">DeukPack — 브랜드 컨셉</p>
    <h1>이득을 묶어 전달하는<br>개발자용 제품 팩</h1>
    <p class="dp-tagline">무료 · 자유롭게 · 바로 사용 가능한 코어</p>
    <p class="dp-lead"><strong>무료로</strong>, <strong>자유롭게</strong>, <strong>바로</strong> 사용·적용할 수 있는 코어 라이브러리가 있습니다. <strong>득팩(DeukPack)</strong> 은 <strong>네이티브 IDL(.deuk)</strong> 과 <strong>코드 생성·직렬화·프로토콜·스키마 메타</strong>를 한 엔진에서 다루는 <strong>독립 제품</strong>입니다. Protobuf·OpenAPI·CSV·DB·레거시 .thrift 등은 <strong>같은 파이프라인에 넣을 수 있는 입력</strong>일 뿐, “Thrift 대체품”으로 국한되지 않습니다.<br>서버·실시간 게임·내부 툴까지 동일 계약으로 연결할 수 있습니다.</p>
    <div class="dp-pills">
      <span class="dp-pill">무료 · Apache-2.0 · 바로 적용 가능</span>
      <span class="dp-pill">IDL + Schema</span>
      <span class="dp-pill">Protocol + Runtime</span>
      <span class="dp-pill">스키마·메타 파이프라인</span>
      <span class="dp-pill">AI·에이전트 파이프라인 연동</span>
    </div>
    <p class="dp-actions">
      <a href="products/core-engine.md#득팩-코어-바로-사용하기" class="md-button md-button--primary">득팩 코어 바로 사용하기</a>
      <a href="products/" class="md-button">제품군 개요</a>
      <a href="starter-kits/" class="md-button">스타터 키트</a>
      <a href="positioning/" class="md-button">포지셔닝</a>
    </p>
  </div>
</div>

---

## 제품군 요약

| 제품 | 핵심 역할 |
|------|-----------|
| **득팩 코어·엔진** | **Apache-2.0**, **바로 사용 가능**. .deuk 중심 IDL, AST, 코드 생성, 스키마·메타. **차별화:** 구조체 상속(extends), 다양한 타입(float·DB 모델·tablelink). Protobuf·OpenAPI·CSV·JSON·DB·.thrift 등 **다중 입력**. |
| **득팩 프로토콜** | Binary/Compact/JSON 직렬화, msgId·ProtocolRegistry, 제로카피 옵션. |
| **득팩 Excel 애드인** | 스키마 기반 메타 작업(헤더·검증·비교) — Excel 등 스프레드시트에서 제공. |
| **득팩 파이프라인·Unity** | 정의·메타 → 코드·스키마·테이블 → Unity·서버 검증·로드. 서버 연동·실시간 게임 연동까지 동일 스키마로 연결. |
| **DeukNavigation** | Unity·서버 공용 Deuk 와이어(.dpk) 기반 Recast/Detour NavMesh. DeukNavRuntime·CrowdContext·DeukNavAgent·베이킹·DeukNaviTool. |
| **확장 제품군** | Deuk UI·에디터 도구, EF, DB 마이그레이터, Google Sheets, Unreal/Elixir 등 부가 제품. |

→ [제품 관계도](architecture.md)에서 제품 간 데이터·스키마 흐름을 다이어그램으로 볼 수 있습니다. 자세한 내용은 [제품군 개요](products/index.md)와 각 제품 페이지를 참고하세요. **스택별 바로 적용 예시**는 [스타터 키트](starter-kits.md)에서 안내합니다.

---

## 이 페이지 소개

이 사이트(**deukpack.app**)는 득팩 **브랜드 컨셉**과 제품을 소개하는 페이지입니다. **무료·오픈소스 코어**를 npm·[**GitHub(joygram/DeukPack)**](https://github.com/joygram/DeukPack)에서 바로 적용할 수 있고, 제품군·스타터 키트·문서로 실무 적용·도입 검토에 활용하실 수 있습니다.

**득팩 코어를 바로 사용**하려면 위 **「득팩 코어 바로 사용하기」** 버튼 또는 [코어·엔진](products/core-engine.md) 페이지로 이동하세요. 해당 페이지에 **설치·CLI 예시**, **이 사이트 세부 문서**(설치, 빠른 시작, IDL·C#·C++ 가이드, 파이프라인, 스타터 키트), **GitHub**(README, 릴리스 문서 목록) 링크가 정리되어 있습니다. 코어 소스·이슈·기여는 [GitHub 저장소](https://github.com/joygram/DeukPack)에서 확인하세요. 상업·비상업으로 자유롭게 링크·인용해 주세요.

---

## 왜 DeukPack인가

<div class="dp-value-grid">
  <div class="dp-card">
    <h3>정의를 한 번에</h3>
    <p>한 번 정의한 스키마로 코드·직렬화·메타·검증이 맞춰지고, 기존 .proto·OpenAPI·CSV 등을 그대로 끌어와 <strong>득팩 파이프라인 안에서</strong> 점진적으로 통합할 수 있습니다.</p>
  </div>
  <div class="dp-card">
    <h3>런타임·서버·실시간 게임 연동</h3>
    <p>Binary, Compact, JSON 직렬화와 <code>msgId</code>, <code>ProtocolRegistry</code> 기반 메시지 처리. 서버 연동·실시간 게임에서 동일 타입·스키마로 패킷·메타를 주고받을 수 있습니다.</p>
  </div>
  <div class="dp-card">
    <h3>메타 작업을 더 빠르게</h3>
    <p>스키마 기반 메타 편집·검증부터 Unity·서버 로드 파이프라인까지 이어지는 실제 작업 흐름 중심 구성입니다.</p>
  </div>
  <div class="dp-card">
    <h3>테이블 · 네이티브 메시지 · 상속 · 선택 · 교체</h3>
    <p>게임·서버에서 반복되는 다섯 가지 문제를 IDL 선언과 코드젠으로 해결합니다.</p>
    <ul style="margin:0.4em 0 0 1.2em; padding:0; font-size:0.92em;">
      <li><strong>테이블</strong> — 스키마 기반 <code>MetaTableRegistry</code>로 메타 데이터를 검증·로드. Excel 애드인과 단일 키·복합키까지.</li>
      <li><strong>네이티브 메시지</strong> — <code>msgId</code>·<code>ProtocolRegistry</code>가 IDL에서 자동 생성. 디스패치·핸들러 등록을 별도 관리 없이.</li>
      <li><strong>상속 (extends)</strong> — 부모 struct 필드를 자식에 자동 병합. 다단 상속, 필드 ID 충돌 검사, 와이어 호환.</li>
      <li><strong>선택 (WriteFields)</strong> — 풀 레코드에서 원하는 필드만 골라 직렬화. 런타임 projection, partial 타입 불필요.</li>
      <li><strong>교체 (WriteWithOverrides)</strong> — Clone 없이 수신자마다 다른 필드 값으로 직렬화. 팬아웃·푸시에 최적.</li>
      <li><strong>다양한 데이터 타입</strong> — float, double, int8–int64, list/set/map, <strong>tablelink</strong>(DB·테이블 행 참조), datetime, decimal. DB 모델·메타 스키마를 한 타입 시스템으로.</li>
    </ul>
    <p style="margin-top:0.6em;">세 직렬화 기능(<code>WriteFields</code>, <code>WriteWithOverrides</code>, Wire Profile)은 조합 가능합니다. 자세히: <a href="tutorial/write-with-overrides/">WriteWithOverrides 튜토리얼</a></p>
  </div>
  <div class="dp-card dp-card--highlight">
    <h3>AI 시대에서도 필요한 이유</h3>
    <p>에이전트는 <strong>스펙 초안·로직</strong>에는 강하지만, <strong>결정론적 출력·와이어 호환·다언어 동시 정합성·빌드 재현성</strong>은 보장하기 어렵습니다. 득팩은 그 부분을 담당합니다. 스키마를 단일 소스로 두고 <strong>동일 입력 → 동일 코드·직렬화</strong>를 내주므로, 에이전트는 스펙·로직만 만들고 득팩이 “실행 가능한 타입·파이프라인”으로 바꿔 줍니다.</p>
    <p><a href="ai-pipeline-integration.md">에이전트가 할 수 없는 일 · 연동 정리 →</a></p>
  </div>
</div>

- **IDL·정의**: **.deuk** 네이티브; Protobuf·레거시 .thrift 파싱. OpenAPI·JSON Schema·CSV·DB 임포트로 한 빌드에 혼합. **struct extends**: 공통 필드를 부모에 한 번 정의, 자식은 고유 필드만 추가 (다단 상속·필드 ID 충돌 검사).
- **프로토콜·직렬화**: Binary, Compact, JSON. 제로카피(선택). `msgId`·`ProtocolRegistry` **네이티브 메시지 핸들링** — 메시지 ID·디스패치가 IDL 선언만으로 자동 생성.
- **코드 생성**: C#, C++, TypeScript, JavaScript. SQLite DDL·접근 코드. 모든 struct에 **FieldId 상수** 자동 생성 (매직 넘버 제거, 컴파일 타임 안전).
- **선택·교체·프로젝션**: **WriteWithOverrides** (동일 인스턴스, 수신자별 필드만 교체), **WriteFields** (풀 레코드에서 선택한 필드만 직렬화), **Wire Profile** (빌드 타임에 프로파일별 서브셋 타입 생성). 세 기능을 조합해 팬아웃·부분 전송·DTO 분리를 해결.
- **테이블·메타**: 스키마 기반 메타 편집·검증·비교(Excel 애드인). 단일 키·복합키. `MetaTableRegistry`로 런타임 테이블 로드·검증.
- **파이프라인·연동**: 정의·메타 → 코드·스키마·테이블 → Unity·서버 검증·로드. 서버 연동·실시간 게임 연동에서 동일 스키마·프로토콜 사용.

---

## AI 시대에서도 필요한 이유

### 에이전트가 할 수 없는 일(또는 잘 못하는 일)

에이전트는 스펙 초안·비즈니스 로직에는 강하지만, 아래는 **보장하기 어렵거나 한 번에 맞추기 어렵습니다**. 이 부분은 **득팩**이 담당하는 편이 안전합니다.

| 에이전트가 하기 어려운 것 | 이유 |
|--------------------------|------|
| **결정론적 출력** | 같은 스키마에 대해 실행마다 **동일한 코드·바이트 레이아웃**을 보장하기 어렵다. |
| **와이어·프로토콜** | **득팩이 정한 스펙**으로 바이트를 고정해야 할 때, 에이전트가 매번 다른 인코딩을 내기 쉽다. |
| **다언어·다플랫폼 동시 정합성** | C#·C++·TS·Unity·서버가 **같은 스키마에서 나온 타입**을 쓰려면 한 번의 정의에서 다언어를 내는 파이프라인이 낫다. |
| **빌드·CI 재현성** | **동일 IDL → 동일 산출물**이어야 빌드 캐시·CI가 안정적이다. 에이전트 출력은 재현이 보장되지 않음. |
| **레거시·기존 스펙** | 이미 돌아가는 .proto·기존 와이어와 **필드 ID·바이트**를 맞추는 건 **코드젠 도구(득팩)** 가 담당하는 편이 낫다. |

### 그래서 득팩이 필요한 이유

- **계약·스키마를 "한 번 정의 → 결정론적 다출력"으로 고정**해 주면, 에이전트는 그 **결과물(타입·스키마)**을 전제로 **로직만** 생성하면 되어 불일치가 줄어든다.
- **연동 포인트**: 에이전트가 만든 **`.deuk`, `.proto`, `.thrift`, OpenAPI** 를 **득팩 입력**으로 넘기고 CLI로 코드·타입·직렬화를 생성. 에이전트는 “이 타입을 쓰는 로직”만 만들면 됩니다.
- 에이전트가 스키마를 **생성·수정**해도, **“실행 가능한 타입·직렬화·다언어 코드”**로 바꿔 주는 건 **전문 도구(득팩)**가 담당하는 편이 안전하다. 에이전트는 그 도구를 **도구로 호출**하면 된다.

→ 상세: [에이전트가 할 수 없는 일 · AI 파이프라인 연동 정리](ai-pipeline-integration.md)

---

## 다음 단계

- [**코어 라이브러리 사용하기**](products/core-engine.md#득팩-코어-바로-사용하기) — npm·GitHub 링크, 설치·CLI·튜토리얼로 바로 사용
- [**스타터 키트**](starter-kits.md) — 스택별 샘플·저장소 링크·바로 적용 예시
- [제품군 개요](products/index.md) — 제품별 역할·포함 범위
- [제품 관계도](architecture.md) — 제품 간 관계·데이터 흐름 다이어그램
- [튜토리얼](tutorial/index.md) — 빠른 시작·단계별 가이드
- [레퍼런스 가이드](reference/index.md) — API·타입 참조
- [포지셔닝](positioning.md) — 타깃·포지션
- [라이선스·비용·후원](license.md) — 이용 조건·비용·개발 후원(PayPal, Ko-fi) 안내
