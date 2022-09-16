import { generateKey } from './utils';

describe('utility functions', () => {
  test('generates a key', () => {
    // Letters are only 37.5% of hex digits, so running this test a lot makes
    // it statistically very unlikely that we'd just happen to only generate
    // keys that start with a letter
    for (let i = 0; i < 50000; i += 1) {
      const key = generateKey();
      expect(key).toEqual(expect.stringMatching(/^[a-f0-9]{8}$/));
      expect(key).toEqual(expect.stringMatching(/[a-f]/));
    }
  });
});
