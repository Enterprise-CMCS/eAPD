import { fmt, formatNum, formatDec, formatPerc } from './formats';

describe('formatting util', () => {
  test('supports generic number formatting', () => {
    expect(fmt(30000, '.4f')).toEqual('30000.0000');
    expect(fmt(30000)).toEqual('30,000.00');
    expect(fmt(NaN)).toEqual('--');
  });

  test('formats integers', () => {
    expect(formatNum(30)).toEqual('30');
    expect(formatNum(30.112)).toEqual('30');
  });

  test('formats decimal numbers', () => {
    expect(formatDec(3000.1234)).toEqual('3,000.12');
    expect(formatDec(3000.1234, 3)).toEqual('3,000.123');
  });

  test('formats percents', () => {
    expect(formatPerc(0.2575)).toEqual('+26%');
    expect(formatPerc(-0.35)).toEqual('−35%');
    expect(formatPerc(0.1234, 1)).toEqual('+12.3%');
  });
});
