# 프로토콜·직렬화

득팩은 **Binary**, **Compact**, **JSON** 세 가지 직렬화 프로토콜을 지원합니다. 코드 생성 시 `--protocol` 로 선택하며, 선택한 프로토콜에 맞는 Reader/Writer가 생성됩니다.

---

## 1. 프로토콜 종류

| 프로토콜 | 옵션 | 용도 | 특징 |
|----------|------|------|------|
| **Binary** | `--protocol binary` | 서버·클라이언트 간 바이너리 통신, Thrift Binary 호환 | 필드 ID·타입 기반, 빠른 직렬화·파싱 |
| **Compact** | `--protocol compact` | 대역·저장 절약이 중요한 경우 | Binary보다 작은 페이로드 |
| **JSON** | `--protocol json` | REST·디버깅·로그 | 사람이 읽기 쉬움, 텍스트 기반 |

한 IDL에서 **한 프로토콜**만 지정해 생성합니다. 여러 프로토콜이 필요하면 출력 폴더를 나누어 두 번 생성하거나, 파이프라인 설정으로 여러 잡을 두면 됩니다.

---

## 2. 직렬화 흐름 (개념)

1. **쓰기**: 메모리 상의 구조체/객체 → **Writer**에 넘김 → 바이트 스트림(또는 JSON 문자열)으로 출력.
2. **읽기**: 바이트 스트림(또는 JSON 문자열) → **Reader**로 파싱 → 구조체/객체로 복원.

동일한 스키마·동일한 프로토콜이면, C#에서 쓴 바이트를 C++에서 읽거나 그 반대가 가능합니다 (와이어 호환).

---

## 3. 프로토콜 선택 가이드

- **게임·실시간 서버, 성능 중요**: **Binary** 또는 **Compact**.
- **기존 Thrift Binary 서비스와 호환**: **Binary**.
- **HTTP/REST, 로그·모니터링**: **JSON**.
- **저장 용량·대역 최소화**: **Compact**.

상세 스펙·필드 인코딩은 [프로토콜](../products/protocol.md) 문서와 [코어 저장소 프로토콜 정책](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_PROTOCOL_POLICY.md)을 참고하세요.

---

## 4. 코드 생성 시 지정

```bash
npx deukpack ./schema.deuk ./gen --csharp --protocol binary
npx deukpack ./schema.deuk ./gen-json --csharp --protocol json
```

생성된 C#/C++ 코드는 선택한 프로토콜에 맞는 Read/Write 구현을 포함합니다.

---

## 5. msgId·ProtocolRegistry (C#)

메시지 종류별로 **msgId**를 붙여 디스패치할 때는 생성 코드의 **ProtocolRegistry**와 쌍을 이룹니다. 수신 버퍼에서 msgId를 읽은 뒤, Registry에서 해당 타입을 찾아 **Read**로 역직렬화하는 패턴을 사용합니다.  
자세한 사용법은 [C# 가이드](csharp-guide.md)와 [프로토콜](../products/protocol.md) 문서를 참고하세요.

---

## 6. 다음 단계

- [C# 가이드](csharp-guide.md) — C#에서 Read/Write 사용
- [C++ 가이드](cpp-guide.md) — C++에서 직렬화
- [API·타입 참조](../reference/api.md) — CLI·생성 API 요약
