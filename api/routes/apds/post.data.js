const { state: defaultStateModel } = require('../../db').models;

const yearsToArray = (years, obj) =>
  years.map(year => ({
    ...obj,
    year: `${year}`
  }));

const getActivityCostAllocations = years =>
  yearsToArray(years, {
    federalPercent: 0.9,
    statePercent: 0.1,
    otherAmount: 0
  });

const getContractor = years => ({
  description: '',
  hourlyData: yearsToArray(years, { hours: 0, rate: 0 }),
  name: '',
  useHourly: false,
  years: yearsToArray(years, { cost: 0 })
});

const getGoal = () => ({
  description: '',
  objective: ''
});

const getExpense = years => ({
  category: '',
  description: '',
  entries: yearsToArray(years, { amount: 0 })
});

const getIncentivePayments = years =>
  yearsToArray(years, {
    q1: { ehPayment: 0, epPayment: 0 },
    q2: { ehPayment: 0, epPayment: 0 },
    q3: { ehPayment: 0, epPayment: 0 },
    q4: { ehPayment: 0, epPayment: 0 }
  });

const getPreviousActivityExpenses = years =>
  yearsToArray(years, {
    hie: {
      federalActual: 0,
      federalApproved: 0,
      stateActual: 0,
      stateApproved: 0
    },
    hit: {
      federalActual: 0,
      federalApproved: 0,
      stateActual: 0,
      stateApproved: 0
    },
    mmis: {
      federal90Actual: 0,
      federal90Approved: 0,
      federal75Actual: 0,
      federal75Approved: 0,
      federal50Actual: 0,
      federal50Approved: 0,
      state10Actual: 0,
      state10Approved: 0,
      state25Actual: 0,
      state25Approved: 0,
      state50Actual: 0,
      state50Approved: 0
    }
  });

const getScheduleMilestone = () => ({
  milestone: ''
});

const getStatePersonnel = years => ({
  description: '',
  title: '',
  years: yearsToArray(years, {
    cost: 0,
    fte: 0
  })
});

const getStateProfile = () => ({
  medicaidDirector: {
    email: '',
    name: '',
    phone: ''
  },
  medicaidOffice: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  }
});

const repeat = (number, obj) => [...Array(number)].map(() => obj);

const getNewApd = async (stateID, { StateModel = defaultStateModel } = {}) => {
  // TODO: Fix these years.  Maybe copy over from how we
  // compute them on the frontend. 🤷‍♂️
  const yearOptions = ['2018', '2019', '2020'];
  const years = yearOptions.slice(0, 2);

  const stateProfile = getStateProfile();
  const state = await StateModel.where({ id: stateID }).fetch();
  if (state.get('medicaid_office')) {
    const stored = state.get('medicaid_office');
    stateProfile.medicaidDirector = stored.medicaidDirector;
    stateProfile.medicaidOffice = stored.medicaidOffice;
  }

  const pointsOfContact = [];
  if (state.get('state_pocs')) {
    pointsOfContact.push(...state.get('state_pocs'));
  }

  return {
    activities: [
      {
        alternatives: '',
        contractorResources: repeat(1, getContractor(years)),
        costAllocation: getActivityCostAllocations(years),
        costAllocationNarrative: {
          methodology: '',
          otherSources: ''
        },
        description: '',
        expenses: repeat(3, getExpense(years)),
        fundingSource: 'HIT',
        goals: [getGoal()],
        name: 'Program Administration',
        schedule: repeat(1, getScheduleMilestone()),
        standardsAndConditions: {
          businessResults: '',
          documentation: '',
          industryStandards: '',
          interoperability: '',
          keyPersonnel: '',
          leverage: '',
          minimizeCost: '',
          mitigationStrategy: '',
          modularity: '',
          mita: '',
          reporting: ''
        },
        statePersonnel: repeat(3, getStatePersonnel(years)),
        summary: '',
        quarterlyFFP: yearsToArray(years, { q1: 0, q2: 0, q3: 0, q4: 0 })
      }
    ],
    incentivePayments: getIncentivePayments(years),
    narrativeHIE: '',
    narrativeHIT: '',
    narrativeMMIS: '',
    pointsOfContact,
    previousActivityExpenses: getPreviousActivityExpenses(
      [0, 1, 2].map(past => yearOptions[0] - past)
    ),
    previousActivitySummary: '',
    programOverview: '',
    stateProfile,
    years
  };
};

module.exports = getNewApd;
