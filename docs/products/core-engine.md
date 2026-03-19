# 득팩 코어·엔진

**한 줄**: **득팩 네이티브 IDL(.deuk)** 을 중심으로 **파싱·AST·코드 생성·스키마·메타**를 한 엔진에서 제공합니다. C#·C++·TS·JS 출력; Protobuf·OpenAPI·CSV·레거시 .thrift 는 **같은 파이프라인 입력**입니다.

---

## 코어 라이브러리 바로 사용하기

득팩 **코어 라이브러리**는 **무료로 사용할 수 있고**, **바로 적용할 수 있습니다.** **Apache-2.0** 라이선스로, 별도 계약·가입 없이 **상업/비상업·수정·재배포**가 가능하며, npm·GitHub에서 **바로 설치해 사용**할 수 있습니다. CLI·코드 생성·C# 런타임까지 한 번에 쓸 수 있습니다.

| 링크 | 용도 |
|------|------|
| [**npm — deukpack**](https://www.npmjs.com/package/deukpack) | 패키지 설치·버전 확인. `npm install deukpack` / `npx deukpack` 사용. |
| [**GitHub — joygram/DeukPack**](https://github.com/joygram/DeukPack) | OSS 소스·이슈·기여. 클론 후 로컬 빌드·연동 시 참고. |

**GitHub 페이지**

득팩 코어의 **공식 OSS 저장소**는 [**github.com/joygram/DeukPack**](https://github.com/joygram/DeukPack) 입니다. 여기에서 **소스 코드**, **README·문서**, **이슈·기여**, **릴리스**를 확인할 수 있습니다. 클론·로컬 빌드·기여 방법은 저장소의 README, CONTRIBUTING, RELEASING을 참고하세요. 상용·비상용 프로젝트에 바로 적용 가능한 **무료·Apache-2.0** 코어입니다.

**바로 시작하기**

```bash
# 프로젝트에 추가
npm install deukpack

# CLI로 코드 생성 (설치 없이 한 번 실행)
npx deukpack ./idl/root.deuk ./gen --csharp --cpp --js -I ./idl
```

- **C#·Unity**에서 생성 코드와 함께 쓰려면: npm 패키지의 `dist/csharp` 런타임을 참조하거나, [스타터 키트](../starter-kits.md)에서 샘플을 확인하세요.
- **단계별 가이드**: [튜토리얼 · 빠른 시작](../tutorial/quickstart.md)에서 IDL 작성부터 코드 생성까지 따라 할 수 있습니다.

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
