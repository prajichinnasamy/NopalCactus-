/**
 * i18n.js — Compatibility wrapper
 * Forwards to language.js implementation
 */
if (typeof initializeLanguage === 'function') {
  // language.js is loaded
} else {
  // In case only i18n.js is loaded
  const DEFAULT_LANG = 'ta';
  function applyLanguage(lang) { changeLanguage(lang); }
  function initI18n() { initializeLanguage(); }
}
