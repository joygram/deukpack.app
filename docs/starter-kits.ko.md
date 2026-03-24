# 득팩 키트 라인업

스택별 **상세 소개 · 저장소 링크(클론) · 공통 전제**를 아래에 모은 **키트 라인업·포털(개요)** 페이지입니다. (URL `starter-kits` 는 기존 링크 호환을 유지합니다.)

!!! info "개요 vs 키트 문서 사이트"
    **이 페이지(deukpack.app/starter-kits):** 라인업에 포함된 키트가 **무엇인지**, **어디서 클론하는지**, **공통 환경**을 한눈에 보는 **개요**입니다.  
    **실습·복붙 랩·《시작의 폐허》·득팩 서사 저니·주제 글**처럼 **손으로 따라 하며 확인하는 내용**은 공식 키트 문서 **[kits.deukpack.app](https://kits.deukpack.app/)** 로 연결됩니다. (저장소 `StarterKit/` README와 동일한 내비를 씁니다.)

!!! note "Kits로의 확장(향후)"
    **본편 키트(`StarterKit/`)** 줄과 **앱 키트(`AppKit/`)** 예고 줄은 **DeukPack Kits** 아래에서 **문서·템플릿·예고 구역이 순차적으로 열리고 보강될 예정**입니다. **고정된 제품 출시 일정은 없고**, 오픈 범위·갱신은 **[kits.deukpack.app](https://kits.deukpack.app/)** 기준으로 맞춥니다.

각 키트는 득팩 **코어와 별도 저장소(또는 통합 레포의 폴더)** 이며, README에 **요구 도구·코드젠 명령·빌드 순서**가 적혀 있습니다.

> **참고:** 일부 키트는 저장소가 아직 없을 수 있습니다. 링크가 `TBD`이면 [득팩 OSS GitHub](https://github.com/joygram/DeukPack) · [DeukPackKits 통합](https://github.com/joygram/DeukPackKits) · [DeukPackKitsOSS](https://github.com/joygram/DeukPackKitsOSS) · [npm `deukpack`](https://www.npmjs.com/package/deukpack) · 코어 [examples](https://github.com/joygram/DeukPack/tree/main/examples) 로 먼저 시도하세요.

**키트 통합 저장소 (GitHub)**  
- [joygram/DeukPackKits](https://github.com/joygram/DeukPackKits) — Unity, C++, Network, TypeScript 등 스택별 샘플이 한 저장소에 모여 있음. `git clone https://github.com/joygram/DeukPackKits.git`  
- **키트 문서 사이트(실습·저니):** [kits.deukpack.app](https://kits.deukpack.app/) — 공개 MkDocs(한·영). **스타터를 돌려볼 때**는 이쪽이 정본 내비입니다. 저장소 README와 동일 링크 체계입니다.  
- [joygram/DeukPackKitsOSS](https://github.com/joygram/DeukPackKitsOSS) — OSS용 클론. `git clone https://github.com/joygram/DeukPackKitsOSS.git`

---

## 공통 전제

**스타터는 종류별(Unity, C++, Console, TS 등)로 다르기 때문에, 각 스타터 레포 안에서 득팩을 설치합니다.**  
그 전에 **Node.js·npm 등 필요한 환경 세팅**이 필요합니다.

### 선행 세팅 (필수) · 환경 자동 검사

| 항목 | 설명 |
|------|------|
| **Node.js** | v16 이상 필요, v18+ 권장. [nodejs.org](https://nodejs.org/) |
| **npm** | Node 설치 시 포함. `npm -v`로 확인 |
| **DeukPack CLI** | `npm install deukpack` 후 `npx deukpack`. 키트 README에 적힌 요구·명령을 따른다 |
| **스타터별** | C# → .NET SDK, C++ → CMake·컴파일러, Unity → Unity 에디터 등. 각 키트 README 참고 |
| **IDL** | `.thrift` / `.deuk` 등 — 키트에 포함되거나 서브모듈 |

**DeukPackKits**에서는 `npm run check-env`로 Node(>=16)·npm을 자동 검사할 수 있고, `npm run init` 또는 `npm run bootstrap`(setup과 동일) 시에도 동일 검사가 먼저 실행됩니다. 미충족 시 **OS별** 설치 안내 후 종료합니다.

**OS별 초기 설정**: Node·npm 설치 방법만 OS마다 다르고, 이후 `npm run check-env` / `npm run init` 은 동일합니다.  
- **Windows**: nodejs.org 또는 `winget install OpenJS.NodeJS.LTS`  
- **macOS**: nodejs.org 또는 `brew install node`  
- **Linux**: nodejs.org 또는 배포판 패키지

세팅이 끝난 뒤, **그 프로젝트(레포) 루트**에서 `npm install` → 코드젠 → 빌드 순서로 진행합니다.

### 사용자에게 적절한 방식: 스타터별 독립

**스타터는 각각 “한 프로젝트 = 한 저장소”로 두고, 그 레포 안에서 득팩을 설치·사용하는 것을 권장합니다.**  
원하는 스타터만 복사해 새 레포로 두고, **그 레포 안에서** `npm install deukpack` → 코드젠 → 빌드·실행을 하면 됩니다.

**통합 저장소(DeukPackKits 전체)를 그대로 쓸 때**만 아래 초기화를 루트에서 실행합니다.

**클론 후 기본 흐름**

```bash
git clone <아래 저장소 URL>
cd <프로젝트 폴더>
# 1) Node.js·npm 등 선행 세팅 확인
# 2) 해당 레포 안에서 npm install (또는 npm install deukpack)
# 3) 키트 README → 코드젠 → 빌드 순서대로 진행
```

### DeukPackKits 초기화 한 번에 (통합 레포 클론 후)

[DeukPackKits](https://github.com/joygram/DeukPackKits) **전체**를 클론한 뒤, **한 번만** 아래를 실행하면 Node가 없어도 설치 시도 후 초기화까지 진행합니다.

```bash
git clone https://github.com/joygram/DeukPackKits.git
cd DeukPackKits
```

**한 방 초기화 — Linux / macOS**

```bash
./scripts/bootstrap.sh
```

**Windows (cmd)**

```bat
scripts\bootstrap.cmd
```

- **bootstrap.sh / bootstrap.cmd:** Node가 있으면 곧바로 setup, 없으면 nvm·winget·Docker 등으로 맞춘 뒤 setup.

**Node가 이미 있을 때 — 대화형 setup** (레지스트리 vs 형제 소스, R vs K)

```bash
npm run init
```

(동일: `node scripts/setup.js`, `npm run bootstrap`)

**비대화식 · CI — 기본값만**

```bash
npm run init -- --skip-prompt
```

**비대화식 — 소스 + 키트별 (환경 변수)**

```bash
export DEUKPACK_BOOTSTRAP_CHANNEL=source
export DEUKPACK_KIT_RUNTIME=per-kit
export DEUKPACK_SRC=../DeukPack
npm run init -- --skip-prompt
```

**비대화식 — 플래그만**

```bash
npm run init -- --use-source --kit-runtime=per-kit --skip-prompt
```

**코어 개발 단축**

```bash
npm run bootstrap:dev
```

**소스만 다시 링크**

```bash
npm run install:from-source
```

**버전·DLL 확인**

```bash
npm run check-env -- --versions
```

**이후:** `StarterKit/…` 각 방 README대로 코드젠·빌드. 예:

```bash
cd StarterKit/csharp/prologue
npx deukpack _deuk_define/csharp.deuk out -I _deuk_define --csharp
```

- **스타터만 복사**해 독립 프로젝트로 쓸 때는 그 루트에서:

```bash
npm install deukpack
```

이어서 해당 키트 README에 적힌 `npx deukpack …` 한 줄을 복사해 실행합니다.

상세: [DeukPackKits README](https://github.com/joygram/DeukPackKits/blob/main/README.md).

---

## Unity

**누구에게** 클라이언트·에디터에서 득팩으로 뽑은 **C# 타입·프로토콜**을 붙이고 싶은 팀.

**포함되는 것(예시)**  

- 샘플 IDL → 코드젠 스크립트(또는 문서화된 `npx deukpack` 명령)  
- 생성 코드를 Unity 프로젝트에 넣는 경로·asmdef 안내  
- (선택) 최소 송수신·로드 데모  

**필요 환경**  

- Unity 에디터 버전(LTS 권장) — README에 명시  
- .NET / Player 설정 요약  

| | |
|--|--|
| **저장소 (HTTPS)** | `TBD` — 공개 시 `https://github.com/joygram/DeukPack.git` 기준 또는 스타터 전용 저장소로 갱신 |
| **클론** | `git clone TBD_URL` |
| **문서** | 저장소 루트 `README.md` → 선행 조건 → Generate → Unity에서 열기 |

---

## C++

**누구에게** 서버·툴체인에서 **IDL → C++ 헤더/소스**만 빠르게 검증하고 싶은 팀.

**포함되는 것(예시)**  

- CMake(또는 팀 표준 빌드)로 생성물 컴파일까지 가는 최소 타깃  
- include 경로·C++17 등 README 명시  

**필요 환경**  

- CMake, MSVC / GCC / Clang  

| | |
|--|--|
| **저장소** | `TBD` |
| **클론** | `git clone TBD_URL` |
| **문서** | `README.md` → 코드젠 → `cmake --build` |

---

## Network (클라이언트 + 서버)

**누구에게** **동일 IDL**로 C#·C++(또는 언어 조합) **양端**에 최소 **에코/핑** 수준으로 와이어를 맞추고 싶은 팀.

**포함되는 것(예시)**  

- 공유 IDL 한 벌  
- 서버 실행·클라 연결·한두 메시지 왕복 절차  

**필요 환경**  

- 키트에 따라 Unity + 서버 바이너리, 또는 콘솔 클라/서버만  

| | |
|--|--|
| **저장소** | `TBD` |
| **클론** | `git clone TBD_URL` |
| **문서** | `README.md` — 포트·프로토콜(binary/compact)·실행 순서 |

---

## 팬아웃·수신자별 필드 (메신저 패턴)

**대상** 채팅, 푸시 등 **메모리상 메시지 하나**를 **많은 수신자**에게 보내고, **소수 필드만** 다를 때(표시 이름, 읽음, 로케일).

**코드젠에 포함** (IDL 변경 없음):

- **C#**: 모든 struct에 `Write(oprot, fieldIds, overrides?)` — [통합 Write 튜토리얼](tutorial/write-with-overrides.md), [API·타입 참조](reference/api.md).
- **JavaScript** (`--js`): `generated_deuk.js` struct 헬퍼의 `toJson` / `toBinary`(및 pack) — 인자 `(obj, fieldIds, overrides)`.
- **C++**: **`kFieldId_*`** 상수와 타입 옆 생성된 pack/바이너리 쓰기 경로(C#/JS와 동일 필드 ID 모델).

**키트 샘플 작성 시**: 송신 루프에서 사용자마다 **전체 Clone** 대신 **`Write(oprot, null, overrides)` + 작은 overrides 맵** 사용을 권장. 상세: [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## TypeScript / Node

**누구에게** BFF·내부 도구·**AI 에이전트**가 호출하는 스크립트에서 **CLI 코드젠** 또는 **파싱 API**를 쓰고 싶은 팀.

**포함되는 것(예시)**  

- `package.json` + 코드젠 npm script  
- (선택) `DeukPackEngine` 파싱만 하는 TS 샘플  
- CI에서 `npx deukpack` 돌리는 예시  

**필요 환경**  

- Node 18+  

| | |
|--|--|
| **저장소** | `TBD` |
| **클론** | `git clone TBD_URL` |
| **문서** | `README.md` → `npm install` → `npm run codegen` |

---

## Web App (deukpack-webapp)

**상태**: 키트 라인업에 **반영 예정**.

**위치**: [DeukPackKits](https://github.com/joygram/DeukPackKits) 저장소의 **`starters/deukpack-webapp/`** 폴더. (통합 레포를 클론한 뒤 해당 경로로 이동해 사용합니다.)

**누구에게** 득팩으로 **웹앱을 만들 수 있게** 해 주는, **바로 가져다 쓸 수 있는** 기본 구성이 필요한 팀. Next.js(TS) 프론트엔드 + C# REST API 백엔드, 마이크로서비스형.

**포함 기능**  

- **인증** (로그인·로그아웃)  
- **회원 가입**, 회원 정보 조회·수정  
- Next.js(TypeScript) FE + C# REST API BE — **현재** OpenAPI(Orval/NSwag) 코드젠으로 타입·DTO 정합, **향후** 득팩 스키마·코드 생성으로 통일 예정  
- Admin·대시보드는 별도 구성 권장 (보안·역할 분리)

**포함 기능으로 할 수 있는 일 · 현재적 쓸모**

| 기능 | 할 수 있는 일 | 현재적 쓸모 |
|------|----------------|------------|
| **인증** | 회원 세션 유지, API 접근 제어, 로그인/로그아웃 플로우 | ✅ 대부분의 웹앱에 필요. 바로 활용 가능. |
| **회원 가입** | 신규 사용자 등록, 약관·검증 플로우 | ✅ 실서비스 기본 요건. 활용 가능. |
| **회원 정보** | 내 정보 조회·수정, 프로필 | ✅ 실서비스 기본 요건. 활용 가능. |
| **Next.js + C# REST** | 동일 스키마로 FE/BE 타입·DTO 일치, 코드젠 한 번에 양쪽 반영 | ✅ 득팩 도입 시 핵심 가치. 스키마 정리 후 바로 쓸모 있음. |
| **Admin 별도** | 관리 기능을 별도 앱·도메인으로 분리 | ✅ 보안·운영 측면에서 권장. 설계 시 유리. |

**AI·에이전트가 있는 상황에서 쓸모 있나?**

- **에이전트가 잘하는 것**: 스펙 초안, API 설계 제안, 비즈니스 로직·코드 생성.  
- **에이전트가 보장하기 어려운 것**: 결정론적 타입·와이어 레이아웃, FE/BE·다언어 동시 정합성, 빌드 재현성, 세션·인증 같은 **실제 동작하는 플로우**까지 한 번에 맞추기.  
- **이 키트가 하는 일**: 인증·회원가입·회원 정보 같은 **바로 동작하는 기본 플로우**와, **득팩 스키마·코드젠**으로 “에이전트가 만든 스펙 → 동일 타입·계약으로 코드 반영”을 맞춰 줌.  
- **정리**: 에이전트는 스펙·로직 생성에 쓰고, **실제 타입·API·런타임 정합성**과 **바로 쓸 수 있는 인증/회원 플로우**는 이 키트가 담당하는 구조라서, AI·에이전트 있는 상황에서도 **쓸모 있음**.

**필요 환경**  

- Node 18+, .NET (키트 README 명시), (선택) Docker  

| | |
|--|--|
| **저장소** | [joygram/DeukPackKits](https://github.com/joygram/DeukPackKits) — 경로 `starters/deukpack-webapp/` |
| **클론** | `git clone https://github.com/joygram/DeukPackKits.git` 후 `cd DeukPackKits/starters/deukpack-webapp` |
| **문서** | 폴더 내 [`README-FRAMEWORK.md`](https://github.com/joygram/DeukPackKits/blob/main/starters/deukpack-webapp/README-FRAMEWORK.md) — pnpm, `codegen:all`, 웹·백엔드 실행 순서 |

---

## Java

**누구에게** JVM 쪽 서비스와 **Protobuf·레거시** 계약을 맞추고, 향후 득팩 Java emit·연동을 준비하는 팀.

**포함되는 것(예시)**  

- v1 기준: **Apache Thrift Java** 등 기존 스택과의 **필드 ID·와이어 정합** 가이드  
- 동일 IDL을 C#/C++와 같이 쓰는 팀을 위한 **계약 체크리스트**  

**필요 환경**  

- JDK, (가이드에 따른) Protobuf/Thrift 컴파일 또는 기존 아티팩트  

| | |
|--|--|
| **저장소** | `TBD` |
| **클론** | `git clone TBD_URL` |
| **문서** | `README.md` — 득팩으로 생성한 타입과 **바이트 호환**을 맞추는 절차 |

---

## 한눈에 보기 (클론 URL)

| 키트 | 저장소 URL | 상태 |
|------|------------|------|
| Unity | *README 위 표 참고* | 준비 시 갱신 |
| C++ | *위 표 참고* | 준비 시 갱신 |
| Network | *위 표 참고* | 준비 시 갱신 |
| TypeScript / Node | *위 표 참고* | 준비 시 갱신 |
| **Web App** (deukpack-webapp) | [DeukPackKits/starters/deukpack-webapp](https://github.com/joygram/DeukPackKits/tree/main/starters/deukpack-webapp) | 반영 예정 |
| Java | *위 표 참고* | 준비 시 갱신 |

---

## 코어-only 로 시작할 때

- **최소 코드젠 스모크**: [examples](https://github.com/joygram/DeukPack/tree/main/examples)  
- **CI·파이프라인 문서**: [DEUKPACK_CI_CD_AND_DEV_PIPELINE.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_CI_CD_AND_DEV_PIPELINE.md)  
- **라인업 정책(내부 문서)**: [DEUKPACK_STARTER_KITS_LINEUP.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_STARTER_KITS_LINEUP.md)

---

## 관련

- [튜토리얼 · 빠른 시작](tutorial/quickstart.md)
- [제품군 개요](products/index.md)
