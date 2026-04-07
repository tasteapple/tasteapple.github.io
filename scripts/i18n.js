(function () {
  const STORAGE_KEY = 'tasteapple.lang';
  const root = document.documentElement;
  const toggle = document.querySelector('[data-lang-toggle]');
  const toggleLabel = document.querySelector('[data-lang-toggle-label]');

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = el.getAttribute(`data-${lang}`);
      if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = el.getAttribute(`data-${lang}-placeholder`);
      if (value !== null) el.setAttribute('placeholder', value);
    });

    if (toggle && toggleLabel) {
      const targetLang = lang === 'ko' ? 'en' : 'ko';
      toggle.setAttribute('data-next-lang', targetLang);
      toggleLabel.textContent = targetLang.toUpperCase();
      toggle.setAttribute('aria-label', `Switch language to ${targetLang.toUpperCase()}`);
    }
  }

  const browserLang = (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  const saved = localStorage.getItem(STORAGE_KEY);
  const initialLang = saved || browserLang;

  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextLang = toggle.getAttribute('data-next-lang') || 'en';
      setLang(nextLang);
    });
  }

  setLang(initialLang);
})();
