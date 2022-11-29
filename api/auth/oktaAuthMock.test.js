import { createSandbox } from 'sinon';

const sandbox = createSandbox();
const oktaClient = {
  listUsers: sandbox.stub(),
  getUser: sandbox.stub()
};
const verifier = sandbox.stub();

const reset = () => {
  sandbox.resetBehavior();
  sandbox.resetHistory();
};

export default {
  reset,
  oktaClient,
  verifier
};
