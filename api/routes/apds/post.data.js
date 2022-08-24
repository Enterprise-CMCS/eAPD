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

  return {
    name: 'HITECH IAPD',
    years,
    apdOverview: {
      narrativeHIE: '',
      narrativeHIT: '',
      narrativeMMIS: '',
      programOverview: ''
    },
    activities: [
      {
        alternatives: '',
        contractorResources: [],
        costAllocation: forAllYears({
          ffp: { federal: 0, state: 100 },
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
    assurancesAndCompliances: regsGenerator(),
    proposedBudget: {
      incentivePayments: {
        ehAmt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
        ehCt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
        epAmt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
        epCt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 })
      }
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
    // Mocked metadata for admin panel demo
    metadata: {
      incomplete: 2,
      todo: {
        overview: {
          name: 'APD Overview',
          incomplete: 1,
          link: 'apd-overview',
          fields: [
            { 
              name: 'APD Name',
              description: 'please include a name'
            }
          ]
        },
        keyStatePersonnel: {
          name: 'Key State Personnel',
          incomplete: 1,
          link: 'state-profile',
          fields: [
            {
              name: 'Phone Number',
              description: 'Provide the phone number of the Medicaid Director'
            }
          ]
        }
      },
      recents: [
        {
          page: 'Activity 1- State Costs',
          section: 'State Costs',
          link: 'activity/0/state-costs'
        },
        {
          page: 'Private Contractor Costs',
          section: 'Private Contractor Costs',
          link: 'activity/0/contractor-costs'
        }
      ]
    }
  };
};

module.exports = getNewApd;
