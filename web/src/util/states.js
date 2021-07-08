const STATES = [
  { id: 'al', name: 'Alabama' },
  { id: 'ak', name: 'Alaska' },
  { id: 'as', name: 'American Samoa' },
  { id: 'az', name: 'Arizona' },
  { id: 'ar', name: 'Arkansas' },
  { id: 'ca', name: 'California' },
  { id: 'co', name: 'Colorado' },
  { id: 'ct', name: 'Connecticut' },
  { id: 'de', name: 'Delaware' },
  { id: 'dc', name: 'District of Columbia' },
  { id: 'fl', name: 'Florida' },
  { id: 'ga', name: 'Georgia' },
  { id: 'gu', name: 'Guam' },
  { id: 'hi', name: 'Hawaii' },
  { id: 'id', name: 'Idaho' },
  { id: 'il', name: 'Illinois' },
  { id: 'in', name: 'Indiana' },
  { id: 'ia', name: 'Iowa' },
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
  { id: 'nv', name: 'Nevada' },
  { id: 'nh', name: 'New Hampshire' },
  { id: 'nj', name: 'New Jersey' },
  { id: 'nm', name: 'New Mexico' },
  { id: 'ny', name: 'New York' },
  { id: 'nc', name: 'North Carolina' },
  { id: 'nd', name: 'North Dakota' },
  { id: 'mp', name: 'Northern Mariana Islands' },
  { id: 'oh', name: 'Ohio' },
  { id: 'ok', name: 'Oklahoma' },
  { id: 'or', name: 'Oregon' },
  { id: 'pa', name: 'Pennsylvania' },
  { id: 'pr', name: 'Puerto Rico' },
  { id: 'ri', name: 'Rhode Island' },
  { id: 'sc', name: 'South Carolina' },
  { id: 'sd', name: 'South Dakota' },
  { id: 'tn', name: 'Tennessee' },
  { id: 'tx', name: 'Texas' },
  { id: 'vi', name: 'U.S. Virgin Islands' },
  { id: 'ut', name: 'Utah' },
  { id: 'vt', name: 'Vermont' },
  { id: 'va', name: 'Virginia' },
  { id: 'wa', name: 'Washington' },
  { id: 'wv', name: 'West Virginia' },
  { id: 'wi', name: 'Wisconsin' },
  { id: 'wy', name: 'Wyoming' }
];

const usStatesDropdownOptions = STATES.map(s => ({
  label: s.name,
  value: s.id
}));

const usStatesAllDropdownOptions = [{ label: 'None', value: '' }].concat(
  usStatesDropdownOptions
);

export { STATES, usStatesDropdownOptions, usStatesAllDropdownOptions };
