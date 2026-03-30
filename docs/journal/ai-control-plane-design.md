# From Frustration to Language: The Birth of the DeukPack IDL

![DeukPack Brand Image](https://deukpack.app/assets/deukpack-brand-concept-01.png)

"Why not just use Thrift? What about Protobuf?"

These are the first questions we hear whenever we introduce DeukPack. And they're fair questions. Thrift and Protobuf are proven, battle-tested tools. We used them successfully for years. The problem was what started **becoming visible only after we'd used them well**.

This is not an article about introducing a new IDL tool. It's an engineering story about **how the friction we accumulated fighting with legacy tools solidified into a design philosophy—and how that philosophy was eventually realized in code**.

## 1. Where the Problem Started: "Nobody Knows What This `message` Is"

As our systems grew, we started to feel the limits of what the word `message` could communicate.

```protobuf
// Legacy Protobuf IDL — Is this a DB table? A network packet? Excel data?
message Item {
  int64 item_id = 1;
  string name = 2;
  int32 quantity = 3;
}
```

In production, this single `Item` was being used in three different places simultaneously:

- **Server**: As an inventory query response payload sent to the client
- **Designer Tools**: As a row in the item master data that designers managed in Excel
- **Database**: As a row in a table storing per-user inventory state

But the `.proto` file makes zero distinction between these three contexts. When you ask an AI coding assistant to "write code that handles this `Item`," the AI guesses which of the three contexts you mean—and **that guess is often wrong**.

The deeper problem: it takes time to realize the guess was wrong.

## 2. Searching for a Solution: "Should We Just Abandon Legacy Tools?"

At first, the fix seemed simple. "What if we used a more expressive IDL? Or differentiated contexts with comments?"

Two realities shut that down quickly.

1. **The Weight of Legacy**: Tens of thousands of lines of `.proto` or `.thrift` files had accumulated. Telling the team "let's throw it all away and migrate to a new IDL" was simply not a realistic option.
2. **Comments Don't Enforce Anything**: Expressing intent through comments provides no enforcement. The AI, the compiler, and your colleagues can all ignore them freely.

This is where the design direction crystallized:

> **"We don't discard legacy. Instead, we layer what legacy cannot express on top of it."**

## 3. Design Philosophy: Embedding a 'Data Identity Card' into IDL Syntax

This philosophy led to DeukPack's **Declaration Kinds** design.

Where legacy IDLs lumped everything into `struct`, DeukPack distinguishes data by its **purpose** at the syntax level.

```
namespace game

// Item master data — read from files, managed in Excel.
record ItemMaster {
  1> int64 itemId
  2> string name
  3> int32 maxStack
}
table<ItemMaster> = { key: "itemId" }

// Inventory DB row — manages per-user persistent state.
entity UserInventory {
  1> [key] int64 userId
  2> int64 itemId
  3> int32 quantity
}

// Item query response packet — a one-way transient payload.
keyword message_scope 10000
message<10001> ItemQueryResponse {
  1> list<ItemInfo> items
  2> int32 totalCount
}
```

This distinction produces tangible changes in three directions at once:

- **The Compiler**: Generates Excel serialization code for `table`, DB mapping code for `entity`, and optimized binary serialization for `message<N>`—each one correct and different.
- **AI Coding Tools**: The declaration keyword alone tells the AI what context this data lives in. The surface area for generating wrong-context code shrinks dramatically.
- **Developers**: Someone reading the code for the first time doesn't waste time guessing what this `struct` is for.

## 4. "What About Legacy?" — The Mixed Architecture Answer

Once the philosophy was set, the next question was unavoidable:

> "What do we do with existing `.proto` or `.thrift` files that are already running in production?"

The DeukPack engine was designed to read `.proto`, `.thrift`, and `.deuk` files **simultaneously**. Existing files are imported with `include` and DeukPack features are layered on top—no modifications required.

```
// Include the existing Protobuf file as-is — zero file modifications
include "legacy/item_base.proto"

// Use the legacy record directly, just register it as a table
table<item_base.Item> = { key: "item_id" }
```

The legacy files are untouched—not a single line changed. The DeukPack engine parses both files together, merges them into a single **Unified AST**, and generates code in the target language (C#, TypeScript, C++, and more) from that shared representation.

## 5. "How Is This Even Possible?" — The Technical Foundation of the Unified AST

The reason all of this works is that inside the DeukPack engine, every IDL—regardless of origin—is transformed into **a single, common AST structure**.

```
   [Input Sources]                 [Unified AST Hub]          [Output Code]
           
   legacy.proto (Protobuf)  ----+
                                |
   legacy.thrift (Thrift)   ----+--> [ DeukPack Engine ] --> C# / TS / C++
                                |           (AST)
   new_logic.deuk (Deuk)    ----+
```

There's a dedicated parser for `.thrift` files and a separate one for `.deuk` files—but both parsers produce the same `DeukPackAST` as output. The code generators look only at the AST; they don't care what the source format was.

The AST carries more than type information. It embeds `declarationKind` (`record`, `entity`, `message`, `table`), bracket attributes (`[key]`, `[split]`, etc.), and doc comments—all preserved. Generators read this rich metadata to produce code that precisely matches each declaration's Intent.

## Conclusion: Accumulated Frustration Becomes Design, Which Becomes Language

The reason DeukPack IDL looks superficially similar to Thrift or Protobuf—while carrying a fundamentally different philosophy inside—is that **it was designed to precisely target the problems legacy tools left unsolved**.

Throwing everything out and starting fresh is easy. Preserving what works, while carefully filling in what was always missing on top of it—that's harder, and in practice, far more valuable.

---

### 🔗 DeukPack Ecosystem

* **Official Website**: [deukpack.app](https://deukpack.app)
* **GitHub (OSS)**: [DeukPack](https://github.com/deukpack/DeukPack) — Open source engine for everyone.

**DeukPack** aims for a technical ecosystem where AI and human developers grow together, preventing fragmentation in complex systems.
