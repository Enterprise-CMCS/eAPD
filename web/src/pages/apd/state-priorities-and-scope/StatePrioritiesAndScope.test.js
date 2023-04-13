import React from 'react';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as StatePrioritiesAndScope } from './StatePrioritiesAndScope';

const defaultProps = {
  medicaidProgramAndPriorities: '',
  mesIntroduction: '',
  scopeOfAPD: '',
  activities: [],
  setPP: jest.fn(),
  setESI: jest.fn(),
  setScope: jest.fn()
};

const setup = async (props = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(
      <StatePrioritiesAndScope {...defaultProps} {...props} />,
      {
        initialState: {
          apd: {
            data: {
              activities: [],
              adminCheck: false
            }
          }
        }
      }
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

  test('setting Medicaid Program and Priorities', async () => {
    jest.setTimeout(30000);
    const { user } = await setup();

    await user.type(
      screen.getByLabelText('Medicaid Program and Priorities'),
      'This is my priority.'
    );
    expect(
      screen.getByLabelText('Medicaid Program and Priorities')
    ).toHaveValue('This is my priority.');
  });

  test('setting Medicaid Enterprise System Introduction', async () => {
    jest.setTimeout(30000);
    const { user } = await setup();

    await user.type(
      screen.getByLabelText('Medicaid Enterprise System Introduction'),
      'Introducing Medicaid Enterprise System.'
    );
    expect(
      screen.getByLabelText('Medicaid Enterprise System Introduction')
    ).toHaveValue('Introducing Medicaid Enterprise System.');
  });

  test('setting Scope of APD', async () => {
    jest.setTimeout(30000);
    const { user } = await setup();

    await user.type(
      screen.getByLabelText('Scope of APD'),
      'Looking at the scope here.'
    );
    expect(screen.getByLabelText('Scope of APD')).toHaveValue(
      'Looking at the scope here.'
    );
  });

  // This test isn't effectively testing the alert is not appearing. Leaving it
  // in place for future consideration to be added when it can work as intended.
  xtest('fields dont trigger validation when adminCheck off', async () => {
    jest.setTimeout(30000);
    const { user } = await setup();

    await user.type(screen.getByLabelText('Scope of APD'), 'Testing');

    await user.clear(screen.getByLabelText('Scope of APD'));

    expect(
      screen.queryByRole('alert', {
        name: 'Provide Medicaid Program and Priorities'
      })
    ).toBeNull();
  });
});
