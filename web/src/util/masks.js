import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const dollarMask = createNumberMask({ allowDecimal: true });
export const percentMask = createNumberMask({ suffix: '%', prefix: '' });
