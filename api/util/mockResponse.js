/* eslint-disable import/no-extraneous-dependencies */
import { stub } from 'sinon';

// https://codewithhugo.com/express-request-response-mocking/#mockingstubbing-res-a-simple-express-response-with-sinon
const mockResponse = () => {
  const res = {};
  res.headersSent = false;
  res.status = stub().returns(res);
  res.send = stub().returns(res);
  res.json = stub().returns(res);
  res.end = stub();
  res.setHeader = stub();
  res.clearCookie = stub();
  return res;
};

export default mockResponse;
