import I18n from 'i18n-js';

// Import locales
import en from './locales/en.json';
import fr from './locales/fr.json';

// Set locale
I18n.defaultLocale = 'en';
I18n.locale = 'en';

// Define the supported translations
I18n.translations = { en, fr };

// The method we'll use instead of a regular string
export function t(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
