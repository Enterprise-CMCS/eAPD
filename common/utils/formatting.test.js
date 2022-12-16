import { arrToObj, convertToNumber } from './formatting.js';

describe('reformat tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('converts an array into an object with array values as object keys', () => {
    expect(arrToObj([])).toEqual({});
    expect(arrToObj(['a', 'b', 'c'])).toEqual({ a: 0, b: 0, c: 0 });
    expect(arrToObj(['a', 'b', 'c'], 'boop')).toEqual({
      a: 'boop',
      b: 'boop',
      c: 'boop'
    });
    expect(arrToObj(['a', 'b', 'c'], () => ({ 1: 0, 2: 0 }))).toEqual({
      a: { 1: 0, 2: 0 },
      b: { 1: 0, 2: 0 },
      c: { 1: 0, 2: 0 }
    });
  });

  test('convert a value to a number', () => {
    expect(convertToNumber()).toEqual(0);
    expect(convertToNumber('')).toEqual(0);
    expect(convertToNumber('bad')).toEqual(0);
    expect(convertToNumber('2')).toEqual(2);
    expect(convertToNumber(5)).toEqual(5);
  });
});
