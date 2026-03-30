/**
 * DeukPack — Table Scroll Indicator Utility
 * Detects overflowed tables and adds a visual guide for better UX.
 */

document.addEventListener("DOMContentLoaded", function () {
  const initTableIndicators = () => {
    const tableWraps = document.querySelectorAll(".md-typeset__table");

    tableWraps.forEach((wrap) => {
      // Avoid duplicate indicators
      if (wrap.querySelector(".dp-table-indicator")) return;

      const checkOverflow = () => {
        const hasOverflow = wrap.scrollWidth > wrap.clientWidth;
        
        if (hasOverflow) {
          if (!wrap.querySelector(".dp-table-indicator")) {
            const indicator = document.createElement("div");
            indicator.className = "dp-table-indicator";
            // Check for Korean path to localize text
            const isKo = window.location.pathname.includes("/ko/");
            indicator.innerHTML = `<span>${isKo ? "스크롤" : "Scroll"}</span><span class="dp-arrow">→</span>`;
            
            // Positioning the indicator inside the relative wrap
            wrap.style.position = "relative";
            wrap.appendChild(indicator);

            // Mark as having indicator
            wrap.dataset.hasIndicator = "true";

            // Fade out on scroll
            const fadeOut = () => {
              indicator.style.opacity = "0";
              indicator.style.transition = "opacity 0.4s ease, transform 0.4s ease";
              indicator.style.transform = "translateX(10px)";
              setTimeout(() => {
                if (indicator.parentNode) {
                  indicator.parentNode.removeChild(indicator);
                }
              }, 400);
              wrap.removeEventListener("scroll", fadeOut);
              wrap.removeEventListener("mousedown", fadeOut);
              wrap.removeEventListener("touchstart", fadeOut);
            };

            wrap.addEventListener("scroll", fadeOut, { passive: true });
            wrap.addEventListener("mousedown", fadeOut, { passive: true });
            wrap.addEventListener("touchstart", fadeOut, { passive: true });
          }
        }
      };

      // Initial check
      checkOverflow();

      // Re-check on resize with debounce
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkOverflow, 200);
      });
    });
  };

  // Run on initial load
  initTableIndicators();

  // MkDocs Material often uses instant navigation - observe changes in the main content area
  const content = document.querySelector(".md-content");
  if (content) {
    const observer = new MutationObserver(() => {
      initTableIndicators();
    });
    observer.observe(content, { childList: true, subtree: true });
  }
});
