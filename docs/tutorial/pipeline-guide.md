# Pipeline guide

Run multiple IDL inputs and outputs **in one pass** using **`deukpack.pipeline.json`** (default filename; any name works with `--pipeline` / `-o` on `init`).

---

## 0. Default workflow (npm)

```bash
npm install deukpack
npx deukpack init    # interactive or --non-interactive
npx deukpack run     # uses ./deukpack.pipeline.json when cwd is project root
```

Paths inside the config are resolved **relative to the directory that contains the JSON file**.

---

## 1. Building from source and running a pipeline

Clone the repository, build, then run the pipeline.

### 1.1 Clone and build

```bash
git clone https://github.com/joygram/DeukPack.git
cd DeukPack
npm ci
npm run build
```

### 1.2 Pipeline config basics

**Single entry file** (classic):

```json
{
  "jobs": [
    {
      "name": "main",
      "thriftFile": "idl/schema.thrift",
      "outputDir": "gen",
      "csharp": true,
      "cpp": true,
      "ts": false,
      "js": false
    }
  ]
}
```

**Directory-wide `.deuk` under `defineRoot`** (no per-job `thriftFile`):

```json
{
  "defineRoot": "_deuk_define",
  "exclude": [],
  "includePaths": [{ "path": "_deuk_define", "recursive": true }],
  "jobs": [
    {
      "name": "main",
      "defineScope": "all",
      "exclude": [],
      "outputDir": "generated",
      "csharp": true,
      "cpp": false,
      "ts": true,
      "js": true
    }
  ]
}
```

- **`defineScope": "all"`** — collect every `*.deuk` under **`defineRoot`**, apply merged **`exclude`** (top-level + job), build via a short-lived bundle entry.
- **`outputDir`** may match **`defineRoot`** so outputs land under **`_deuk_define/csharp`**, **`…/cpp`**, **`…/ts`**, **`…/js`** by default.
- **`outputLangSubdirs`** — optional per-job map `{ "csharp", "cpp", "ts", "js" }` to rename those single-segment folders (e.g. legacy `typescript` / `javascript`).
- **`--ts` / `--js`** CLI and pipeline jobs emit under **`ts/`** and **`js/`**, not `typescript/` / `javascript/`.

Sample: [examples/pipeline.sample-defineScope-all.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample-defineScope-all.json) · older entry style: [examples/pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json).

### 1.3 Run the pipeline (after source build)

From the **DeukPack repository root**:

```bash
node scripts/build_deukpack.js --pipeline <config_file_path>
```

---

## 2. Running a pipeline via the distribution (npm)

### 2.1 Install

```bash
npm install deukpack
```

### 2.2 Config location

Prefer **`deukpack.pipeline.json`** at the **project root** so **`npx deukpack run`** picks it up. You can use another path: `npx deukpack --pipeline ./path/to/config.json`.

### 2.3 Run

**From project root (recommended):**

```bash
npx deukpack run
# or
npx deukpack --pipeline ./deukpack.pipeline.json
```

**Or invoke the script directly:**

```bash
node node_modules/deukpack/scripts/build_deukpack.js --pipeline ./deukpack.pipeline.json
```

**Absolute config path:**

```bash
npx deukpack --pipeline /absolute/path/to/deukpack.pipeline.json
```

### 2.4 CI / automation

```bash
npx deukpack init --non-interactive
npx deukpack run
```

Use **`--skip-vsix`** on `init` when no VSIX install is desired.

---

## 3. Summary

| | From source build | Distribution (npm) |
|---|---|---|
| **Setup** | `git clone` → `npm ci` → `npm run build` | `npm install deukpack` |
| **Run** | `node scripts/build_deukpack.js --pipeline <config>` (from repo root) | `npx deukpack run` or `npx deukpack --pipeline ./deukpack.pipeline.json` |
| **Config paths** | Relative to config file directory | Same; cwd should be project root |

---

## 4. References

- **Samples**: [pipeline.sample-defineScope-all.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample-defineScope-all.json), [pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json), [pipeline.example.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.example.json)
- **CI**: [DEUKPACK_CI_CD_AND_DEV_PIPELINE.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_CI_CD_AND_DEV_PIPELINE.md)
