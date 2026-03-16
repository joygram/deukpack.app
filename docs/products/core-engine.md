# 득팩 코어·엔진

**한 줄**: Thrift·Protobuf·OpenAPI 등 기존 정의를 한 곳에서 받아, **C#·C++·TypeScript·JavaScript** 코드 생성과 **메타·테이블·스키마** 지원을 제공하는 **고속 파싱·코드 생성** 엔진입니다.

---

## 무엇을 얻을 수 있나요

- **메모리**: 전체를 메모리에 올릴 필요 없음 — SQLite·스트리밍·(선택) 제로카피로 대용량·저메모리 구성 가능. 버퍼 재사용·리플렉션 최소로 런타임 할당이 작습니다.
- **성능**: 대량 IDL도 수십 배 빠른 파싱·코드 생성. 런타임 직렬화/역직렬화도 약 10배 빠른 수준을 목표로 합니다.
- **편의성**: 한 번 정의·한 번 빌드로 코드·Excel·DB·검증이 맞춰짐. Thrift·Protobuf·OpenAPI·CSV 등 기존 정의를 그대로 가져와 쓸 수 있습니다.
- **확장성**: 여러 파일·네임스페이스, C#·C++·TS·JS 동시 생성. 스키마·코드·DB·Excel을 한 소스에서 확장.

---

## Protobuf·gRPC·Thrift·OpenAPI와 함께

- **.proto 파일을 그대로** 가져와 득팩에서 사용할 수 있습니다.
- **한 빌드**에서 **.proto·.thrift·.deuk**를 **섞어 쓸 수 있어**, 기존 정의를 유지한 채 점진적으로 통합할 수 있습니다.
- Thrift(.thrift)·DeukPack(.deuk)·Protobuf(.proto) 파싱과 **OpenAPI 3.x**·**JSON Schema**·**CSV** 임포트로 기존 스펙을 AST로 불러와 코드·메타·테이블을 한 툴체인에서 다룹니다.

---

## 제공 기능

| 구분 | 내용 |
|------|------|
| **IDL 입력** | Thrift(.thrift), DeukPack(.deuk), Protobuf(.proto) 파싱. 구조체·enum·typedef·컨테이너·메시지. 한 빌드에서 세 IDL 혼합 사용 가능. |
| **스키마 임포트** | OpenAPI 3.x → AST, JSON Schema → AST, CSV → AST(스키마 추론). |
| **코드 생성** | C#, C++, TypeScript, JavaScript. GetSchema(), ProtocolRegistry, MetaTableRegistry 등 생성. |
| **데이터베이스** | SQLite: AST → DDL + C# 접근 코드. |

한 번의 정의로 다언어·다출력 동시 생성과 고속 빌드를 얻을 수 있고, 기존 정의를 그대로 재사용할 수 있습니다.
