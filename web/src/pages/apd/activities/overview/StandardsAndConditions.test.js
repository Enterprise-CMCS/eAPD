import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor,
  fireEvent
} from 'apd-testing-library';

import { plain as StandardsAndConditions } from './StandardsAndConditions';

const defaultProps = {
  activity: {
    standardsAndConditions: {
      doesNotSupport: 'does not support',
      supports: 'support'
    }
  },
  activityIndex: 7,
  setDoesNotSupport: jest.fn(),
  setSupport: jest.fn()
};

const setup = async (props = {}) => {
  const utils = await act(async () =>
    renderWithConnection(<StandardsAndConditions {...defaultProps} {...props} />)
  );
  await waitFor(() => screen.findByText(/Standards and Conditions/i));
  return utils;
};

describe('the StandardsAndConditions component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup();
    expect(
      screen.getByLabelText(/Standards and Conditions/i)
    ).toHaveValue(defaultProps.item.supports);
  });
});
