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

---

## 구조

| 경로 | 설명 |
|------|------|
| `docs/index.md` | 홈 — 제품군 요약 |
| `docs/products/` | 제품별 소개 (코어·엔진, 프로토콜, Excel 애드인, 파이프라인·Unity, 확장) |
| `docs/positioning.md` | 포지셔닝·타깃 |
| `docs/license.md` | 라이선스·비용 |

추가할 콘텐츠: **가이드 문서**, **API 레퍼런스** 등 사용자·개발자가 참고할 문서를 이 저장소의 `docs/` 에 두고 배포합니다.
