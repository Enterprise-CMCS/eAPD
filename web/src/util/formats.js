import { format } from 'd3-format';

// eslint-disable-next-line no-restricted-globals
export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export const stringToNumber = val => (isNumeric(val) ? parseFloat(val) : 0);

export const fmt = (val, spec = ',.2f') =>
  isNumeric(val) ? format(spec)(val) : '--';

export const formatNum = x => fmt(x, `,.0f`);
export const formatDec = (x, n = 2) => fmt(x, `,.${n}~f`);
export const formatPerc = (x, n = 0) => fmt(x, `+.${n}%`);
