import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import ApdViewOnly from './ApdReadOnly';

import apd from '../../fixtures/ak-apd.json';
import budget from '../../fixtures/ak-budget.json';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ apdId: 1 })
}));

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<ApdViewOnly {...props} />, options);
};

describe('<ApdViewOnly/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and tests Back to APD button', () => {
    setup(null, {
      initialState: {
        ...apd,
        ...budget
      },
      initialHistory: ['/apd/1']
    });
    expect(screen.getByText('HITECH IAPD')).toBeTruthy();
    expect(screen.getByText('2020-2021 APD')).toBeTruthy();

    userEvent.click(screen.getByRole('button', { name: '< Back to APD' }));
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
