import { format } from 'd3-format';

const isNumeric = n => !Number.isNaN(parseFloat(n)) && Number.isFinite(n);

export const fmt = (val, spec = ',.2f') =>
  isNumeric(val) ? format(spec)(val) : '--';

export const formatNum = x => fmt(x, `,.0f`);
export const formatDec = (x, n = 2) => fmt(x, `,.${n}f`);
export const formatMoney = (x, n = 0) => fmt(x, `($,.${n}f`);
export const formatPerc = (x, n = 0) => fmt(x, `+.${n}%`);
