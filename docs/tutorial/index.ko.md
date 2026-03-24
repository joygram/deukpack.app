# 튜토리얼

득팩(DeukPack)을 **처음 써 보는 분**을 위한 단계별 가이드입니다. Thrift·Protobuf 사용 경험이 있다면 [IDL 가이드](idl-guide.md)부터, 없으면 [빠른 시작](quickstart.md)부터 진행하세요.

**English**: Use the language switcher (top right).

---

## 기본 튜토리얼 (Getting Started)

| 순서 | 문서 | 내용 |
|------|------|------|
| 1 | [**빠른 시작**](quickstart.md) | 설치 → IDL 한 개 작성 → 코드 생성 → 출력 확인 (약 5분) |
| 2 | [**IDL 가이드**](idl-guide.md) | .deuk·.thrift 문법: 타입, struct, enum, namespace, include — 메시지 정의하기 |
| 3 | [**프로토콜·직렬화**](protocol-serialization.md) | Binary / Compact / JSON 선택, 직렬화·역직렬화 흐름 |
| 4 | [**파이프라인 만들기**](pipeline-guide.md) | 소스 빌드 후 파이프라인 · 배포본(npm)으로 파이프라인 실행 |
| 5 | [**통합 Write·extends**](write-with-overrides.md) | 오버라이드(수신자별 값), 필드 선택 직렬화, 상속(공통 필드 한 번 정의). 기능 비교표 포함. |

---

## 세부 튜토리얼 (언어별·활용)

| 문서 | 대상 | 내용 |
|------|------|------|
| [**C# 가이드**](csharp-guide.md) | .NET·Unity 개발자 | 생성 코드, 읽기/쓰기, 통합 **Write**, GetSchema·ProtocolRegistry |
| [**C++ 가이드**](cpp-guide.md) | 네이티브·서버 개발자 | 생성 헤더/소스 연동, CMake, 직렬화 예제 |
| *(추가 예정)* | Excel·Unity 파이프라인 | 메타 테이블·Excel 연동, Unity 로드 |
| *(추가 예정)* | 기존 Thrift/Protobuf 도입 | 혼합 IDL, 점진적 전환 |

---

## 추천 경로

- **코어만 빠르게 써보기**: [빠른 시작](quickstart.md) → [API·타입 참조](../reference/api.md)
- **IDL 설계·문법**: [IDL 가이드](idl-guide.md) → [프로토콜·직렬화](protocol-serialization.md)
- **C#으로 서비스/클라이언트**: [빠른 시작](quickstart.md) → [C# 가이드](csharp-guide.md)
- **C++로 서버/툴**: [빠른 시작](quickstart.md) → [C++ 가이드](cpp-guide.md)
- **여러 IDL·출력을 한 번에**: [파이프라인 만들기](pipeline-guide.md)
- **팬아웃·수신자별 필드**: [통합 Write](write-with-overrides.md) → [API·타입 참조](../reference/api.md)

---

## 전제 조건

- **코어**: Node.js 18+, `npm install deukpack` 또는 `npx deukpack`
- **C#**: .NET SDK, 생성 코드 + [DeukPack.Protocol](https://github.com/joygram/DeukPack) 런타임 참조
- **C++**: CMake, C++17, 생성 헤더/소스 경로 포함
- **Excel·Unity**: 각 제품 페이지 요구 사항 참고

제품 소개는 [제품군 개요](../products/index.md), 상세 레퍼런스는 [레퍼런스 가이드](../reference/index.md)를 참고하세요.
