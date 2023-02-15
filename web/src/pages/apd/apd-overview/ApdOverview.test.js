import React from 'react';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import { APD_TYPE } from '@cms-eapd/common';
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
            apdOverview: {
              updateStatus: {
                isUpdateAPD: true,
                annualUpdate: true,
                asNeededUpdate: false
              }
            },
            activities: [],
            apdType: APD_TYPE.MMIS
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
  jest.setTimeout(150000);
  beforeEach(() => {
    jest.resetAllMocks();
    resetLDMocks();
  });

  test('displays APD name', async () => {
    mockFlags({ enableMmis: false });
    await setup();
    expect(screen.getByLabelText('APD Name')).toHaveValue(defaultProps.name);
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
    jest.setTimeout(50000);
    mockFlags({ enableMmis: false });

    const { user } = await setup();
    expect(screen.getByLabelText('2023')).toBeChecked();
    await user.click(screen.getByLabelText('2023'));

    await screen.findByRole('alertdialog');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText('2023')).toBeChecked();
  });

  test('user can delete a year', async () => {
    jest.setTimeout(30000);
    mockFlags({ enableMmis: false });
    const { user } = await setup();
    expect(screen.getByLabelText('2023')).toBeChecked();
    await user.click(screen.getByLabelText('2023'));

    await screen.findByRole('alertdialog');
    await user.click(screen.getByRole('button', { name: 'Delete FFY' }));

    expect(screen.getByLabelText('2023')).not.toBeChecked();
  });
});
