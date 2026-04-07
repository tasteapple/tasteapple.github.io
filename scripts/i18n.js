(function () {
  const STORAGE_KEY = 'tasteapple.lang';
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll('[data-lang-switch]');

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);
    toggleButtons.forEach((button) => {
      const active = button.getAttribute('data-lang-switch') === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = el.getAttribute(`data-${lang}`);
      if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = el.getAttribute(`data-${lang}-placeholder`);
      if (value !== null) el.setAttribute('placeholder', value);
    });
  }

  const browserLang = (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  const saved = localStorage.getItem(STORAGE_KEY);
  const initialLang = saved || browserLang;

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => setLang(button.getAttribute('data-lang-switch')));
  });

  setLang(initialLang);
})();
