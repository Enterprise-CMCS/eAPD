import I18n from 'i18n-js';

// Import locale translations
import en from './locales/en';
import fr from './locales/fr.json';

// Initial locale settings
const DEFAULT_LOCALE = 'en';
I18n.defaultLocale = DEFAULT_LOCALE;
I18n.locale = DEFAULT_LOCALE;

// Define the supported translations
I18n.translations = { en, fr };

export const SUPPORTED_LOCALES = Object.keys(I18n.translations).sort();

export const BROWSER_LANGUAGE =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

export const initI18n = () => {
  let locale = BROWSER_LANGUAGE && BROWSER_LANGUAGE.slice(0, 2);
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) locale = DEFAULT_LOCALE;

  I18n.locale = locale;
};

export const t =
  process.env.NODE_ENV !== 'production' && window.location.hash.includes('i18n')
    ? name => `[${Array.isArray(name) ? name.join('.') : name}]`
    : (name, params = {}) => I18n.t(name, params);

export default I18n;
