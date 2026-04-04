!!! tip "이 제품군 최근 노티"
    **2026-04-01** — 1.6.0 — JS JIT Codegen 및 C# Zero-Alloc 달성

    - **JavaScript**: 사전 컴파일된 `_readPack` 기반 V8 JIT 인라인 최적화 도입 (250% 성능 향상 및 GC 방어).
    - **C# / Unity**: 값 타입 캡슐화와 구조체 정적 할당을 통한 메모리 할당 0(Zero) 달성.
    - **벤치마크**: 전 언어 통합 메모리 방어 및 레이턴시 벤치마크 제공.
    - **로드맵**: Elixir(Erlang BEAM) 지원이 1.7.0 마이너 릴리즈로 승격.

    **2026-03-30** — 1.5.0 — Java 패리티·MCP 분리·보안 강화

    - **Java**: `extends`(상속), `TCompact`, `TJSON` 프로토콜 정식 지원.
    - **아키텍처**: MCP 서버 생성 로직을 독립 플러그인(`DeukPackMcp`)으로 분리.
    - **보안**: 전 언어 바이너리 입출력에 `MAX_SAFE_LENGTH`, `MAX_RECURSION_DEPTH` 보안 가드 적용.
    - **문서**: 공식 사이트(deukpack.app) 및 README 최신화.

    **2026-03-23** — 1.2.0 — 동봉 VSIX·npm 와이어·Unity 연동 문서

    - **VS Code 확장`: npm tarball에 ``bundled/deuk-idl.vsix`** 동봉; postinstall·bootstrap 연동(`bundled/README.md`).
    - **npm**: `serialize` / `deserialize` 를 `WireExtras`·`WireDeserializeExtras` 중심으로 정리(구 시그니처 제거).
    - **TypeScript 와이어**: `BinaryReader`, `wireTags`, `SerializationWarnings` 등 보강; `pack`·`json`·`yaml`·인터롭 와이어 짝 유지.
    - **문서`: Unity UPM 연동은 `deukpack.app** 안내.
    - **생성·CI**: C++/TS/JS 템플릿·JS 스키마 표기 정리, C# 프로토콜 CI 안정화.
