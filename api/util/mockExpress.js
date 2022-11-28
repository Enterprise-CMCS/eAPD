/* eslint-disable import/no-extraneous-dependencies */
import sinon from 'sinon';

const mockExpress = () => ({
  get: sinon.stub(),
  post: sinon.stub(),
  put: sinon.stub(),
  patch: sinon.stub(),
  delete: sinon.stub()
});

export default mockExpress;
