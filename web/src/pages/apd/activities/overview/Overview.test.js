import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../../util/api';
import Overview from './Overview';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

const initialState = {
  apd: {
    data: {
      activities: [
        {
          name: 'Our Flag Means Death',
          fundingSource: 'HBO',
          alternatives: 'Pirates of the Caribbean is also a Pirate movie.',
          description:
            'Set in the early 1700s during the Golden Age of Piracy, the series follows the misadventures of aristocrat-turned-pirate Stede Bonnet and his crew aboard the Revenge as they try to make a name for themselves as pirates. The crew crosses paths with famed pirate captain Blackbeard and his right-hand-man Izzy Hands.',
          summary:
            'Our Flag Means Death is an American period romantic comedy television series created by David Jenkins.'
        }
      ]
    }
  }
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(<Overview {...props} />, options);

describe('<Overview />', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  describe('create new Activity', () => {
    it('on success, adds new Activity and switches to it', async () => {
      setup(
        {
          activityIndex: '0'
        },
        {
          initialState
        }
      );

      expect(
        screen.getByLabelText('Provide a short overview of the activity.')
      ).toHaveValue(
        'Our Flag Means Death is an American period romantic comedy television series created by David Jenkins.'
      );

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
