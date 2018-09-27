const tap = require('tap');
const sinon = require('sinon');

const versions = require('./index');

tap.test('versions endpoint setup', async endpointTest => {
  const app = {};
  const delEndpoint = sinon.spy();
  const postEndpoint = sinon.spy();

  versions(app, { delEndpoint, postEndpoint });

  endpointTest.ok(
    delEndpoint.calledWith(app),
    'versions DELETE endpoint is setup with the app'
  );
  endpointTest.ok(
    postEndpoint.calledWith(app),
    'versions POST endpoint is setup with the app'
  );
});
