import { arrToObj, generateKey as defaultGenerateKey } from '../util';

// Make this thing injectible for testing.
let generateKey = defaultGenerateKey;
export const setKeyGenerator = fn => {
  generateKey = fn;
};

export const newMilestone = (milestone = '', endDate = '') => ({
  key: generateKey(),
  milestone,
  endDate
});

export const newOutcomeMetric = () => ({
  key: generateKey(),
  metric: ''
});

export const newOutcome = () => ({
  key: generateKey(),
  outcome: '',
  metrics: [newOutcomeMetric()]
});

export const statePersonDefaultYear = () => ({ amt: '', perc: '' });
export const newStatePerson = years => ({
  key: generateKey(),
  title: '',
  description: '',
  years: arrToObj(years, statePersonDefaultYear())
});

export const contractorDefaultYear = () => 0;
export const contractorDefaultHourly = () => ({ hours: '', rate: '' });
export const newContractor = years => ({
  key: generateKey(),
  name: '',
  description: '',
  start: '',
  end: '',
  files: [],
  totalCost: 0,
  years: arrToObj(years, contractorDefaultYear()),
  hourly: {
    useHourly: false,
    data: arrToObj(years, contractorDefaultHourly())
  }
});

export const expenseDefaultYear = () => 0;

export const newExpense = years => ({
  key: generateKey(),
  category: 'Hardware, software, and licensing',
  description: '',
  years: arrToObj(years, expenseDefaultYear())
});

export const costAllocationEntry = (other = 0, federal = 90, state = 10) => ({
  other,
  ffp: { federal, state }
});

export const costAllocationNarrative = () => ({
  otherSources: ''
});

export const quarterlyFFPEntry = () =>
  [1, 2, 3, 4].reduce(
    (acc, quarter) => ({
      ...acc,
      [quarter]: {
        inHouse: 25,
        contractors: 25,
        combined: 25
      }
    }),
    {}
  );

export const newActivity = ({
  name = '',
  fundingSource = null,
  years = []
} = {}) => {
  const costAllocationNarrativeYears = arrToObj(
    years,
    costAllocationNarrative()
  );

  const obj = {
    alternatives: '',
    contractorResources: [],
    costAllocation: arrToObj(years, costAllocationEntry()),
    costAllocationNarrative: {
      methodology: '',
      years: {
        ...costAllocationNarrativeYears
      }
    },
    description: '',
    expenses: [],
    fundingSource,
    key: generateKey(),
    name,
    plannedEndDate: '',
    plannedStartDate: '',
    outcomes: [],
    schedule: [],
    statePersonnel: [],
    summary: '',
    standardsAndConditions: {
      doesNotSupport: '',
      supports: ''
    },
    quarterlyFFP: arrToObj(years, quarterlyFFPEntry()),
    years,
    meta: {
      expanded: name === 'Program Administration'
    }
  };
  return obj;
};
