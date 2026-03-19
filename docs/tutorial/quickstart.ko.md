# 빠른 시작

득팩 코어를 설치하고, IDL 하나로 **C#, C++, TS(JavaScript) 코드를 생성**까지 해보는 최소 단계입니다. 5분 안에 따라 할 수 있습니다.

**English**: Use the language switcher (top right).

---

## 1. 설치

**Node.js 18+** 가 필요합니다.

```bash
# 프로젝트에 의존성으로 추가
npm install deukpack

# 또는 전역 CLI로 설치 (선택)
npm i -g deukpack
```

설치 없이 한 번만 실행하려면 `npx deukpack` 만 사용하면 됩니다.

---

## 2. IDL 파일 준비

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

`.deuk` 문법은 [레퍼런스 가이드](../reference/)와 코어 저장소 [docs](https://github.com/joygram/DeukPack/tree/main/docs)를 참고하세요.

---

## 3. 코드 생성 실행

**출력 폴더**를 지정하고, 생성할 언어를 옵션으로 넘깁니다.

```bash
# C# + C++ + TS(JS) 생성 (입력 IDL, 출력 디렉터리, 옵션)
npx deukpack ./schema.deuk ./gen --csharp --cpp --js

# include 경로가 있으면 -I 로 지정
npx deukpack ./schema.deuk ./gen -I ./idl --csharp --cpp --js

# 프로토콜 포맷 지정 (binary / compact / json)
npx deukpack ./schema.deuk ./gen --csharp --protocol binary
```

생성 결과는 `./gen`(또는 지정한 경로) 아래에 언어별로 나뉘어 들어갑니다 (예: `gen/csharp/`, `gen/cpp/`, `gen/javascript/`).

---

## 4. 생성 결과 확인

- **C#**: `*.cs` 파일과 스키마·프로토콜 관련 타입이 생성됩니다. `GetSchema()`, `ProtocolRegistry` 등은 [API·타입 참조](../reference/api.md)를 참고하세요.
- **C++**: 헤더·소스가 생성됩니다. 빌드 시 해당 경로를 include에 추가하면 됩니다.
- **TypeScript/JavaScript**: `--js` 옵션으로 생성됩니다. BFF·Node·도구에서 타입·파서로 사용할 수 있습니다.

---

## 5. 다음 단계

- **C#·Unity**: 생성 코드를 솔루션에 포함하고, [프로토콜](../products/protocol.md) 문서를 참고해 직렬화·메시지 처리를 연결합니다. npm 패키지의 `dist/csharp` 런타임 또는 [스타터 키트](../starter-kits.md)를 활용할 수 있습니다.
- **파이프라인 설정**: 여러 IDL·여러 출력을 한 번에 돌리려면 [파이프라인 모드](https://github.com/joygram/DeukPack#quick-start-cli) (`--pipeline ./deukpack-pipeline.json`)를 참고하세요.
- **Excel·Unity 연동**: [Excel 애드인](../products/excel-addin.md), [파이프라인·Unity](../products/pipeline-unity.md)를 참고하세요.

---

*CLI 옵션 전체는 터미널에서 `npx deukpack --help` 또는 [API·타입 참조](../reference/api.md)를 확인하세요.*
