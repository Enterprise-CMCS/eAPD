import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor,
  fireEvent
} from 'apd-testing-library';

import { plain as Schedule } from './Schedule';

const defaultProps = {
  activity: {
    // The Battle of the Scheldt results in a key Allied victory, when
    // Canadian forces successfully opened shipping routes to Antwerp, enabling
    // supplies to reach Allied forces in northwest Europe.
    plannedEndDate: '1944-11-08',
    plannedStartDate: '1944-10-02'
  },
  activityIndex: 7,
  setEndDate: jest.fn(),
  setStartDate: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const utils = await act(async () =>
    renderWithConnection(<Schedule {...defaultProps} {...props} />)
  );
  await waitFor(() => screen.findByText(/Activity Schedule/i));
  return utils;
};

const verifyDateField = (text, expectValue) => {
  const fieldset = within(screen.getByText(text).closest('fieldset')); // eslint-disable-line testing-library/no-node-access
  expect(fieldset.getByLabelText('Month')).toHaveValue(expectValue.month);
  expect(fieldset.getByLabelText('Day')).toHaveValue(expectValue.day);
  expect(fieldset.getByLabelText('Year')).toHaveValue(expectValue.year);
  fireEvent.blur(screen.getByText(text).closest('fieldset')); // eslint-disable-line testing-library/no-node-access
};

describe('the Schedule component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('start date renders correctly', async () => {
    await setup();
    verifyDateField('Start date', {
      month: '10',
      day: '2',
      year: '1944'
    });
    verifyDateField('End date', {
      month: '11',
      day: '8',
      year: '1944'
    });
  });
});
