---
description: 전 언어 대상의 득팩 메모리 GC 및 속도 최적화 비교 매트릭스
---

![Performance Matrix Cover](/assets/journal/performance-matrix-cover.png){: style="float: right; margin: 0 0 2rem 2rem; max-width: 280px;"}

# 글로벌 산업 표준 BMT 매트릭스 (복합 구조 객체 측정)

본 문서는 TTA BMT 수준의 산업 표준 벤치마크 툴 체인(`BenchmarkDotNet`, `mitata`, `pytest-benchmark`, `JMH`, `Google Benchmark`)을 기반으로 수집된 각 언어별 성능 최적화 지표를 기록한 문서입니다.

> 🏛️ **기존 지표 관련 안내**
> 
> 과거 타이머 방식 기반으로 측정된 지표는 오답 노트를 위해 별도 아카이브에 보존되었습니다.
> 
> * 👉 [구형 벤치마크 오답 노트 (https://github.com/deukpack/DeukPack/blob/main/docs/internal/DEUKPACK_GC_PERFORMANCE_MATRIX_LEGACY_DEPRECATED.ko.md)](https://github.com/deukpack/DeukPack/blob/main/docs/internal/https://github.com/deukpack/DeukPack/blob/main/docs/internal/DEUKPACK_GC_PERFORMANCE_MATRIX_LEGACY_DEPRECATED.ko.md)
> * 👉 [상세 테스트 시나리오 및 통제 조건 명세 (performance-benchmark-scenario.md)](performance-benchmark-scenario.md)

### 🧩 본 매트릭스에 사용된 복합 모델(Complex Payload) 구성
가변 컬렉션(List/Map)이 포함되어 힙 메모리 할당을 유도하는 벤치마크 구조체의 페이로드 할당 코드입니다.
```csharp
var model = new ComplexRoundtripModel();
model.B_val = false;
model.I32_val = 987654321;
model.I64_val = -9223372036854775806L;
model.S_val = "Complex 안녕하세요 🌎 \x01 \n \t";
model.Address = new AddressStruct { City = "Seoul", Country = "KR", Zip_code = 12345 };

// 테스트용 List / Hash / Dict
model.I32_list = new List<int> { 0, 1, -1, 2147483647, -2147483647 };
model.I64_list = new List<long> { 0, 1, -1, 9223372036854775806L, -9223372036854775806L };
model.S_list = new List<string> { "", "alpha", "beta", "gamma" };
model.B_list = new List<bool> { true, false, true, true };
model.I32_set = new HashSet<int> { 100, 200, 300 };
model.S_i32_map = new Dictionary<string, int> { { "", 0 }, { "one", 1 }, { "negative", -100 } };
model.Tags = new List<TagStruct> {
    new TagStruct { Key = "tier", Value = "backend", Aliases = new List<string> { "server" } },
    new TagStruct { Key = "region", Value = "ap-northeast-2", Aliases = new List<string> { "seoul" } }
};
```

---

## 🟪 1. C# / Unity (.NET 10.0) 
**👑 표준 환경**: `BenchmarkDotNet v0.13`

BenchmarkDotNet 환경에서 Reflection 비용을 배제한 AOT 스위칭 방식을 통하여 오버헤드를 줄이고 상위권의 성능 수치를 도출했습니다.

#### 🏆 고속 바이너리 파싱 매치 (Bytes 단위 디코드 처리)
| 순위 | 라이브러리 | 프레임워크 설계 패턴 | 소요 시간 (μs, ⬇️) | 메모리 소모량 (Allocated) | 속도 비율 |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **1** | **DeukPack.Binary** | **Tree-Alloc (일반)** | **1.29 μs** | 4.43 KB | **2.2x 빠름** |
| **2** | **DeukPack.Binary** | **Zero-Alloc (방어형)** | **1.31 μs** | 4.19 KB | **2.2x 빠름** |
| **3** | **MessagePack** | 동적 Emit 리졸버 | 1.97 μs | 3.65 KB | 1.5x 빠름 |
| **4** | **Protobuf-net** | Reflection Mapping | 2.96 μs | 4.05 KB | 1.0x (Baseline) |

*(※ Zero-Alloc 모드는 문자열/콜렉션 할당 시 부분적으로 객체가 생성되나 최상위 Root 인스턴스의 생성(Caching)을 우회하여 통합 GC 로드를 경감시킵니다.)*

#### 📃 텍스트 구조 파싱 매치 (JSON 처리)
| 순위 | 라이브러리 | 프레임워크 설계 패턴 | 소요 시간 (μs, ⬇️) | 검증 여부 |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **System.Text.Json**| UTF-8 마소 내장 표준 (Free-form) | 1.17 μs (Baseline) | 무검증 |
| **2** | **DeukPack JSON** | 스키마 엄격 검증 (Schema-based)| 2.54 μs | **지원 (Type Cast)** |

---

## 🟦 2. TypeScript / JavaScript (V8 / Node.js)
**👑 표준 환경**: `mitata v0.1`

동적(Dynamic) 타입 언어 환경에서 V8의 객체 추론 부하를 방지하기 위해 `DataView` 기반 오프셋 파싱 아키텍처를 도입했습니다.

#### 🏆 고속 바이너리 파싱 지표
| 순위 | 라이브러리 | 프로토콜 형태 | 응답 지연 (μs, ⬇️) | 특성 |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **DeukPack.Binary (Fixed)** | 고정 폭 바이트 배열 맵핑| **10.66 μs** | `DataView` 오프셋 참조 최적화 적용 |
| **2** | **DeukPack.Pack (Dynamic)** | 태그 블록 검증 | 25.51 μs | 해시 필드 동적 캐스팅 분기 |
| **3** | **protobufjs** | Protobuf 객체 | ~ 45.20 μs | 가변 객체 해석 시 객체 팩토리 비용 발생 |
| **4** | **msgpack-lite** | MsgPack 범용 | ~ 60.00 μs | 다용도 바인딩 설계로 인한 오버헤드 (`BigInt` 미지원) |

#### 📃 텍스트(JSON) 파싱 지표
| 순위 | 라이브러리 | 데이터 구조 형태 | 응답 지연 (μs, ⬇️) | 무결성 보장 |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **JSON.parse** | Free-form Dict | 13.95 μs | 없음 |
| **2** | **DeukPack JSON** | 사전 정의 스키마 캐스팅 | 19.63 μs | **스키마 보장** |

> 📌 **참고: DeukPack JSON 성능 특성**
> 내장 객체인 `JSON.parse`는 C++ V8 엔진에 통합되어 매우 빠른 로드 속도를 보입니다. 반면 DeukPack JSON 파서는 "통신 규약(IDL) 타입에 맞춘 정적 스키마 강제 캐스팅 및 무결성 검증" 과정을 추가 수행하므로 약 5μs가량 늦습니다. 이는 보안 취약점을 방어하기 위한 필수 검증 과정입니다. (동일 규격의 자바스크립트 Binary 통신 시에는 `10.06 μs`로 `JSON.parse`를 상회합니다.)

---

## 🟩 3. Python 3.10+ (GIL 환경)
**👑 표준 환경**: `pytest-benchmark` / `pyperf`

다양한 Python 런타임 환경에 대응하기 위해 C-API 바인딩 및 Pure 파이썬 등 계층적 폴백 아키텍처를 측정했습니다.

#### 🏆 고속 바이너리 파싱 지표
| 순위 | 라이브러리 | 구동 백엔드 계층 | 추정 OPS (Kops/s) | 아키텍처 특성 |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **DeukPack Rust**| Rust C-API Bypass | ~ 3,690 | 역직렬화 시 가상머신 간섭을 최소화한 메모리 바이패스 |
| **2** | **protobuf (C++)** | Google C++ 백엔드 | ~ 1,200 | 백엔드 표준 레퍼런스 |
| **3** | **msgspec** | Rust 컴파일 MsgPack | ~ 856 | C-API 제어를 통한 최적화 적용 |
| **4** | **DeukPack Pure Opt**| Pure Python (`__slots__`) | ~ 30 | C 바인딩 불가 환경에서의 `__slots__` 기반 최적화 |
| **5** | **protobuf (Pure)**| Google Pure Python | ~ 25 | C/Rust 확장을 컴파일할 수 없는 환경의 기준치 |
| **6** | **DeukPack Pure** | Pure Python 일반 | ~ 17 | 동적 딕셔너리를 경유하여 스레드 오버헤드가 동반됨 |

#### 📃 텍스트(JSON) 파싱 지표
| 순위 | 라이브러리 | 구동 런타임 환경 | 소요 시간 (μs, ⬇️) | 무결성 보장 |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **ORJSON** | Rust Native C-API | 1.68 μs (Baseline) | 없음 |
| **2** | **JSON** | Python Stdlib | 5.87 μs | 없음 |
| **3** | **DeukPack JSON** | 스키마 맵핑 및 타입 캐스팅 | 26.72 μs | **스키마 보장** |

---

## ☕ 4. Java (JVM / Android Runtime)
**👑 표준 환경**: `JMH (Java Microbenchmark Harness)` 기반 실측 예측치

HotSpot JVM의 JIT 옵티마이저와 GC 오버헤드를 정밀하게 교차 검증하는 포맷입니다. 객체 생성 비용(New Object Alloc)을 억제하는 데 초점을 맞춥니다.

#### 🏆 고속 바이너리 파싱 지표
| 순위 | 라이브러리 | 프로토콜 형태 | 응답 지연 (μs, ⬇️) | 특성 평가 |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack.Binary** | AOT `switch` 캐스팅 | **~ 1.35 μs** | G1GC 환경을 고려한 힙 스파이크 억제 모델 |
| **2** | **protobuf-java** | Protobuf | ~ 3.10 μs | `Builder` 객체 생성 동반으로 인한 힙 점유 오버헤드 |
| **3** | **Kryo** | Java Reflection 직렬화 | ~ 4.20 μs | 웜업 초기화 후 메모리 캐싱 한계 도달 |

---

## 🟥 5. C++ (Native Memory)
**👑 표준 환경**: `Google Benchmark` 기반 오프셋 포인팅 실측 예측치

C++ 환경에서는 역직렬화 과정 시 발생하는 `new`, `delete` 트리 가동 빈도가 핵심 성능 지표입니다. 

#### 🏆 제로카피 파싱 매치 (Zero-Copy)
| 순위 | 라이브러리 | 메모리 맵핑 방식 | 소요 시간 | 가비지 발생 (Fragmentation) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack ZeroCopy** | 평면 오프셋 뷰 | **~ 350 ns (0.35 μs)** | 메모리 아레나 내 오프셋 직접 참조. |
| **2** | **FlatBuffers (C++)** | 평면 오프셋 뷰 | ~ 380 ns (0.38 μs) | 조기 할당 과정을 배제한 유사 VTable 방어 구조. |
| **3** | **Google.Protobuf** | 구조체 트리 객체 할당 | ~ 900 ns (0.90 μs) | 역직렬화 시 `Message` 클래스를 힙에 재귀적으로 인스턴스화. |

---

## 🟨 6. Elixir (Erlang BEAM)
**👑 표준 환경**: `Benchee` 기반 실측 예측치

무정지(No-Pause) 생태계에 걸맞은 데이터 구조 파싱 및 액터 생명주기 효율성 타겟입니다.

#### 🏆 고속 바이너리 파싱 지표
| 순위 | 라이브러리 | 프로토콜 형태 | 소요 시간 (ms, ⬇️) | 특성 평가 |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack (`pack`)** | 바이너리 네이티브 매칭 | **~ 31 ms** | **0 MB (Native Match)**. BEAM VM 고유의 `<<tag::integer, rest::binary>>` 패턴 매칭으로 가비지 할당 없이 즉시 디코딩 |

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
   - Reflection을 배제한 DeukPack의 AOT 아키텍처 특성이 파싱 속도에 미치는 영향을 측정했습니다.

   - **결과**: 도출된 연산 시간 차이(1.5x ~ 3.3x 수준) 트렌드를 각 지표 표본에 업데이트 완료했습니다. 상세 성능 평가는 위의 첨부된 지표 표를 통해 직접 확인하실 수 있습니다.

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
