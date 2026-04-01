# AI 코딩 도구 연동 가이드

![docs/ai-ide-tools-guide Cover](/assets/ai-ide-tools-cover.png){: style="display: block; margin: 0 auto 2rem auto; max-width: 500px;"}


**Antigravity · Cursor · GitHub Copilot · ChatGPT(Codex)** 를 쓰면서 **GitHub 저장소(예: [DeukPack](https://github.com/joygram/DeukPack))** 와 함께 개발할 때의 **연결·로그인·추천 워크플로**를 정리합니다.  
제품 UI·메뉴 이름은 업데이트될 수 있으므로, 아래 **공식 문서**를 함께 확인하세요.

---

## 공통: GitHub와 “연결”이란

| 의미 | 하는 일 |
|------|---------|
| **저장소 가져오기** | `git clone` 으로 로컬 폴더에 복제 |
| **푸시·PR** | Git이 **HTTPS(PAT)** 또는 **SSH 키**로 GitHub에 인증 |
| **AI 도구** | 각 앱 **자체 계정**(Google / Cursor / GitHub / OpenAI) 로그인 — Git과는 별도이지만, **같은 GitHub 계정**을 쓰면 PR·이슈 연동이 편함 |

**보안**: Personal Access Token·API 키는 코드에 넣지 말고, OS 자격 증명 관리자·각 제품의 Secrets 설정만 사용하세요.

---

## 1. Google Antigravity

Google의 **에이전트 중심 IDE**(Gemini 계열). “GitHub 연결”은 보통 **Git + GitHub 인증**으로 이루어집니다.

1. **설치**: [Antigravity 공식 안내](https://antigravity.google/)에서 OS에 맞는 설치 파일 받기.
2. **Google 계정**: 앱 실행 후 안내에 따라 **Google 계정**으로 로그인.
3. **프로젝트 열기**  
   - 이미 클론한 폴더: **Open Folder** 로 `DeukPack` 등 루트 선택.  
   - 처음부터: 터미널에서 `git clone https://github.com/joygram/DeukPack.git` 후 해당 폴더를 열기.
4. **Git ↔ GitHub**  
   - **HTTPS**: GitHub에서 **Fine-grained PAT** 또는 classic token 발급 → `git push` 시 자격 증명으로 사용.  
   - **SSH**: `ssh-keygen` → 공개키를 GitHub **SSH keys**에 등록 → `git@github.com:joygram/DeukPack.git` 형식으로 clone.
5. **MCP 등 확장**: Antigravity는 **MCP 스토어**에서 외부 서비스를 붙일 수 있습니다(제품 버전별). DeukPack 코드젠은 여전히 **터미널에서 `npx deukpack` / `node scripts/build_deukpack.js`** 로 실행하는 구성이 일반적입니다.

**GitHub Copilot과의 관계**: Antigravity는 **Gemini 기반**이므로, **Copilot 확장을 Antigravity 안에 쓸 수 있는지**는 제품·버전에 따라 다릅니다. Copilot이 필요하면 **VS Code / JetBrains + Copilot** 조합을 병행하는 경우가 많습니다.

---

## 2. Cursor

**Cursor**(커서)는 VS Code 계열 에디터 + 자체 AI(채팅·에이전트·인라인 편집).

1. **설치**: [cursor.com](https://cursor.com) 에서 다운로드.
2. **Cursor 계정**: 앱에서 **Sign in** (이메일·OAuth 등 제품 안내 따름).
3. **GitHub 연동(선택)**  
   - **Settings** → **Account** / **Integrations** 등에서 GitHub 연결 → PR·이슈·저장소 컨텍스트 활용(메뉴는 버전별로 상이).  
   - 코드 자체는 **로컬 Git** 과 동일하게 `clone` / `commit` / `push`.
4. **구독·모델**: Free / Pro 등에 따라 모델·요청 한도가 다릅니다.
5. **프로젝트 규칙**: 저장소 루트의 **`.cursor/rules/`** · **Rules**에 팀 규칙을 두면, DeukPack·Unity·빌드 스크립트 제약을 AI가 따르기 쉽습니다. (이 모노레포에도 `.cursor/rules` 가 있을 수 있습니다.)
6. **단축키**: 인라인 편집·채팅·에이전트는 앱 내 **Keyboard Shortcuts** 참고.

---

## 3. GitHub Copilot

**VS Code · Visual Studio · JetBrains** 등에서 쓰는 **GitHub의 AI 코딩 어시스턴트**.

1. **구독**: GitHub 계정에 **Copilot** 개인/비즈니스 라이선스가 있어야 합니다. [GitHub Copilot](https://github.com/features/copilot) 에서 확인.
2. **확장 설치**  
   - **VS Code**: Marketplace에서 **GitHub Copilot**, **GitHub Copilot Chat** 설치.  
   - **JetBrains**: **GitHub Copilot** 플러그인.
3. **로그인**: 에디터에서 **Sign in to GitHub** → 브라우저로 GitHub 인증 → Copilot 활성화.
4. **저장소**: 폴더를 연 뒤 일반 Git과 동일하게 작업. Copilot은 **열려 있는 파일·워크스페이스**를 컨텍스트로 제안합니다.
5. **Cursor와 동시 사용**: **서로 다른 앱**이면 동시 설치 가능(예: Cursor로 메인, VS Code+Copilot으로 보조). 한 창에서 둘 다 쓰는 방식은 제품 정책·확장 호환을 확인하세요.

공식: [Copilot 문서](https://docs.github.com/en/copilot)

---

## 4. ChatGPT · Codex(OpenAI)

**ChatGPT** 웹/앱의 코딩·에이전트 기능과, **Codex** 브랜드의 CLI·IDE 연동(제품명·출시 형태는 시기별로 변할 수 있음)을 묶어 안내합니다.

1. **ChatGPT**  
   - [chatgpt.com](https://chatgpt.com) 에서 계정 로그인.  
   - Plus/Pro 등 플랜에 따라 **Codex·딥 리서치·코딩 모드** 등이 다릅니다(공지 확인).
2. **Codex / 개발용 연동**  
   - **CLI·데스크톱·IDE 플러그인**이 제공되는 경우, [OpenAI 개발자 문서](https://platform.openai.com/docs) · ChatGPT 설정 화면의 **공식 가이드**를 따르세요.  
   - **API 키**를 쓰는 도구는 키를 **환경 변수**나 각 앱의 **Secrets**에만 두고, 저장소에 커밋하지 마세요.
3. **GitHub와의 관계**  
   - ChatGPT/Codex는 **기본적으로 GitHub와 자동 연결되지 않습니다.**  
   - 필요 시 **저장소 ZIP·파일 업로드**, 또는 **로컬에서 Cursor/터미널**로 코드를 맞춰 가며 사용합니다.

---

## 5. DeukPack 저장소에서의 추천 워크플로

1. **한 번 클론** 후 선호하는 도구(Antigravity / Cursor / VS Code+Copilot)로 **같은 폴더**를 엽니다.
2. **코드젠·빌드**는 AI 대신 **결정론적으로** 실행:  
   `npm ci` → `npm run build` → `npx deukpack ...` 또는 `node scripts/build_deukpack.js --pipeline ...`  
   ([빠른 시작](tutorial/quickstart.ko.md), [파이프라인](tutorial/pipeline-guide.ko.md) 참고)
3. **AI에게 맡기기 좋은 것**: IDL 초안, 테스트, 문서, 리팩터링 제안.  
   **직렬화·필드 ID·다언어 동기화**는 [AI·에이전트 파이프라인](ai-pipeline-integration.ko.md) 에서 설명한 대로 **득팩 파이프라인**으로 고정하는 편이 안전합니다.

---

## 6. 빠른 대조표

| 도구 | 주로 로그인하는 계정 | GitHub 코드와의 연결 |
|------|---------------------|----------------------|
| **Antigravity** | Google | Git clone + HTTPS(PAT) 또는 SSH |
| **Cursor** | Cursor (+ 선택 GitHub) | 동일 + Cursor 통합 기능(선택) |
| **GitHub Copilot** | GitHub | 동일, 에디터 확장으로 제안 |
| **ChatGPT · Codex** | OpenAI | 수동(파일/복붙/별도 CLI·IDE 연동 시 공식 가이드) |

---

## 관련 문서

- [AI·에이전트 파이프라인](ai-pipeline-integration.ko.md) — 역할 분리·득팩 연동
- [튜토리얼 · 빠른 시작](tutorial/quickstart.ko.md)
- 빠른 시작: [이 사이트 튜토리얼](tutorial/quickstart.ko.md) · OSS: [GitHub DeukPack](https://github.com/joygram/DeukPack)

**English**: Use the language switcher (top right).
