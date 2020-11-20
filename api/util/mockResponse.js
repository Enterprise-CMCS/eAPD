const sinon = require('sinon');

const mockResponse = () => {
  const res = {};

  res.headersSent = false;

  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  res.end = sinon.stub();

  return res;
};

module.exports = mockResponse;
