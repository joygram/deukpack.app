# 릴리스 · 뉴스

GitHub에 **새 태그·릴리스**가 올라오면 이 페이지와 사이트 상단 배너 문구를 함께 갱신합니다. 세부 변경은 저장소 changelog를 정본으로 삼습니다.

| 구분 | 링크 |
|------|------|
| **npm** | [deukpack](https://www.npmjs.com/package/deukpack) |
| **GitHub Releases** | [joygram/DeukPack — Releases](https://github.com/joygram/DeukPack/releases) |
| **변경 이력 (정본)** | [CHANGELOG.ko.md](https://github.com/joygram/DeukPack/blob/main/CHANGELOG.ko.md) · [CHANGELOG.md](https://github.com/joygram/DeukPack/blob/main/CHANGELOG.md) |

---

## 제품군 노티

정본은 저장소 루트 **`release-notice.json`** 의 `product_notices` 배열입니다. `npm run release-notice:apply`(또는 CI)로 아래 블록이 갱신됩니다. **날짜 역순**이며, 한 노티가 여러 제품군에 동시에 태그될 수 있습니다. 각 제품군 **랜딩**에는 해당 제품만 필터한 노티가 표시됩니다.

--8<-- "_includes/product-notices-aggregate.ko.md"

세부 변경·호환성은 위 **changelog** 정본을 보세요.
