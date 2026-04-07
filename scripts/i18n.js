(function () {
  const STORAGE_KEY = 'tasteapple.lang';
  const root = document.documentElement;
  const toggle = document.querySelector('[data-lang-toggle]');
  const toggleLabel = document.querySelector('[data-lang-toggle-label]');

  function applyText(lang) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = el.getAttribute(`data-${lang}`);
      if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = el.getAttribute(`data-${lang}-placeholder`);
      if (value !== null) el.setAttribute('placeholder', value);
    });
  }

  function updateToggleState(currentLang) {
    if (!toggle || !toggleLabel) return;
    const nextLang = currentLang === 'ko' ? 'en' : 'ko';
    toggle.dataset.currentLang = currentLang;
    toggle.dataset.nextLang = nextLang;
    toggleLabel.textContent = nextLang.toUpperCase();
    const title = nextLang === 'ko' ? '한국어로 전환' : 'Switch to English';
    toggle.setAttribute('title', title);
    toggle.setAttribute('aria-label', title);
  }

  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyText(lang);
    updateToggleState(lang);
  }

  function detectInitialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ko' || saved === 'en') return saved;
    return (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  }

  if (toggle) {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const currentLang = toggle.dataset.currentLang || detectInitialLang();
      const nextLang = currentLang === 'ko' ? 'en' : 'ko';
      setLang(nextLang);
    });
  }

  setLang(detectInitialLang());
})();
