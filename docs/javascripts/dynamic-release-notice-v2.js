document.addEventListener("DOMContentLoaded", async () => {
  const url = `https://raw.githubusercontent.com/joygram/DeukPack/main/release-notice.json?nocache=${Date.now()}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch release notice: ${response.status}`);
    const data = await response.json();
    
    // Determine language by checking html lang attribute
    const isKo = document.documentElement.lang === "ko";
    
    // 1. Announce Banner
    const bannerPlaceholder = document.getElementById("dp-dynamic-banner-placeholder");
    if (bannerPlaceholder) {
      const announceText = isKo ? data.announce_ko : data.announce_en;
      if (announceText) {
        bannerPlaceholder.innerHTML = announceText;
      }
    }
    
    const simpleMdToHtml = (text) => {
      if (!text) return '';
      let html = text;
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      
      const lines = html.split('\n');
      let inList = false;
      const parsed = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ')) {
          const li = `<li>${trimmed.substring(2)}</li>`;
          if (!inList) {
            inList = true;
            return `<ul>\n${li}`;
          }
          return li;
        } else {
          let res = trimmed;
          if (inList) {
            inList = false;
            res = `</ul>\n` + (res ? `<p>${res}</p>` : '');
          } else if (res) {
            res = `<p>${res}</p>`;
          }
          return res;
        }
      });
      if (inList) parsed.push('</ul>');
      return parsed.join('');
    };

    const buildAdmonition = (type, title, contentHtml) => {
      return `
        <div class="admonition ${type}">
          <p class="admonition-title">${title}</p>
          ${contentHtml}
        </div>
      `;
    };

    // 2. Landing Page Notice
    const landingPlaceholder = document.getElementById("dp-dynamic-notice-landing");
    if (landingPlaceholder) {
      const bodyMd = isKo ? data.landing_ko : data.landing_en;
      if (bodyMd) {
        const title = isKo ? (data.info_title_ko || '득팩 코어 업데이트') : (data.info_title_en || 'DeukPack core update');
        const titleWithVersion = `${title} — ${data.version}`;
        landingPlaceholder.innerHTML = buildAdmonition('info', titleWithVersion, simpleMdToHtml(bodyMd));
      }
    }

    // 3. Product-Specific Notices
    const productLabelsKo = {
      'core-engine': '득팩 코어·엔진',
      'protocol': '득팩 프로토콜',
      'excel-addin': '득팩 Excel 애드인',
      'pipeline-unity': '득팩 파이프라인·Unity',
      'navigation': 'DeukNavigation',
      'extension': '확장 제품군',
    };
    const productLabelsEn = {
      'core-engine': 'Core · engine',
      'protocol': 'Protocol',
      'excel-addin': 'Excel add-in',
      'pipeline-unity': 'Pipeline · Unity',
      'navigation': 'DeukNavigation',
      'extension': 'Extension',
    };
    
    const productPlaceholders = document.querySelectorAll(".dp-dynamic-notice-product");
    if (productPlaceholders.length > 0 && Array.isArray(data.product_notices)) {
      const notices = data.product_notices.sort((a, b) => b.date.localeCompare(a.date));
      const titleKey = isKo ? 'title_ko' : 'title_en';
      const bodyKey = isKo ? 'body_ko' : 'body_en';
      const tipTitle = isKo ? '이 제품군 최근 노티' : 'Recent notices (this product line)';

      productPlaceholders.forEach(el => {
        const slug = el.getAttribute("data-product");
        const filtered = notices.filter(n => Array.isArray(n.products) && n.products.includes(slug));
        
        if (filtered.length > 0) {
          const contentHtml = filtered.map(n => {
            const head = `<p><strong>${n.date}</strong> — ${n[titleKey] || ''}</p>`;
            const body = simpleMdToHtml(n[bodyKey] || '');
            return head + body;
          }).join('');
          el.innerHTML = buildAdmonition('tip', tipTitle, contentHtml);
        }
      });
    }

    // 4. Aggregate Releases List
    const aggregatePlaceholder = document.getElementById("dp-dynamic-notice-aggregate");
    if (aggregatePlaceholder && Array.isArray(data.product_notices)) {
      const notices = data.product_notices.sort((a, b) => b.date.localeCompare(a.date));
      const titleKey = isKo ? 'title_ko' : 'title_en';
      const bodyKey = isKo ? 'body_ko' : 'body_en';
      const labels = isKo ? productLabelsKo : productLabelsEn;
      const sep = ' · ';
      
      const h2Title = isKo ? '최신 제품 소식' : 'Latest Product News';
      
      if (notices.length === 0) {
        aggregatePlaceholder.innerHTML = `<h2>${h2Title}</h2><p><em>${isKo ? '등록된 제품군 노티가 없습니다.' : 'No product-line notices yet.'}</em></p>`;
      } else {
        // A. Featured Latest (First item)
        const latest = notices[0];
        const latestProdLine = Array.isArray(latest.products) ? latest.products.map(p => labels[p] || p).join(sep) : '';
        const featuredHtml = `
          <div class="dp-notice-featured">
            <h3>${latest.date} — ${latestProdLine}</h3>
            <p><strong>${latest[titleKey] || ''}</strong></p>
            ${simpleMdToHtml(latest[bodyKey] || '')}
          </div>
        `;

        // B. Rolling Ticker (Next 4 items)
        let tickerHtml = '';
        const tickerItems = notices.slice(1, 5);
        if (tickerItems.length > 0) {
          const tickerItemsInner = tickerItems.map(n => {
            const prodShort = Array.isArray(n.products) ? (labels[n.products[0]] || n.products[0]) : '';
            return `
              <div class="dp-ticker-item">
                <span class="dp-ticker-label">${prodShort}</span>
                <span><strong>${n.date}</strong> — ${n[titleKey]}</span>
              </div>
            `;
          }).join('');
          
          tickerHtml = `
            <div class="dp-rolling-ticker-container">
              <div class="dp-rolling-ticker">
                ${tickerItemsInner}
                ${tickerItemsInner /* Infinite loop effect duplicate */}
              </div>
            </div>
          `;
        }

        // C. History (Everything else)
        const historyItems = notices.slice(1);
        const historyTitle = isKo ? '전체 업데이트 이력 보기' : 'View Full Release History';
        const historyItemsHtml = historyItems.map(n => {
          const prodLine = Array.isArray(n.products) ? n.products.map(p => labels[p] || p).join(sep) : '';
          return `
            <div class="dp-history-item">
              <h4>${n.date} — ${prodLine}</h4>
              <p><strong>${n[titleKey] || ''}</strong></p>
              ${simpleMdToHtml(n[bodyKey] || '')}
              <hr>
            </div>
          `;
        }).join('');

        const historyHtml = `
          <div class="dp-history-section">
            <div id="dp-history-toggle" class="dp-history-btn">
              <span>▶ ${historyTitle}</span>
            </div>
            <div id="dp-history-content" class="dp-history-content">
              ${historyItemsHtml}
            </div>
          </div>
        `;

        aggregatePlaceholder.innerHTML = `<h2>${h2Title}</h2>${featuredHtml}${tickerHtml}${historyHtml}`;

        // Add Toggle Event
        const toggleBtn = document.getElementById("dp-history-toggle");
        const historyContent = document.getElementById("dp-history-content");
        if (toggleBtn && historyContent) {
          toggleBtn.addEventListener("click", () => {
            const isVisible = historyContent.classList.toggle("is-visible");
            toggleBtn.querySelector("span").textContent = (isVisible ? "▼ " : "▶ ") + historyTitle;
          });
        }

        // Adjust Ticker Animation
        const ticker = aggregatePlaceholder.querySelector(".dp-rolling-ticker");
        if (ticker && tickerItems.length > 0) {
          ticker.style.animationDuration = `${tickerItems.length * 3}s`;
        }
      }
    }
    
  } catch (error) {
    console.error("Dynamic release notice render failed:", error);
  }
});
