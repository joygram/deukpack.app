# 득팩 프로토콜

**한 줄**: **두 가지 와이어 계열** — (1) Thrift **호환(interop)** **`tbinary` / `tcompact` / `tjson`**, (2) **득팩 전용(deuk)** `pack` / `json` / `yaml`. **msgId·ProtocolRegistry**, C#·C++·JS 직렬화(JS 호환은 **`interopRootStruct`** 메타 필요). **Protobuf 바이트 와이어**(`protv2` / `protv3` 프로파일)는 **예정**이며 현재 미포함.

**레퍼런스 표(호환 vs 전용·언어별 구현):** [와이어 프로토콜 계열](../reference/wire-protocols.ko.md) — CLI·npm `serialize` 기본값·JS 제한을 한눈에.

--8<-- "_includes/product-notices-landing-protocol.ko.md"

---

## 무엇을 얻을 수 있나요

- **메모리·성능**: 버퍼 재사용·리플렉션 최소로 런타임 할당 최소화. (선택) 제로카피로 read 시 복사 없이 뷰 반환. 동일 페이로드 기준 약 10배 빠른 직렬화/역직렬화를 목표로 합니다.
- **편의성**: 데이터 선언만 하면 Read/Write·검증 구현 비용 제로 코드 생성. C#·C++에서 호환·전용 와이어를 고를 수 있고, **npm 패키지의 JS 동적 직렬화는 득팩 전용(`pack`/`json`/`yaml`)만** 지원합니다. **서버 연동·실시간 게임**에서 클라이언트-서버가 같은 스키마로 패킷·메타를 주고받을 수 있습니다.

---

## Protobuf에 없는 것 — 여기서 얻을 수 있는 것

| 구분 | 득팩 프로토콜 |
|------|----------------|
| **메타 데이터·테이블** | 게임 메타·기획 테이블을 스키마와 동일하게 관리. Excel·SQLite·CSV/JSON 파이프라인과 직결. |
| **네이티브 메시지 핸들링** | 숫자 msgId·ProtocolRegistry로 패킷만 보고 O(1) 디스패치·핸들러 매핑. |
| **스키마 차별** | GetSchema()로 필드·주석·기본값·어노테이션 런타임 복구. Excel 헤더·검증·타입 문자열 연동. |

코어·엔진이 생성한 타입으로 직렬화·메시지 처리를 하며, .deuk·.proto·.thrift 를 한 빌드에서 섞어 쓸 수 있어 **Protobuf 정렬 바이너리(Binary/Compact)** 를 우선 쓰면서, 레거시 스택과 **같은 바이트**로 맞출 수 있습니다. **새 그린 JS·Node 도구**는 **득팩 전용 `pack`** 을 기본으로 두는 편이 안전합니다.

---

## 제공 기능

| 구분 | 내용 |
|------|------|
| **와이어 (호환)** | Thrift 호환 **`tbinary`**, **`tcompact`**, **`tjson`** 만. **C#·C++** 생성 코드가 중심이며, **JS** 는 `SerializationOptions`에 **struct 스키마**를 넣으면 동일 와이어를 직렬화합니다. |
| **와이어 (득팩 전용)** | **`pack`**(태그 바이너리), **`json`**, **`yaml`** — npm **JS** 직렬화·역직렬화 지원. CLI 코드젠 기본 힌트도 **`pack`** 에 가깝습니다. |
| **계열 정합** | `wireFamily`: `interop` \| `deuk` — `protocol` 문자열과 짝이 맞아야 함. 상세는 [호환 vs 네이티브 와이어](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md). |
| **스키마 메타** | GetSchema(), 필드 스키마, 프로토콜 타입 문자열. Excel 헤더·검증 도구 연동. |
| **데이터베이스** | SQLite (DpSqliteProtocol): DDL·C# 접근 코드 생성. |

제로카피 프로토콜은 **선택 옵션**이며, 사용자가 명시적으로 선택할 때만 사용합니다. 버퍼 수명·불변성 등 주의사항은 별도 스펙 문서를 참고하세요.

---

## 다음에 읽을 문서

- [와이어 프로토콜 계열 (레퍼런스)](../reference/wire-protocols.ko.md)
- [튜토리얼 · 프로토콜·직렬화](../tutorial/protocol-serialization.ko.md)
- [코어 프로토콜 정책](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_PROTOCOL_POLICY.md)
