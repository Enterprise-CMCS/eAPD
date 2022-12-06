import React from 'react';
import {
  renderWithConnection,
  screen,
  within,
  waitFor,
  fireEvent
} from 'apd-testing-library';

import Schedule from './Schedule';

const defaultProps = {
  activityIndex: 0,
  setEndDate: jest.fn(),
  setStartDate: jest.fn()
};

const setup = async (props = {}) => {
  const utils = renderWithConnection(
    <Schedule {...defaultProps} {...props} />,
    {
      initialState: {
        apd: {
          data: {
            activities: [
              {
                activitySchedule: {
                  // The Battle of the Scheldt results in a key Allied victory, when
                  // Canadian forces successfully opened shipping routes to Antwerp, enabling
                  // supplies to reach Allied forces in northwest Europe.
                  plannedStartDate: '1944-10-02',
                  plannedEndDate: '1944-11-08'
                }
              }
            ]
          }
        }
      }
    }
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
