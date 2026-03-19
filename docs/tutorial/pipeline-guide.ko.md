# 파이프라인 만들기

여러 IDL·여러 출력을 **한 번에** 실행하려면 **파이프라인 설정 JSON**을 쓰고, **소스에서 빌드한 뒤** 실행하거나 **배포본(npm)**으로 실행할 수 있습니다.

---

## 1. 소스에서 빌드해서 파이프라인 만드는 방법

저장소를 클론한 뒤, **저장소 루트에서** 빌드하고 파이프라인을 실행합니다.

### 1.1 저장소 클론 및 빌드

```bash
git clone https://github.com/joygram/DeukPack.git
cd DeukPack
npm ci
npm run build
```

### 1.2 파이프라인 설정 파일 작성

프로젝트 또는 저장소 안에 `deukpack-pipeline.json` 같은 설정 파일을 둡니다.  
설정 안의 경로(`thriftFile`, `outputDir`, `includePaths`, `copy`)는 **설정 파일이 있는 디렉터리** 기준 상대 경로로 해석됩니다.

**최소 예시** (한 개 잡):

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

**include 경로가 필요할 때**:

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

설정 스키마·copy 규칙 등 상세: 이 문서와 저장소 [examples/pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json) 참고.

### 1.3 파이프라인 실행 (소스 빌드 후)

**DeukPack 저장소 루트**에서:

```bash
node scripts/build_deukpack.js --pipeline <설정_파일_경로>
```

예:

```bash
# 저장소 내 샘플
node scripts/build_deukpack.js --pipeline examples/pipeline.sample.json

# 다른 프로젝트의 설정 (절대 경로 또는 상대 경로)
node scripts/build_deukpack.js --pipeline /path/to/my-project/deukpack-pipeline.json
```

설정 파일 경로는 **절대 경로** 또는 **현재 작업 디렉터리(저장소 루트) 기준** 상대 경로입니다.

---

## 2. 배포본을 통해 파이프라인 만드는 방법

**npm으로 설치한 deukpack**으로 파이프라인을 실행하는 방법입니다. (소스 클론 없이 사용)

### 2.1 배포본 설치

```bash
npm install deukpack
```

### 2.2 파이프라인 설정 파일 작성

사용할 프로젝트 루트(또는 원하는 위치)에 `deukpack-pipeline.json`을 둡니다. 형식은 위 §1.2와 동일합니다. 경로는 **설정 파일이 있는 디렉터리** 기준입니다.

### 2.3 배포본으로 파이프라인 실행

**방법 A — 프로젝트 루트를 cwd로 스크립트 직접 호출 (권장)**

설정 파일·IDL 경로를 프로젝트 기준으로 쓰려면, **프로젝트 루트**에서 스크립트를 직접 호출합니다.

```bash
node node_modules/deukpack/scripts/build_deukpack.js --pipeline ./deukpack-pipeline.json
```

이때 현재 작업 디렉터리는 프로젝트 루트이므로, 설정 파일과 설정 안의 상대 경로가 프로젝트 기준으로 동작합니다.

**방법 B — npx + 절대 경로**

```bash
npx deukpack --pipeline /absolute/path/to/your/deukpack-pipeline.json
```

설정 파일을 **절대 경로**로 주면, 설정 안의 경로는 여전히 **설정 파일이 있는 디렉터리** 기준으로 해석됩니다.

---

## 3. 요약

| 구분 | 소스에서 빌드 후 | 배포본(npm) |
|------|------------------|-------------|
| **준비** | `git clone` → `npm ci` → `npm run build` | `npm install deukpack` |
| **실행** | `node scripts/build_deukpack.js --pipeline <config>` (저장소 루트에서) | `node node_modules/deukpack/scripts/build_deukpack.js --pipeline ./config.json` (프로젝트 루트에서) 또는 `npx deukpack --pipeline <절대경로>` |
| **설정 경로** | 설정 파일 기준 상대 경로 | 동일. 실행 시 cwd를 프로젝트로 두면 설정·IDL 경로를 프로젝트 기준으로 작성 가능 |

---

## 4. 참고

- **파이프라인 설정 스키마·필드**: 이 문서 §1–§3 및 [examples/pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json)
- **샘플 설정**: [examples/pipeline.sample.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.sample.json), [examples/pipeline.example.json](https://github.com/joygram/DeukPack/blob/main/examples/pipeline.example.json)
- **CI에서 사용**: [DEUKPACK_CI_CD_AND_DEV_PIPELINE.md](https://github.com/joygram/DeukPack/blob/main/docs/DEUKPACK_CI_CD_AND_DEV_PIPELINE.md)
