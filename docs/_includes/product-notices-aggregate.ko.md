## 제품군 노티 (날짜 역순)

### 2026-03-28 — 득팩 코어·엔진 · 확장 제품군 · 득팩 파이프라인·Unity

**1.2.6 — 스키마 표준·C# 코드젠·C++ CI·verify**

- **스키마**: `struct`/`enum`/`int32` 등 득팩 표준; JSON 와이어 `{i32}` 등 키는 그대로.
- **C#**: `DpSchemaType` `Int16`/`Int32`/`Int64`, 생성 타입 기본 초기화.
- **CI**: Ubuntu·Windows에서 C++ `ctest`.
- **도구**: `npm run verify`.

---

### 2026-03-27 — 득팩 코어·엔진 · 확장 제품군 · 득팩 파이프라인·Unity

**1.2.5 — npm·GitHub index 정합·C# CS8767**

- **TypeScript 진입점**: npm과 GitHub에서 동일한 공개 API(`serialize`/`deserialize`, 인터롭, `packStructWire` 등). Excel 전용 프로토콜은 공개 소스 트리에 없음.
- **C#**: `DpJsonProtocol`·`DpDeukJsonProtocol`·`DpExcelProtocol`·`TBinaryProtocol` 등 `WriteString`/`WriteBinary`를 `string?`/`byte[]?`로 정합; `DpMetaInfosWrapper.TryGetValue`에 `[MaybeNullWhen(false)]`.

---

### 2026-03-26 — 득팩 코어·엔진 · 확장 제품군 · 득팩 파이프라인·Unity

**1.2.4 — GitHub README 링크·의존성·Node 18·audit**

- **README (GitHub)**: 문서 링크를 deukpack.app으로 안내.
- **의존성**: Jest 30, protobufjs 8, node-addon-api 8, yaml/nan, rimraf 6, cmake-js 8, node-gyp 12 등.
- **보안·환경**: `npm audit fix`(minimatch); `engines`·setup 최소 Node 18.

---

### 2026-03-25 — 득팩 코어·엔진 · 확장 제품군 · 득팩 파이프라인·Unity

**1.2.3 — init·bootstrap·VSIX 순서·Antigravity**

- **init**: 질문 정리; bootstrap 항상; `--skip-workspace` 제거.
- **VSIX**: bootstrap 이후; 자동 설치 `code`→`cursor`→`antigravity`.
- **문서**: `npx` vs `npm deukpack` 안내.

---

### 2026-03-24 — 득팩 코어·엔진 · 확장 제품군 · 득팩 파이프라인·Unity

**1.2.2 — 파이프라인 전체 스캔·출력 경로·ts/js**

- **파이프라인**: `defineScope: all`(기본), `exclude`, 임시 번들 엔트리.
- **출력**: `outputDir` 생략 시 `defineRoot`와 동일; 하위 폴더 기본 `csharp`/`cpp`/`ts`/`js`; `outputLangSubdirs`로 이름 변경.
- **init·문서·예제**: 기본 파이프라인·경로 정합.

---

### 2026-03-24 — 득팩 코어·엔진 · 확장 제품군 · 득팩 파이프라인·Unity

**1.2.1 — README·파이프라인 경고·VSIX 자동 갱신**

- **README**: 로컬 설치 절차 코드 블록·전역 `-g` 제거·키트 **득팩 테일** 표기.
- **CLI**: `deukpack.pipeline.json` 없을 때 단발 실행 경고 → `npx deukpack init` 유도.
- **init/bootstrap/VSIX**: 저장된 npm 버전과 불일치 시 VSIX 자동 설치 시도; Unity 근처 감지·비대화형 ensure.

---

### 2026-03-23 — 득팩 코어·엔진 · 득팩 프로토콜 · 득팩 파이프라인·Unity · 확장 제품군

**1.2.0 — 동봉 VSIX·npm 와이어·Unity 연동 문서**

- **VS Code 확장**: npm tarball에 **`bundled/deuk-idl.vsix`** 동봉; postinstall·bootstrap 연동(`bundled/README.md`).
- **npm**: `serialize` / `deserialize` 를 `WireExtras`·`WireDeserializeExtras` 중심으로 정리(구 시그니처 제거).
- **TypeScript 와이어**: `BinaryReader`, `wireTags`, `SerializationWarnings` 등 보강; `pack`·`json`·`yaml`·인터롭 와이어 짝 유지.
- **문서**: Unity UPM 연동은 **deukpack.app** 안내.
- **생성·CI**: C++/TS/JS 템플릿·JS 스키마 표기 정리, C# 프로토콜 CI 안정화.

---

### 2026-03-20 — 득팩 코어·엔진

**1.1.0 — C++ uint 타입·레거시 message·CLI**

- **C++ (`--cpp`)**: `uint8` 등 → `<cstdint>` 고정폭 타입.
- **IDL**: Thrift 스타일 레거시 `message { }` 블록 파싱.
- **CLI**: `deukpack` → `scripts/build_deukpack.js` 위임.

---
