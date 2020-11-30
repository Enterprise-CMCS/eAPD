/* eslint-disable import/no-extraneous-dependencies */
const sinon = require('sinon');

const mockExpress = () => ({
  get: sinon.stub(),
  post: sinon.stub(),
  put: sinon.stub(),
  patch: sinon.stub(),
  delete: sinon.stub()
});

module.exports = mockExpress;
