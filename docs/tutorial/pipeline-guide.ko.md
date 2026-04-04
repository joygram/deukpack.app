# 파이프라인 만들기

``deukpack.pipeline.json`**(기본 파일명; `init`의 `-o`로 다른 경로 가능)으로 여러 IDL·여러 출력을 `한 번에** 실행합니다.

---

## 0. 기본 워크플로(npm)

```bash
npm install deukpack
npx deukpack init    # 대화형 또는 --non-interactive
npx deukpack run     # cwd가 프로젝트 루트면 ./deukpack.pipeline.json 사용
```

설정 안의 경로는 **JSON 파일이 있는 디렉터리** 기준 상대 경로로 해석됩니다.

---

## 1. 소스에서 빌드해서 파이프라인 실행

### 1.1 클론 및 빌드

```bash
git clone https://github.com/joygram/DeukPack.git
cd DeukPack
npm ci
npm run build
```

### 1.2 설정 요약

**단일 엔트리 파일**(기존 방식):

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

**`defineRoot` 아래 전체 `.deuk`**(잡에 `thriftFile` 없음):

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

- **`defineScope": "all"`** — **`defineRoot` 아래 모든 `*.deuk`** 를 모아 **`exclude`**(전역+잡 병합) 적용 후 빌드.
- **`outputDir`** 를 **`defineRoot`** 와 같게 두면 **`_deuk_define/csharp`** 등 하위에 생성.
- ``outputLangSubdirs`` — 잡별로 `csharp`/`cpp`/`ts`/`js` `한 단계 폴더명`만 바꿀 때(구 `typescript`/`javascript` 등).
- **`--ts` / `--js`** 및 파이프라인은 산출이 **`ts/`**, **`js/`** (구 `typescript/`·`javascript/` 아님).

샘플: [pipeline.sample-defineScope-all.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample-defineScope-all.json) · 엔트리 방식: [pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json).

### 1.3 실행(소스 빌드 후)

`DeukPack 저장소 루트`에서:

```bash
node scripts/build_deukpack.js --pipeline <설정_파일_경로>
```

---

## 2. 배포본(npm)으로 실행

### 2.1 설치

```bash
npm install deukpack
```

### 2.2 설정 위치

`프로젝트 루트`의 **`deukpack.pipeline.json`** 을 두면 **`npx deukpack run`** 이 그대로 사용합니다. 다른 경로는 `npx deukpack --pipeline ./경로/설정.json`.

### 2.3 실행

**프로젝트 루트에서:**

```bash
npx deukpack run
# 또는
npx deukpack --pipeline ./deukpack.pipeline.json
```

**스크립트 직접:**

```bash
node node_modules/deukpack/scripts/build_deukpack.js --pipeline ./deukpack.pipeline.json
```

**절대 경로:**

```bash
npx deukpack --pipeline /absolute/path/to/deukpack.pipeline.json
```

### 2.4 CI / 자동화

```bash
npx deukpack init --non-interactive
npx deukpack run
```

VSIX가 필요 없으면 init에 **`--skip-vsix`**.

---

## 3. 요약

| 구분 | 소스 빌드 후 | 배포본(npm) |
|------|--------------|-------------|
| **준비** | `git clone` → `npm ci` → `npm run build` | `npm install deukpack` |
| **실행** | `node scripts/build_deukpack.js --pipeline <config>` | `npx deukpack run` 또는 `npx deukpack --pipeline ./deukpack.pipeline.json` |
| **설정 경로** | 설정 파일 기준 상대 경로 | 동일. cwd는 프로젝트 루트 권장 |

---

## 4. 참고

- **샘플**: [pipeline.sample-defineScope-all.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample-defineScope-all.json), [pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json), [pipeline.example.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.example.json)
- **CI**: [DEUKPACK_CI_CD_AND_DEV_PIPELINE.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_CI_CD_AND_DEV_PIPELINE.md)
