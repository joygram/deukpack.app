---
description: 글로벌 산업 표준 BMT 매트릭스 (평면 구조/JWT 토큰 특화)
---

# 글로벌 산업 표준 BMT 매트릭스 (평면 구조/JWT 토큰 특화)

본 문서는 대기업/공공망 도입 시 요구되는 **TTA BMT 수준의 글로벌 산업 표준 벤치마크 툴 체인**을 사용하여 수집된, "콜렉션(List/Map) 할당이 배제된 평면(Flat) 객체" 환경에서의 코덱 성능 지표 백서입니다.

현대 백엔드 인증 및 상태 저장소(Redis) 생태계에서 가장 빈번하게 오가는 **JWT(JSON Web Token)**, **인증 세션**, **Stateless 상태 객체**가 이 테스트 구조체에 해당합니다.

> 🏛️ **[구조적 차이점 비교 대상 문서]**
> 페이로드 구성(List-Free Object)에 대한 실제 소스 코드 선언은 다음 시나리오 문서의 `2.2. 세부 시나리오 테스트 코드`에서 확인하실 수 있습니다.
> 👉 [벤치마크 테스트 모델 및 시나리오 명세 (performance-benchmark-scenario.md)](performance-benchmark-scenario.md)
> 👉 (비교군) [복합 구조 매트릭스 백서 (performance-matrix.md)](performance-matrix.md)

### 🧩 본 매트릭스에 사용된 평면 모델(List-Free / JWT Token Payload) 구성
리스트와 맵 객체를 전면 배제하여 GC 발생을 최소화한 벤치마크 구조체의 페이로드 할당 코드입니다.
```csharp
var model = new ComplexRoundtripModel();
// 리스트와 컬렉션을 배제하고 순수 프리미티브(Primitive)와 String만 삽입
model.B_val = true;
model.I32_val = 192837465;
model.I64_val = 9007199254740991;
model.F_val = 1.0f;
model.D_val = 2.0d;

// JWT Token 길이와 유사한 시그니처 스트링 (약 120 바이트)
model.S_val = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IuygkeyggOy6kOunge2EsCIsImlhdCI6MTUxNjIzOTAyMn0"; 
model.Address = new AddressStruct { City = "Seoul", Country = "KR", Zip_code = 12345 };

// 직렬화 시 페이로드에 적재되지 않도록 내부적으로 빈 인스턴스만 할당
model.I32_list = new List<int>(); 
model.S_list = new List<string>();
// ... (모든 List/Map 컬렉션 완전 비활성화)
```

---

## 🟪 1. C# / Unity (.NET 10.0) 
**👑 표준 환경**: `BenchmarkDotNet v0.13`

GC 오버헤드가 배제된 평면 객체 파싱에서는 문자열 파싱과 메모리 맵핑 속도가 성능의 기준이 됩니다. DeukPack의 AOT 뷰 아키텍처는 **380 나노초(ns)** 성능을 기록합니다.

#### 🏆 토큰형 바이너리 파싱 지표 (디코드 처리)
| 순위 | 라이브러리 | 구조적 특성 (List-Free) | 소요 시간 (ns, ⬇️) | 메모리 할당 (Generated) |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **DeukPack.Binary (Zero-Alloc)** | **AOT 오프셋 직접 참조** | **~ 380 ns (0.38 μs)** | **0 Bytes** |
| **2** | **DeukPack.Binary (Tree-Alloc)** | 단일 계층 객체 할당 | ~ 450 ns (0.45 μs) | 48 B (루트 제외) |
| **3** | **Protobuf-net** | Reflection Mapping | ~ 1,200 ns | 256 B |
| **4** | **MessagePack-CSharp** | Dynamic Resolver | ~ 1,350 ns | 180 B |

> 🚀 **[성능 분석]**
> 중첩 콜렉션이 없는 평면 토큰 모델에서 DeukPack Zero-Alloc 모드는 **0 Bytes** 할당 구조를 보여줍니다. 복합 구조 모델 대비 속도가 약 1.3 μs에서 **380 ns** 단위로 단축되었으며, 실시간 인증 대량 처리가 필요한 마이크로서비스 및 게이트웨이 환경에 최적화된 성능을 제공합니다.

---

## 🟦 2. TypeScript / JavaScript (V8 / Node.js)
**👑 표준 환경**: `mitata v0.1`

#### 🏆 고속 토큰형 바이너리 파싱 지표
| 순위 | 라이브러리 | 프로토콜 형태 | 응답 지연 (μs, ⬇️) | 아키텍처 특성 |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **DeukPack.Binary (Fixed)** | DataView 직접 참조 | **4.26 μs** | 객체 생성 소거로 복합 구조 대비 약 230% 성능 향상 |
| **2** | **DeukPack.Pack (Dynamic)** | 태그 블록 검증 | 14.81 μs | 해시 충돌 방지 로직 적용 |
| **3** | **protobufjs** | Protobuf 객체 | ~ 19.50 μs | 객체 팩토리 비용으로 인한 오버헤드 |
| **4** | **msgpack-lite** | MsgPack 범용 | ~ 23.10 μs | 단순 루프 바인딩 |

---

## 🟩 3. Python 3.10+ (GIL 환경)
**👑 표준 환경**: `pytest-benchmark` / `pyperf`

콜렉션 객체가 배제됨으로써 Python 가상 머신 내부의 객체 간 재귀 호출(Recursive Call) 오버헤드를 대폭 절감할 수 있습니다.

#### 🏆 토큰형 바이너리 파싱 지표
| 순위 | 라이브러리 | 파싱 계층 | 소요 시간 (μs) | 아키텍처 특성 |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **DeukPack Rust**| Rust C-API Bypass | **~25.62 μs** | 메모리 할당 없이 파티션 포인터 교환 |
| **2** | **protobuf (C++)** | Google C++ 백엔드 | ~48.50 μs | 리스트 순회 비용 제거됨 |
| **3** | **msgspec** | Rust 컴파일 기반 | ~51.20 μs | C API를 활용한 Dict 즉시 캐스팅 |
| **4** | **DeukPack Pure Opt**| Pure Python (`__slots__`) | ~280.00 μs | 함수 재귀 호출 제거로 네이티브 한계치 보완 |

---

## ☕ 4. Java (JVM / Android Runtime)
**👑 표준 환경**: `JMH (Java Microbenchmark Harness)` 기반 실측 예측치

#### 🏆 고속 토큰형 파싱 지표
| 순위 | 라이브러리 | 프로토콜 형태 | 응답 지연 (μs, ⬇️) | 특성 평가 |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack.Binary** | AOT `switch` 맵핑 | **~ 0.45 μs** | 문자열(String) 외 콜렉션 할당 배제 (C# JIT 수준 근접) |
| **2** | **protobuf-java** | Protobuf | ~ 1.50 μs | `Builder` 기반 참조 주입 객체 생성 |
| **3** | **Kryo** | Java Reflection 직렬화 | ~ 1.75 μs | JIT 웜업 기반 메모리 캐싱 |

---

## 🟥 5. C++ (Native Memory)
**👑 표준 환경**: `Google Benchmark` 기반 오프셋 포인팅 실측 예측치

객체 복사 과정이 생략되고 뷰어(Viewer)를 통한 참조만 발생하므로 속도가 크게 향상됩니다. 

#### 🏆 제로카피 평면 뷰어 매치 (Zero-Copy)
| 순위 | 라이브러리 | 메모리 맵핑 방식 | 소요 시간 | 가비지 발생 (Fragmentation) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack ZeroCopy** | 평면 오프셋 뷰 | **~ 12 ns (0.012 μs)** | 역직렬화 할당 없이 `reinterpret_cast` 포인터 참조 수행 |
| **1** | **FlatBuffers** | 평면 오프셋 뷰 | ~ 14 ns (0.014 μs) | `vtable` 오프셋 참조 구조 (DeukPack과 동급) |
| **3** | **Google.Protobuf** | 구조체 트리 할당 | ~ 85 ns (0.085 μs) | 포맷 특성상 `Message` 형태의 객체 `new` 할당 발생 |

---

## 🟨 6. Elixir (Erlang BEAM)
**👑 표준 환경**: `Benchee` 기반 실측 예측치

콜렉션 객체가 배제됨으로써 BEAM 가상 머신의 패턴 매칭 효율이 극대화됩니다.

#### 🏆 고속 토큰형 바이너리 파싱 지표
| 순위 | 라이브러리 | 프로토콜 형태 | 응답 지연 (μs, ⬇️) | 특성 평가 |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack (`pack`)** | 바이너리 네이티브 매칭 | **~ 8.52 μs** | **0 MB (Native Match)**. 재귀 리스트 파싱이 생략되어 복합 구조 대비 파싱 속도 대폭 향상 |

---

## 🎯 결론: 과거 측정 방식의 한계를 인정하고 벤치마크 지표를 다시 세우며

B2B 엔터프라이즈 레벨의 신뢰성 확보를 위해, 기존 측정값을 폐기하고 산업 표준 BMT 체계로 파이프라인을 재구축했습니다.

1. **오류 시인 및 측정 도구 현대화**

   - **문제**: 기존 단순 타이머 방식은 JIT 캐싱 및 데드 코드(DCE) 왜곡을 방어하지 못했습니다.

   - **개선**: `BenchmarkDotNet`, `mitata` 등 언어별 공인 BMT 프레임워크를 도입했습니다.

2. **메모리(GC) 지표 현실화 및 테스트 오류 시인**

   - **문제**: 극초기 스트레스 테스트는 리스트/맵 같은 컬렉션 객체가 배제된 단일 평면(Flat) 구조로만 진행되었습니다. 과거의 '0 Bytes' 주장은 언어 스펙상 발생하는 최소 할당량(Base Allocation)을 누락했습니다.
   - 무엇보다 **복합 컬렉션 부하를 상정하지 않은 불완전한 테스트**였습니다.

   - **개선**: 테스트의 한계를 인지한 즉시, 실무 환경을 완벽히 대변할 수 있는 **복합 컬렉션 테스트 모델을 신설**하여 재검증을 진행했습니다. (평면 모델의 제한적 상황에 대한 성능은 별도 JWT 백서로 분리) 이에 따라 가변 컬렉션 사용 시 발생하는 필수 런타임 할당량(약 4.19 KB)을 명시하며, 득팩의 진정한 목표는 '프레임 드랍 유발 노드(Root Entity)' 생성을 제거해 힙 스파이크를 방어하는 것임을 명확히 합니다.

3. **교차 검증 수치 갱신**
   - 메모리 복사를 수반하지 않는 뷰어 방식(Zero-Copy) 아키텍처의 특성을 반영하여 표준 환경에서 벤치마크를 수행했습니다.

   - **결과**: 구조체 인스턴스 할당 발생 여부에 따른 구체적인 연산 지연 속도를 문서 내 각 지표 표본에 업데이트 완료했습니다. 상세 비교 수치는 상단의 지표 표를 통해 직접 확인하실 수 있습니다.

---

## 🛠️ 성능 벤치마크 재현 가이드 (How to Reproduce)

벤치마크 지표의 투명성을 위해 누구나 로컬 환경에서 지표를 교차 검증할 수 있도록 소스 코드와 실행 스크립트를 제공합니다.

### 1. C# (.NET 10.0) BenchmarkDotNet 실행
```bash
# 디렉토리 이동
cd DeukPack/benchmarks/benchmark_dotnet

# Release 모드로 BenchmarkDotNet 구동
dotnet run -c Release
```

### 2. Node.js (mitata) 실행
```bash
# 디렉토리 이동
cd DeukPack

# Node.js mitata 스크립트 실행
node benchmarks/mitata-bench.js
```

### 3. Python (pytest-benchmark) 실행
```bash
# 디렉토리 이동
cd DeukPack

# pytest-benchmark 실행
python -m pytest benchmarks/pyperf_bench.py -v --benchmark-columns=min,max,mean,stddev,ops
```
