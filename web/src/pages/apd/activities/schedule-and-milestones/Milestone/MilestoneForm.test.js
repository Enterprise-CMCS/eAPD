import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as MilestoneForm } from './MilestoneForm';

const defaultProps = {
  activityIndex: 42,
  index: 1,
  item: {
    // On 1 September 1939, Germany invaded Poland after having staged
    // several false flag border incidents as a pretext to initiate the
    // invasion.
    endDate: '1939-9-01',
    milestone: 'Milestone name'
  },
  saveMilestone: jest.fn(),
  setFormValid: jest.fn()
};

const setup = async (props = {}) => {
  let utils;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    utils = renderWithConnection(
      <MilestoneForm {...defaultProps} {...props} />
    );
  });
  const user = userEvent.setup();
  return {
    utils,
    user
  };
};

const verifyDateField = (text, expectValue) => {
  const fieldset = within(screen.getByText(text).closest('fieldset')); // eslint-disable-line testing-library/no-node-access
  expect(fieldset.getByLabelText('Month')).toHaveValue(expectValue.month);
  expect(fieldset.getByLabelText('Day')).toHaveValue(expectValue.day);
  expect(fieldset.getByLabelText('Year')).toHaveValue(expectValue.year);
};

describe('the ContractorResourceForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly with default props', async () => {
    await setup();
    expect(screen.getByLabelText(/Name/i)).toHaveValue(
      defaultProps.item.milestone
    );
    verifyDateField('Target completion date', {
      month: '9',
      day: '1',
      year: '1939'
    });
  });

  test('renders error when no name is provided', async () => {
    const { user } = await setup({});

    const input = screen.getByLabelText(/Name/i);

    await user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    await user.tab();

    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText(/Milestone is required./i);
    expect(error).toBeInTheDocument();
  });

  test('renders error when no date is provided', async () => {
    const { user } = await setup({});

    // start date - month, day, year
    const endFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Target completion date/i).closest('fieldset')
    );

    // first tab to skip over the name
    await user.tab();

    await user.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Month')).toHaveFocus();
    });
    await user.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Day')).toHaveFocus();
    });
    await user.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Year')).toHaveFocus();
    });
    await user.tab();

    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByRole(
      'alert',
      'Provide a completion date.'
    );
    expect(error).toBeInTheDocument();
  });
});
