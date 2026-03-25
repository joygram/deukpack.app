# AI coding tools setup (Antigravity · Cursor · GitHub Copilot · ChatGPT / Codex)

How to **sign in**, **connect GitHub**, and work with repos like **[DeukPack](https://github.com/joygram/DeukPack)**. UIs change—check each product’s official docs.

---

## Common: what “connect to GitHub” means

| Piece | What you do |
|-------|-------------|
| **Repo on disk** | `git clone` the repository |
| **Push / PR** | Git authenticates with **HTTPS (PAT)** or **SSH keys** |
| **AI apps** | Separate login: **Google / Cursor / GitHub / OpenAI** — often the **same GitHub account** helps for PR/issue integrations |

Never commit tokens or API keys.

---

## 1. Google Antigravity

Agent-oriented IDE (Gemini). GitHub is usually via **Git + GitHub auth**, not a special “Copilot inside Antigravity” (varies by version).

1. Install from [Antigravity](https://antigravity.google/).
2. Sign in with your **Google** account.
3. **Open** the cloned `DeukPack` folder (or `git clone` first).
4. **Git ↔ GitHub**: HTTPS with a **PAT**, or **SSH** key added to GitHub.
5. **MCP**: optional extras from the product’s MCP store. For DeukPack, run **`npx deukpack`** / **`node scripts/build_deukpack.js`** in the terminal.

**Copilot**: Antigravity is Gemini-centric; use **VS Code + Copilot** if you need GitHub Copilot specifically.

---

## 2. Cursor

VS Code–style editor with built-in AI.

1. Install from [cursor.com](https://cursor.com).
2. **Sign in** to Cursor.
3. Optional: **GitHub** in Settings → Account / Integrations (wording varies).
4. Use **`.cursor/rules/`** for project constraints (this repo may already include rules).
5. Shortcuts: see in-app **Keyboard Shortcuts**.

---

## 3. GitHub Copilot

1. **Copilot** license on your GitHub account — [GitHub Copilot](https://github.com/features/copilot).
2. Install **GitHub Copilot** (+ **Chat**) in **VS Code** or the **JetBrains** plugin.
3. **Sign in to GitHub** from the editor.
4. Open the repo folder; Copilot uses workspace context.

Docs: [GitHub Copilot documentation](https://docs.github.com/en/copilot)

---

## 4. ChatGPT · OpenAI Codex

1. [chatgpt.com](https://chatgpt.com) — sign in; features depend on plan.
2. **Codex CLI / IDE integrations** — follow [OpenAI](https://platform.openai.com/docs) and in-product guides; store **API keys** only in env/secrets.
3. **GitHub** is not auto-linked; use upload, copy-paste, or a separate official integration when available.

---

## 5. Recommended workflow with DeukPack

1. One **clone**, open in your preferred tool.
2. Run **codegen deterministically**: `npm ci`, `npm run build`, `npx deukpack …` or pipeline scripts — see [Quick start](tutorial/quickstart.md), [Pipeline guide](tutorial/pipeline-guide.md).
3. Let AI help with drafts and refactors; keep **wire format and multi-language contracts** on the **DeukPack pipeline** — [AI / agent pipeline](ai-pipeline-integration.md).

---

## 6. Quick comparison

| Tool | Primary account | Link to repo code |
|------|-----------------|-------------------|
| **Antigravity** | Google | Git + HTTPS/SSH |
| **Cursor** | Cursor (+ optional GitHub) | Same |
| **GitHub Copilot** | GitHub | Same + extension |
| **ChatGPT / Codex** | OpenAI | Manual / official connectors |

---

## Related documents

- [AI / agent pipeline](ai-pipeline-integration.md) — role separation, DeukPack integration
- [Tutorial · Quick start](tutorial/quickstart.md)
- Quick start: [Tutorials on this site](tutorial/quickstart.md) · OSS: [GitHub DeukPack](https://github.com/joygram/DeukPack)

**한국어**: Use the language switcher (top right).
