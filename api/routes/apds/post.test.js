const tap = require('tap');
const sinon = require('sinon');
const { SchemaTypes } = require('mongoose');
const { APD_TYPE } = require('@cms-eapd/common');

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
let sandbox;
let app;

tap.test('apds POST endpoint', async endpointTest => {
  endpointTest.before(async () => {
    SchemaTypes.ClockDate = SchemaTypes.Date;
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

    let req = {
      user: { state: { id: 'st' } },
      body: {
        apdType: APD_TYPE.HITECH,
        apdOverview: {}
      }
    };

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

    tests.test(
      'sends back the new HITECH APD if everything works',
      async test => {
        req = {
          user: { state: { id: 'st' } },
          body: {
            apdType: APD_TYPE.HITECH,
            apdOverview: {
              updateStatus: {
                isUpdateAPD: true,
                annualUpdate: false,
                asNeededUpdate: true
              }
            }
          }
        };

        const expectedApd = {
          __t: APD_TYPE.HITECH,
          name: 'HITECH IAPD',
          years: ['2004', '2005'],
          yearOptions: ['2004', '2005', '2006'],
          apdOverview: {
            updateStatus: {
              isUpdateAPD: true,
              annualUpdate: false,
              asNeededUpdate: true
            },
            programOverview: '',
            narrativeHIE: '',
            narrativeHIT: '',
            narrativeMMIS: ''
          },
          keyStatePersonnel: {
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
            },
            keyPersonnel: []
          },
          previousActivities: {
            previousActivitySummary: '',
            actualExpenditures: {
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
                2004: { ffp: { federal: 0, state: 100 }, other: 0 },
                2005: { ffp: { federal: 0, state: 100 }, other: 0 }
              },
              costAllocationNarrative: {
                methodology: '',
                years: {
                  2004: { otherSources: '' },
                  2005: { otherSources: '' }
                }
              },
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
            }
          }
        };

        getStateProfile.resolves({
          medicaidDirector: { bert: 'ernie' },
          medicaidOffice: { bigBird: 'grover' }
        });

        createAPD.resolves('apd id');

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
      }
    );

    tests.test(
      'sends back the new MMIS APD if everything works',
      async test => {
        req = {
          user: { state: { id: 'st' } },
          body: {
            apdType: APD_TYPE.MMIS,
            apdOverview: {
              updateStatus: {
                isUpdateAPD: true,
                annualUpdate: false,
                asNeededUpdate: true
              }
            }
          }
        };

        const expectedApd = {
          __t: APD_TYPE.MMIS,
          name: 'MMIS IAPD',
          years: ['2004', '2005'],
          yearOptions: ['2004', '2005', '2006'],
          apdOverview: {
            updateStatus: {
              isUpdateAPD: true,
              annualUpdate: false,
              asNeededUpdate: true
            }
          },
          keyStatePersonnel: {
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
            },
            keyPersonnel: []
          },
          statePriortiesAndScope: {
            medicaidProgramAndPriorities: '',
            mesIntroduction: '',
            scopeOfAPD: ''
          },
          previousActivities: {
            previousActivitySummary: '',
            actualExpenditures: {
              2004: {
                mmis: {
                  90: { federalActual: 0, totalApproved: 0 },
                  75: { federalActual: 0, totalApproved: 0 },
                  50: { federalActual: 0, totalApproved: 0 }
                }
              },
              2003: {
                mmis: {
                  90: { federalActual: 0, totalApproved: 0 },
                  75: { federalActual: 0, totalApproved: 0 },
                  50: { federalActual: 0, totalApproved: 0 }
                }
              },
              2002: {
                mmis: {
                  90: { federalActual: 0, totalApproved: 0 },
                  75: { federalActual: 0, totalApproved: 0 },
                  50: { federalActual: 0, totalApproved: 0 }
                }
              }
            }
          },
          activities: [],
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
          }
        };

        getStateProfile.resolves({
          medicaidDirector: { bert: 'ernie' },
          medicaidOffice: { bigBird: 'grover' }
        });

        createAPD.resolves('apd id');

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
      }
    );
  });

  endpointTest.teardown(async () => {
    mockClock.restore();
  });
});
