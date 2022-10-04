import moment from 'moment';
import { STATES } from './states';

export { STATES };

export const ACTIVITY_FUNDING_SOURCES = ['HIT', 'HIE', 'MMIS'];

export const INCENTIVE_ENTRIES = [
  { id: 'ehAmt', name: 'EH Payments', type: 'amount' },
  { id: 'ehCt', name: 'EH Count (optional)', type: 'count' },
  { id: 'epAmt', name: 'EP Payments', type: 'amount' },
  { id: 'epCt', name: 'EP Count (optional)', type: 'count' }
];

export const STANDARDS = [
  {
    id: 'modularity',
    title: 'Modularity'
  },
  {
    id: 'mita',
    title: 'Medicaid Information Technology Architecture (MITA)'
  },
  {
    id: 'industryStandards',
    title: 'Industry Standards'
  },
  {
    id: 'leverage',
    title: 'Leverage'
  },
  {
    id: 'businessResults',
    title: 'Business Results'
  },
  {
    id: 'reporting',
    title: 'Reporting'
  },
  {
    id: 'interoperability',
    title: 'Interoperability'
  },
  {
    id: 'mitigationStrategy',
    title: 'Mitigation Strategy'
  },
  {
    id: 'keyPersonnel',
    title: 'Key Personnel'
  },
  {
    id: 'documentation',
    title: 'Documentation'
  },
  {
    id: 'minimizeCost',
    title:
      'Strategies to Minimize Cost and Difficulty on Alternative Hardware or Operating System'
  }
];

export const thisFFY = (() => {
  const year = new Date().getFullYear();

  // Federal fiscal year starts October 1,
  // but Javascript months start with 0 for
  // some reason, so October is month 9.
  if (new Date().getMonth() > 8) {
    return year + 1;
  }
  return year;
})();

// The UI turns the years into strings, so let's
// just make them strings in the state as well;
// that simplifies things
const threeYears = [thisFFY, thisFFY + 1, thisFFY + 2].map(y => `${y}`);

export const twoYears = [thisFFY, thisFFY + 1].map(y => `${y}`);

export const defaultAPDYearOptions = threeYears;
export const defaultAPDYears = threeYears.slice(0, 2);

export const stateLookup = id => STATES.find(s => s.id === id.toLowerCase());

export const getParams = str =>
  str
    .slice(1)
    .split('&')
    .filter(d => d.length)
    .reduce((params, hash) => {
      const [key, val] = hash.split('=');
      const valGood = val === undefined ? null : decodeURIComponent(val);
      return Object.assign(params, { [key]: valGood });
    }, {});

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

/**
 * Convert a YYYY-MM-DD date string from state format into a
 * consistent display format
 *
 * @param {String} date Date string from state.
 * @returns {String} Display-formatted date string.
 */
export const stateDateToDisplay = date => {
  if (!date) {
    return 'Date not specified';
  }

  const m = moment(date).format('l');

  return m;
};

/**
 * Convert a pair of YYYY-MM-DD date strings from state format into a
 * consistent display format
 *
 * @param {String} start Start date string from state
 * @param {String} end End date string from state
 * @returns {String} Display-formatted date range string
 */
export const stateDateRangeToDisplay = (start, end) => {
  const startDate = stateDateToDisplay(start);
  const endDate = stateDateToDisplay(end);

  return `${startDate} - ${endDate}`;
};

/**
 * Get a sequential form label ID, for uniqueness
 */
export const getLabelID = (() => {
  let count = 0;
  return () => {
    count += 1;
    if (process && process.env.NODE_ENV === 'test') {
      // In test environments, always return the same thing, otherwise our
      // snapshots are just like 🤷🏼‍♂️
      count = 12321;
    }
    return `eapd-form-label-${count}`;
  };
})();

/** Converts a single phrase to sentence case, not accounting for punctuation
 */
export const toSentenceCase = str =>
  str
    // Replace the first character after the start-of-line with its uppercase
    .replace(/^(.)/, letter => letter.toUpperCase())
    // Then replace every uppercase letter that is followed by a space or a
    // lowercase letter with its lowercase. This way groups of capitalized
    // letters (like acronyms) will stay capitalized, but other capitalized
    // words will be lower-cased.
    .replace(/ ([A-Z])([a-z]| )/g, start => start.toLowerCase());

export const applyToNumbers = (obj, fn) => {
  const o = { ...obj };
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'number') o[k] = fn(o[k]);
    else if (typeof o[k] === 'object') o[k] = applyToNumbers(o[k], fn);
  });
  return o;
};
