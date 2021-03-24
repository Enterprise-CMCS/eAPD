/* eslint-disable import/no-extraneous-dependencies */
const sinon = require('sinon');

// https://codewithhugo.com/express-request-response-mocking/#mockingstubbing-res-a-simple-express-response-with-sinon
const mockResponse = () => {
  const res = {};
  res.headersSent = false;
  res.setHeader = sinon.stub();
  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  res.end = sinon.stub();
  res.clearCookie = sinon.stub();
  return res;
};

module.exports = mockResponse;
