# Wire protocol families (interop vs Deuk native)

The same **string** names for `--protocol`, npm `serialize` / `deserialize`, and generated **C# / C++** code sit on top of **two families**. Use this page to see **which stack implements which wire**.

`한국어:** Use the site **language** menu → `한국어** for the same page in Korean.

---

## 1. Family (`wireFamily`)

| Value | Meaning |
|-------|---------|
| **`interop`** | **Thrift-compatible** bytes and semantics |
| **`deuk`** | **Deuk-native** wire (what the npm **JS** serializer implements) |

The `protocol` string must **match** the family. Use `WireProtocolOption`, `deukWire()`, or `interopWire()` in the core types when you want the family fixed in the type system. Details: [Interop vs native wire](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_INTEROP_VS_NATIVE.md).

---

## 2. Protocol matrix (by language runtime)

### Interop family (`interop`) — Thrift

**Only** these `protocol` strings are valid: **`tbinary`**, **`tcompact`**, **`tjson`**. Older spellings such as `binary` / `compact` / `thrift_json` are **not** accepted by the CLI or types.

| `protocol` | Role | **JS** `WireSerializer` | **Native (C# / C++ / Java)** | **Elixir** |
|------------|------|---------------------------|-------------------------|------------|
| **`tbinary`** | Thrift Binary | **Implemented** when you pass **`interopRootStruct`** | `DpBinaryProtocol` | Native BEAM Pattern Matching |
| **`tcompact`** | Thrift Compact | Same | `DpCompactProtocol` | N/A |
| **`tjson`** | Thrift JSON wrapper | Same | C# and other runtimes | N/A |
{: .dp-matrix-table }

Without a root struct schema, JS **throws a clear error** (the engine cannot infer field ids). Use **`serializeInteropStruct` / `deserializeInteropStruct`** or **`WireSerializer`** with **`SerializationOptions`** filled from parse/schema. **Generated C# / C++** remains the main path for app-sized stacks.

### Protobuf byte wire (**planned**)

**Google Protobuf**-style **byte** encoding (`protv2` / `protv3` profiles) is **on the roadmap**, not shipped yet. Until then, use **Thrift interop** (`tbinary` / `tcompact` / `tjson`) or **Deuk native** wires. **`protv2` / `protv3`** may still appear in docs as **field-rule** labels only.

### Deuk native family (`deuk`)

| `protocol` | Role | **JS** `WireSerializer` | **Native (C# / C++ / Java)** | **Elixir** |
|------------|------|---------------------------|-------------------------|------------|
| `pack` | Tagged binary (Deuk native) | **Implemented** | Reader/Writer for that family | **Implemented** |
| `json` | UTF-8 JSON (values only) | **Implemented** | Same family | **Passthrough** |
| `yaml` | UTF-8 YAML (values only) | **Implemented** | Same family | N/A |
{: .dp-matrix-table }

**CLI `--protocol` default (codegen hint):** **`pack`**. Interop CLI values are **`tbinary` / `tcompact` / `tjson`**; legacy `binary` is normalized to **`tbinary`**.

---

## 3. npm `serialize` / `deserialize` (simple API)

- **Default format argument:** **`pack`** (Deuk native binary) when omitted.
- You can pass `wireFamily` so it stays consistent with `protocol`; mismatches are rejected.

```ts
import { serialize, deserialize } from 'deukpack';
// default = pack (deuk family)
const bytes = serialize(obj);
```

For Thrift **Binary/Compact/JSON** from **JS**, supply **`interopRootStruct`** (and **`interopStructDefs`** if needed). For **`pack` / `json` / `yaml`**, no struct metadata is required.

---

## 4. CLI `--protocol` and codegen

| `--protocol` | Family | Wire role |
|--------------|--------|-----------|
| `pack`, `json`, `yaml` | `deuk` | Deuk native |
| **`tbinary`**, **`tcompact`**, **`tjson`** | `interop` | Thrift compatible |

One value per codegen pass; split output dirs or use `--pipeline` for multiple wires.

### 🛡️ Core Security Constraints (Applies to all Wire Protocols)

By default, **all interop and native DeukPack decoders** (across Java, C#, JS, and Elixir) proactively enforce limits against memory bombs and malicious payload traversals without runtime reflection overhead:
- **`MAX_SAFE_LENGTH (10MB)`**: Array/list item counts and string byte-length allocation attempts exceeding 10MB are strictly aborted via `[DeukPack] pack read overflow` or Native Exceptions prior to VM allocation.
- **`MAX_RECURSION_DEPTH (64)`**: A deeply nested class parameter passing sequence natively terminates after crossing a depth of 64 object layers to defeat stack overflow algorithmic attacks.

---

## 5. Two different `json` stories

- **Deuk native `json` / `yaml`:** **value-only** JSON/YAML on the wire — see [DEUKPACK_DEUK_JSON_YAML](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_DEUK_JSON_YAML.md) (vs `.deuk.json` config files).
- **`tjson`:** **Thrift JSON** compatibility family — **not** the same as native `json`.

---

## 6. See also

- [Protocol](../products/protocol.md) — product overview
- [Tutorial · Protocol & serialization](../tutorial/protocol-serialization.md) — how to choose
- [Messages & wire](messages.md) — msgId, Registry, partial send
- [API reference — CLI](api.md#cli) — full flags

---

## Hands-on (DeukPack Kits)

- [Wire & serialization topics](https://kits.deukpack.app/en/topics/serialization/) · [Part IV — Network tunnel](https://kits.deukpack.app/en/journey/part-04-network/)
