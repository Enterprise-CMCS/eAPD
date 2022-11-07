import React from 'react';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import ApdNew from './ApdNew';

jest.mock('../../../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

const setup = async (props = {}, options = {}) => {
  return renderWithConnection(<ApdNew {...props} />, options);
};

describe('<ApdNew />', () => {
  describe('loads successfully', () => {});
});
