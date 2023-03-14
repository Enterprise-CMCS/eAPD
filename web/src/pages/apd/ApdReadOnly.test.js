import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import Router from 'react-router-dom';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import ApdViewOnly from './ApdReadOnly';

import apd from '../../fixtures/ak-apd.json';
import budget from '../../fixtures/ak-budget.json';

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
  });

  test('renders correctly and tests Back to APD button', async () => {
    const { user } = setup(null, {
      initialState: {
        ...apd,
        ...budget
      },
      initialHistory: ['/apd/1']
    });
    expect(await screen.findByText('HITECH IAPD')).toBeTruthy();
    expect(await screen.findByText('2020-2021 APD')).toBeTruthy();

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
