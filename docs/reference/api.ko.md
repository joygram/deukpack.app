# API·타입 참조

득팩 코어의 **CLI 사용법**과 **생성 코드·런타임에서 쓰는 API** 요약입니다. 상세는 [GitHub 코어 저장소](https://github.com/joygram/DeukPack)와 제품별 문서를 참고하세요.

**English**: Use the language switcher (top right).

---

## CLI

**명령 형식**

```bash
npx deukpack <진입_IDL_경로> <출력_디렉터리> [옵션]
```

**주요 옵션**

| 옵션 | 설명 |
|------|------|
| `--csharp` | C# 코드 생성 |
| `--cpp` | C++ 코드 생성 |
| `--js` | JavaScript 코드 생성 (도구·BFF 등) |
| `-I <경로>` | include 경로 (여러 개 가능) |
| `--protocol <binary\|compact\|json>` | 직렬화 프로토콜 지정 |
| `--pipeline <config.json>` | 파이프라인 설정 파일로 여러 작업 일괄 실행 |

**예시**

```bash
npx deukpack ./schema.deuk ./gen --csharp --cpp -I ./idl
npx deukpack ./api.deuk ./out --csharp --protocol binary
npx deukpack --pipeline ./deukpack-pipeline.json
```

전체 옵션은 `npx deukpack --help` 로 확인할 수 있습니다.

---

## 프로그램 방식 (라이브러리)

Node에서 **파싱·AST**까지 쓰려면 `DeukPackEngine`(또는 해당 진입점)을 사용합니다. **다언어 코드 생성**은 v1에서 **CLI 사용**을 권장합니다. ([v1 범위](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_V1_RELEASE_SCOPE.md))

- **코어 저장소**: `src/` 및 [docs](https://github.com/joygram/DeukPack/tree/main/docs) 참고.

---

## 생성 코드에서 쓰는 API (C#)

득팩이 생성하는 C# 코드에서 자주 참조하는 것들입니다.

| 항목 | 용도 |
|------|------|
| **GetSchema()** | 생성된 타입에서 스키마(필드·타입·기본값 등)를 복구하는 API. 메타·검증·Excel 연동에 사용. |
| **ProtocolRegistry** | 메시지 타입 ↔ 식별자(msgId 등) 매핑. 디스패치·직렬화 시 참조. |
| **MetaTableRegistry** | 테이블·메타 타입 등록. 테이블 기반 데이터 로드·검증에 사용. |
| **IDeukPackReader / IDeukPackWriter** | Binary/Compact/JSON 등 프로토콜별 읽기·쓰기. 직렬화·역직렬화 시 사용. |

프로토콜 상세·와이어 포맷은 [프로토콜](../products/protocol.md) 문서를, Excel·메타 규칙은 [Excel 애드인](../products/excel-addin.md)을 참고하세요.

---

## 제품별 문서

| 구분 | 문서 |
|------|------|
| **코어·엔진** | [코어·엔진](../products/core-engine.md) — IDL 입력, 코드 생성, 스키마·SQLite |
| **프로토콜** | [프로토콜](../products/protocol.md) — Binary/Compact/JSON, msgId, 직렬화 |
| **Excel·Unity** | [Excel 애드인](../products/excel-addin.md), [파이프라인·Unity](../products/pipeline-unity.md) |
