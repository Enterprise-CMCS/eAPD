import React from 'react';
import {
  renderWithConnection,
  act,
  screen
} from '../../../shared/apd-testing-library';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import ApdNew from './ApdNew';

const setup = async (props = {}, options = {}) => {
  return renderWithConnection(<ApdNew {...props} />, options);
};

describe('<ApdNew />', () => {
  describe('loads successfully', () => {});
});
