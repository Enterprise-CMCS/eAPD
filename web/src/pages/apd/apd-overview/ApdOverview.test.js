import React from 'react';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

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
  removeApdYear: jest.fn(),
  setName: jest.fn(),
  years: ['2023', '2024'],
  yearOptions: ['2023', '2024', '2025']
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
    resetLDMocks();
  });

  test('user can add a year', async () => {
    mockFlags({ enableMmis: false });
    const { user } = await setup();
    expect(screen.getByLabelText('2023')).toBeChecked();
    expect(screen.getByLabelText('2024')).toBeChecked();
    expect(screen.getByLabelText('2025')).not.toBeChecked();

    await user.click(screen.getByLabelText('2025'));
    expect(screen.getByLabelText('2025')).toBeChecked();
  });

  test('user can attempt to delete a year and cancel', async () => {
    mockFlags({ enableMmis: false });
    jest.setTimeout(30000);
    const { user } = await setup();
    expect(screen.getByLabelText('2023')).toBeChecked();
    await user.click(screen.getByLabelText('2023'));

    await screen.findByRole('alertdialog');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText('2023')).toBeChecked();
  });

  test('user can delete a year', async () => {
    mockFlags({ enableMmis: false });
    jest.setTimeout(30000);
    const { user } = await setup();
    expect(screen.getByLabelText('2023')).toBeChecked();
    await user.click(screen.getByLabelText('2023'));

    await screen.findByRole('alertdialog');
    await user.click(screen.getByRole('button', { name: 'Delete FFY' }));

    expect(screen.getByLabelText('2023')).not.toBeChecked();
  });
});
