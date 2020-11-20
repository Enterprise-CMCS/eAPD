const sinon = require('sinon');

// https://codewithhugo.com/express-request-response-mocking/#mockingstubbing-res-a-simple-express-response-with-sinon

const mockResponse = () => {
  const res = {};

  res.headersSent = false;

  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  res.end = sinon.stub();

  return res;
};

module.exports = mockResponse;
