import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor,
  fireEvent
} from 'apd-testing-library';

import { plain as StandardsAndConditions } from './StandardsAndConditions';

const defaultProps = {
  activity: {
    activityOverview: {
      description: 'description',
      standardsAndConditions: {
        doesNotSupport: 'does not support',
        supports: 'support'
      }
    }
  },
  activityIndex: 7,
  setDoesNotSupport: jest.fn(),
  setSupport: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const utils = await act(async () =>
    renderWithConnection(
      <StandardsAndConditions {...defaultProps} {...props} />
    )
  );
  return utils;
};

describe('the StandardsAndConditions component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup();
    await waitFor(() => {
      expect(screen.getByLabelText('Standards and Conditions')).toHaveValue(
        defaultProps.activity.activityOverview.standardsAndConditions.supports
      );
    });

    fireEvent.blur(screen.getByLabelText('Standards and Conditions'));
  });
});
