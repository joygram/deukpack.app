# 득팩 프로토콜 (Messaging Runtime)

**득팩 프로토콜**은 게임 서버, 클라이언트, 그리고 AI 에이전트 간의 통신을 위해 설계된 **고성능 이진 직렬화 및 지능형 메시지 핸들링 엔진**입니다.

--8<-- "_includes/product-notices-landing-protocol.ko.md"

---

## 핵심 가치

### 1. 고성능 이진 직렬화 (Serialization)
득팩은 기존 범용 시리얼라이저 대비 수배에서 수십 배 빠른 직렬화 성능을 제공합니다.
- **FastPacket 최적화**: ArrayPool 및 버퍼 풀링 기법으로 GC 부하와 복사를 최소화합니다.
- **다중 와이어 지원**: Thrift 호환(`tbinary`, `tcompact`)과 득팩 전용(`pack`, `json`)을 모두 지원합니다.
- **Zero-Copy**: 읽기 시 복사 없이 뷰(View)를 반환하여 성능을 극한으로 끌어올립니다.

### 2. 지능형 메시지 핸들링 (Dispatching)
수천 개의 패킷을 지연 없이 처리하는 메커니즘을 제공합니다.
- **O(1) 핸들러 매핑**: `ProtocolRegistry`를 통해 패킷 ID(`msgId`)를 전용 핸들러로 즉시 매핑합니다.
- **자동 코드 생성**: IDL 선언만으로 직렬화 코드와 핸들러 인터페이스를 자동 생성합니다.

### 3. AI 데이터 가드레일 (Guardrail)
AI 에이전트가 통신에 참여하는 환경에서 시스템의 정합성을 책임집니다.
- **런타임 타입 검증**: AI가 생성한 불안정한 데이터가 송수신될 때, 시리얼라이즈 단계에서 IDL 스펙과의 일치 여부를 즉시 검증합니다.
- **결정론적 상태 보장**: AI의 가변적 출력을 득팩의 결정론적 스키마로 강제합니다.

---

## 기능 비교 (Protobuf 대비 장점)

| 구분 | 득팩 프로토콜 | Protobuf |
|------|----------------|-----------|
| **메시지 핸들링** | **msgId·ProtocolRegistry** 연동 (O(1) 디스패치) | 애플리케이션 레벨에서 별도 구현 필요 |
| **타입 정보** | **GetSchema()**를 통한 런타임 스키마 복구 | 리플렉션/Descriptor 중심, 도구 연동 미비 |
| **메타 데이터** | **MetaTableRegistry**로 게임 테이블과 직결 | 데이터 메시지에 특화, 테이블 관리 체계 없음 |
| **직렬화 방식** | **Mixed-IDL**: Thrift/Proto 호환 포맷 지원 | 전용 포맷 고수 |

---

## 제공 기능 요약

| 구분 | 내용 |
|------|------|
| **와이어 (호환)** | Thrift 호환 **`tbinary`**, **`tcompact`**, **`tjson`** (C#/C++/JS) |
| **와이어 (전용)** | **`pack`**(태그 바이너리), **`json`**, **`yaml`** (JS/Node 최적화) |
| **데이터베이스** | **SQLite (DpSqliteProtocol)** DDL 및 접근 코드 생성 |
| **스키마 메타** | 필드 스키마, 프로토콜 타입 문자열, Excel 헤더 연동 |

---

## 다음에 읽을 문서

- [튜토리얼 · 프로토콜·직렬화](../tutorial/protocol-serialization.ko.md)
- [코어 프로토콜 정책](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_PROTOCOL_POLICY.md)
