export const arrToObj = (array = [], initialValue = 0) => {
  const init =
    typeof initialValue === 'function' ? initialValue : () => initialValue;
  return Object.assign({}, ...array.map(a => ({ [a]: init() })));
};

/**
 * Convert input to number, or default to zero.
 * @param {*} value
 * @returns the number value
 */
export const convertToNumber = value => +value || 0;
