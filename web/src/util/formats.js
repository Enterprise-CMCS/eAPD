import { format } from 'd3-format';

const isNumeric = n => !Number.isNaN(parseFloat(n)) && Number.isFinite(n);

const BIG_NUMBER_THRESHOLD = 1000000;

export const fmt = (val, spec = ',.2f') =>
  isNumeric(val) ? format(spec)(val) : '--';

export const formatNum = x => fmt(x, `,.0f`);
export const formatDec = (x, n = 2) => fmt(x, `,.${n}f`);
export const formatPerc = (x, n = 0) => fmt(x, `+.${n}%`);

export const formatMoney = (x, smN = 0, lgN = 3) => {
  if (!isNumeric(x)) return '--';
  const spec = +x < BIG_NUMBER_THRESHOLD ? `$,.${smN}f` : `$,.${lgN}~s`;
  return format(spec)(x);
};
