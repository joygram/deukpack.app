# Tutorial: Unified Write — overrides and field selection

**Time**: ~10 minutes · **Prerequisite**: [Quick start](quickstart.md) or [C# guide](csharp-guide.md)

Use the **language switcher** for 한국어.

---

## When to use this

You have **one large in-memory message** (chat, notification, state snapshot) and must send it to **many recipients**. Only a **few fields** differ per recipient (display name, read flag, locale-specific text). Cloning the whole object **N times** is expensive.

DeukPack generates a single **`Write(oprot, fieldIds, overrides?)`** on every C# struct: pass **`null`** for `fieldIds` to send **all** fields, and an optional **`Dictionary<int, object>`** for per-field replacement values — **without** mutating or cloning the message.

---

## 1. Field IDs in IDL

Thrift / DeukPack structs use **numeric field IDs**:

```thrift
struct ChatMessage {
  1: i32 msgId;
  2: string body;
  3: string displayNameForRecipient;  // override per user
  4: bool isReadForRecipient;
}
```

After `npx deukpack ... --csharp`, the generated class includes a nested **`FieldId`** class with named constants for every field. Use those instead of bare numbers — if the IDL changes, the compiler catches mismatches immediately.

---

## 2. C# — overrides (all fields)

```csharp
var msg = BuildMessageOnce(); // heavy work once

var overrides = new Dictionary<int, object>
{
    { ChatMessage.FieldId.DisplayNameForRecipient, "Alice (you)" },
    { ChatMessage.FieldId.IsReadForRecipient, false }
};
msg.Write(oprot, null, overrides);
```

Rules:

- **Keys** = use `StructName.FieldId.PropertyName` (generated `const int`). Never hard-code numbers.
- **Values** = same CLR types as the generated properties (wrong type → cast exception).
- If `overrides` is **null** or **empty**, behavior matches **`Write(oprot)`** / **`Write(oprot, null, null)`**.
- For a field whose type is **another struct** or **list/map**, pass a **whole instance** of that type (or the whole collection). There is **no** nested path API to tweak inner members only. See core [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md) **§1.3**.

Full API tables and C++/JS: [API reference](../reference/api.md) · core repo [DEUKPACK_WRITE_WITH_OVERRIDES_API.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WRITE_WITH_OVERRIDES_API.md).

---

## 3. JavaScript (`--js`)

Generated `js/generated_deuk.js` adds **`toJson`**, **`toBinary`**, and **`FieldId`** on each struct helper. Unused parameters are **`null`**:

```javascript
var F = ChatMessage.FieldId;
var json = ChatMessage.toJson(msg, null, {
  [F.DisplayNameForRecipient]: "Bob",
  [F.IsReadForRecipient]: true
});
```

---

## 4. C++

Each struct gets **`kFieldId_*`** constants aligned with C#/JS. Use the **generated pack/binary (or Thrift interop) write path** next to your types; there is **no** separate `apply_overrides` step in current emit.

See [API reference](../reference/api.md).

---

## 5. Field selection — same `Write`

**`Write(oprot, fieldIds, overrides?)`** serializes **only** the fields you list when `fieldIds` is non-null. No partial types or manual field copying.

```csharp
var full = LoadFullUser();
full.Write(oprot, new[] {
    UserRecord.FieldId.DisplayName,
    UserRecord.FieldId.Level,
    UserRecord.FieldId.AvatarUrl
}, null);
```

Combine selection with overrides:

```csharp
full.Write(oprot, new[] {
    UserRecord.FieldId.DisplayName,
    UserRecord.FieldId.Level
}, new Dictionary<int, object> {
    { UserRecord.FieldId.DisplayName, r.LocalizedName }
});
```

JavaScript — same signature shape:

```javascript
var F = UserRecord.FieldId;
var ids = [F.DisplayName, F.Level];
var json = UserRecord.toJson(full, ids, null);
var json2 = UserRecord.toJson(full, ids, { [F.DisplayName]: r.LocalizedName });
```

---

## 6. struct extends — inheritance

Use `extends` in IDL to inherit parent fields. The code generator flattens parent fields into the child as a single type. Field ID collisions cause a build error.

```thrift
struct UserBase {
  1: i32 id;
  2: string displayName;
}

struct UserFull extends UserBase {
  3: i32 level;
  4: string avatarUrl;
}
```

The generated `UserFull` has all 4 fields (1–4). Multi-level inheritance (A → B → C) is supported.

---

## 7. Related: wire profiles (subset types)

**Different problem**: hide whole fields per client profile → `wireProfiles` annotation and `--wire-profile`. See [Wire profile subset](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_WIRE_PROFILE_SUBSET.md).

---

## 8. Feature comparison

| | Overrides (all fields) | Field subset | Wire Profile | extends |
|---|---|---|---|---|
| Purpose | All fields, some **values** replaced | Only **selected fields** | Build-time subset type | Common field inheritance |
| Decision time | Runtime | Runtime | Build time | IDL definition |
| API surface | `Write(oprot, null, overrides)` | `Write(oprot, fieldIds, overrides?)` | — | With all features |
| Dynamic | Yes | Yes | No | — |

---

## 9. Sample in the core repo

- Walkthrough (IDL snippet + IDs): [examples/write-with-overrides/README.md](https://github.com/joygram/DeukPack/tree/main/examples/write-with-overrides)
- Runnable C# smoke test: [examples/consumer-csharp](https://github.com/joygram/DeukPack/tree/main/examples/consumer-csharp) — use `DemoUser.FieldId.Name`, `DemoUser.FieldId.Home`, etc.

---

## Next steps

- [C# guide](csharp-guide.md) — Read/Write, GetSchema, runtime reference
- [API reference](../reference/api.md) — CLI including `--wire-profile`
- [Kits lineup](../starter-kits.md) — fan-out note for network/chat kits
