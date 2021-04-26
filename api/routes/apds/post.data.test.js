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
  tap.teardown(() => {
    mockClock.restore();
  });

  const output = await getNewApd();
  // Do a "same" test.  This tests deep equality, which will catch
  // new properties being added to the getNewApd return.  If we use
  // a "match" test, new properties will fall through the cracks.
  test.same(output, {
    activities: [
      {
        alternatives: '',
        contractorResources: [],
        costAllocation: {
          '1997': { ffp: { federal: 90, state: 10 }, other: 0 },
          '1998': { ffp: { federal: 90, state: 10 }, other: 0 }
        },
        costAllocationNarrative: {
          methodology: '',
          '1997': { otherSources: '' },
          '1998': { otherSources: '' }
        },
        description: '',
        expenses: [],
        fundingSource: 'HIT',
        outcomes: [],
        name: 'Program Administration',
        plannedEndDate: '',
        plannedStartDate: '',
        schedule: [],
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        },
        statePersonnel: [],
        summary: '',
        quarterlyFFP: {
          '1997': {
            1: { contractors: 0, inHouse: 0 },
            2: { contractors: 0, inHouse: 0 },
            3: { contractors: 0, inHouse: 0 },
            4: { contractors: 0, inHouse: 0 }
          },
          '1998': {
            1: { contractors: 0, inHouse: 0 },
            2: { contractors: 0, inHouse: 0 },
            3: { contractors: 0, inHouse: 0 },
            4: { contractors: 0, inHouse: 0 }
          }
        }
      }
    ],
    federalCitations: {},
    incentivePayments: {
      ehAmt: {
        '1997': { 1: 0, 2: 0, 3: 0, 4: 0 },
        '1998': { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      ehCt: {
        '1997': { 1: 0, 2: 0, 3: 0, 4: 0 },
        '1998': { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      epAmt: {
        '1997': { 1: 0, 2: 0, 3: 0, 4: 0 },
        '1998': { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      epCt: {
        '1997': { 1: 0, 2: 0, 3: 0, 4: 0 },
        '1998': { 1: 0, 2: 0, 3: 0, 4: 0 }
      }
    },
    keyPersonnel: [],
    name: 'HITECH IAPD',
    narrativeHIE: '',
    narrativeHIT: '',
    narrativeMMIS: '',
    previousActivityExpenses: {
      '1997': {
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
      '1996': {
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
      '1995': {
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
    },
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
    years: ['1997', '1998']
  });
});
