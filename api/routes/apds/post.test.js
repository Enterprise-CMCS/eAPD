const tap = require('tap');
const sinon = require('sinon');
const { SchemaTypes } = require('mongoose');

const { can } = require('../../middleware');
const postEndpoint = require('./post');
const mongo = require('../../db/mongodb');

// The Cassini probe enters orbit around Saturn, about 7 years after launch.
// On its long journey, it surveyed Venus, Earth, an asteroid, and Jupiter.
// It orbited Saturn for 13 years before being sent into the planet's
// atmosphere to burn up so it couldn't possibly contaminate any of Saturn's
// moons that might be favorable to life. It spent nearly 20 years in space,
// far beyond its original mission plan of 11 years. Good job, Cassini!
//
// Mock with UTC date so the time is consistent regardless of local timezone
const mockClock = sinon.useFakeTimers(Date.UTC(2004, 6, 1, 12));
let sandbox;
let app;

tap.test('apds POST endpoint', async endpointTest => {
  endpointTest.before(async () => {
    SchemaTypes.ClockDate = SchemaTypes.Date;
    await mongo.setup();
    sandbox = sinon.createSandbox();
    app = { post: sandbox.stub() };
  });

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

    const next = sandbox.stub();

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

    tests.test('sends a 400 code for database errors', async test => {
      const error = new Error('boop');
      getStateProfile.throws(error);
      await handler(req, res, next);

      test.ok(next.calledWith(error), 'HTTP status set to 400');
    });

    // tests.test(
    //   'sends a 400 if the newly-generated APD fails schema validation',
    //   async test => {
    //     getStateProfile.resolves({ medicaidDirector: { name: 3 } });
    //     await handler(req, res, next);

    //     test.ok(
    //       next.calledWith({
    //         status: 400,
    //         message: [
    //           {
    //             keyword: 'type',
    //             instancePath: '/stateProfile/medicaidDirector/name',
    //             schemaPath:
    //               'stateProfile.json/properties/medicaidDirector/properties/name/type',
    //             params: { type: 'string' },
    //             message: 'must be string'
    //           }
    //         ]
    //       }),
    //       'HTTP status set to 400'
    //     );
    //   }
    // );

    tests.test('sends back the new APD if everything works', async test => {
      const expectedApd = {
        activities: [
          {
            alternatives: '',
            contractorResources: [],
            costAllocation: {
              2004: { ffp: { federal: 90, state: 10 }, other: 0 },
              2005: { ffp: { federal: 90, state: 10 }, other: 0 }
            },
            costAllocationNarrative: {
              methodology: '',
              years: {
                2004: { otherSources: '' },
                2005: { otherSources: '' }
              }
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
              2004: {
                1: { contractors: 0, inHouse: 0 },
                2: { contractors: 0, inHouse: 0 },
                3: { contractors: 0, inHouse: 0 },
                4: { contractors: 0, inHouse: 0 }
              },
              2005: {
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
            2004: { 1: 0, 2: 0, 3: 0, 4: 0 },
            2005: { 1: 0, 2: 0, 3: 0, 4: 0 }
          },
          ehCt: {
            2004: { 1: 0, 2: 0, 3: 0, 4: 0 },
            2005: { 1: 0, 2: 0, 3: 0, 4: 0 }
          },
          epAmt: {
            2004: { 1: 0, 2: 0, 3: 0, 4: 0 },
            2005: { 1: 0, 2: 0, 3: 0, 4: 0 }
          },
          epCt: {
            2004: { 1: 0, 2: 0, 3: 0, 4: 0 },
            2005: { 1: 0, 2: 0, 3: 0, 4: 0 }
          }
        },
        keyPersonnel: [],
        name: 'HITECH IAPD',
        narrativeHIE: '',
        narrativeHIT: '',
        narrativeMMIS: '',
        previousActivityExpenses: {
          2004: {
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
          2003: {
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
          2002: {
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

      createAPD.resolves({ id: 'apd id' });

      await handler(req, res, next);

      test.same(
        createAPD.args[0][0],
        {
          stateId: 'st',
          status: 'draft',
          ...expectedApd
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

  endpointTest.teardown(async () => {
    await mongo.teardown();
    mockClock.restore();
  });
});
