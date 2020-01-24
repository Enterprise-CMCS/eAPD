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

  return {
    activities: [
      {
        alternatives: '',
        contractorResources: [
          {
            description: '',
            end: '',
            hourly: {
              data: forAllYears({ hours: 0, rate: 0 }),
              useHourly: false
            },
            name: '',
            start: '',
            totalCost: 0,
            years: forAllYears(0)
          }
        ],
        costAllocation: forAllYears({
          ffp: { federal: 90, state: 10 },
          other: 0
        }),
        costAllocationNarrative: {
          methodology: '',
          otherSources: ''
        },
        description: '',
        expenses: [
          {
            category: '',
            description: '',
            years: forAllYears(0)
          }
        ],
        fundingSource: 'HIT',
        name: 'Program Administration',
        objectives: [
          {
            objective: '',
            keyResults: [{ baseline: '', keyResult: '', target: '' }]
          }
        ],
        plannedEndDate: '',
        plannedStartDate: '',
        schedule: [
          {
            endDate: '',
            milestone: ''
          }
        ],
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        },
        statePersonnel: [
          {
            description: '',
            title: '',
            years: forAllYears({
              amt: 0,
              perc: 0
            })
          }
        ],
        summary: '',
        quarterlyFFP: forAllYears({
          1: { contractors: 0, state: 0 },
          2: { contractors: 0, state: 0 },
          3: { contractors: 0, state: 0 },
          4: { contractors: 0, state: 0 }
        })
      }
    ],
    federalCitations: {},
    incentivePayments: {
      ehAmt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
      ehCt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
      epAmt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 }),
      epCt: forAllYears({ 1: 0, 2: 0, 3: 0, 4: 0 })
    },
    keyPersonnel: [
      {
        email: '',
        hasCosts: false,
        costs: forAllYears(0),
        isPrimary: true,
        name: '',
        percentTime: '',
        position: ''
      }
    ],
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
    years
  };
};

module.exports = getNewApd;
