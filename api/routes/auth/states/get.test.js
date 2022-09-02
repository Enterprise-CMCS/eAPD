const tap = require('tap');
const sinon = require('sinon');

const getEndpoint = require('./get');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let changeState;

tap.test('auth roles GET endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    changeState = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/auth/state/:stateId', sinon.match.func),
      'change state GET endpoint is registered'
    );
  });

  endpointTest.test('get state Change handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(() => {
      getEndpoint(app, { changeState });
      handler = app.get.args.find(
        args => args[0] === '/auth/state/:stateId'
      )[1];
    });

    handlerTest.test(
      'denies if user does not have state to switch to',
      async validTest => {
        await handler(
          {
            user: {
              states: ['md']
            },
            params: {
              stateId: 'ak'
            }
          },
          res
        );

        validTest.ok(
          res.status.calledWith(403),
          'HTTP status is explicitly set'
        );
        validTest.ok(res.send.calledWith(), 'Body is empty');
      }
    );

    handlerTest.test(
      'calls ChangeState if the user has the state to switch to',
      async validTest => {
        const user = {
          states: { ak: 'approved', md: 'approved' }
        };

        changeState.withArgs(user, 'ak').resolves('JWT for AK');
        await handler(
          {
            user,
            params: {
              stateId: 'ak'
            }
          },
          res
        );

        validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
        validTest.ok(
          res.send.calledWith({ jwt: 'JWT for AK' }),
          'body is the result of changeState'
        );
      }
    );
  });
});
