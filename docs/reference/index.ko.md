# 레퍼런스 가이드

득팩(DeukPack) 제품군의 **API·타입·설정** 등을 참고할 수 있는 레퍼런스 문서입니다.

**확장 데이터 타입 (Protobuf/Thrift 대비) 한 줄:** `int8`–`int64`, `uint8`–`uint64`, `float`/`double`, `bool`, `string`/`binary`, `list`/`set`/`map`, **tablelink**, `datetime`/`decimal`, **struct extends** — 세부는 [API·타입 참조](api.md).

---

## 구성

| 구분 | 설명 |
|------|------|
| [API·타입 참조](api.md) | CLI, **확장 데이터 타입**(전체 목록·P/T 대비), **확장 기능**, **WriteFields**(골라보내기), **WriteWithOverrides**(일부 교체), GetSchema, ProtocolRegistry, 프로토콜·직렬화 |
| **코어·엔진** | [코어·엔진](../products/core-engine.md) — IDL 입력, 코드 생성, 스키마·SQLite |
| **프로토콜** | [프로토콜](../products/protocol.md) — Binary/Compact/JSON, msgId·ProtocolRegistry |
| **Excel·Unity** | [Excel 애드인](../products/excel-addin.md), [파이프라인·Unity](../products/pipeline-unity.md) |

---

## 제품 소개와의 차이

- **제품 소개**: 무엇을 하는 제품인지, 어떤 이점이 있는지 중심.
- **레퍼런스**: 실제로 호출·설정할 **이름·시그니처·옵션**을 찾을 때 참고.

상세 레퍼런스는 위 항목별 문서가 채워지는 대로 이어서 연결합니다.
