import roundedPercents from './roundedPercents.js';

describe('rounding percentages util', () => {
  test('spreads a number across a set of percentages', () => {
    expect(roundedPercents(224, [0.15, 0.19, 0.3, 0.36])).toEqual([
      34, 42, 67, 81
    ]);

    expect(roundedPercents(100, [1 / 3, 1 / 3, 1 / 3])).toEqual([34, 33, 33]);
  });
});
