# 빠른 시작

득팩 코어를 설치하고, IDL 하나로 **C#, C++, TypeScript, JavaScript 코드**까지 생성하는 최소 단계입니다(약 5분).

**English**: Use the language switcher (top right).

---

## 1. 설치

**Node.js 18+** 가 필요합니다.

**권장(프로젝트 로컬):** `deukpack`을 의존성으로 넣고 CLI는 **`npx deukpack`** 으로 실행합니다. **`npm deukpack`** 은 npm 하위 명령이 **아닙니다**.

```bash
npm install deukpack
```

`package.json`이 없으면 먼저 `npm init -y` 를 써도 됩니다. 전역 `npm install -g deukpack` 은 기본 워크플로가 아닙니다. 의존성이 있는 프로젝트에서 **`npx deukpack`** 사용을 권장합니다.

---

## 2. 권장: init + 파이프라인(실제 프로젝트)

**프로젝트 루트**(`_deuk_define` 또는 IDL 트리가 있는 곳)에서:

```bash
npm install deukpack
npx deukpack init    # deukpack.pipeline.json, .deukpack/workspace.json 작성 후 동봉 VSIX 설치 시도(code/cursor/antigravity), --skip-vsix 로 생략 가능
npx deukpack run     # cwd가 프로젝트 루트면 npx deukpack --pipeline ./deukpack.pipeline.json 과 동일
```

- **`npx deukpack init`** 은 **`deukpack.pipeline.json`** 을 만들고 **bootstrap**(**`.deukpack/workspace.json`**)을 갱신한 뒤 **Deuk IDL VSIX** 설치를 시도합니다. 패키지 갱신 후에는 init을 다시 돌리고, `exclude`·`includePaths`·`outputLangSubdirs` 등 **세부 설정은 JSON 파일을 직접 수정**합니다.
- CI·무헤드 환경에서는 **`--skip-vsix`** 를 쓸 수 있습니다.

tarball·링크 설치는 [설치(OS)](install-os.md)를 보세요.

---

## 3. 한 방: 단일 IDL(체험용)

프로젝트 폴더에 `.deuk` 또는 `.thrift`·`.proto` 파일을 하나 둡니다. 예: `schema.deuk`

```thrift
namespace * deuk.tutorial

struct HelloRequest {
  1: string name
}

struct HelloResponse {
  1: string message
}
```

`.deuk` 문법은 [레퍼런스](../reference/index.md)와 코어 저장소 [docs](https://github.com/joygram/DeukPack/tree/main/docs)를 참고하세요.

---

## 4. 코드 생성 실행(단일 엔트리)

**출력 폴더**와 언어 옵션을 넘깁니다.

```bash
# C# + C++
npx deukpack ./schema.deuk ./gen --csharp --cpp

# include 경로
npx deukpack ./schema.deuk ./gen -I ./idl --csharp --cpp

# TS/JS는 ./gen/ts, ./gen/js (구 typescript/·javascript/ 폴더명이 아님)
npx deukpack ./schema.deuk ./gen --csharp --ts --js

# 프로토콜: Thrift 호환이면 tbinary·tcompact·tjson, 득팩 전용이면 pack·json·yaml (기본 pack)
npx deukpack ./schema.deuk ./gen --csharp --protocol tbinary
npx deukpack ./schema.deuk ./gen-native --csharp --protocol pack
```

현재 디렉터리에 **`deukpack.pipeline.json`** 이 없으면 CLI가 **경고** 후 **`npx deukpack init`** 을 안내합니다. 단발 생성은 그대로 진행됩니다.

---

## 5. 생성 결과 확인

- **C#**: `GetSchema()`, `ProtocolRegistry` 등은 [API·타입 참조](../reference/api.md)를 참고하세요.
- **C++**: 헤더·소스를 빌드 include 경로에 추가합니다.
- **TypeScript/JavaScript**: `--ts` / `--js` 산출은 기본적으로 **`ts/`**, **`js/`** 하위 폴더입니다.

---

## 6. 다음 단계

- **C#·Unity**: [프로토콜](../products/protocol.md), npm `dist/csharp` 또는 [득팩 키트](../starter-kits.md).
- **파이프라인**: [파이프라인 가이드](pipeline-guide.md) — `defineScope: "all"`, `defineRoot`, `exclude`, `npx deukpack run`.
- **직렬화**: 필드 선택·덮어쓰기는 통합 **`Write`** API — [튜토리얼: overrides·필드 선택·extends](write-with-overrides.md).
- **Excel·Unity**: [Excel 애드인](../products/excel-addin.md), [파이프라인·Unity](../products/pipeline-unity.md).

---

*CLI 전체: `npx deukpack --help` 또는 [API·타입 참조](../reference/api.md). 와이어 표: [와이어 프로토콜 계열](../reference/wire-protocols.md).*
