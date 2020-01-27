const tap = require('tap');
const sinon = require('sinon');

const { can } = require('../../middleware');
const postEndpoint = require('./post');

// The Cassini probe enters orbit around Saturn, about 7 years after launch.
// On its long journey, it surveyed Venus, Earth, an asteroid, and Jupiter.
// It orbited Saturn for 13 years before being sent into the planet's
// atmosphere to burn up so it couldn't possibly contaminate any of Saturn's
// moons that might be favorable to life. It spent nearly 20 years in space,
// far beyond its original mission plan of 11 years. Good job, Cassini!
//
// Mock with UTC date so the time is consistent regardless of local timezone
const mockClock = sinon.useFakeTimers(Date.UTC(2004, 6, 1, 12));
tap.tearDown(() => {
  mockClock.restore();
});

tap.test('apds POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { post: sandbox.stub() };

  endpointTest.test('setup', async test => {
    postEndpoint(app);

    test.ok(
      app.post.calledWith('/apds', can('edit-document'), sinon.match.func),
      'apds POST endpoint is registered'
    );
  });

  endpointTest.test('handler tests', async tests => {
    let handler;

    const req = { user: { state: { id: 'st' } } };

    const res = {
      send: sandbox.stub(),
      status: sandbox.stub(),
      end: sandbox.stub()
    };

    const createAPD = sandbox.stub();
    const getStateProfile = sandbox.stub();

    tests.beforeEach(async () => {
      sandbox.resetBehavior();
      sandbox.resetHistory();

      res.send.returns(res);
      res.status.returns(res);
      res.end.returns(res);

      postEndpoint(app, { createAPD, getStateProfile });
      handler = app.post.args.pop().pop();
    });

    tests.test('sends a 500 code for database errors', async test => {
      getStateProfile.throws(new Error('boop'));
      await handler(req, res);

      test.ok(res.status.calledWith(500), 'HTTP status set to 500');
      test.ok(res.end.calledOnce, 'response is terminated');
    });

    tests.test(
      'sends a 500 if the newly-generated APD fails schema validation',
      async test => {
        getStateProfile.resolves({ medicaidDirector: { name: 3 } });
        await handler(req, res);

        test.ok(res.status.calledWith(500), 'HTTP status set to 500');
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    tests.test('sends back the new APD if everything works', async test => {
      const expectedApd = {
        activities: [
          {
            alternatives: '',
            contractorResources: [
              {
                description: '',
                end: '',
                hourly: {
                  data: {
                    '2004': { hours: '', rate: '' },
                    '2005': { hours: '', rate: '' }
                  },
                  useHourly: false
                },
                name: '',
                start: '',
                totalCost: 0,
                years: { '2004': 0, '2005': 0 }
              }
            ],
            costAllocation: {
              '2004': { ffp: { federal: 90, state: 10 }, other: 0 },
              '2005': { ffp: { federal: 90, state: 10 }, other: 0 }
            },
            costAllocationNarrative: {
              methodology: '',
              otherSources: ''
            },
            description: '',
            expenses: [
              {
                category: '',
                description: '',
                years: { '2004': 0, '2005': 0 }
              }
            ],
            fundingSource: 'HIT',
            goals: [{ description: '', objective: '' }],
            name: 'Program Administration',
            plannedEndDate: '',
            plannedStartDate: '',
            schedule: [{ endDate: '', milestone: '' }],
            standardsAndConditions: {
              doesNotSupport: '',
              supports: ''
            },
            statePersonnel: [
              {
                description: '',
                title: '',
                years: {
                  '2004': { amt: 0, perc: 0 },
                  '2005': { amt: 0, perc: 0 }
                }
              }
            ],
            summary: '',
            quarterlyFFP: {
              '2004': {
                1: { contractors: 0, state: 0 },
                2: { contractors: 0, state: 0 },
                3: { contractors: 0, state: 0 },
                4: { contractors: 0, state: 0 }
              },
              '2005': {
                1: { contractors: 0, state: 0 },
                2: { contractors: 0, state: 0 },
                3: { contractors: 0, state: 0 },
                4: { contractors: 0, state: 0 }
              }
            }
          }
        ],
        federalCitations: {},
        incentivePayments: {
          ehAmt: {
            '2004': { 1: 0, 2: 0, 3: 0, 4: 0 },
            '2005': { 1: 0, 2: 0, 3: 0, 4: 0 }
          },
          ehCt: {
            '2004': { 1: 0, 2: 0, 3: 0, 4: 0 },
            '2005': { 1: 0, 2: 0, 3: 0, 4: 0 }
          },
          epAmt: {
            '2004': { 1: 0, 2: 0, 3: 0, 4: 0 },
            '2005': { 1: 0, 2: 0, 3: 0, 4: 0 }
          },
          epCt: {
            '2004': { 1: 0, 2: 0, 3: 0, 4: 0 },
            '2005': { 1: 0, 2: 0, 3: 0, 4: 0 }
          }
        },
        keyPersonnel: [
          {
            costs: { '2004': 0, '2005': 0 },
            email: '',
            hasCosts: false,
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
        previousActivityExpenses: {
          '2004': {
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
          '2003': {
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
          '2002': {
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
            phone: '',
            bert: 'ernie'
          },
          medicaidOffice: {
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            bigBird: 'grover'
          }
        },
        years: ['2004', '2005']
      };

      getStateProfile.resolves({
        medicaidDirector: { bert: 'ernie' },
        medicaidOffice: { bigBird: 'grover' }
      });

      createAPD.resolves('apd id');

      await handler(req, res);

      test.ok(
        {
          state_id: 'st',
          status: 'draft',
          document: createAPD.calledWith(expectedApd)
        },
        'expected APD is created'
      );
      test.same(
        res.send.args[0][0],
        {
          ...expectedApd,
          id: 'apd id',
          created: '2004-07-01T12:00:00.000Z',
          updated: '2004-07-01T12:00:00.000Z'
        },
        'responds with the new APD object'
      );
    });
  });
});
