# 제품군 개요

득팩은 **IDL·스키마·코드 생성·직렬화·메타·파이프라인**을 담당하며, **서버 연동·실시간 게임 연동**까지 동일 스키마·프로토콜로 이어지는 **코어·엔진 / 프로토콜 / 스프레드시트 애드인(Excel 등) / 파이프라인·Unity / 확장 제품군**으로 나누어 볼 수 있습니다. 제품 간 관계·데이터 흐름은 [제품 관계도](../architecture.md)에서 다이어그램으로 확인할 수 있습니다.

---

## 제품별 역할

| 제품 | 핵심 역할 | 포함 범위 | 소개 페이지 |
|------|-----------|-----------|-------------|
| **득팩 코어·엔진** | IDL 파싱, AST, 코드 생성, 스키마·메타의 중심 엔진. **Apache-2.0**, **바로 사용 가능**. **차별화:** 구조체 상속(extends), 다양한 타입(float·DB 모델·tablelink). | .deuk/.proto/.thrift, OpenAPI/JSON Schema/CSV/JSON/DB 임포트, C#/C++/TS/JS 코드 생성, SQLite 생성 | [코어·엔진](core-engine.md) |
| **득팩 프로토콜** | 직렬화 런타임과 메시지 처리 규약 | Binary/Compact/JSON, msgId, ProtocolRegistry, 제로카피 옵션, 패킷 바디 직렬화 | [프로토콜](protocol.md) |
| **득팩 Excel 애드인** | Excel에서 스키마 기반 메타 작업 | 헤더 생성, 검증, 스키마 비교, Apply, 시트 기반 메타 편집 | [Excel 애드인](excel-addin.md) |
| **득팩 파이프라인·Unity** | 산출물을 프로젝트/Unity·서버에 연결 | IDL/Excel → 코드·스키마·테이블 → Unity·서버 검증·로드. 서버 연동·실시간 게임 연동 | [파이프라인·Unity](pipeline-unity.md) |
| **확장 제품군** | 코어 위 부가 제품 | EF, DB 마이그레이터, Google Sheets, Unreal/Elixir, 플러그인 | [확장 제품군](extension.md) |

---

## 핵심 기능 하이라이트

| 기능 | 한 줄 요약 | 해결하는 문제 |
|------|-----------|-------------|
| **테이블·메타** | 스키마 기반 `MetaTableRegistry`, Excel 애드인 | 메타 데이터 검증·로드·편집을 스키마와 일치시킴 |
| **네이티브 메시지** | `msgId`·`ProtocolRegistry` 자동 생성 | 메시지 ID·디스패치·핸들러 등록을 수작업 없이 |
| **상속 (extends)** | 부모 struct 필드 자동 병합 | 공통 필드 중복 정의, 다단 상속, 와이어 호환 유지 |
| **선택 (WriteFields)** | 풀 레코드에서 필드 골라 직렬화 | partial 타입 없이 런타임 프로젝션 |
| **교체 (WriteWithOverrides)** | Clone 없이 수신자별 필드만 바꿔 직렬화 | 팬아웃·푸시의 메모리·성능 최적화 |
| **다양한 데이터 타입** | float, double, int8–int64, list/set/map, **tablelink**(DB 행 참조), datetime, decimal | DB 모델·수치 정밀도·메타/테이블 스키마를 한 타입 시스템으로 |

→ **확장 데이터 타입 (Protobuf/Thrift 대비) 한 줄:** `int8–int64`, `uint8–uint64`, `float`/`double`, `bool`, `string`/`binary`, `list`/`set`/`map`, **tablelink**, `datetime`/`decimal`, **struct extends**. 전체 목록·의미: [레퍼런스 → API](../reference/api.md).  
→ **코어 차별화:** **구조체 상속(extends)** 와 위 타입 세트(DB 모델 지원 포함)가 엔진에 내장됨. 세 직렬화 기능(WriteFields, WriteWithOverrides, Wire Profile)은 **조합 가능**. 상세: [WriteWithOverrides 튜토리얼](../tutorial/write-with-overrides.md), [API 참조](../reference/api.md).

---

## 제품 선택 가이드

- **지금 바로 코어를 쓰고 싶다** → [코어·엔진](core-engine.md) 상단의 **코어 라이브러리 바로 사용하기**(npm·GitHub 링크, 설치·CLI)
- **정의·스키마를 한 툴체인으로 통합하고, 기존 IDL·OpenAPI·CSV·DB를 연동하고 싶다** → [코어·엔진](core-engine.md)
- **패킷·메타 직렬화·서버 연동·실시간 게임 연동이 필요하다** → [프로토콜](protocol.md)
- **기획·밸런스 메타를 스키마대로 스프레드시트에서 관리하고 싶다** → [Excel 애드인](excel-addin.md)
- **정의·메타 산출물을 Unity·서버에 적용·로드하고, 서버·실시간 게임 연동을 하고 싶다** → [파이프라인·Unity](pipeline-unity.md)
