# DeukPack

**DeukPack(득팩)** 은 **IDL·스키마 정의, 코드 생성, 직렬화·프로토콜, 메타·테이블**을 한 파이프라인으로 제공하는 제품군입니다. Thrift·Protobuf·OpenAPI·CSV 등 기존 정의를 그대로 가져와 **C#·C++·TypeScript·JavaScript** 코드를 생성하고, Apache Thrift 대비 **수십 배 빠른** 파싱·코드젠과 호환 직렬화를 제공합니다.

- **정의 한 번에** — 한 번 정의한 스키마로 코드·직렬화·메타·검증이 맞춰지고, 기존 소스를 그대로 가져와 점진적 전환 가능
- **런타임·서버·게임 연동** — Binary/Compact/JSON 직렬화, msgId·ProtocolRegistry 기반 메시지 처리
- **메타·스프레드시트** — 스키마 기반 메타 편집·검증, Excel 애드인, Unity·서버 로드 파이프라인

**→ 공식 사이트: [https://deukpack.app](https://deukpack.app)** — 제품 소개, 가이드, 포지셔닝, 라이선스

---

## 이 저장소에 대하여

이 저장소는 **https://deukpack.app** 에 배포되는 **DeukPack 공식 사이트**의 소스입니다. 사이트 콘텐츠(제품 소개, 문서, API 레퍼런스)는 `docs/` 에 있으며, MkDocs로 빌드·배포됩니다.

### 로컬에서 사이트 보기

```bash
python -m venv .venv
.venv/Scripts/activate   # Windows  /  source .venv/bin/activate  # Linux/macOS
pip install -r requirements.txt
mkdocs serve
```

브라우저에서 `http://127.0.0.1> 8000` 접속.

### 배포

- **GitHub Pages**: `main` 푸시 시 GitHub Actions가 MkDocs 빌드 후 배포.
- 로컬 빌드: `mkdocs build` → `site/` 에 정적 사이트 생성.

### 콘텐츠 구조

| 경로 | 설명 |
|------|------|
| `docs/index.md` | 홈 — DeukPack 소개·제품군 요약 |
| `docs/products/` | 제품별 소개 (코어·엔진, 프로토콜, Excel 애드인, 파이프라인·Unity, 확장) |
| `docs/positioning.md` | 포지셔닝·타깃 |
| `docs/license.md` | 라이선스·비용 |
