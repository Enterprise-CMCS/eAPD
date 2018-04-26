import I18n, { initI18n, t } from './index';

import fr from './locales/fr.json';

describe('i18n translations', () => {
  beforeEach(() => {
    I18n.locale = 'en';
  });

  describe('initialization', () => {
    test('defaults if browser language is not detected', () => {
      global.navigator.initI18n();

      expect(I18n.locale).toBe('en');
    });
  });

  test('t function', () => {
    expect(t('title', { year: 2018 })).toBe('2018 HITECH APD');
    expect(t('nonsense')).toBe('[missing "en.nonsense" translation]');
  });

  test('changing locale to one that is supported', () => {
    I18n.locale = 'fr';
    expect(t('test')).toBe(fr.test);
  });

  test('changing locale to one that is not supported', () => {
    I18n.locale = 'pig-latin';
    expect(t('test')).toBe('[missing "pig-latin.test" translation]');
  });
});
