import { arrToObj } from './formatting.js';

describe('reformat tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('converts an array into an object with array values as object keys', () => {
    expect(arrToObj(['a', 'b', 'c'])).toEqual({ a: 0, b: 0, c: 0 });
    expect(arrToObj(['a', 'b', 'c'], 'boop')).toEqual({
      a: 'boop',
      b: 'boop',
      c: 'boop'
    });
  });
});
