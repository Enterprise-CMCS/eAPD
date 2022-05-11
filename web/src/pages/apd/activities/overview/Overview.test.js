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
    alternatives: 'alternatives',
    summary: 'summary',
    description: 'description'
  },
  description: 'description',
  summary: 'summary',
  setAlternatives: jest.fn(),
  setDescription: jest.fn(),
  setOverview: jest.fn()
}

const setup = async (props = {}) => {
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
    await waitFor(() => {
      expect(
        screen.getByLabelText(
          'Provide a short overview of the activity.'
        )
      ).toHaveValue(defaultProps.activity.alternatives);
    })
  });
});
