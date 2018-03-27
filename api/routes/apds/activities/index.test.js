const tap = require('tap');
const sinon = require('sinon');

const apdsIndex = require('./index');

tap.test('apd activities endpoint setup', async endpointTest => {
  const app = {};
  const postEndpoint = sinon.spy();
  const putEndpoint = sinon.spy();
  const approachesEndpoint = sinon.spy();
  const goalsEndpoint = sinon.spy();
  const expensesEndpoints = sinon.spy();

  apdsIndex(
    app,
    postEndpoint,
    putEndpoint,
    approachesEndpoint,
    expensesEndpoints,
    goalsEndpoint
  );

  endpointTest.ok(
    postEndpoint.calledWith(app),
    'apd activity POST endpoint is setup with the app'
  );
  endpointTest.ok(
    putEndpoint.calledWith(app),
    'apd activity PUT endpoint is setup with the app'
  );
  endpointTest.ok(
    approachesEndpoint.calledWith(app),
    'apd activity approaches endpoint is setup with the app'
  );
  endpointTest.ok(
    expensesEndpoints.calledWith(app),
    'apd activity expenses endpoints are setup with the app'
  );
  endpointTest.ok(
    goalsEndpoint.calledWith(app),
    'apd activity goals endpoints are setup with the app'
  );
});
