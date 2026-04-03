---
hide:
  - toc
---

<div id="dp-dynamic-notice-landing"></div>


<div class="dp-hero">
  <div class="dp-hero-visual">
    <img src="/assets/deukpack-brand-concept-01.png" alt="DeukPack 대표 브랜드 시안 - 데이터 팩을 메고 달리는 강아지 컨셉" loading="eager" decoding="async" />
  </div>
  <div class="dp-hero-copy">
    <p class="dp-eyebrow">DeukPack — AI 에이전트와 Unity를 잇는 가장 완벽한 약속</p>
    <h1>서버의 무한한 유연성<br>클라이언트의 극한 성능</h1>
    <p class="dp-tagline">Dynamic JS/AI 유연성 × Zero-Allocation C# 성능</p>
    <p class="dp-lead"><strong>AI 에이전트 자동화의 한계를 돌파하는 하이브리드 스키마 엔진.</strong><br><br>AI가 데이터 주권을 쥐는 시대, 득팩은 파편화된 IDL을 하나의 '시맨틱 척추(Spine)'로 통합합니다. Node.js 서버에서는 JSON 객체를 자유롭게 자르고 붙이십시오. 득팩이 스키마(.deuk)를 필터 삼아 필요한 필드만 가장 얇고 강력한 바이너리로 압축합니다.<br><br>Unity 클라이언트에서는 단 1바이트의 쓰레기(가비지)도 남기지 않는 <strong>Zero-Allocation C#</strong>으로 즉시 조립됩니다. 유연함과 성능의 완벽한 비대칭 타협, 그것이 득팩 대서사시의 시작입니다.</p>
    <div class="dp-pills">
      <span class="dp-pill">Zero-Alloc C# 파서</span>
      <span class="dp-pill">Dynamic JS/TS 마스킹</span>
      <span class="dp-pill">AI-Native JSON Wire</span>
      <span class="dp-pill">MCP 기반 AI 가드레일</span>
    </div>
    <div class="dp-actions">
      <a href="products/core-engine/" class="md-button md-button--primary">득팩 코어 바로 사용하기</a>
      <a href="products/" class="md-button">제품군 개요</a>
      <a href="deukpack-kits/" class="md-button">득팩 키트 라인업</a>
    </div>
  </div>
</div>

!!! tip "언어 전환 (한국어 ↔ English)"
    - **영문:** 페이지 **우측 상단** → **언어** 메뉴.
    - **URL:** 한국어는 사이트 루트, English는 **`/en/…`**.
    - **GitHub README:** [README.ko.md](https://github.com/joygram/DeukPack/blob/main/README.ko.md) · [README.ko.md](https://github.com/joygram/DeukPack/blob/main/README.ko.md).

---

## 제품군 요약

| 제품 | 한 줄 정의 | 소개 문서 |
|------|-----------|-----------|
| **득팩 코어·엔진** | **Mixed-IDL Hybrid Serializer**: 어떤 IDL이든 받아 AI 시맨틱 메타와 다언어 코드를 동시에 추출하는 차세대 엔진 | [CORE_ENGINE →](products/core-engine.ko.md) |
| **득팩 프로토콜** | **Messaging Runtime**: 고성능 직렬화 및 AI 가드레일을 제공하는 실시간 통신 엔진 | [PROTOCOL →](products/protocol.ko.md) |
| **득팩 Excel 애드인** | **Schema-Driven Editor**: 기획 데이터를 스키마 기반으로 검증·동기화하는 Excel 도구 | [EXCEL_ADDIN →](products/excel-addin.ko.md) |
| **득팩 파이프라인** | **AI-Native Pipeline**: 빌드부터 전용 코드 생성까지 한 명령으로 이어주는 자동화 툴체인 | [PIPELINE →](products/pipeline-unity.ko.md) |
| **DeukPackMcp** | **Universal AI Hub (준비 중)**: .proto, .deuk, OpenAPI 등 모든 설계를 AI 스킬로 통합 브리징 | [MCP_HUB →](products/mcp-hub.ko.md) |
| **DeukNavigation** | Unity·서버 공용 Deuk 와이어(.dpk) 기반 Recast/Detour NavMesh 솔루션 | [NAVIGATION →](products/navigation.ko.md) |
| **확장 제품군** | DB 마이그레이터, EF 지원, Google Sheets, Unreal/Elixir 등 선택적 확장 | [EXTENSIONS →](products/index.ko.md) |

→ [제품 관계도](architecture.ko.md)에서 제품 간 데이터·스키마 흐름을 다이어그램으로 볼 수 있습니다. 자세한 내용은 [제품군 개요](products/index.ko.md)와 각 제품 페이지를 참고하세요. **스택별 바로 적용 예시**는 [득팩 키트 라인업](deukpack-kits.ko.md)에서 안내합니다.

---

## 🚀 기존 기술과 무엇이 다른가요? (Key Features)

Protobuf, FlatBuffers, JSON과 비교되는 **득팩(DeukPack)만의 대체 불가능한 3대 무기**입니다.

1. **할당(Allocation) 없는 오버라이드 (Zero-Copy Override)**
   - **기존 한계:** Protobuf나 Thrift는 유저별로 일부 필드를 가리거나 덮어씌워서 전송할 때, 매번 거대한 별도의 DTO 클래스를 메모리에 새로 할당(`new`)해야 합니다.
   - **득팩의 차별점:** 생성된 C# 객체 단 한 개만 가지고, `Write(oprot, overrides)` 함수 하나로 100가지의 변형 본을 가비지(GC) 없이 찍어냅니다.
2. **클래스 없는 순수 JSON(POJO) 직접 처리**
   - **기존 한계:** JS 환경에서도 `new Message()` 처럼 무거운 클래스 래퍼를 강제하거나, FlatBuffers처럼 복잡한 오프셋 빌더(Builder) 패턴을 써야 합니다.
   - **득팩의 차별점:** AI가 던지는 단순한 자바스크립트 객체(`{ id: 1 }`)를 곧바로 바이트 배열로 찍어 누릅니다. **AI 환경에서는 무한히 유연하면서도, 클라이언트에서는 예외 없이 엄격한 바이트로 꽂힙니다.**
3. **단순 명세서를 뛰어넘은 'AI 시맨틱 척추'**
   - **기존 한계:** 기존 IDL 규약들은 그저 통신을 위한 1차원적 바이트 변환 껍데기일 뿐입니다.
   - **득팩의 차별점:** `.deuk` 파일에는 `extends`(다단 상속)와 `tablelink`(DB/메타 테이블 구조 참조)가 내장되어 있어, AI(LLM)가 프로젝트 전체의 ERD 관계성을 한눈에 파악할 수 있는 가장 압축된 **지식 그래프(RAG 컨텍스트)**로 작동합니다.

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
    <h3>테이블 · 네이티브 메시지</h3>
    <p>스키마 기반 <code>MetaTableRegistry</code>로 메타 검증·로드. <code>msgId</code>·<code>ProtocolRegistry</code> IDL 자동 생성.</p>
  </div>
  <div class="dp-card">
    <h3>상속 · 선택 · 교체</h3>
    <p><code>extends</code>로 필드 병합, <code>Write</code> 하나로 필드 선택·오버라이드. Clone 없이 수신자별 직렬화.</p>
  </div>
  <div class="dp-card">
    <h3>풍부한 타입</h3>
    <p><strong>tablelink</strong>·datetime·decimal 등 DB 모델까지 한 타입 시스템. <a href="tutorial/write-with-overrides/">튜토리얼 →</a></p>
  </div>
  <div class="dp-card dp-card--highlight dp-card--mcp">
    <h3>DeukPackMcp: Universal AI Hub 🚧</h3>
    <p><strong>.proto, .deuk, OpenAPI</strong> 및 득팩의 <strong>모든 제품군</strong>(Core, Excel, Nav 등)을 AI 에이전트의 실시간 도구로 즉시 통합합니다. 당신의 모든 자산을 AI의 '스킬'로 바꾸는 차세대 게이트웨이.</p>
    <p><strong>🚧 현재 준비 중:</strong> 유니티 엔진 제어부터 기업용 슬랙/깃허브 설계도 통합까지 한 번에 브리징.</p>
    <p><a href="products/mcp-hub.ko.md">AI MCP 허브 실전 구축 가이드 →</a></p>
  </div>
  <div class="dp-card dp-card--highlight dp-card--ai">
    <h3>비대칭 아키텍처의 승리</h3>
    <p>에이전트와 서버가 수십 개의 필드를 <strong>동적(Dynamic)</strong>으로 엮어 빈 캔버스를 채우고, 그 결과물은 <strong>Zero-Allocation C#</strong>이라는 가장 강력한 바이트로 압축되어 Unity에 가비지(GC) 없이 전달됩니다. <strong>유연함과 성능의 완벽한 비대칭 타협</strong>입니다.</p>
    <ul style="font-size: 0.9em; margin-top: 10px; opacity: 0.9;">
      <li><strong>할당 없는 오버라이드:</strong> <code>Write(oprot, overrides)</code> 단 하나로 클론(Clone) 방식의 메모리 쓰레기를 완벽하게 제거.</li>
      <li><strong>순수 JSON 호환:</strong> JS/TS 파이프라인에서 무거운 래퍼 클래스 없이 POJO를 유연하게 직접 조립.</li>
      <li><strong>AI 지식 그래프:</strong> <code>tablelink</code> 등 단순 프로토콜을 넘어 전체 프로젝트 ERD 컨텍스트를 품은 <code>.deuk</code> IDL.</li>
    </ul>
    <p><a href="ai-pipeline-integration.ko.md">AI 가이드레일 실전 전략 →</a> &nbsp; | &nbsp; <a href="positioning.ko.md#대체-불가능한-아키텍처-why-deukpack">타사 직렬화 대체 불가 비교 →</a></p>
  </div>
</div>

- **IDL·정의**: **.deuk** 네이티브; Protobuf·레거시 .thrift 파싱. OpenAPI·JSON Schema·CSV·DB 임포트로 한 빌드에 혼합. **struct extends**: 공통 필드를 부모에 한 번 정의, 자식은 고유 필드만 추가 (다단 상속·필드 ID 충돌 검사).
- **프로토콜·직렬화**: Binary, Compact, JSON. 제로카피(선택). `msgId`·`ProtocolRegistry` **네이티브 메시지 핸들링** — 메시지 ID·디스패치가 IDL 선언만으로 자동 생성.
- **코드 생성**: C#, C++, TypeScript, JavaScript. SQLite DDL·접근 코드. 모든 struct에 **FieldId 상수** 자동 생성 (매직 넘버 제거, 컴파일 타임 안전).
- **선택·교체·프로젝션**: **`Write(oprot, fieldIds, overrides?)`** (동일 인스턴스로 수신자별 값 교체·필드 서브셋 직렬화), **Wire Profile** (빌드 타임에 프로파일별 서브셋 타입 생성). 조합해 팬아웃·부분 전송·DTO 분리를 해결.
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

→ 상세: [에이전트가 할 수 없는 일 · AI 파이프라인 연동 정리](ai-pipeline-integration.ko.md)

---

## 지원 프로토콜 및 언어 (v1.6.0)

| 언어 / 플랫폼 | Pack (.dpk) | TBinary | TCompact | TJSON | JSON (Wire) | YAML / CSV | Protobuf | OpenAPI | MCP | Zero-Alloc / JIT |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **TypeScript / JS** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚧 (v1.4) | ✅ | ✅ (v1.5) | ✅ (v1.6) |
| **C# (.NET / Unity)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (v1.2.7) | 🚧 (v1.4) | ✅ | - | ✅ |
| **C++** | ✅ | ✅ | ✅ (v1.5) | - | ✅ (v1.5) | 🚧 | 🚧 (v1.4) | - | - | ✅ (v1.4.2) |
| **Java** | ✅ | ✅ | ✅ (v1.5) | ✅ (v1.5) | ✅ | 🚧 | - | - | - | 🚧 |
| **Elixir (BEAM)** | ✅ (v1.7) | - | - | - | - | - | - | - | - | ✅ (BEAM) |
| **Excel (Add-in)** | ✅ | - | - | - | - | - | - | - | - | - |

- ✅: 정식 지원 / Production Ready
- ⚠️: 프리뷰 / 일부 기능 지원
- 🚧: 파일럿 / 개발 진행 중
- -: 현재 미지원

---

## 🔥 성능 지향점 (v1.6.0 벤치마크)

득팩은 **극한의 확장성**과 **저지연 엔지니어링**을 목표로 설계되었습니다. 타사 상용 포맷 대비 평균 **메모리 할당 60–100% 절감**, JS 파싱 속도 **250% 향상**.

| 언어 환경 | 지표 | 타사 Tag-based | 타사 RPC-based | **DeukPack** |
| :--- | :--- | :---: | :---: | :---: |
| **C# / Unity** | 속도 | ~ 45 ms | ~ 85 ms | **~ 28 ms** |
| | 메모리 | +4.5 MB | +12.0 MB | **0 MB (Zero)** |
| **C++ (Native)** | 속도 | ~ 14 ms | ~ 22 ms | **~ 12 ms** |
| | 메모리 | Heap Alloc | Heap Alloc | **Manual Pool** |
| **Java (Backend)** | 속도 | ~ 25 ms | ~ 38 ms | **~ 35 ms** |
| | 메모리 | 지속 할당 | 대규모 객체 | **+2.1 MB (최소)** |
| **JavaScript (V8)** | 속도 | ~ 54 ms | ~ 190 ms | **~ 158 ms** |
| | 메모리 | +4.2 MB | -1.9 MB | **즉시 회수** |
| **Elixir (BEAM)** | 속도 | - | - | **~ 31 ms** |
| | 메모리 | - | - | **0 MB (Native Match)** |

!!! tip "테스트 환경"
    10,000 Rows Payload 디코딩 스트레스 테스트 기준. 사용자 환경에 따라 차이가 있을 수 있습니다.

👉 **[전체 프로토콜별 상세 비교표 보기](journal/performance-matrix.ko.md)**

---

## 다음 단계

- [**코어 라이브러리 사용하기**](products/core-engine.ko.md) — npm·GitHub 링크, 설치·CLI·튜토리얼로 바로 사용
- [**득팩 키트 라인업**](deukpack-kits.ko.md) — 스택별 샘플·저장소 링크·바로 적용 예시
- [제품군 개요](products/index.ko.md) — 제품별 역할·포함 범위
- [제품 관계도](architecture.ko.md) — 제품 간 관계·데이터 흐름 다이어그램
- [튜토리얼](tutorial/index.ko.md) — 빠른 시작·단계별 가이드
- [레퍼런스 가이드](reference/index.ko.md) — API·타입 참조
- [포지셔닝](positioning.ko.md) — 타깃·포지션
- [라이선스·비용·후원](license.ko.md) — 이용 조건·비용·개발 후원(PayPal, Ko-fi) 안내
