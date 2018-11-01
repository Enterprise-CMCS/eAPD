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
  tap.tearDown(() => {
    mockClock.restore();
  });

  const state = {
    get: sinon.stub()
  };
  state.get.withArgs('medicaid_office').returns({
    medicaidDirector: 'Director of Medicaid Operations',
    medicaidOffice: 'Office Where the Director Sites'
  });
  state.get
    .withArgs('state_pocs')
    .returns(['State Person 1', 'State Person 2']);

  const StateModel = {
    where: sinon
      .stub()
      .withArgs('state id')
      .returns({
        fetch: sinon.stub().resolves(state)
      })
  };

  const output = await getNewApd('state id', { StateModel });
  // Do a "same" test.  This tests deep equality, which will catch
  // new properties being added to the getNewApd return.  If we use
  // a "match" test, new properties will fall through the cracks.
  test.same(output, {
    activities: [
      {
        alternatives: '',
        contractorResources: [
          {
            description: '',
            name: '',
            hourlyData: [
              {
                hours: '',
                rate: '',
                year: '1997'
              },
              {
                hours: '',
                rate: '',
                year: '1998'
              }
            ],
            useHourly: false,
            years: [
              {
                cost: 0,
                year: '1997'
              },
              {
                cost: 0,
                year: '1998'
              }
            ]
          }
        ],
        costAllocation: [
          {
            federalPercent: 0.9,
            statePercent: 0.1,
            otherAmount: 0,
            year: '1997'
          },
          {
            federalPercent: 0.9,
            statePercent: 0.1,
            otherAmount: 0,
            year: '1998'
          }
        ],
        costAllocationNarrative: {
          methodology: '',
          otherSources: ''
        },
        description: '',
        expenses: [
          {
            category: '',
            description: '',
            entries: [
              {
                amount: 0,
                year: '1997'
              },
              {
                amount: 0,
                year: '1998'
              }
            ]
          }
        ],
        fundingSource: 'HIT',
        goals: [{ description: '', objective: '' }],
        name: 'Program Administration',
        schedule: [{ milestone: '' }],
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
        statePersonnel: [
          {
            description: '',
            title: '',
            years: [
              {
                cost: 0,
                fte: 0,
                year: '1997'
              },
              {
                cost: 0,
                fte: 0,
                year: '1998'
              }
            ]
          }
        ],
        summary: '',
        quarterlyFFP: [
          { q1: 0, q2: 0, q3: 0, q4: 0, year: '1997' },
          { q1: 0, q2: 0, q3: 0, q4: 0, year: '1998' }
        ]
      }
    ],
    incentivePayments: [
      {
        q1: { ehPayment: 0, epPayment: 0 },
        q2: { ehPayment: 0, epPayment: 0 },
        q3: { ehPayment: 0, epPayment: 0 },
        q4: { ehPayment: 0, epPayment: 0 },
        year: '1997'
      },
      {
        q1: { ehPayment: 0, epPayment: 0 },
        q2: { ehPayment: 0, epPayment: 0 },
        q3: { ehPayment: 0, epPayment: 0 },
        q4: { ehPayment: 0, epPayment: 0 },
        year: '1998'
      }
    ],
    narrativeHIE: '',
    narrativeHIT: '',
    narrativeMMIS: '',
    pointsOfContact: ['State Person 1', 'State Person 2'],
    previousActivityExpenses: [
      {
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
        },
        year: '1997'
      },
      {
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
        },
        year: '1996'
      },
      {
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
        },
        year: '1995'
      }
    ],
    previousActivitySummary: '',
    programOverview: '',
    stateProfile: {
      medicaidDirector: 'Director of Medicaid Operations',
      medicaidOffice: 'Office Where the Director Sites'
    },
    years: ['1997', '1998']
  });
});
