---
description: Memory GC and Speed Optimization Comparison Matrix for all languages
---

![Performance Matrix Cover](/assets/journal/performance-matrix-cover.png){: style="float: right; margin: 0 0 2rem 2rem; max-width: 280px;"}

# Global Industry Standard BMT Matrix (Complex Structure Object Measurement)

This document records the performance optimization metrics for each language environment, gathered using industry-standard benchmark toolchains (`BenchmarkDotNet`, `mitata`, `pytest-benchmark`, `JMH`, `Google Benchmark`) at the TTA BMT level.

> 🏛️ **Notice on Legacy Metrics**
> 
> Metrics measured based on legacy timer methods have been archived as a 'mistake log' for historical reference.
> 
> * 👉 [Legacy Benchmark Mistake Log (DEUKPACK_GC_PERFORMANCE_MATRIX_LEGACY_DEPRECATED.md)](https://github.com/deukpack/DeukPack/blob/main/docs/internal/DEUKPACK_GC_PERFORMANCE_MATRIX_LEGACY_DEPRECATED.ko.md)
> * 👉 [Detailed Test Scenario and Control Condition Specification (performance-benchmark-scenario.md)](internal/performance-benchmark-scenario.md)

### 🧩 Complex Model (Complex Payload) Composition Used in this Matrix
This is the payload allocation code of the benchmark structure that induces heap memory allocation by including variable collections (List/Map).
```csharp
var model = new ComplexRoundtripModel();
model.B_val = false;
model.I32_val = 987654321;
model.I64_val = -9223372036854775806L;
model.S_val = "Complex 안녕하세요 🌎 \x01 \n \t";
model.Address = new AddressStruct { City = "Seoul", Country = "KR", Zip_code = 12345 };

// List / Hash / Dict for testing
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
**👑 Standard Environment**: `BenchmarkDotNet v0.13`

In the BenchmarkDotNet environment, we deduced top-tier performance figures and reduced overhead through an AOT switching approach that excludes Reflection costs.

#### 🏆 High-speed Binary Parsing Match (Decode Processing in Bytes)
| Rank | Library | Framework Design Pattern | Processing Time (μs, ⬇️) | Memory Allocated | Speed Ratio |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **1** | **DeukPack.Binary** | **Tree-Alloc (General)** | **1.29 μs** | 4.43 KB | **2.2x Faster** |
| **2** | **DeukPack.Binary** | **Zero-Alloc (Defensive)** | **1.31 μs** | 4.19 KB | **2.2x Faster** |
| **3** | **MessagePack** | Dynamic Emit Resolver | 1.97 μs | 3.65 KB | 1.5x Faster |
| **4** | **Protobuf-net** | Reflection Mapping | 2.96 μs | 4.05 KB | 1.0x (Baseline) |

*(※ The Zero-Alloc mode partially generates objects during string/collection allocation, but alleviates the integrated GC load by bypassing the creation (Caching) of the top-level Root instance.)*

#### 📃 Text Structure Parsing Match (JSON Processing)
| Rank | Library | Framework Design Pattern | Processing Time (μs, ⬇️) | Validation |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **System.Text.Json**| UTF-8 MS Built-in Standard (Free-form) | 1.17 μs (Baseline) | Unverified |
| **2** | **DeukPack JSON** | Strict Schema Validation (Schema-based)| 2.54 μs | **Supported (Type Cast)** |

---

## 🟦 2. TypeScript / JavaScript (V8 / Node.js)
**👑 Standard Environment**: `mitata v0.1`

To prevent object inference overhead in V8 within dynamic type language environments, we introduced a `DataView` based offset parsing architecture.

#### 🏆 High-speed Binary Parsing Metrics
| Rank | Library | Protocol Type | Response Latency (μs, ⬇️) | Characteristics |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **DeukPack.Binary (Fixed)** | Fixed-width Byte Array Mapping | **10.66 μs** | `DataView` Offset reference optimization applied |
| **2** | **DeukPack.Pack (Dynamic)** | Tag Block Validation | 25.51 μs | Hash field dynamic casting divergence |
| **3** | **protobufjs** | Protobuf Object | ~ 45.20 μs | Object factory costs incurred during variable object interpretation |
| **4** | **msgpack-lite** | MsgPack General | ~ 60.00 μs | Overhead due to multi-purpose binding design (`BigInt` not supported) |

#### 📃 Text (JSON) Parsing Metrics
| Rank | Library | Data Structure Type | Response Latency (μs, ⬇️) | Integrity Guarantee |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **JSON.parse** | Free-form Dict | 13.95 μs | None |
| **2** | **DeukPack JSON** | Pre-defined Schema Casting | 19.63 μs | **Schema Guaranteed** |

> 📌 **Reference: DeukPack JSON Performance Characteristics**
> The built-in object `JSON.parse` is integrated into the C++ V8 engine and shows a very fast load speed. On the other hand, the DeukPack JSON parser takes about 5μs longer because it additionally executes a process of "Static schema forced casting and integrity verification tailored to the communication protocol (IDL) type." This is an essential verification process to defend against security vulnerabilities. (During Javascript Binary communication of the same standard, it outperforms `JSON.parse` at `10.06 μs`.)

---

## 🟩 3. Python 3.10+ (GIL Environment)
**👑 Standard Environment**: `pytest-benchmark` / `pyperf`

We measured hierarchical fallback architectures including C-API bindings and Pure Python to handle various Python runtime environments.

#### 🏆 High-speed Binary Parsing Metrics
| Rank | Library | Running Backend Layer | Est. OPS (Kops/s) | Architectural Characteristics |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **DeukPack Rust**| Rust C-API Bypass | ~ 3,690 | Memory bypass that minimizes virtual machine interference during deserialization |
| **2** | **protobuf (C++)** | Google C++ Backend | ~ 1,200 | Backend standard reference |
| **3** | **msgspec** | Rust Comp. MsgPack | ~ 856 | Optimization applied through C-API control |
| **4** | **DeukPack Pure Opt**| Pure Python (`__slots__`) | ~ 30 | `__slots__` based optimization in environments where C binding is impossible |
| **5** | **protobuf (Pure)**| Google Pure Python | ~ 25 | Baseline in environments incapable of compiling C/Rust extensions |
| **6** | **DeukPack Pure** | Pure Python General | ~ 17 | Thread overhead accompanied by routing through a dynamic dictionary |

#### 📃 Text (JSON) Parsing Metrics
| Rank | Library | Running Runtime Env | Processing Time (μs, ⬇️) | Integrity Guarantee |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **ORJSON** | Rust Native C-API | 1.68 μs (Baseline) | None |
| **2** | **JSON** | Python Stdlib | 5.87 μs | None |
| **3** | **DeukPack JSON** | Schema Mapping and Type Cast | 26.72 μs | **Schema Guaranteed** |

---

## ☕ 4. Java (JVM / Android Runtime)
**👑 Standard Environment**: Measured estimates based on `JMH (Java Microbenchmark Harness)`

A format that precisely cross-validates the GC overhead and HotSpot JVM's JIT optimizer. Focuses on suppressing New Object Allocation costs.

#### 🏆 High-speed Binary Parsing Metrics
| Rank | Library | Protocol Type | Response Latency (μs, ⬇️) | Characteristic Evaluation |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack.Binary** | AOT `switch` Casting | **~ 1.35 μs** | Heap spike suppression model considering the G1GC environment |
| **2** | **protobuf-java** | Protobuf | ~ 3.10 μs | Heap occupation overhead due to accompanying `Builder` object creation |
| **3** | **Kryo** | Java Reflection Serialization | ~ 4.20 μs | Reaches memory caching limits after warm-up initialization |

---

## 🟥 5. C++ (Native Memory)
**👑 Standard Environment**: Measured estimates based on `Google Benchmark` offset pointing

In the C++ environment, the operation frequency of the `new` and `delete` tree during the deserialization process is the core performance indicator.

#### 🏆 Zero-Copy Parsing Match (Zero-Copy)
| Rank | Library | Memory Mapping Method | Processing Time | Garbage Creation (Fragmentation) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack ZeroCopy** | Flat Offset View | **~ 350 ns (0.35 μs)** | Direct offset reference within memory arena. |
| **2** | **FlatBuffers (C++)** | Flat Offset View | ~ 380 ns (0.38 μs) | Similar VTable defense structure excluding early allocation processes. |
| **3** | **Google.Protobuf** | Struct Tree Object Allocation | ~ 900 ns (0.90 μs) | Instances the `Message` class recursively onto the heap upon deserialization. |

---

## 🟨 6. Elixir (Erlang BEAM)
**👑 Standard Environment**: Measured estimates based on `Benchee`

Targeted towards data structure parsing and actor lifecycle methodology suited for No-Pause ecosystems.

#### 🏆 High-speed Binary Parsing Metrics
| Rank | Library | Protocol Type | Response Latency (ms, ⬇️) | Characteristic Evaluation |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack (`pack`)** | Binary Native Matching | **~ 31 ms** | **0 MB (Native Match)**. Immediately decodes without garbage allocation via BEAM VM's native `<<tag::integer, rest::binary>>` pattern matching |

---

## 🎯 Conclusion: Metric Revamp & Integrity Derivation

To secure B2B enterprise-level reliability, legacy measurement data has been discarded and the pipeline has been fully rebuilt onto an industry standard BMT system.

1. **Error Acknowledgment and Modernization of Measurement Tools**

   - **Issue**: The previous simple timer method failed to defend against JIT caching and Dead Code Elimination (DCE) distortions.

   - **Improvement**: We've comprehensively introduced official BMT frameworks for each language, such as `BenchmarkDotNet` and `mitata`.

2. **Realization of Memory (GC) Metrics and Admission of Testing Errors**

   - **Issue**: The very first benchmark stress tests were conducted exclusively using a flat structure that omitted collection objects like lists and maps. The historically claimed '0 Bytes' result was not only omitting base-level minimum allocations dictated by language specs, but was also an **incomplete test that failed to account for complex collection load**.

   - **Improvement**: Immediately upon recognizing the test's flaws, we **established a new complex collection test model** that fully represents real-world service environments to conduct a re-validation. (The performance for the limited flat model has been separated into its own JWT white paper.) Therefore, we now explicitly specify the essential runtime allocations (approx. 4.19 KB) and clarify that DeukPack's actual goal is to defend against heap spikes by inhibiting the creation of 'frame drop inducing nodes' (Root Entity).

3. **Update of Cross-Validation Figures**
   - We've measured the impact that DeukPack's AOT architecture—eliminating Reflection—has on parsing speeds.

   - **Result**: The resulting operational time difference trend (approx. 1.5x ~ 3.3x level) has been successfully updated across each metrics sample. You may directly verify detailed performance metrics via the attached reference tables.

---

## 🛠️ Benchmark Reproduce Guide (How to Reproduce)

For full transparency, we provide the source code and execution scripts so anyone can cross-validate the metrics locally.

### 1. C# (.NET 10.0) BenchmarkDotNet
```bash
cd DeukPack/benchmarks/benchmark_dotnet
dotnet run -c Release
```

### 2. Node.js (mitata)
```bash
cd DeukPack
node benchmarks/mitata-bench.js
```

### 3. Python (pytest-benchmark)
```bash
cd DeukPack
python -m pytest benchmarks/pyperf_bench.py -v --benchmark-columns=min,max,mean,stddev,ops
```
