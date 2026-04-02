# Elixir 가이드

DeukPack(득팩)으로 자동 생성된 **Elixir 모듈**을 실제 백엔드 생태계 내부에서 적용하고 호출하는 방법을 안내합니다. 극대화된 동시성 통신, 대규모 분산 게임 서버, 실시간 채팅 등 OTP 노드 아키텍처에 완벽하게 호환됩니다.

---

## 1. 코드 생성 (Code Generation)

명령줄(CLI) 실행 시 `--elixir` 플래그를 넘기면 스키마 IDL 파일로부터 Erlang BEAM 호환 Elixir 모듈 코드가 생성됩니다.

```bash
npx deukpack ./schema.deuk ./gen --elixir --protocol tbinary
```

생성물은 `DeukPack.*.ex` 형식의 Elixir 모듈로 변환됩니다. C++ 바인딩(NIF) 없이 Elixir의 매크로 시스템과 바이너리 패턴 매칭 문법만을 순수하게 사용하기 때문에, 네이티브 BEAM 가상머신의 극한 속도를 그대로 이끌어 냅니다.

---

## 2. 프로젝트 통합 (Mix 빌드 연동)

- 복잡한 컴파일 파이프라인 추가 없이, 생성된 `*.ex` 파일들을 여러분의 Mix 프로젝트 내 `lib/` 폴더에 위치시키기만 하면 됩니다.
- 외부 참조 라이브러리 추가 없이 `mix compile` 시 즉각적으로 전체 프로젝트의 네임스페이스에 통합됩니다.

---

## 3. 직렬화(Serialize) 및 역직렬화(Deserialize) 구현

생성된 타입은 Erlang의 하드웨어 최적화 기능인 **바이너리 패턴 매칭(`<<tag::integer, rest::binary>>`)** 을 기반으로 동작하며, 가비지 컬렉션(GC) 일시 정지나 별도의 룩업(Lookup) 지연 없이 바이너리를 구조체로 전환합니다. 

**사용 예제**:

```elixir
# 사용자 Deuk 스키마 모델에 기반한 인스턴스 맵핑
user = %DeukPack.DemoUser{
  id: 1,
  name: "Alice",
  home: %DeukPack.Vector2{x: 10.0, y: 20.0}
}

# Write (바이너리 패킷으로 압축 및 직렬화 시)
encoded_binary = DeukPack.DemoUser.write(user)
# 생성된 encoded_binary는 즉시 TCP로 쏠 수 있는 순수 Erlang 바이너리(<<...>>) 입니다

# Read (바이너리에서 Elixir 구조체로 변환 / 추출)
# 디코더는 유니버설 OOM 방어망(MAX_SAFE_LENGTH) 한계 체크를 통해 멈춤 현상(Fail-Fast) 없이 작동합니다
{decoded_user, <<>>} = DeukPack.DemoUser.read(encoded_binary)

IO.inspect(decoded_user.name) # "Alice"
```

---

## 4. 자체 OTP 아키텍처 기반의 확장

득팩을 통해 생성된 모든 엘릭서 구조체는 네이티브 `%Struct{}` 와 완벽하게 호환됩니다. GenServer의 내부 상태(State) 값으로 보관하거나 ETS 테이블, 혹은 Ecto 레이어와 직접 결합시킬 수도 있습니다.  
특히 Zero-Overhead 보안 원칙하에 단일 메모리 폭탄 공격 한계를 사전에 자르고 검수하므로, Ranch나 `:gen_tcp` 같은 로우 레벨 네트워킹 소켓의 직접적인 버퍼 수신부(Pipeline)로 곧장 붙여서 사용해도 매우 안전합니다.

---

## 5. 다음 단계

- [프로토콜·직렬화](protocol-serialization.md) — 서비스에 맞는 와이어 스펙 확인
- [API 참조](../reference/api.md) — 득팩 CLI 및 빌드 플래그 상세 안내
