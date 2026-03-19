# 설치 (Windows · Linux)

**배포본만** 사용할 때는 **npm**으로 설치해 CLI·코드 생성만 하면 됩니다. 소스 클론은 필요 없습니다.

---

## 배포본 = npm 패키지

득팩은 **npm** 하나로 배포됩니다. **실제 바이너리만 사용**하려면 `npm install deukpack` 또는 `npx deukpack`으로 **패키지만 다운로드**해 사용하면 됩니다. (Node.js 16+ 필요, 18+ 권장)

---

## 공통

```bash
npm install deukpack
npx deukpack ./schema.deuk ./out --csharp --cpp
```

전역: `npm i -g deukpack` 후 `deukpack --help`

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
npx deukpack .\idl\root.deuk .\out -I .\idl --csharp --cpp
```

### .tgz 로 설치 (Release / Artifact)

- [GitHub Releases](https://github.com/joygram/DeukPack/releases) 에서 `deukpack-x.y.z.tgz` 다운로드.
- 또는 Actions → main 푸시 run → Artifacts → `deukpack-npm-tarball-<sha>` 다운로드.

```powershell
npm install .\Downloads\deukpack-1.0.5.tgz
npx deukpack .\schema.deuk .\out --csharp
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
npx deukpack ./idl/root.deuk ./out -I ./idl --csharp --cpp
```

### .tgz 로 설치 (Release / Artifact)

- [GitHub Releases](https://github.com/joygram/DeukPack/releases) 또는 Actions Artifacts에서 tarball 다운로드.

```bash
npm install ./deukpack-1.0.5.tgz
npx deukpack ./schema.deuk ./out --csharp
```

---

## 다음

- [빠른 시작](quickstart.md) — IDL → C#·C++·TS 생성 예제
- [코어·엔진](../products/core-engine.md) — npm·GitHub 링크
- 저장소 및 소스 빌드: [GitHub DeukPack](https://github.com/joygram/DeukPack). 설치·튜토리얼 문서는 이 사이트에만 보관됩니다.
