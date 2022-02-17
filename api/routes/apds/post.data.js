const getNewApd = () => {
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

  const yearOptions = [thisFFY, thisFFY + 1, thisFFY + 2].map(y => `${y}`);
  const years = yearOptions.slice(0, 2);

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

  const getMetadata = () => ({
    incomplete: 0,
    todo: [],
    recents: []
  });

  return {
    activities: [
      {
        alternatives: '',
        contractorResources: [],
        costAllocation: forAllYears({
          ffp: { federal: 90, state: 10 },
          other: 0
        }),
        costAllocationNarrative: {
          methodology: '',
          years: forAllYears({ otherSources: '' })
        },
        description: '',
        expenses: [],
        fundingSource: 'HIT',
        name: 'Program Administration',
        outcomes: [],
        plannedEndDate: '',
        plannedStartDate: '',
        schedule: [],
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        },
        statePersonnel: [],
        summary: '',
        quarterlyFFP: forAllYears({
          1: { contractors: 0, inHouse: 0 },
          2: { contractors: 0, inHouse: 0 },
          3: { contractors: 0, inHouse: 0 },
          4: { contractors: 0, inHouse: 0 }
        })
      }
    ],
    federalCitations: regsGenerator(),
    incentivePayments: {
      ehAmt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
      ehCt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
      epAmt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
      epCt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 })
    },
    keyPersonnel: [],
    name: 'HITECH IAPD',
    narrativeHIE: '',
    narrativeHIT: '',
    narrativeMMIS: '',
    previousActivityExpenses: forAllYears(
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
    ),
    previousActivitySummary: '',
    programOverview: '',
    stateProfile: {
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
    },
    years,
    metadata: getMetadata()
  };
};

module.exports = getNewApd;
