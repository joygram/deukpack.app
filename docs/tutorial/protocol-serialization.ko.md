# 프로토콜·직렬화

득팩은 와이어를 `두 계열`로 나눕니다. `호환(interop)** 과 `득팩 전용(deuk)** 을 먼저 고른 뒤, 그 안에서 `protocol` 문자열을 고릅니다. 표와 CLI 기본값은 [와이어 프로토콜 계열](../reference/wire-protocols.ko.md)을 보면 한눈에 정리됩니다.

---

## 1. 계열과 프로토콜 이름

### 득팩 전용 (`wireFamily: deuk`)

| 프로토콜 | CLI 예 | 용도 |
|----------|--------|------|
| **`pack`** | `--protocol pack` (코드젠 힌트 기본에 가까움) | 태그 기반 바이너리. **npm JS** `serialize` 기본값도 여기 |
| **`json`** | `--protocol json` | 값만 UTF-8 JSON (Thrift JSON **`tjson`** 과 다름) |
| **`yaml`** | `--protocol yaml` | 값만 UTF-8 YAML |

### 호환 — Thrift 쪽 (`wireFamily: interop`)

| 프로토콜 | CLI 예 | 용도 |
|----------|--------|------|
| **`tbinary`** | `--protocol tbinary` | Thrift Binary 호환 |
| **`tcompact`** | `--protocol tcompact` | Thrift Compact |
| **`tjson`** | `--protocol tjson` | Thrift JSON (`DpJsonProtocol`) |

`JS:** **`pack` / `json` / `yaml`** 은 추가 메타 없이 동작합니다. **`tbinary` / `tcompact` / `tjson`** 은 `SerializationOptions`에 **`interopRootStruct`**(+ 중첩용 **`interopStructDefs`**)가 필요하거나 **`serializeInteropStruct`** 를 씁니다. 서비스 코드는 여전히 `생성 C#·C++** 이 중심입니다.

한 IDL 출력에 `한 `--protocol` 힌트`를 주는 전제는 같습니다. 여러 와이어가 필요하면 출력 폴더를 나누거나 `--pipeline` 으로 잡을 여러 개를 두면 됩니다.

---

## 2. 직렬화 흐름 (개념)

1. **쓰기`: 메모리 상의 구조체/객체 → `Writer**(또는 npm `serialize`) → 바이트 또는 텍스트.
2. **읽기`: 바이트/텍스트 → `Reader**(또는 npm `deserialize`) → 구조체/객체.

`같은 스키마·같은 `protocol`·같은 계열`이면 C#에서 쓴 바이트를 C++에서 읽는 식의 교차가 맞습니다. **계열이 다르면** 바이트 형식이 다릅니다.

---

## 3. 선택 가이드

- **새 Node·브라우저 도구, JS만으로 끝내기:** **`pack`** 또는 `json` / `yaml` (득팩 전용).
- **기존 Thrift Binary/Compact 서비스와 바이트 호환:** **`tbinary`** 또는 **`tcompact`** — 생성 **C#·C++**(또는 스키마 옵션을 쓴 JS).
- **HTTP/REST, 사람이 읽는 로그 (득팩 네이티브 JSON):** **`json`** (deuk) — Thrift JSON이 필요하면 **`tjson`**.

상세·필드 인코딩: [프로토콜](../products/protocol.ko.md), [호환 vs 네이티브 와이어](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md), [코어 프로토콜 정책](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_PROTOCOL_POLICY.md).

---

## 4. 코드 생성 시 지정

```bash
npx deukpack ./schema.deuk ./gen --csharp --protocol pack
npx deukpack ./schema.deuk ./gen-interop --csharp --protocol tbinary
npx deukpack ./schema.deuk ./gen-json --csharp --protocol json
```

생성된 C#/C++ 코드는 선택한 프로토콜(계열)에 맞는 Read/Write를 포함합니다.

---

## 5. npm에서 한 줄로 (득팩 전용)

```ts
import { serialize, deserialize } from 'deukpack';
const bytes = serialize(obj);       // 기본 = pack
const again = deserialize(bytes);
```

호환 바이너리는 이 API만으로는 낳지 않습니다. [와이어 프로토콜 계열](../reference/wire-protocols.ko.md) 참고.

---

## 6. msgId·ProtocolRegistry (C#)

메시지 종류별로 `msgId`를 붙여 디스패치할 때는 생성 코드의 `ProtocolRegistry`와 쌍을 이룹니다. 수신 버퍼에서 msgId를 읽은 뒤, Registry에서 해당 타입을 찾아 `Read`로 역직렬화하는 패턴을 사용합니다.  
자세한 사용법은 [C# 가이드](csharp-guide.ko.md)와 [프로토콜](../products/protocol.ko.md) 문서를 참고하세요.

---

## 7. 다음 단계

- [와이어 프로토콜 계열](../reference/wire-protocols.ko.md) — 표·JS 제한
- [C# 가이드](csharp-guide.ko.md) — C#에서 Read/Write 사용
- [C++ 가이드](cpp-guide.ko.md) — C++에서 직렬화
- [API·타입 참조](../reference/api.ko.md) — CLI·생성 API 요약
