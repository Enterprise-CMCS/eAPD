const tap = require('tap');
const sinon = require('sinon');

const loggedIn = require('../../middleware').loggedIn;
const getEndpoint = require('./get');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');

let app;
let res;

tap.test('me GET endpoint', async endpointTest => {

  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);


    setupTest.ok(
      app.get.calledWith('/me', loggedIn, sinon.match.func),
      'me GET endpoint is registered'
    );
  });

  endpointTest.test('get me users handler', async test => {
    const updateFromOkta = sinon.stub()
    getEndpoint(app, {updateFromOkta});
    const meHandler = app.get.args.filter(arg => arg[0] === '/me')[0][2];
    await meHandler({ user: {id: 123, message: 'this is the user' }}, res);

    test.ok(
      res.send.calledWith({id: 123, message: 'this is the user' }),
      'sends back the user object'
    );

    test.ok(
      updateFromOkta.calledWith(123)
    )
  });
});
