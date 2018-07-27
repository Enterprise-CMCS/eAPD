const tap = require('tap');
const sinon = require('sinon');

const getNewApd = require('./post.data');

tap.test('APD data initializer', async test => {
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
            hourly: {
              useHourly: false,
              data: [
                {
                  hours: '',
                  rate: '',
                  year: '2018'
                },
                {
                  hours: '',
                  rate: '',
                  year: '2019'
                }
              ]
            },
            years: [
              {
                cost: 0,
                year: '2018'
              },
              {
                cost: 0,
                year: '2019'
              }
            ]
          }
        ],
        costAllocation: [
          {
            federalPercent: 0.9,
            statePercent: 0.1,
            otherAmount: 0,
            year: '2018'
          },
          {
            federalPercent: 0.9,
            statePercent: 0.1,
            otherAmount: 0,
            year: '2019'
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
                year: '2018'
              },
              {
                amount: 0,
                year: '2019'
              }
            ]
          },
          {
            category: '',
            description: '',
            entries: [
              {
                amount: 0,
                year: '2018'
              },
              {
                amount: 0,
                year: '2019'
              }
            ]
          },
          {
            category: '',
            description: '',
            entries: [
              {
                amount: 0,
                year: '2018'
              },
              {
                amount: 0,
                year: '2019'
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
                year: '2018'
              },
              {
                cost: 0,
                fte: 0,
                year: '2019'
              }
            ]
          },
          {
            description: '',
            title: '',
            years: [
              {
                cost: 0,
                fte: 0,
                year: '2018'
              },
              {
                cost: 0,
                fte: 0,
                year: '2019'
              }
            ]
          },
          {
            description: '',
            title: '',
            years: [
              {
                cost: 0,
                fte: 0,
                year: '2018'
              },
              {
                cost: 0,
                fte: 0,
                year: '2019'
              }
            ]
          }
        ],
        summary: '',
        quarterlyFFP: [
          { q1: 0, q2: 0, q3: 0, q4: 0, year: '2018' },
          { q1: 0, q2: 0, q3: 0, q4: 0, year: '2019' }
        ]
      }
    ],
    incentivePayments: [
      {
        q1: { ehPayment: 0, epPayment: 0 },
        q2: { ehPayment: 0, epPayment: 0 },
        q3: { ehPayment: 0, epPayment: 0 },
        q4: { ehPayment: 0, epPayment: 0 },
        year: '2018'
      },
      {
        q1: { ehPayment: 0, epPayment: 0 },
        q2: { ehPayment: 0, epPayment: 0 },
        q3: { ehPayment: 0, epPayment: 0 },
        q4: { ehPayment: 0, epPayment: 0 },
        year: '2019'
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
        year: '2018'
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
        year: '2017'
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
        year: '2016'
      }
    ],
    previousActivitySummary: '',
    programOverview: '',
    stateProfile: {
      medicaidDirector: 'Director of Medicaid Operations',
      medicaidOffice: 'Office Where the Director Sites'
    },
    years: ['2018', '2019']
  });
});
