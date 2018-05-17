import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const toNum = x => (x.length ? +x.replace(/\D+/g, '') : '');

const MASKS = {
  dollar: {
    mask: createNumberMask({ allowDecimal: true }),
    unmask: toNum
  },
  percent: {
    mask: createNumberMask({ suffix: '%', prefix: '' }),
    unmask: toNum
  }
};

export default MASKS;
