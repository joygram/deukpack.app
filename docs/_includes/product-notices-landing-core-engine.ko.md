!!! tip "이 제품군 최근 노티"
    **2026-03-25** — 1.2.3 — init·bootstrap·VSIX 순서·Antigravity

    - **init**: 질문 정리; bootstrap 항상; `--skip-workspace` 제거.
    - **VSIX**: bootstrap 이후; 자동 설치 `code`→`cursor`→`antigravity`.
    - **문서**: `npx` vs `npm deukpack` 안내.

    **2026-03-24** — 1.2.2 — 파이프라인 전체 스캔·출력 경로·ts/js

    - **파이프라인**: `defineScope: all`(기본), `exclude`, 임시 번들 엔트리.
    - **출력**: `outputDir` 생략 시 `defineRoot`와 동일; 하위 폴더 기본 `csharp`/`cpp`/`ts`/`js`; `outputLangSubdirs`로 이름 변경.
    - **init·문서·예제**: 기본 파이프라인·경로 정합.

    **2026-03-24** — 1.2.1 — README·파이프라인 경고·VSIX 자동 갱신

    - **README**: 로컬 설치 절차 코드 블록·전역 `-g` 제거·키트 **득팩 테일** 표기.
    - **CLI**: `deukpack.pipeline.json` 없을 때 단발 실행 경고 → `npx deukpack init` 유도.
    - **init/bootstrap/VSIX**: 저장된 npm 버전과 불일치 시 VSIX 자동 설치 시도; Unity 근처 감지·비대화형 ensure.

    **2026-03-23** — 1.2.0 — 동봉 VSIX·npm 와이어·Unity 연동 문서

    - **VS Code 확장**: npm tarball에 **`bundled/deuk-idl.vsix`** 동봉; **postinstall**·**bootstrap**·**`sync-to-oss --build`** 경로 정리(`bundled/README.md`).
    - **npm**: `serialize` / `deserialize` 를 `WireExtras`·`WireDeserializeExtras` 중심으로 정리(구 시그니처 제거).
    - **TypeScript 와이어**: `BinaryReader`, `wireTags`, `SerializationWarnings` 등 보강; `pack`·`json`·`yaml`·인터롭 와이어 짝 유지.
    - **문서·연동**: UPM·`clientDeukDefinePath` 등 Unity 쪽 경로를 릴리스 스펙(§0.1)과 맞춤.
    - **생성·CI**: C++/TS/JS 템플릿·JS 스키마 득팩 표기 정리, C# 프로토콜 CI 안정화.

    **2026-03-20** — 1.1.0 — C++ uint 타입·레거시 message·CLI

    - **C++ (`--cpp`)**: `uint8` 등 → `<cstdint>` 고정폭 타입.
    - **IDL**: Thrift 스타일 레거시 `message { }` 블록 파싱.
    - **CLI**: `deukpack` → `scripts/build_deukpack.js` 위임.
