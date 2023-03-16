import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import Router from 'react-router-dom';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import ApdViewOnly from './ApdReadOnly';

import apd from '../../fixtures/ak-apd.json';
import budget from '../../fixtures/ak-budget.json';
import mmisApd from '../../fixtures/ak-apd-mmis.json';
import mmisBudget from '../../fixtures/ak-budget-mmis.json';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

const setup = (props = {}, options = {}) => {
  jest.spyOn(Router, 'useParams').mockReturnValue({ apdId: 1 });
  const utils = renderWithConnection(<ApdViewOnly {...props} />, options);
  const user = userEvent.setup();
  return {
    utils,
    user
  };
};

jest.setTimeout(300000);
describe('<ApdViewOnly/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.setTimeout(30000);
    resetLDMocks();
    mockFlags({ enableMmis: true });
  });

  test('renders HITECH Read Only correctly', async () => {
    setup(null, {
      initialState: {
        ...apd,
        ...budget
      },
      initialHistory: ['/apd/1']
    });
    expect(await screen.getByText('HITECH IAPD')).toBeTruthy();
    expect(await screen.getByText('2020-2021 APD')).toBeTruthy();
    // Overview Summary
    expect(await screen.getByText(/Program introduction/)).toBeTruthy();
    expect(screen.queryByText(/Medicaid Business Areas/)).toBeFalsy();
    // Security Planning should not be present
    expect(screen.queryByText(/Security Planning/)).toBeFalsy();
  });

  test('renders MMIS Read Only correctly', async () => {
    mockFlags({ enableMmis: true });
    setup(null, {
      initialState: {
        ...mmisApd,
        ...mmisBudget
      },
      initialHistory: ['/apd/1']
    });
    expect(screen.getByTestId('apdName')).toHaveTextContent(
      'MMIS IAPD for Alaska'
    );
    expect(await screen.getByText('2023-2024 APD')).toBeTruthy();
    // Overview Summary
    expect(screen.queryByText(/Program introduction/)).toBeFalsy();
    expect(await screen.getByText(/Medicaid Business Areas/)).toBeTruthy();
    // Security Planning should not be present
    expect(await screen.getByText(/Security Planning/)).toBeTruthy();
  });

  test('Back to APD button', async () => {
    const { user } = setup(null, {
      initialState: {
        ...apd,
        ...budget
      },
      initialHistory: ['/apd/1']
    });

    await user.click(screen.getByRole('button', { name: '< Back to APD' }));
    expect(history.length).toEqual(1);
  });

  test('correct path with no apd preloaded', () => {
    setup(null, {
      initialHistory: ['/apd/1']
    });

    expect(screen.getByText('Loading your APD')).toBeTruthy();
  });

  test('Loads with apd but no budget', () => {
    setup(null, {
      initialState: {
        ...apd
      },
      initialHistory: ['/apd/1']
    });
  });
});
