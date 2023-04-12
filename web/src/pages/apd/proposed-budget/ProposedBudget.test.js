import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';
import apd from '../../../fixtures/ak-apd.json';
import budget from '../../../fixtures/ak-budget.json';
import mmisApd from '../../../fixtures/ak-apd-mmis.json';
import mmisBudget from '../../../fixtures/ak-budget-mmis.json';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import { APD_TYPE } from '@cms-eapd/common';

import ProposedBudget from './ProposedBudget';

const hitechApd = {
  initialState: {
    ...apd,
    ...budget
  }
};

const mmisApdProp = {
  apdType: APD_TYPE.MMIS,
  initialState: {
    ...mmisApd,
    ...mmisBudget
  }
};

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<ProposedBudget {...props} />, options);
};

describe('<ProposedBudget />', () => {
  beforeEach(() => {
    // reset before each test case
    resetLDMocks();
    mockFlags({ emptyBudgetWording: false });
  });

  it('renders correctly for hitech apds', async () => {
    setup({}, hitechApd);

    await waitFor(() => {
      expect(screen.getAllByRole('table')).toHaveLength(32);
    });

    expect(screen.getByRole('heading', { name: 'Proposed Budget' }));
    expect(screen.getByRole('heading', { name: 'Combined Activity Costs' }));
    expect(screen.getByRole('heading', { name: 'Summary Budget Table' }));
    expect(screen.getByRole('heading', { name: 'Quarterly Federal Share' }));
    expect(
      screen.getByRole('heading', {
        name: 'Estimated Quarterly Incentive Payments'
      })
    );
  });

  it('renders correctly for mmis apds', () => {
    setup({}, mmisApdProp);

    expect(screen.getByRole('heading', { name: 'Proposed Budget' }));
    expect(screen.getByRole('heading', { name: 'Combined Activity Costs' }));
    expect(screen.getByRole('heading', { name: 'Summary Budget Table' }));

    // MMIS apds should *not* render quarterly federal share or est. quarterly incentive payments
    expect(
      screen.queryByRole('heading', { name: 'Quarterly Federal Share' })
    ).toBeNull();

    expect(
      screen.queryByRole('heading', {
        name: 'Estimated Quarterly Incentive Payments'
      })
    ).toBeNull();
  });
});
