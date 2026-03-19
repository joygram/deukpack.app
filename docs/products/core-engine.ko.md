# 득팩 코어·엔진

**한 줄**: **득팩 네이티브 IDL(.deuk)** 을 중심으로 **파싱·AST·코드 생성·스키마·메타**를 한 엔진에서 제공합니다. C#·C++·TS·JS 출력; Protobuf·OpenAPI·CSV·레거시 .thrift 는 **같은 파이프라인 입력**입니다.

---

## 득팩 코어 바로 사용하기

득팩 **코어**는 **무료·Apache-2.0**으로 **바로** 설치해 쓸 수 있습니다. CLI·코드 생성·C# 런타임까지 npm 하나로 사용할 수 있습니다.

### 설치·실행 (한 줄)

| 채널 | 링크 | 용도 |
|------|------|------|
| **npm** | [deukpack](https://www.npmjs.com/package/deukpack) | `npm install deukpack` / `npx deukpack` — 배포본만 사용 시 |
| **GitHub** | [joygram/DeukPack](https://github.com/joygram/DeukPack) | 소스·이슈·기여·릴리스. 클론·로컬 빌드 시 |

```bash
# 프로젝트에 추가
npm install deukpack

# CLI로 코드 생성 (설치 없이 한 번 실행)
npx deukpack ./idl/root.deuk ./gen --csharp --cpp --js -I ./idl
```

### 이 사이트에서 더 보기

| 문서 | 내용 |
|------|------|
| [설치 (Windows·Linux)](../tutorial/install-os.md) | Node 설치, 배포본(npm)·.tgz 설치 |
| [빠른 시작](../tutorial/quickstart.md) | IDL 하나로 C#, C++, TS 생성까지 단계별 |
| [IDL 가이드](../tutorial/idl-guide.md) | .deuk·.thrift 문법·네임스페이스 |
| [C# 가이드](../tutorial/csharp-guide.md) | C# 생성물·프로토콜·참조 |
| [C++ 가이드](../tutorial/cpp-guide.md) | C++ 빌드·include·실행 |
| [파이프라인 만들기](../tutorial/pipeline-guide.md) | 여러 잡·설정 JSON |
| [스타터 키트](../starter-kits.md) | Unity·C++·Console·EF·TS 등 샘플 |
| [문서 안내](../documentation-index.md) | 한글·영문 문서 위치 |

### GitHub 저장소

| 문서 | 내용 |
|------|------|
| [배포본 vs 소스본](../tutorial/distribution-vs-source.md) | npm 사용 vs 클론·빌드 (이 사이트) |
| [README (한글)](https://github.com/joygram/DeukPack/blob/main/README.ko.md) | 저장소 진입·요약 |
| [릴리스용 문서 목록](https://github.com/joygram/DeukPack/blob/main/docs/RELEASE_DOCS_INDEX.md) | 배포·사용자용 문서 인덱스 |

---

## 코어 라이브러리 요약

- **공식 OSS**: [github.com/joygram/DeukPack](https://github.com/joygram/DeukPack) — 소스, README, 이슈, 기여, 릴리스. 클론·로컬 빌드·기여는 저장소의 README·RELEASING을 참고하세요.
- **C#·Unity**: npm 패키지의 `dist/csharp` 런타임 참조 또는 [스타터 키트](../starter-kits.md) 샘플.

---

## 무엇을 얻을 수 있나요

- **메모리**: 전체를 메모리에 올릴 필요 없음 — SQLite·스트리밍·(선택) 제로카피로 대용량·저메모리 구성 가능. 버퍼 재사용·리플렉션 최소로 런타임 할당이 작습니다.
- **성능**: 대량 IDL도 수십 배 빠른 파싱·코드 생성. 런타임 직렬화/역직렬화도 약 10배 빠른 수준을 목표로 합니다.
- **편의성**: 한 번 정의·한 번 빌드로 코드·메타·DB·검증이 맞춰짐. 기존 .proto·OpenAPI·CSV·.thrift 를 **득팩으로 흡수**할 수 있습니다.
- **확장성**: 여러 파일·네임스페이스, C#·C++·TS·JS 동시 생성. 스키마·코드·DB·Excel을 한 소스에서 확장.

---

## 기존 정의·스펙과 함께

- **.deuk** 우선; **Protobuf·.thrift** 를 한 AST에서 혼합할 수 있습니다.
- **OpenAPI 3.x·JSON Schema·CSV** 임포트로 기존 스펙을 AST로 불러와 코드·메타·테이블을 한 툴체인에서 다룹니다.
- .proto·.thrift 파일을 그대로 가져와 점진적으로 통합할 수 있습니다.

---

## 제공 기능

| 구분 | 내용 |
|------|------|
| **IDL 입력** | **Deuk(.deuk)**, Protobuf(.proto), .thrift 파싱. 한 빌드에서 혼합 가능. |
| **스키마 임포트** | OpenAPI 3.x → AST, JSON Schema → AST, CSV → AST(스키마 추론). |
| **코드 생성** | C#, C++, TypeScript, JavaScript. GetSchema(), ProtocolRegistry, MetaTableRegistry 등 생성. |
| **데이터베이스** | SQLite: AST → DDL + C# 접근 코드. |

한 번의 정의로 다언어·다출력 동시 생성과 고속 빌드를 얻을 수 있고, 기존 정의를 그대로 재사용할 수 있습니다.
