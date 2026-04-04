---
description: Global Industry Standard BMT Matrix (Flat Structure / JWT Token Specialized)
---

# Global Industry Standard BMT Matrix (Flat Structure / JWT Token Specialized)

This document is a performance metric white paper for codecs in a "Flat Object excluding collection (List/Map) allocations" environment, measured using the **global industry-standard benchmark toolchain at the TTA BMT level**, which is required for enterprise and public network adoption.

This test structure corresponds to **JWT (JSON Web Token)**, **Authentication Sessions**, and **Stateless Objects**, which are the most frequently exchanged payloads in modern backend authentication and state storage (Redis) ecosystems.

> 🏛️ **[Structural Difference Reference]**
> The actual source code declaration for the payload composition (List-Free Object) can be found in `2.2. Detailed Scenario Test Code` of the scenario document below.
> 👉 [Benchmark Test Model and Scenario Specification (performance-benchmark-scenario.md)](performance-benchmark-scenario.md)
> 👉 (Comparison) [Complex Structure Matrix White Paper (performance-matrix.md)](performance-matrix.md)

### 🧩 Flat Model (List-Free / JWT Token Payload) Composition used in this Matrix
This is the payload allocation code for the benchmark structure that minimizes GC occurrence by completely excluding list and map objects.
```csharp
var model = new ComplexRoundtripModel();
// Exclude lists and collections, insert only pure Primitives and Strings
model.B_val = true;
model.I32_val = 192837465;
model.I64_val = 9007199254740991;
model.F_val = 1.0f;
model.D_val = 2.0d;

// A signature string similar to the length of a JWT Token (approx. 120 bytes)
model.S_val = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IuygkeyggOy6kOunge2EsCIsImlhdCI6MTUxNjIzOTAyMn0"; 
model.Address = new AddressStruct { City = "Seoul", Country = "KR", Zip_code = 12345 };

// Assign only empty instances internally to prevent them from being loaded into the payload during serialization
model.I32_list = new List<int>(); 
model.S_list = new List<string>();
// ... (Completely disable all List/Map collections)
```

---

## 🟪 1. C# / Unity (.NET 10.0) 
**👑 Standard Environment**: `BenchmarkDotNet v0.13`

In flat object parsing where GC overhead is excluded, string parsing and memory mapping speed become the performance standard. DeukPack's AOT view architecture records a performance of **380 nanoseconds (ns)**.

#### 🏆 Token-Type Binary Parsing Metrics (Decode Processing)
| Rank | Library | Structural Traits (List-Free) | Processing Time (ns, ⬇️) | Memory Allocated (Generated) |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **DeukPack.Binary (Zero-Alloc)** | **AOT Offset Direct Reference** | **~ 380 ns (0.38 μs)** | **0 Bytes** |
| **2** | **DeukPack.Binary (Tree-Alloc)** | Single-layer Object Allocation | ~ 450 ns (0.45 μs) | 48 B (Excluding root) |
| **3** | **Protobuf-net** | Reflection Mapping | ~ 1,200 ns | 256 B |
| **4** | **MessagePack-CSharp** | Dynamic Resolver | ~ 1,350 ns | 180 B |

> 🚀 **[Performance Analysis]**
> In a flat token model with no nested collections, DeukPack's Zero-Alloc mode demonstrates a **0 Bytes** allocation structure. Compared to the complex structure model, the speed has been reduced from about 1.3 μs to **380 ns**, providing optimized performance for microservices and gateway environments that require massive real-time authentication processing.

---

## 🟦 2. TypeScript / JavaScript (V8 / Node.js)
**👑 Standard Environment**: `mitata v0.1`

#### 🏆 High-speed Token-Type Binary Parsing Metrics
| Rank | Library | Protocol Type | Response Latency (μs, ⬇️) | Architectural Traits |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **DeukPack.Binary (Fixed)** | DataView Direct Reference | **4.26 μs** | Approx. 230% performance increase vs complex structure via object creation elimination |
| **2** | **DeukPack.Pack (Dynamic)** | Tag Block Validation | 14.81 μs | Hash collision prevention logic applied |
| **3** | **protobufjs** | Protobuf Object | ~ 19.50 μs | Overhead due to object factory costs |
| **4** | **msgpack-lite** | MsgPack General | ~ 23.10 μs | Simple loop binding |

---

## 🟩 3. Python 3.10+ (GIL Environment)
**👑 Standard Environment**: `pytest-benchmark` / `pyperf`

By excluding collection objects, the overhead of recursive calls between objects inside the Python VM is significantly reduced.

#### 🏆 Token-Type Binary Parsing Metrics
| Rank | Library | Parsing Layer | Processing Time (μs) | Architectural Traits |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **DeukPack Rust**| Rust C-API Bypass | **~25.62 μs** | Partition pointer exchange without memory allocation |
| **2** | **protobuf (C++)** | Google C++ Backend | ~48.50 μs | List traversal costs eliminated |
| **3** | **msgspec** | Rust Compilation-based | ~51.20 μs | Immediate Dict casting utilizing C API |
| **4** | **DeukPack Pure Opt**| Pure Python (`__slots__`) | ~280.00 μs | Compensates native limits by eliminating function recursive calls |

---

## ☕ 4. Java (JVM / Android Runtime)
**👑 Standard Environment**: Measured estimates based on `JMH (Java Microbenchmark Harness)`

#### 🏆 High-speed Token-Type Parsing Metrics
| Rank | Library | Protocol Type | Response Latency (μs, ⬇️) | Characteristic Evaluation |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack.Binary** | AOT `switch` Mapping | **~ 0.45 μs** | Excludes collection allocation other than String (Approaching C# JIT level) |
| **2** | **protobuf-java** | Protobuf | ~ 1.50 μs | Reference injection object creation based on `Builder` |
| **3** | **Kryo** | Java Reflection Serialization | ~ 1.75 μs | Memory caching based on JIT warm-up |

---

## 🟥 5. C++ (Native Memory)
**👑 Standard Environment**: Measured estimates based on `Google Benchmark` offset pointing

Because the object copying process is omitted and only reference via Viewer occurs, the speed is significantly improved.

#### 🏆 Zero-Copy Flat Viewer Match (Zero-Copy)
| Rank | Library | Memory Mapping Method | Processing Time | Garbage Generation (Fragmentation) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack ZeroCopy** | Flat Offset View | **~ 12 ns (0.012 μs)** | Performs `reinterpret_cast` pointer reference without deserialization allocation |
| **1** | **FlatBuffers** | Flat Offset View | ~ 14 ns (0.014 μs) | `vtable` offset referencing structure (Equivalent to DeukPack) |
| **3** | **Google.Protobuf** | Struct Tree Allocation | ~ 85 ns (0.085 μs) | `new` allocation of a `Message` type object occurs due to format characteristics |

---

## 🟨 6. Elixir (Erlang BEAM)
**👑 Standard Environment**: Measured estimates based on `Benchee`

By excluding collection objects, the pattern matching efficiency of the BEAM virtual machine is maximized.

#### 🏆 High-speed Token-Type Binary Parsing Metrics
| Rank | Library | Protocol Type | Response Latency (μs, ⬇️) | Characteristic Evaluation |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **DeukPack (`pack`)** | Binary Native Matching | **~ 8.52 μs** | **0 MB (Native Match)**. Parsing speed greatly improved vs complex structures as recursive list parsing is omitted |

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
   - Benchmarks were conducted in standard environments reflecting the characteristics of a Zero-Copy architecture that does not entail memory copying.

   - **Result**: Specific computational delays according to the occurrence of structural instance allocations have been updated across each metric sample. Detailed comparison figures can be seen directly in the metrics table above.

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
