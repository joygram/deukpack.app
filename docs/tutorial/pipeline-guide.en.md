# Pipeline guide

To run multiple IDL inputs and outputs **in one pass**, write a **pipeline config JSON** and execute it via a **source build** or the **distribution (npm)**.

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

### 1.2 Write a pipeline config

Place a `deukpack-pipeline.json` (or any name) in your project or repository.  
Paths inside the config (`thriftFile`, `outputDir`, `includePaths`, `copy`) are resolved **relative to the directory containing the config file**.

**Minimal example** (single job):

```json
{
  "jobs": [
    {
      "name": "main",
      "thriftFile": "idl/schema.thrift",
      "outputDir": "gen",
      "csharp": true,
      "cpp": true,
      "js": false
    }
  ]
}
```

**With include paths**:

```json
{
  "includePaths": ["idl/engine", "idl/common"],
  "jobs": [
    {
      "name": "main",
      "thriftFile": "idl/root.thrift",
      "outputDir": "gen",
      "csharp": true,
      "cpp": true
    }
  ]
}
```

For the full config schema and copy rules, see this document and the repo's [examples/pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json).

### 1.3 Run the pipeline (after source build)

From the **DeukPack repository root**:

```bash
node scripts/build_deukpack.js --pipeline <config_file_path>
```

Examples:

```bash
# In-repo sample
node scripts/build_deukpack.js --pipeline examples/pipeline.sample.json

# Another project's config (absolute or relative path)
node scripts/build_deukpack.js --pipeline /path/to/my-project/deukpack-pipeline.json
```

The config path can be **absolute** or **relative to the current working directory (repo root)**.

---

## 2. Running a pipeline via the distribution (npm)

Run pipelines using **npm-installed deukpack** without cloning the source.

### 2.1 Install the distribution

```bash
npm install deukpack
```

### 2.2 Write a pipeline config

Place `deukpack-pipeline.json` at your project root (or any location). The format is the same as §1.2. Paths are resolved **relative to the config file's directory**.

### 2.3 Run the pipeline with the distribution

**Method A — invoke the script directly with the project root as cwd (recommended)**

To use project-relative paths for the config and IDL, run from the **project root**:

```bash
node node_modules/deukpack/scripts/build_deukpack.js --pipeline ./deukpack-pipeline.json
```

The current working directory is the project root, so config-relative paths resolve against the project.

**Method B — npx + absolute path**

```bash
npx deukpack --pipeline /absolute/path/to/your/deukpack-pipeline.json
```

When using an **absolute path** for the config, paths inside the config are still resolved **relative to the config file's directory**.

---

## 3. Summary

| | From source build | Distribution (npm) |
|---|---|---|
| **Setup** | `git clone` → `npm ci` → `npm run build` | `npm install deukpack` |
| **Run** | `node scripts/build_deukpack.js --pipeline <config>` (from repo root) | `node node_modules/deukpack/scripts/build_deukpack.js --pipeline ./config.json` (from project root) or `npx deukpack --pipeline <absolute_path>` |
| **Config paths** | Relative to config file directory | Same. Set cwd to project root so config and IDL paths resolve against the project |

---

## 4. References

- **Pipeline config schema & fields**: §1–§3 above and [examples/pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json)
- **Sample configs**: [examples/pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json), [examples/pipeline.example.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.example.json)
- **CI usage**: [DEUKPACK_CI_CD_AND_DEV_PIPELINE.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_CI_CD_AND_DEV_PIPELINE.md)
