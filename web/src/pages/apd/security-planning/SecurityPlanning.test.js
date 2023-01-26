import React from 'react';
import { renderWithConnection, screen, fireEvent } from 'apd-testing-library';

import SecurityPlanning from './SecurityPlanning';

const initialState = {
  apd: {
    data: {
      apdType: 'MMIS',
      securityPlanning: {
        securityAndInterfacePlan: 'This is the security and interface plan',
        businessContinuityAndDisasterRecovery:
          'Come on and slam and welcome to the jam'
      },
      activities: []
    }
  }
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(<SecurityPlanning {...props} />, options);

describe('<Security Planning />', () => {
  it('should render correctly', () => {
    setup({}, { initialState });
  });

  it.only('should load existing data', () => {
    setup({}, { initialState });
    screen.getByLabelText('Security and Interface Plan');
  });
});
