import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';

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

  it('should load existing data', async () => {
    setup({}, { initialState });

    await waitFor(() => {
      expect(screen.getByLabelText('Security and Interface Plan')).toHaveValue(
        'This is the security and interface plan'
      );
    });

    expect(
      screen.getByLabelText('Business Continuity and Disaaster Recovery Plan')
    ).toHaveValue('Come on and slam and welcome to the jam');
  });
});
