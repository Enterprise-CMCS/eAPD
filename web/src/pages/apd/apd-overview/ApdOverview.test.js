import React from 'react';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as ApdOverview } from './ApdOverview';

jest.mock('../../../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

const defaultProps = {
  addApdYear: jest.fn(),
  name: 'apd #1',
  narrativeHIE: 'narrative HIE',
  narrativeHIT: 'narrative HIT',
  narrativeMMIS: 'narrative MMIS',
  programOverview: '',
  removeApdYear: jest.fn(),
  setHIE: jest.fn(),
  setHIT: jest.fn(),
  setMMIS: jest.fn(),
  setName: jest.fn(),
  setOverview: jest.fn(),
  years: ['2022', '2023'],
  yearOptions: ['2022', '2023', '2024']
};

const setup = async (props = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(<ApdOverview {...defaultProps} {...props} />, {
      initialState: {
        apd: {
          data: {
            activities: []
          }
        }
      }
    });
  });
  const user = userEvent.setup();
  return {
    util,
    user
  };
};

describe('APD overview component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.setTimeout(30000);
  });

  test('dispatches on text change', async () => {
    jest.setTimeout(30000);
    const { user } = await setup();

    await user.type(screen.getByLabelText('Introduction'), 'it is really cool');
    expect(screen.getByLabelText('Introduction')).toHaveValue(
      'it is really cool'
    );
  });

  test('user can add a year', async () => {
    const { user } = await setup();
    expect(screen.getByLabelText('2022')).toBeChecked();
    expect(screen.getByLabelText('2023')).toBeChecked();
    expect(screen.getByLabelText('2024')).not.toBeChecked();

    await user.click(screen.getByLabelText('2024'));
    expect(screen.getByLabelText('2024')).toBeChecked();
  });

  test('user can attempt to delete a year and cancel', async () => {
    jest.setTimeout(30000);
    const { user } = await setup();
    expect(screen.getByLabelText('2022')).toBeChecked();
    await user.click(screen.getByLabelText('2022'));

    await screen.findByRole('alertdialog');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText('2022')).toBeChecked();
  });

  test('user can delete a year', async () => {
    jest.setTimeout(30000);
    const { user } = await setup();
    expect(screen.getByLabelText('2022')).toBeChecked();
    await user.click(screen.getByLabelText('2022'));

    await screen.findByRole('alertdialog');
    await user.click(screen.getByRole('button', { name: 'Delete FFY' }));

    expect(screen.getByLabelText('2022')).not.toBeChecked();
  });
});
