/* eslint-disable import/prefer-default-export */

export const ACTIVITY_FUNDING_SOURCES = ['HIT', 'HIE', 'MMIS'];

export const INCENTIVE_ENTRIES = [
  { id: 'ehAmt', name: 'EH Payments', type: 'amount' },
  { id: 'ehCt', name: 'EH Count (optional)', type: 'count' },
  { id: 'epAmt', name: 'EP Payments', type: 'amount' },
  { id: 'epCt', name: 'EP Count (optional)', type: 'count' }
];

export const STATES = [
  { id: 'al', name: 'Alabama' },
  { id: 'ak', name: 'Alaska' },
  { id: 'az', name: 'Arizona' },
  { id: 'ar', name: 'Arkansas' },
  { id: 'ca', name: 'California' },
  { id: 'co', name: 'Colorado' },
  { id: 'ct', name: 'Connecticut' },
  { id: 'de', name: 'Delaware' },
  { id: 'fl', name: 'Florida' },
  { id: 'ga', name: 'Georgia' },
  { id: 'hi', name: 'Hawaii' },
  { id: 'id', name: 'Idaho' },
  { id: 'ia', name: 'Iowa' },
  { id: 'il', name: 'Illinois' },
  { id: 'in', name: 'Indiana' },
  { id: 'ks', name: 'Kansas' },
  { id: 'ky', name: 'Kentucky' },
  { id: 'la', name: 'Louisiana' },
  { id: 'me', name: 'Maine' },
  { id: 'md', name: 'Maryland' },
  { id: 'ma', name: 'Massachusetts' },
  { id: 'mi', name: 'Michigan' },
  { id: 'mn', name: 'Minnesota' },
  { id: 'ms', name: 'Mississippi' },
  { id: 'mo', name: 'Missouri' },
  { id: 'mt', name: 'Montana' },
  { id: 'ne', name: 'Nebraska' },
  { id: 'nc', name: 'North Carolina' },
  { id: 'nd', name: 'North Dakota' },
  { id: 'nh', name: 'New Hampshire' },
  { id: 'nj', name: 'New Jersey' },
  { id: 'nm', name: 'New Mexico' },
  { id: 'nv', name: 'Nevada' },
  { id: 'ny', name: 'New York' },
  { id: 'oh', name: 'Ohio' },
  { id: 'ok', name: 'Oklahoma' },
  { id: 'or', name: 'Oregon' },
  { id: 'pa', name: 'Pennsylvania' },
  { id: 'ri', name: 'Rhode Island' },
  { id: 'sc', name: 'South Carolina' },
  { id: 'sd', name: 'South Dakota' },
  { id: 'tn', name: 'Tennessee' },
  { id: 'tx', name: 'Texas' },
  { id: 'ut', name: 'Utah' },
  { id: 'vt', name: 'Vermont' },
  { id: 'va', name: 'Virginia' },
  { id: 'wa', name: 'Washington' },
  { id: 'wv', name: 'West Virginia' },
  { id: 'wi', name: 'Wisconsin' },
  { id: 'wy', name: 'Wyoming' },

  // Federal district
  { id: 'dc', name: 'District of Columbia' },

  // Territories
  { id: 'as', name: 'American Samoa' },
  { id: 'gu', name: 'Guam' },
  { id: 'mp', name: 'Northern Mariana Islands' },
  { id: 'pr', name: 'Puerto Rico' },
  { id: 'vi', name: 'U.S. Virgin Islands' }
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

const thisFFY = (() => {
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
 * Get a random 8-hex-digit string
 */
export const generateKey = () =>
  Math.floor(Math.random() * 4026531839 + 268435456).toString(16);

export const nextSequence = arrOfNums => Math.max(...arrOfNums, 0) + 1;

export const arrToObj = (array = [], initialValue = 0) => {
  const init =
    typeof initialValue === 'function' ? initialValue : () => initialValue;
  return Object.assign({}, ...array.map(a => ({ [a]: init() })));
};

export const addObjVals = (obj, getVal = a => a) =>
  Object.values(obj).reduce((a, b) => a + getVal(b), 0);

export const applyToNumbers = (obj, fn) => {
  const o = { ...obj };
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'number') o[k] = fn(o[k]);
    else if (typeof o[k] === 'object') o[k] = applyToNumbers(o[k], fn);
  });
  return o;
};

export const replaceNulls = (obj, newValue = '') => {
  const replace = o => {
    Object.keys(o).forEach(k => {
      // eslint-disable-next-line no-param-reassign
      if (o[k] === null) o[k] = newValue;
      else if (typeof o[k] === 'object') replace(o[k]);
    });
  };

  const objNew = JSON.parse(JSON.stringify(obj));
  replace(objNew);
  return objNew;
};
