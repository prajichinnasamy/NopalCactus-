/**
 * language.js — NopalCactusIndia
 * Centralized Language Management System
 * Supported: Tamil ('ta' - Default), English ('en'), Hindi ('hi')
 * Features:
 *  - Persisted in localStorage ('nopal_lang')
 *  - Fallback safe (preserves text if key missing)
 *  - Supports [data-i18n], [data-i18n-placeholder], [data-i18n-ph], [data-i18n-title], [data-i18n-alt]
 *  - Updates active button state
 */

const DEFAULT_LANG = 'ta';

/**
 * Apply translation strings to the current DOM
 * @param {string} lang - 'ta', 'en', or 'hi'
 */
function applyTranslations(lang) {
  if (typeof translations === 'undefined' || !translations[lang]) {
    console.warn(`[i18n] Translation dictionary for '${lang}' not found.`);
    return;
  }

  const dict = translations[lang];

  // 1. Text Content: [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dict[key] !== undefined && dict[key] !== null) {
      el.textContent = dict[key];
    }
  });

  // 2. Placeholders: [data-i18n-placeholder] and [data-i18n-ph]
  document.querySelectorAll('[data-i18n-placeholder], [data-i18n-ph]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder') || el.getAttribute('data-i18n-ph');
    if (key && dict[key] !== undefined && dict[key] !== null) {
      el.placeholder = dict[key];
    }
  });

  // 3. Titles: [data-i18n-title]
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key && dict[key] !== undefined && dict[key] !== null) {
      el.title = dict[key];
    }
  });

  // 4. Alt texts: [data-i18n-alt]
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    if (key && dict[key] !== undefined && dict[key] !== null) {
      el.alt = dict[key];
    }
  });

  // 5. Aria Labels: [data-i18n-aria-label]
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (key && dict[key] !== undefined && dict[key] !== null) {
      el.setAttribute('aria-label', dict[key]);
    }
  });

  // 6. Update Active State of Language Buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    const isActive = btnLang === lang;
    if (isActive) {
      btn.classList.add('font-bold', 'text-[#1b5e20]', 'underline');
      btn.classList.remove('text-gray-700', 'font-normal');
    } else {
      btn.classList.remove('font-bold', 'text-[#1b5e20]', 'underline');
      btn.classList.add('text-gray-700', 'font-normal');
    }
  });

  // 7. Update <html lang="..."> attribute
  document.documentElement.lang = lang;
}

/**
 * Switch current language, persist choice, and update DOM
 * @param {string} lang - 'ta', 'en', or 'hi'
 */
function changeLanguage(lang) {
  const targetLang = (lang === 'en' || lang === 'ta' || lang === 'hi') ? lang : DEFAULT_LANG;
  try {
    localStorage.setItem('nopal_lang', targetLang);
  } catch (e) {
    console.warn('[i18n] localStorage is not accessible.', e);
  }
  applyTranslations(targetLang);
}

/**
 * Initialize language system on page load
 */
function initializeLanguage() {
  let currentLang = DEFAULT_LANG;
  try {
    const saved = localStorage.getItem('nopal_lang');
    if (saved && (saved === 'en' || saved === 'ta' || saved === 'hi')) {
      currentLang = saved;
    }
  } catch (e) {
    console.warn('[i18n] Error reading localStorage, using default:', DEFAULT_LANG);
  }

  // Apply on initial load
  applyTranslations(currentLang);

  // Attach event listeners to language switcher buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      if (lang) {
        changeLanguage(lang);
      }
    });
  });
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
  initializeLanguage();
}
