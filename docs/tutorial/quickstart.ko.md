# 빠른 시작

득팩 코어를 설치하고, IDL 하나로 `C#, C++, TypeScript, JavaScript 코드`까지 생성하는 최소 단계입니다(약 5분).

**English**: Use the language switcher (top right).

---

## 1. 설치

**Node.js 18+** 가 필요합니다.

```bash
npm install deukpack
```

`package.json`이 없으면 먼저 `npm init -y` 를 써도 됩니다.

---

## 2. 프로젝트 초기화

```bash
npx deukpack init
```

생성되는 파일:
- **`deukpack.pipeline.json`** — 빌드 설정
- **`.deukpack/workspace.json`** — 워크스페이스 매니페스트
- **Deuk IDL VSIX** 설치 시도 (VS Code / Cursor / Antigravity용, CI에서는 `--skip-vsix` 사용)

---

## 3. 코드 생성

```bash
npx deukpack run
```

`deukpack.pipeline.json`을 읽어 설정된 언어(C#, C++, TS, JS)로 코드를 생성합니다.

---

## 4. IDL 정의

`.deuk` 파일을 만듭니다 (예: `schema.deuk`):

```thrift
namespace deuk.tutorial

struct HelloRequest {
    > 1 name
}

struct HelloResponse {
    > 1 message
}
```

`deukpack.pipeline.json`에서 IDL 루트를 지정하고 `npx deukpack run`을 다시 실행합니다.

`.deuk` 문법은 [레퍼런스](../reference/index.ko.md)와 코어 저장소 [docs](https://github.com/joygram/DeukPack/tree/main/docs)를 참고하세요.

---

## 5. 생성 결과 확인

- **C#**: 생성된 `*.cs`를 추가하고 **DeukPack.Protocol** (또는 `node_modules/deukpack/dist/csharp`)을 참조합니다. [API 참조](../reference/api.ko.md) 참고.
- **C++**: 생성된 헤더/소스를 빌드 include 경로에 추가합니다.

---

## 6. 다음 단계

- **C#·Unity**: [프로토콜](../products/protocol.ko.md), npm `dist/csharp` 또는 [득팩 키트](../deukpack-kits.ko.md).
- **파이프라인**: [파이프라인 가이드](pipeline-guide.ko.md) — `defineScope: "all"`, `defineRoot`, `exclude`.
- **직렬화`: 필드 선택·덮어쓰기는 통합 ``Write`** API — [튜토리얼: overrides·필드 선택·extends](write-with-overrides.ko.md).
- **Excel·Unity**: [Excel 애드인](../products/excel-addin.ko.md), [파이프라인·Unity](../products/pipeline-unity.ko.md).

---

## 부록: 단발 CLI (단일 파일)

`init` 없이 빠르게 테스트:

```bash
npx deukpack ./schema.deuk ./out --csharp --cpp
```

옵션:

```bash
# include 경로
npx deukpack ./schema.deuk ./out -I ./idl --csharp --cpp

# TypeScript / JavaScript
npx deukpack ./schema.deuk ./out --csharp --ts --js

# 프로토콜 선택
npx deukpack ./schema.deuk ./out --csharp --protocol tbinary
```

*CLI 전체: `npx deukpack --help` 또는 [API·타입 참조](../reference/api.ko.md). 와이어 표: [와이어 프로토콜 계열](../reference/wire-protocols.ko.md).*
