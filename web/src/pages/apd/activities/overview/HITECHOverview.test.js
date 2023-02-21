import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';

import HITECHOverview from './HITECHOverview';

const initialState = {
  apd: {
    adminCheck: {
      enabled: false
    },
    data: {
      activities: [
        {
          name: 'Our Flag Means Death',
          fundingSource: 'HBO',
          activityOverview: {
            alternatives: 'Pirates of the Caribbean is also a Pirate movie.',
            description:
              'Set in the early 1700s during the Golden Age of Piracy, the series follows the misadventures of aristocrat-turned-pirate Stede Bonnet and his crew aboard the Revenge as they try to make a name for themselves as pirates. The crew crosses paths with famed pirate captain Blackbeard and his right-hand-man Izzy Hands.',
            summary:
              'Our Flag Means Death is an American period romantic comedy television series created by David Jenkins.'
          }
        }
      ]
    }
  }
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(<HITECHOverview {...props} />, options);

describe('<HITECHOverview />', () => {
  describe('existing Activity', () => {
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
        expect(
          screen.getByLabelText(/Provide a short overview of the activity/)
        ).toHaveValue(
          'Our Flag Means Death is an American period romantic comedy television series created by David Jenkins.'
        );
      });

      expect(
        screen.getByLabelText(
          'Include as much detail as is necessary to explain the activity.'
        )
      ).toHaveValue(
        'Set in the early 1700s during the Golden Age of Piracy, the series follows the misadventures of aristocrat-turned-pirate Stede Bonnet and his crew aboard the Revenge as they try to make a name for themselves as pirates. The crew crosses paths with famed pirate captain Blackbeard and his right-hand-man Izzy Hands.'
      );

      expect(
        screen.getByLabelText(
          'Statement of alternative considerations and supporting justification'
        )
      ).toHaveValue('Pirates of the Caribbean is also a Pirate movie.');
    });
  });
});
