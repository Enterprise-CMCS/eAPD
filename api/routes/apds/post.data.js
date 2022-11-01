const { defaultAPDYears, defaultAPDYearOptions } = require('@cms-eapd/common');

const getNewApd = () => {
  // TODO: change this to getNewHitechAPD
  const years = defaultAPDYears();
  const yearOptions = defaultAPDYearOptions();

  const forAllYears = (obj, yearsToCover = years) =>
    yearsToCover.reduce(
      (acc, year) => ({
        ...acc,
        [year]: obj
      }),
      {}
    );

  const regsGenerator = () => ({
    procurement: [
      { title: '42 CFR Part 495.348', checked: null, explanation: '' },
      { title: 'SMM Section 11267', checked: null, explanation: '' },
      { title: '45 CFR 95.613', checked: null, explanation: '' },
      { title: '45 CFR 75.326', checked: null, explanation: '' }
    ],
    recordsAccess: [
      { title: '42 CFR Part 495.350', checked: null, explanation: '' },
      { title: '42 CFR Part 495.352', checked: null, explanation: '' },
      { title: '42 CFR Part 495.346', checked: null, explanation: '' },
      { title: '42 CFR 433.112(b)', checked: null, explanation: '' },
      { title: '45 CFR Part 95.615', checked: null, explanation: '' },
      { title: 'SMM Section 11267', checked: null, explanation: '' }
    ],
    softwareRights: [
      { title: '42 CFR 495.360', checked: null, explanation: '' },
      { title: '45 CFR 95.617', checked: null, explanation: '' },
      { title: '42 CFR Part 431.300', checked: null, explanation: '' },
      { title: '42 CFR Part 433.112', checked: null, explanation: '' }
    ],
    security: [
      {
        title: '45 CFR 164 Security and Privacy',
        checked: null,
        explanation: ''
      }
    ]
  });

  return {
    name: 'HITECH IAPD',
    years,
    yearOptions,
    apdOverview: {
      narrativeHIE: '',
      narrativeHIT: '',
      narrativeMMIS: '',
      programOverview: ''
    },
    keyStatePersonnel: {
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
      },
      keyPersonnel: []
    },
    previousActivities: {
      previousActivitySummary: '',
      actualExpenditures: forAllYears(
        {
          hithie: {
            federalActual: 0,
            totalApproved: 0
          },
          mmis: {
            90: { federalActual: 0, totalApproved: 0 },
            75: { federalActual: 0, totalApproved: 0 },
            50: { federalActual: 0, totalApproved: 0 }
          }
        },
        [0, 1, 2].map(past => yearOptions[0] - past)
      )
    },
    activities: [
      {
        fundingSource: 'HIT',
        name: 'Program Administration',
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
          plannedStartDate: '',
          plannedEndDate: ''
        },
        milestones: [],
        outcomes: [],
        statePersonnel: [],
        expenses: [],
        contractorResources: [],
        costAllocation: forAllYears({
          ffp: { federal: 0, state: 100 },
          other: 0
        }),
        costAllocationNarrative: {
          methodology: '',
          years: forAllYears({ otherSources: '' })
        },
        quarterlyFFP: forAllYears({
          1: { contractors: 0, inHouse: 0 },
          2: { contractors: 0, inHouse: 0 },
          3: { contractors: 0, inHouse: 0 },
          4: { contractors: 0, inHouse: 0 }
        })
      }
    ],
    proposedBudget: {
      incentivePayments: {
        ehAmt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
        ehCt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
        epAmt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
        epCt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 })
      }
    },
    assurancesAndCompliances: regsGenerator()
  };
};

module.exports = getNewApd;
