export const deepCopy = obj => JSON.parse(JSON.stringify(obj || {}));

/**
 * Rounds a number to the given number of decimal places.
 * @param {Integer} value the value to round
 * @param {Integer} digits the number of digits to round to, defaults to 2
 * @returns The rounded value
 */
export const fixNum = (value, digits = 2) => {
  const mult = 10 ** digits;
  return Math.round(value * mult) / mult;
};

/**
 * Round the values of an object to the given number to a given decimal place.
 * @param {Object} o The object to round
 * @param {Integer} digits The number of digits to round to, defaults to 2
 * @returns {Object} the object with rounded values
 */
export const roundObjectValues = (o, digits = 2) => {
  Object.entries(o).forEach(([key, value]) => {
    if (value) {
      if (typeof value === 'number') {
        o[key] = fixNum(value, digits);
      } else if (typeof value === 'object') {
        roundObjectValues(value, digits);
      }
    }
  });
  return o;
};
