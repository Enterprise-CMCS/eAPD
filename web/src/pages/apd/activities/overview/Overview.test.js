import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';

import { plain as ActivityOverview } from './Overview'

const defaultProps = {
  activityIndex: 37,
  activity: {
    alternatives: 'Pirates of the Caribbean is also a Pirate movie.',
    description: 'Set in the early 1700s during the Golden Age of Piracy, the series follows the misadventures of aristocrat-turned-pirate Stede Bonnet and his crew aboard the Revenge as they try to make a name for themselves as pirates. The crew crosses paths with famed pirate captain Blackbeard and his right-hand-man Izzy Hands.',
    summary: 'Our Flag Means Death is an American period romantic comedy television series created by David Jenkins.'
  },
  setAlternatives: jest.fn(),
  setDescription: jest.fn(),
  setOverview: jest.fn()
}

const setup = async (props = {}) => {
  console.log(defaultProps.activity)

  // eslint-disable-next-line testing-library/no-unnecessary-act
  const utils = await act(async () =>
    renderWithConnection(<ActivityOverview {...defaultProps} {...props} />)
  );
  return utils;
};

describe('the Overview component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup();
    await waitFor(() => {
      expect(
        screen.getByLabelText(
          'Provide a short overview of the activity.'
        )
      ).toHaveValue(defaultProps.activity.summary);
    })
    await waitFor(() => {
      expect(
        screen.getByLabelText(
          'Include as much detail as is necessary to explain the activity.'
        )
      ).toHaveValue(defaultProps.activity.description);
    })
    // await waitFor(() => {
    //   expect(
    //     screen.getByLabelText(
    //       'Provide a short overview of the activity.'
    //     )
    //   ).toHaveValue(defaultProps.activity.alternatives);
    // })
  });
});
