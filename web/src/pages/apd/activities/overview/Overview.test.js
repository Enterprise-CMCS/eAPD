import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor,
  fireEvent
} from 'apd-testing-library';

import { plain as ActivityOverview } from './Overview';

const defaultProps = {
  activity: {},
  activityIndex: 37,
  setAlternatives: jest.fn(),
  setDescription: jest.fn(),
  setOverview: jest.fn()
}

const setup = async (props = {}) => {
  const utils = await act(async () => 
    renderWithConnection(<ActivityOverview {...defaultProps} {...props} />)
  );
  await waitFor(() => screen.findByText(/Activity Overview/i));
  return utils;
};

describe('the ActivityOverview component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('it renders correctly', async () => {
    await setup();
  })
});
