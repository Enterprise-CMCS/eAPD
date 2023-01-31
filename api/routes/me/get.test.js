import tap from 'tap';
import { stub, match } from 'sinon';
import getEndpoint from './get.js';
import mockExpress from '../../util/mockExpress.js';
import mockResponse from '../../util/mockResponse.js';

let app;
let res;
let next;
const req = { jwt: 'aaaa.bbbb.cccc' };
const user = { uid: 1234, state: { id: 'ak' } };
const claims = { id: 123, claims: 'this is a claim' };

tap.test('me GET endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/me', match.func),
      'me GET endpoint is registered'
    );
  });

  endpointTest.test('get me handler', async test => {
    const updateUserToken = stub();

    updateUserToken.withArgs(req).resolves(claims);

    getEndpoint(app, {
      tokenUpdater: updateUserToken
    });
    const meHandler = app.get.args.filter(arg => arg[0] === '/me')[0][1];

    await meHandler(req, res, next);

    test.ok(res.send.calledWith(claims), 'sends back the claims object');
  });

  endpointTest.test(
    "get me handler returns 401 if it can't extract a token ",
    async test => {
      const updateUserToken = stub();

      updateUserToken.withArgs(req).returns(null);

      getEndpoint(app, { tokenUpdater: updateUserToken });
      const meHandler = app.get.args.filter(arg => arg[0] === '/me')[0][1];

      await meHandler(req, res, next);

      test.ok(res.status.calledWith(401), 'returns a 401 status code');
    }
  );

  endpointTest.test(
    'get me handler returns 400 if the verifier throws an error ',
    async test => {
      const updateUserToken = stub();
      const error = new Error('some error');

      updateUserToken.withArgs(req).throws(error);

      getEndpoint(app, { tokenUpdater: updateUserToken });
      const meHandler = app.get.args.filter(arg => arg[0] === '/me')[0][1];

      await meHandler(req, res, next);

      test.ok(next.calledWith(error), 'returns a call to next');
    }
  );

  endpointTest.test('get me/jwToken handler returns a token', async test => {
    const tokenExchanger = stub();

    tokenExchanger.withArgs(req).returns(user);

    getEndpoint(app, { tokenExchanger });
    const meHandler = app.get.args.filter(
      arg => arg[0] === '/me/jwToken'
    )[0][1];

    await meHandler(req, res, next);

    test.ok(res.send.calledWith(user), 'returns a user');
  });

  endpointTest.test(
    'get me/jwToken handler returns a 401 when it there is no user',
    async test => {
      const tokenExchanger = stub();

      tokenExchanger.withArgs(req).returns(null);

      getEndpoint(app, { tokenExchanger });
      const meHandler = app.get.args.filter(
        arg => arg[0] === '/me/jwToken'
      )[0][1];

      await meHandler(req, res, next);

      test.ok(
        res.status.calledWith(401),
        'returns 401 because there was no user'
      );
    }
  );

  endpointTest.test(
    'get me/jwToken handler returns a 400 when it there is no user',
    async test => {
      const tokenExchanger = stub();
      const error = new Error('some error');

      tokenExchanger.withArgs(req).throws(error);

      getEndpoint(app, { tokenExchanger });
      const meHandler = app.get.args.filter(
        arg => arg[0] === '/me/jwToken'
      )[0][1];

      await meHandler(req, res, next);

      test.ok(
        tokenExchanger.calledWith(req),
        'calls the token exchanger with the request'
      );

      test.ok(next.calledWith(error), 'returns a call to next');
    }
  );
});
