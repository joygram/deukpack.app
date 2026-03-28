document.addEventListener("DOMContentLoaded", async () => {
  const url = "https://raw.githubusercontent.com/joygram/DeukPackOSS/main/release-notice.json";
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch release notice: ${response.status}`);
    const data = await response.json();
    
    // Determine language by checking html lang attribute
    const isKo = document.documentElement.lang === "ko";
    
    // 1. Announce Banner
    const bannerPlaceholder = document.getElementById("dp-dynamic-banner-placeholder");
    if (bannerPlaceholder) {
      if (data.announce) {
        bannerPlaceholder.innerHTML = data.announce;
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
      
      const h2Title = isKo ? '제품군 노티 (날짜 역순)' : 'Product-line notices (newest first)';
      
      if (notices.length === 0) {
        aggregatePlaceholder.innerHTML = `<h2>${h2Title}</h2><p><em>${isKo ? '등록된 제품군 노티가 없습니다.' : 'No product-line notices yet.'}</em></p>`;
      } else {
        const itemsHtml = notices.map(n => {
          const prodLine = Array.isArray(n.products) ? n.products.map(p => labels[p] || p).join(sep) : '';
          return `
            <h3>${n.date} — ${prodLine}</h3>
            <p><strong>${n[titleKey] || ''}</strong></p>
            ${simpleMdToHtml(n[bodyKey] || '')}
            <hr>
          `;
        }).join('');
        aggregatePlaceholder.innerHTML = `<h2>${h2Title}</h2>${itemsHtml}`;
      }
    }
    
  } catch (error) {
    console.error("Dynamic release notice render failed:", error);
  }
});
