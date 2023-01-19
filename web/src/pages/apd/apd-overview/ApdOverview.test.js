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
  jest.setTimeout(150000);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.setTimeout(30000);
    resetLDMocks();
  });

  test('dispatches on text change', async () => {
    mockFlags({ enableMmis: false });
    jest.setTimeout(30000);
    const { user } = await setup();

    await user.type(screen.getByLabelText('Introduction'), 'it is really cool');
    expect(screen.getByLabelText('Introduction')).toHaveValue(
      'it is really cool'
    );
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
    jest.setTimeout(50000);
    mockFlags({ enableMmis: false });
    const { user } = await setup();
    expect(screen.getByLabelText('2023')).toBeChecked();
    await user.click(screen.getByLabelText('2023'));

    await screen.findByRole('alertdialog');
    await user.click(screen.getByRole('button', { name: 'Delete FFY' }));

    expect(screen.getByLabelText('2023')).not.toBeChecked();
  });
});
