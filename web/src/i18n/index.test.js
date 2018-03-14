import { t } from './index';

import en from './locales/en.json';

describe('i18n translations', () => {
  test('t function', () => {
    expect(t('test')).toBe(en.test);
    expect(t('nonsense')).toBe('[missing "en.nonsense" translation]');
  });
});
