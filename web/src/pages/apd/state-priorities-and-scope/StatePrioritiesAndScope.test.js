import React from 'react';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as StatePrioritiesAndScope } from './StatePrioritiesAndScope';

const defaultProps = {
  medicaidProgramAndPriorities: '',
  mesIntroduction: '',
  scopeOfAPD: '',
  setPP: jest.fn(),
  setESI: jest.fn(),
  setScope: jest.fn()
};

const setup = async (props = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(
      <StatePrioritiesAndScope {...defaultProps} {...props} />
    );
  });

  const user = userEvent.setup();
  return {
    util,
    user
  };
};

describe('MMIS APD State Priorities and Scope', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.setTimeout(30000);
  });

  test('dispatches on text change', async () => {
    jest.setTimeout(30000);
    const { user } = await setup();

    await user.type(
      screen.getByTestId('medicaidProgramAndPriorities'),
      'This is my priority.'
    );
    expect(screen.getByTestId('medicaidProgramAndPriorities')).toHaveValue(
      'This is my priority.'
    );
  });
});
