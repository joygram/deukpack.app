# 설치 (Windows · Linux)

`배포본만` 사용할 때는 `npm`으로 프로젝트에 넣고 CLI는 **`npx deukpack`** 으로 실행합니다. 소스 클론은 필요 없습니다.

---

## 배포본 = npm 패키지

득팩은 `npm`으로 배포됩니다. `프로젝트 루트`에서 **`npm install deukpack`** 후 **`npx deukpack …`** 로 실행하세요. **`npm deukpack`** 은 동작하지 않습니다. 바이너리는 `node_modules/.bin` 에 있습니다.

**Node.js 18+** 권장(16+ 동작 가능).

---

## 공통

```bash
npm install deukpack
npx deukpack init
npx deukpack run
```

파이프라인 없이 한 번만 생성:

```bash
npx deukpack ./schema.deuk ./out --csharp --cpp
```

전역 `npm i -g deukpack` 은 문서상 기본 워크플로가 아닙니다. **로컬 의존성 + npx** 를 권장합니다.

---

## Windows

### Node.js 설치

- **[nodejs.org](https://nodejs.org/)** LTS 다운로드 → 설치 시 "Add to PATH" 선택.
- 또는 **winget**: `winget install OpenJS.NodeJS.LTS`
- 또는 **Chocolatey**: `choco install nodejs-lts`

새 터미널에서 `node -v`, `npm -v` 확인.

### CLI 사용

```powershell
npm install deukpack
npx deukpack init
npx deukpack .\schema.deuk .\out -I .\idl --csharp --cpp
```

### .tgz 로 설치 (Release / Artifact)

- [GitHub Releases](https://github.com/joygram/DeukPack/releases) 에서 `deukpack-x.y.z.tgz` 다운로드.
- 또는 Actions → main 푸시 run → Artifacts → `deukpack-npm-tarball-<sha>` 다운로드.

```powershell
npm install .\Downloads\deukpack-x.y.z.tgz
npx deukpack init
```

---

## Linux

### Node.js 설치

- **Ubuntu/Debian**: `sudo apt update && sudo apt install nodejs npm`
- **Fedora**: `sudo dnf install nodejs npm`
- **nvm**: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash` → `nvm install --lts`

`node -v`, `npm -v` 확인.

### CLI 사용

```bash
npm install deukpack
npx deukpack init
npx deukpack ./idl/root.deuk ./out -I ./idl --csharp --cpp
```

### .tgz 로 설치 (Release / Artifact)

- [GitHub Releases](https://github.com/joygram/DeukPack/releases) 또는 Actions Artifacts에서 tarball 다운로드.

```bash
npm install ./deukpack-x.y.z.tgz
npx deukpack init
```

---

## 다음

- [빠른 시작](quickstart.ko.md) — init·run·단발 생성
- [파이프라인 가이드](pipeline-guide.ko.md) — `deukpack.pipeline.json`, `defineScope: "all"`
- [코어·엔진](../products/core-engine.ko.md) — npm·GitHub 링크
- 저장소 및 소스 빌드: [GitHub DeukPack](https://github.com/joygram/DeukPack). 설치·튜토리얼 문서는 이 사이트에만 보관됩니다.
