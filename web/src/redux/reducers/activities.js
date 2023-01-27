import {
  generateKey as defaultGenerateKey,
  arrToObj,
  APD_TYPE
} from '@cms-eapd/common';

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
  metrics: []
});

export const statePersonDefaultYear = () => ({ amt: null, perc: null });
export const newStatePerson = years => ({
  key: generateKey(),
  title: '',
  description: '',
  years: arrToObj(years, statePersonDefaultYear())
});

export const contractorDefaultYear = () => null;
export const contractorDefaultHourly = () => ({ hours: null, rate: null });
export const newContractor = years => ({
  key: generateKey(),
  name: '',
  description: '',
  start: '',
  end: '',
  files: [],
  totalCost: null,
  years: arrToObj(years, contractorDefaultYear()),
  useHourly: null,
  hourly: arrToObj(years, contractorDefaultHourly())
});

export const expenseDefaultYear = () => null;

export const newExpense = years => ({
  key: generateKey(),
  category: '',
  description: '',
  years: arrToObj(years, expenseDefaultYear())
});

export const costAllocationEntry = (other = 0, federal = 0, state = 100) => ({
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

export const newActivity = ({ years, key, apdType } = {}) => {
  switch (apdType) {
    case APD_TYPE.HITECH:
      return newHitechActivity({ years, key });
    case APD_TYPE.MMIS:
      return newMmisActivity({ years, key });
    default:
      return {};
  }
};

const newHitechActivity = ({
  name = '',
  fundingSource = null,
  years = [],
  key = generateKey()
} = {}) => {
  const costAllocationNarrativeYears = arrToObj(
    years,
    costAllocationNarrative()
  );

  return {
    key,
    activityId: key,
    fundingSource,
    name,
    activityOverview: {
      summary: '',
      description: '',
      alternatives: '',
      standardsAndConditions: {
        doesNotSupport: '',
        supports: ''
      }
    },
    activitySchedule: {
      plannedEndDate: '',
      plannedStartDate: ''
    },
    milestones: [],
    outcomes: [],
    statePersonnel: [],
    expenses: [],
    contractorResources: [],
    costAllocation: arrToObj(years, costAllocationEntry()),
    costAllocationNarrative: {
      methodology: '',
      years: {
        ...costAllocationNarrativeYears
      }
    },
    quarterlyFFP: arrToObj(years, quarterlyFFPEntry()),
    years,
    meta: {
      expanded: name === 'Program Administration'
    }
  };
};

const newMmisActivity = ({
  name = '',
  years = [],
  key = generateKey()
} = {}) => {
  const costAllocationNarrativeYears = arrToObj(
    years,
    costAllocationNarrative()
  );

  return {
    key,
    activityId: key,
    name,
    activityOverview: {
      activitySnapshot: '',
      problemStatement: '',
      proposedSolution: ''
    },
    activitySchedule: {
      plannedEndDate: '',
      plannedStartDate: ''
    },
    analysisOfAlternativesAndRisks: {
      alternativeAnalysis: '',
      costBenefitAnalysis: '',
      feasibilityStudy: '',
      requirementsAnalysis: '',
      forseeableRisks: ''
    },
    conditionsForEnhancedFunding: {
      enhancedFundingQualification: null,
      enhancedFundingJustification: ''
    },
    milestones: [],
    outcomes: [],
    statePersonnel: [],
    expenses: [],
    contractorResources: [],
    costAllocation: arrToObj(years, costAllocationEntry()),
    costAllocationNarrative: {
      methodology: '',
      years: {
        ...costAllocationNarrativeYears
      }
    },
    quarterlyFFP: arrToObj(years, quarterlyFFPEntry()),
    years,
    meta: {
      expanded: false
    }
  };
};
