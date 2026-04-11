(function () {
  const storageKey = "asym-phase-language";
  const legacyStorageKey = "asym-phase-home-language";
  const defaultLanguage = "cn";
  const supportedLanguages = ["en", "cn"];

  function getInitialLanguage() {
    const savedLanguage = window.localStorage.getItem(storageKey) || window.localStorage.getItem(legacyStorageKey);
    return supportedLanguages.includes(savedLanguage) ? savedLanguage : defaultLanguage;
  }

  function applyLanguage(language) {
    const activeLanguage = supportedLanguages.includes(language) ? language : defaultLanguage;

    document.documentElement.lang = activeLanguage === "cn" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      if (!element.dataset.i18nEn) {
        element.dataset.i18nEn = element.textContent;
      }

      element.textContent = activeLanguage === "cn" && element.dataset.i18nCn
        ? element.dataset.i18nCn
        : element.dataset.i18nEn;
    });

    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      const isActive = button.dataset.langToggle === activeLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    window.localStorage.setItem(storageKey, activeLanguage);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        applyLanguage(button.dataset.langToggle);
      });
    });

    applyLanguage(getInitialLanguage());
  });
})();
