const tap = require('tap');
const sinon = require('sinon');

// The Mars Pathfinder mission landed on Mars on July 4, 1997.  The Sojourner
// rover wandered around the surface for 83 solar days before communications
// failed.  It was designed for a 7-day mission.  Our Martian robots have a
// really good track record of exceeding their design lifes.  FFY 1997.  Set
// this clock before we import anything, so that the stuff we import will use
// our faked-out clock.
const mockClock = sinon.useFakeTimers(new Date(1997, 6, 4).getTime());

const getNewApd = require('./post.data');

tap.test('APD data initializer', async test => {
  test.teardown(() => {
    mockClock.restore();
  });

  const output = await getNewApd();
  // Do a "same" test.  This tests deep equality, which will catch
  // new properties being added to the getNewApd return.  If we use
  // a "match" test, new properties will fall through the cracks.
  test.same(output, {
    name: 'HITECH IAPD',
    years: ['1997', '1998'],
    yearOptions: ['1997', '1998', '1999'],
    apdOverview: {
      programOverview: '',
      narrativeHIE: '',
      narrativeHIT: '',
      narrativeMMIS: ''
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
      actualExpenditures: {
        1997: {
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
        1996: {
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
        1995: {
          hithie: {
            federalActual: 0,
            totalApproved: 0
          },
          mmis: {
            90: { federalActual: 0, totalApproved: 0 },
            75: { federalActual: 0, totalApproved: 0 },
            50: { federalActual: 0, totalApproved: 0 }
          }
        }
      }
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
        costAllocation: {
          1997: { ffp: { federal: 0, state: 100 }, other: 0 },
          1998: { ffp: { federal: 0, state: 100 }, other: 0 }
        },
        costAllocationNarrative: {
          methodology: '',
          years: {
            1997: { otherSources: '' },
            1998: { otherSources: '' }
          }
        },
        quarterlyFFP: {
          1997: {
            1: { contractors: 0, inHouse: 0 },
            2: { contractors: 0, inHouse: 0 },
            3: { contractors: 0, inHouse: 0 },
            4: { contractors: 0, inHouse: 0 }
          },
          1998: {
            1: { contractors: 0, inHouse: 0 },
            2: { contractors: 0, inHouse: 0 },
            3: { contractors: 0, inHouse: 0 },
            4: { contractors: 0, inHouse: 0 }
          }
        }
      }
    ],
    assurancesAndCompliances: {
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
    },
    proposedBudget: {
      incentivePayments: {
        ehAmt: {
          1997: { 1: 0, 2: 0, 3: 0, 4: 0 },
          1998: { 1: 0, 2: 0, 3: 0, 4: 0 }
        },
        ehCt: {
          1997: { 1: 0, 2: 0, 3: 0, 4: 0 },
          1998: { 1: 0, 2: 0, 3: 0, 4: 0 }
        },
        epAmt: {
          1997: { 1: 0, 2: 0, 3: 0, 4: 0 },
          1998: { 1: 0, 2: 0, 3: 0, 4: 0 }
        },
        epCt: {
          1997: { 1: 0, 2: 0, 3: 0, 4: 0 },
          1998: { 1: 0, 2: 0, 3: 0, 4: 0 }
        }
      }
    }
  });
});
