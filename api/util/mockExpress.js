/* eslint-disable import/no-extraneous-dependencies */
import { stub } from 'sinon';

const mockExpress = () => ({
  get: stub(),
  post: stub(),
  put: stub(),
  patch: stub(),
  delete: stub()
});

export default mockExpress;
