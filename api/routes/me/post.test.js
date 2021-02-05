const tap = require('tap');
const sinon = require('sinon');

const postEndpoint = require('./post');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');

let app;
let res;

tap.test('logout POST endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app);

    setupTest.ok(
      app.post.calledWith('/logout', sinon.match.func),
      'logout POST endpoint is registered'
    );
  });

  endpointTest.test('post logout users handler', async test => {
    postEndpoint(app);
    const logoutHandler = app.post.args.filter(
      arg => arg[0] === '/logout'
    )[0][1];

    await logoutHandler({}, res);

    test.ok(
      res.clearCookie.calledWith('gov.cms.eapd.api-token'),
      'clears out the server cookie'
    );
  });
});
