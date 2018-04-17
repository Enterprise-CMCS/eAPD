/* eslint-disable import/prefer-default-export */

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
    id: 'industry',
    title: 'Industry Standards'
  },
  {
    id: 'leverage',
    title: 'Leverage'
  },
  {
    id: 'biz-results',
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
    id: 'mitigation',
    title: 'Mitigation Strategy'
  },
  {
    id: 'key-personnel',
    title: 'Key Personnel'
  },
  {
    id: 'documentation',
    title: 'Documentation'
  },
  {
    id: 'minimize-cost',
    title:
      'Strategies to Minimize Cost and Difficulty on Alternative Hardware or Operating System'
  }
];

export const EDITOR_CONFIG = {
  options: ['inline', 'blockType', 'fontSize', 'image', 'list', 'link'],
  inline: {
    options: ['bold', 'italic', 'underline']
  },
  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto'
    }
  },
  list: {
    options: ['unordered', 'ordered']
  }
};

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

export const activityDisplay = (a, i) => {
  let display = `Activity ${i}`;
  if (a.name) display += `: ${a.name}`;
  if (a.type.length) display += ` (${a.type.join(', ')})`;
  return display;
};
