# 와이어 프로토콜 계열 (호환 vs 득팩 전용)

CLI `--protocol`, npm 패키지 `serialize` / `deserialize`, 생성 **C#·C++** 코드가 쓰는 **문자열 이름은 같아 보여도**, 실제로는 **두 계열**로 나뉩니다. 여기를 기준으로 맞추면 **스택별로 어떤 구현이 있는지** 헷갈리지 않습니다.

**English:** 사이트 상단 **언어** 메뉴에서 **English**를 선택하면 동일 목차의 영문 페이지로 이동합니다.

---

## 1. 계열 (`wireFamily`)

| 값 | 의미 |
|----|------|
| **`interop`** | Thrift 등 **외부와 바이트·의미를 맞출 때** 쓰는 호환 계열 |
| **`deuk`** | **득팩 전용** 와이어 (npm의 동적 JS 직렬화가 지원하는 범위) |

`protocol` 문자열과 계열이 **서로 맞아야** 합니다. 런타임·헬퍼에서 `wireFamily`를 넣거나, 타입으로 고정하려면 코어의 `WireProtocolOption`·`deukWire()` / `interopWire()` 패턴을 쓰면 됩니다. (상세: [호환 vs 네이티브 와이어](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md))

---

## 2. 프로토콜 이름표 (언어별 구현)

### 호환 계열 (`interop`) — Thrift

**허용 문자열만:** **`tbinary`**, **`tcompact`**, **`tjson`**. 예전 `binary` / `compact` / `thrift_json` 등은 CLI·타입에서 **받지 않습니다**.

| `protocol` | 설명 | **JS** `WireSerializer` | **C# / C++** 생성 코드 |
|------------|------|-------------------------|-------------------------|
| **`tbinary`** | Thrift Binary | **`interopRootStruct`**(+ 중첩 시 **`interopStructDefs`**) 주면 **구현** | `DpBinaryProtocol` 등 |
| **`tcompact`** | Thrift Compact | 동일 | `DpCompactProtocol` 등 |
| **`tjson`** | Thrift JSON (`DpJsonProtocol`) | 동일 | C# 등 |

루트 struct 스키마 없이 호환 프로토콜만 지정하면 **필드 id를 알 수 없어** 명시적 오류가 납니다. 파싱·스키마에서 채운 옵션으로 `WireSerializer` 또는 `serializeInteropStruct` / `deserializeInteropStruct` 를 쓰면 됩니다. 앱 규모에서는 **생성 C#·C++** 이 여전히 중심입니다.

### Protobuf 바이트 와이어 (**예정**)

Google Protobuf 스타일 **바이트** 인코딩(`protv2` / `protv3` 프로파일)은 **로드맵상 예정**이며 현재 미포함입니다. 당분간은 Thrift 호환(`tbinary` 등) 또는 득팩 전용 와이어를 쓰면 됩니다. **`protv2` / `protv3`** 는 문서에서 **필드 규칙** 표기용으로만 쓸 수 있습니다.

### 득팩 전용 계열 (`deuk`)

| `protocol` | 설명 | **JS** `WireSerializer` | **C# / C++** 생성 코드 |
|------------|------|-------------------------|-------------------------|
| `pack` | 태그 기반 바이너리(득팩 네이티브) | **구현됨** | 생성 Reader/Writer와 조합 |
| `json` | 값만 UTF-8 JSON | **구현됨** | 동일 계열 |
| `yaml` | 값만 UTF-8 YAML | **구현됨** | 동일 계열 |

**CLI 기본 `--protocol`:** **`pack`**. 호환은 **`tbinary` / `tcompact` / `tjson`** 만.

---

## 3. npm 패키지 `serialize` / `deserialize` (단순 호출)

- **기본 포맷 인자:** 생략 시 **`pack`** (득팩 전용 바이너리).
- **네 번째 인자** 등으로 `wireFamily`를 넘길 수 있으며, `protocol`과 계열이 어긋나면 검증에서 막힙니다.

```ts
import { serialize, deserialize } from 'deukpack';
// 기본 = pack + deuk 계열
const bytes = serialize(obj);
```

JS에서 Thrift 호환 바이트가 필요하면 **`interopRootStruct`**(및 필요 시 **`interopStructDefs`**)를 넘깁니다. **`pack` / `json` / `yaml`** 은 스키마 없이 동적 객체로 처리합니다.

---

## 4. CLI `--protocol` 과 코드 생성

| `--protocol` | 계열 | 생성물이 기대하는 와이어 |
|--------------|------|---------------------------|
| `pack`, `json`, `yaml` | `deuk` | 득팩 네이티브 |
| **`tbinary`**, **`tcompact`**, **`tjson`** | `interop` | Thrift 호환 |

한 번에 **한 값**을 코드젠 힌트로 넣습니다. 여러 와이어가 필요하면 출력 폴더를 나누거나 `--pipeline`으로 잡을 여러 개를 둡니다.

---

## 5. `json` 이름이 겹칠 때 (헷갈림 방지)

- **득팩 전용 `json` / `yaml`:** 와이어로 쓰는 **값만** JSON·YAML ([DEUKPACK_DEUK_JSON_YAML](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_DEUK_JSON_YAML.md) — 설정·OpenAPI 라운드트립용 `.deuk.json` 등과 구분).
- **`tjson`:** **Thrift JSON** 호환 계열 — `json`(deuk)과 **다릅니다**.

---

## 6. 더 읽을 곳

- [프로토콜](../products/protocol.ko.md) — 제품 관점 요약
- [튜토리얼 · 프로토콜·직렬화](../tutorial/protocol-serialization.ko.md) — 선택 가이드
- [메시지·와이어](messages.ko.md) — msgId·Registry·필드 부분 전송
- [API·타입 참조 — CLI](api.md#cli) — 전체 플래그

---

## 손으로 익히기

- [와이어·직렬화 주제](https://kits.deukpack.app/topics/serialization/) · [제4장 · 네트워크 터널](https://kits.deukpack.app/journey/part-04-network/)
