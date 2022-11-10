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

/**
 * Get an app-unique random 8-hex-digit string. These are suitable for use as
 * property names where you want to maintain insertion order.
 */
export const generateKey = (() => {
  const givenKeys = new Set();

  // Object properties returned by Object.keys() or Object.entries() are sorted
  // two ways: first, any numeric keys are returned in numeric order; second,
  // string keys are returned in assignment order.  We rely on that creation
  // ordering in several places, so things get displayed in incorrect order if
  // any keys generated here are completely numeric.  To prevent that, ensure
  // that at least one character of the key is a letter.

  return () => {
    let key = '';
    do {
      key = Math.floor(Math.random() * 4026531839 + 268435456).toString(16);
      // Keep generating until we get a key that is not all digits, and isn't
      // in our local set of generated keys (for uniqueness)
    } while (/^\d{8}$/.test(key) || givenKeys.has(key));
    givenKeys.add(key);
    return key;
  };
})();

const budgetPaths = [
  /^\/years$/,
  /^\/years\/\d+$/,
  /^\/keyStatePersonnel\/keyPersonnel\/(-|\d+)$/,
  /^\/activities\/(-|\d+)$/,
  /^\/activities\/\d+\/fundingSource$/,
  /^\/activities\/\d+\/contractorResources\/(-|\d+)$/,
  /^\/activities\/\d+\/expenses\/(-|\d+)$/,
  /^\/activities\/\d+\/statePersonnel\/(-|\d+)$/,
  /^\/activities\/\d+\/costAllocation\/\d{4}\/(ffp\/federal|ffp\/state|other)$/,
  /^\/activities\/\d+\/quarterlyFFP\/\d{4}\/[1-4]\/(inHouse|contractors)$/
];

export const hasBudgetUpdate = patches =>
  patches.some(({ path }) =>
    budgetPaths.find(pathRegex => path.match(pathRegex))
  );

export const thisFFY = () => {
  const year = new Date().getFullYear();

  // Federal fiscal year starts October 1,
  // but Javascript months start with 0 for
  // some reason, so October is month 9.
  if (new Date().getMonth() > 8) {
    return year + 1;
  }
  return year;
};

// The UI turns the years into strings, so let's
// just make them strings in the state as well;
// that simplifies things
export const defaultAPDYearOptions = startFFY => {
  const ffy = startFFY || thisFFY();
  return [ffy, ffy + 1, ffy + 2].map(y => `${y}`);
};

export const defaultAPDYears = startFFY => {
  const ffy = startFFY || thisFFY();
  return [ffy, ffy + 1].map(y => `${y}`);
};

export const forAllYears = (obj, yearsToCover = defaultAPDYears()) =>
  yearsToCover.reduce(
    (acc, year) => ({
      ...acc,
      [year]: obj
    }),
    {}
  );
