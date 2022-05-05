import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
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
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const utils = await act(async () =>
    renderWithConnection(<StandardsAndConditions {...defaultProps} {...props} />)
  );
  // await waitFor(() => screen.findByText(/Standards and Conditions/i));
  return utils;
};

describe('the StandardsAndConditions component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup();
    expect(
      screen.getById('standards-and-conditions-supports-field_ifr')
    ).toHaveValue(defaultProps.item.name);
  });
});
