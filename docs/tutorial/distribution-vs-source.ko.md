# 배포본 vs 소스본 — 사용 구분

득팩을 **배포본(npm)** 으로 쓸지, **소스본(클론·빌드)** 으로 쓸지 구분해서 정리합니다.

---

## 한눈에 비교

| 구분 | 배포본 사용 | 소스본 사용 |
|------|-------------|-------------|
| **뜻** | npm 패키지 `deukpack`만 설치해 CLI·생성물·런타임 사용 | 저장소를 클론한 뒤 빌드해 스크립트·소스 직접 사용 |
| **설치** | `npm install deukpack` 또는 `npx deukpack` | `git clone` → `npm ci` → `npm run build` |
| **CLI 호출** | `npx deukpack ...` 또는 `deukpack ...` (전역 설치 시) | `node scripts/build_deukpack.js ...` (저장소 루트 또는 서브모듈 경로 기준) |
| **경로** | 프로젝트의 `node_modules/deukpack` | 클론한 디렉터리 또는 서브모듈 경로(예: `third_party/DeukPack`) |
| **업데이트** | `npm update deukpack` 또는 버전 지정 재설치 | `git pull` / 서브모듈 `git checkout` 후 `npm run build` |
| **버전 고정** | `package.json`에 `"deukpack": "1.0.5"` 등 지정 | 서브모듈 커밋 또는 태그로 고정 |
| **CI에서** | `npm ci` 후 `npx deukpack ...` | 서브모듈 `update --init` 후 빌드, `node <경로>/scripts/build_deukpack.js ...` |

---

## 배포본을 사용할 경우

**소스 클론 없이** npm만으로 CLI·코드 생성·C# 런타임을 쓰고 싶을 때 선택합니다.

### 적합한 상황

- 프로젝트에서 **코드 생성만** 쓰고, 득팩 **내부 개발·수정은 하지 않을 때**
- **CI·다른 PC**에서 동일 버전을 쓰고 싶을 때 (`package.json`으로 고정)
- **Node.js만 있으면 되고**, Git 저장소 구조를 단순히 하고 싶을 때
- **Windows·Linux** 등 OS별로 동일한 방식(npm)으로 설치하고 싶을 때

### 설치·사용

```bash
npm install deukpack
npx deukpack ./schema.deuk ./out --csharp --cpp
```

- **상세**: [설치 (Windows·Linux)](install-os.md) — npm 설치, CLI, .tgz  
- **빠른 시작**: [빠른 시작](quickstart.md) — IDL → C#·C++·TS 생성

### 포함되는 것

- `bin/deukpack.js` (CLI)
- `dist/` (빌드된 JS)
- `dist/csharp` (C# 런타임 소스)
- `scripts/build_deukpack.js` (파이프라인 진입점)

### 포함되지 않는 것

- TypeScript 소스(`src/`), 테스트, 예제, 내부 문서  
- 수정·디버깅 후 **즉시** 반영하려면 소스본이 필요합니다.

---

## 소스본을 사용할 경우

저장소를 **클론**하고, **직접 빌드**한 뒤 스크립트·경로를 지정해 쓸 때 선택합니다.

### 적합한 상황

- **기여·디버깅·포크**로 소스 수정 후 바로 동작을 확인하고 싶을 때
- **서브모듈**로 프로젝트에 넣고, 파이프라인 설정을 **프로젝트 쪽**에서만 관리하고 싶을 때
- **CI에서** 서브모듈 경로를 고정해 빌드·실행하고 싶을 때
- npm에 올라온 버전이 아닌 **특정 커밋·브랜치**를 쓰고 싶을 때

### 설치·사용

```bash
git clone https://github.com/joygram/DeukPack.git
cd DeukPack
npm ci
npm run build

# CLI 대신 스크립트 직접 호출
node scripts/build_deukpack.js ./examples/sample_idl/sample.thrift ./examples/out --csharp --cpp --js
```

- **상세**: [GitHub — 소스·서브모듈 가이드](https://github.com/joygram/DeukPack/blob/main/docs/README.md) — 클론, 빌드, 서브모듈은 저장소 docs 참고

### 포함되는 것

- 전체 소스(`src/`), 테스트, 예제, 문서  
- 수정 후 `npm run build`로 `dist/` 갱신 가능

### 주의

- **빌드 필수**: `dist/`가 없으면 CLI·파이프라인이 동작하지 않습니다. 클론 후 반드시 `npm run build`를 한 번 실행해야 합니다.

---

## 선택 가이드

| 목적 | 추천 |
|------|------|
| 프로젝트에서 코드 생성만 사용, 수정 없음 | **배포본** (npm) |
| CI에서 재현 가능한 버전으로 코드젠 | **배포본** (package.json 버전 고정) |
| Windows·Linux 동일 절차로 설치 | **배포본** (npm) |
| 소스 수정·기여·디버깅 | **소스본** (클론·빌드) |
| 서브모듈로 프로젝트에 포함, 파이프라인만 프로젝트에서 관리 | **소스본** (서브모듈) |
| 특정 커밋·브랜치 사용 | **소스본** (클론 또는 서브모듈) |

---

## 관련 문서

| 문서 | 용도 |
|------|------|
| [설치 (Windows·Linux)](install-os.md) | 배포본(npm) 설치, Node·.tgz, Windows·Linux |
| [빠른 시작](quickstart.md) | IDL → C#·C++·TS 생성, 언어별 예제 |
| [GitHub DeukPack docs](https://github.com/joygram/DeukPack/tree/main/docs) | 소스·서브모듈·릴리스 문서 (저장소) |
