import tap from 'tap';
import { stub, match } from 'sinon';
import getEndpoint from './get.js';
import mockExpress from '../../../util/mockExpress.js';
import mockResponse from '../../../util/mockResponse.js';

let app;
let res;
let changeState;

tap.test('auth roles GET endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    changeState = stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/auth/state/:stateId', match.func),
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
              stateId: 'na'
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

        changeState.withArgs(user, 'na').resolves('JWT for AK');
        await handler(
          {
            user,
            params: {
              stateId: 'na'
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
