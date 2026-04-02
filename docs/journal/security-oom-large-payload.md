# DeukPack Protocol Security (Fail-Fast) & Large Payload Architecture Guide



This document provides the design philosophy behind the Unified Protocol Security Shield (OOM Defense System) implemented in the DeukPack 1.7.0 architecture, and the architectural guidelines for handling Large Payloads that derive from it.

## 1. Core Philosophy: Zero-Overhead and Fail-Fast

In the network layer, serialization and deserialization modules act as the frontline against external attacks (DDoS, malicious/mutated packets). A system must never suffer an Out-Of-Memory (OOM) crash—which brings down the entire server or client application—due to erroneous memory allocations caused by a payload.

DeukPack has established a robust security shield across all 5 backend engines (C#, C++, Java, JS, Elixir) operating strictly on the core philosophies of **Zero-Overhead** and **Fail-Fast**.

- **Zero-Overhead:** The security guards are designed as simple constant-bound length checks (`if (len > MAX)`). Hardware Branch Predictors guarantee a 100% hit rate on these evaluations, ensuring absolutely 0 nanoseconds of measurable overhead in hot-path benchmark iterations.
- **Fail-Fast:** Before allocating an object block into memory using `new`, the protocol decoders read the expected length/count. If it violates boundaries, they instantly throw an exception and discard the buffer.

---

## 2. Universal OOM Defense Policies

Strict upper bounds are hardcoded directly into the parsing phase across all DeukPack protocols (Binary, Compact, JSON).

### 2.1. Maximum Single Data Size Limit (MAX_SAFE_LENGTH: 10MB)
Any element destined to be allocated into a single contiguous memory buffer, such as long strings or binary blocks, cannot exceed **10MB (10 * 1024 * 1024 Bytes)**.
- If a malicious actor sends a manipulated integer claiming a string length of `2GB`, the engine rejects it immediately inside the 10MB condition before any memory is allocated.

### 2.2. Maximum Collection Elements Limit (MAX_ELEMENT_COUNT: 1,000,000)
Collection structures such as `List`, `Set`, and `Dictionary/Map` are restricted to a maximum of **1,000,000** elements.
- Even if an attacker injects `MAX_INT32` as the array size header to induce an infinite allocation loop, they are immediately stopped before the loop even begins.

### 2.3. Maximum Recursion Depth (MAX_RECURSION_DEPTH: 64)
Nested structures and recursive hierarchies are capped at **64 depth levels** to prevent StackOverflow crashes during parsing.

---

## 3. Complete Closure of JSON Streaming Vulnerabilities

A common and critical OOM vulnerability in traditional JSON parsers is the strategy of reading an entire stream to the end in memory (e.g. `StreamReader.ReadToEnd()`) before beginning deserialization. (Sending a 2GB raw JSON string instantaneously burns 2GB of server memory).

In DeukPack 1.7.0, **we have completely replaced the JSON streaming layers across the Java, C++, and C# engines with incremental chunk evaluation.**
- Memory blackholes like `ReadToEnd()` are entirely prohibited.
- The stream buffer evaluates the payload as it scans; the exact moment the accumulated read bytes exceed `10MB`, it throws a `std::runtime_error` or `RuntimeException` and discards the chunk.

These defense systems are continuously proven and mathematically guaranteed by the newly established `test-fuzz-oom.js` automated fuzzing pipeline in CI.

---

## 4. Large Payload Design Strategy

Developers might wonder: *"What if I legitimately need to transfer an enormous 100MB chunk of data (e.g. binary statistics, large assets) over DeukPack? How do I bypass the security shield?"* 

Opening up these explicit bounds compromises the fundamental security architecture. Instead, developers should rethink their system design using the following guidelines.

### 4.1. "DeukPack is a Serializer, not a File Transfer Protocol (FTP)"
The core purpose and target of DeukPack is **hyper-fast, lightweight RPC serialization and object state persistence**. It is not designed to be a file transfer medium. Network messages and game packets should natively converge to under a few kilobytes.

### 4.2. "Chunking" and "Pagination" (Application Layer Responsibilities)
If an application generates massive >10MB records, it should not be fired in a single isolated packet. The data should be distributed at the Application Layer architecture natively.

1. **Data Pagination:** If you are querying a ranking list with over 100,000 entries, you must split them iteratively by logical page sizes (e.g., 100 entries per RPC) matching the client viewport.
2. **Chunking / Streaming:** If an image or heavy asset needs to be transmitted, the DeukPack struct packet should solely carry the `metadata (GUID, size, checksum)`. The actual file payload should be transferred out-of-band via proper HTTP streaming pipelines or CDN/S3 Presigned URLs.

### 4.3. Intranet Server-to-Server Batch Applications
If backends operating inside trusted environments legitimately need to dump >100MB structs, they should utilize dedicated stream-processing tools designed for high-capacity batch exporting rather than standard API serializers. (DeukPack's primary scope prioritizes high-speed, secure, and resilient communication with untrusted external clients).
