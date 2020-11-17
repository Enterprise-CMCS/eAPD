const sinon = require('sinon');

const sandbox = sinon.createSandbox();
const oktaClient = {
  listUsers: sandbox.stub(),
  getUser: sandbox.stub()
};
const callOktaEndpoint = sandbox.stub();
const verifier = sandbox.stub();

const reset = () => {
  sandbox.resetBehavior();
  sandbox.resetHistory();
};

module.exports = {
  reset,
  oktaClient,
  callOktaEndpoint,
  verifier
};
