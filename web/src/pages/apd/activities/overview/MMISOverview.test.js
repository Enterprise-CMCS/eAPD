import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';

import MMISOverview from './MMISOverview';

const initialState = {
  apd: {
    adminCheck: {
      enabled: false
    },
    data: {
      activities: [
        {
          name: 'Activity 1',
          activityOverview: {
            activitySnapshot: 'This is a snapshot',
            problemStatement: 'This is a problem statement',
            proposedSolution: 'This is a proposed solution'
          }
        }
      ]
    }
  }
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(<MMISOverview {...props} />, options);

describe('<MMISOverview />', () => {
  describe('existing activity', () => {
    it('displays data from existing activity', async () => {
      setup(
        {
          activityIndex: 0
        },
        {
          initialState
        }
      );

      await waitFor(() => {
        expect(screen.getByLabelText('Activity name')).toHaveValue(
          'Activity 1'
        );
      });

      expect(screen.getByLabelText('Activity Snapshot')).toHaveValue(
        'This is a snapshot'
      );

      expect(screen.getByLabelText('Problem Statement')).toHaveValue(
        'This is a problem statement'
      );

      expect(screen.getByLabelText('Proposed Solution')).toHaveValue(
        'This is a proposed solution'
      );
    });
  });
});
