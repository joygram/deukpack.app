# deukpack.app — 공식 사이트 소스

**https://deukpack.app** 에 배포되는 **DeukPack 공식 사이트**의 소스 저장소입니다.

이 사이트에는 **제품 소개**, **문서(가이드)**, **API 레퍼런스** 등 사용자·개발자용 콘텐츠를 담습니다.

---

## 빌드·실행

```bash
# 가상환경 권장
python -m venv .venv
.venv/Scripts/activate   # Windows
# source .venv/bin/activate  # Linux/macOS

pip install -r requirements.txt
mkdocs serve
```

브라우저에서 `http://127.0.0.1:8000` 로 접속.

---

## 배포

- **GitHub Pages**: `main` 브랜치 푸시 시 [GitHub Actions](.github/workflows/deploy-pages.yml)가 MkDocs를 빌드·배포합니다.
- **사이트**: **https://deukpack.app**
- 로컬 빌드: `mkdocs build` → `site/` 에 정적 사이트 생성.

### 커스텀 도메인·HTTPS

GitHub Pages는 **커스텀 도메인(deukpack.app)에 대해 HTTPS 인증서를 자동 발급·갱신**합니다.

1. **리포지토리** → **Settings** → **Pages**
2. **Custom domain**에 `deukpack.app` 입력 후 Save
3. 도메인 등록처에서 DNS 설정:
   - **A 레코드**: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 또는 **CNAME**: `deukpack.app` → `<user-or-org>.github.io`
4. DNS 전파 후 Pages 설정에서 **Enforce HTTPS** 체크

인증서는 GitHub가 관리하므로 별도 발급·갱신 작업은 필요 없습니다.

---

## 구조

| 경로 | 설명 |
|------|------|
| `docs/index.md` | 홈 — 제품군 요약 |
| `docs/products/` | 제품별 소개 (코어·엔진, 프로토콜, Excel 애드인, 파이프라인·Unity, 확장) |
| `docs/positioning.md` | 포지셔닝·타깃 |
| `docs/license.md` | 라이선스·비용 |

추가할 콘텐츠: **가이드 문서**, **API 레퍼런스** 등 사용자·개발자가 참고할 문서를 이 저장소의 `docs/` 에 두고 배포합니다.
