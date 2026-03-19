# 스타터 키트

스택별 **상세 소개 · 저장소 링크(클론) · 로컬 가이드**를 아래에 모았습니다.  
각 키트는 득팩 **코어와 별도 저장소**이며, README에 **요구 도구·코드젠 명령·빌드 순서**가 적혀 있습니다.

> **참고:** 일부 키트는 저장소가 아직 없을 수 있습니다. 링크가 `TBD`이면 [득팩 OSS GitHub](https://github.com/joygram/DeukPack) · [스타터 키트 통합 저장소](https://github.com/joygram/DeukPackStarterKit) · [npm `deukpack`](https://www.npmjs.com/package/deukpack) · 코어 [examples](https://github.com/joygram/DeukPack/tree/main/examples) 로 먼저 시도하세요.

**스타터 키트 통합 저장소 (GitHub)**  
- [joygram/DeukPackStarterKit](https://github.com/joygram/DeukPackStarterKit) — Unity, C++, Network, TypeScript 등 스택별 샘플이 한 저장소에 모여 있음. `git clone https://github.com/joygram/DeukPackStarterKit.git`

---

## 공통 전제

| 항목 | 설명 |
|------|------|
| **DeukPack CLI** | `npm i -g deukpack` 또는 `npx deukpack` — 키트 README에 적힌 **버전**과 맞출 것 |
| **Node.js** | 각 키트 README 기준 (보통 18+) |
| **IDL** | `.thrift` / `.deuk` 등 — 키트에 포함되거나 서브모듈 |

**클론 후 기본 흐름**

```bash
git clone <아래 저장소 URL>
cd <프로젝트 폴더>
# 키트 루트의 README.md 를 연다 → 선행 요구 사항 → 코드젠 → 빌드 순서대로 진행
```

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
