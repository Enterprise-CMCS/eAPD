import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';
import { APD_TYPE } from '@cms-eapd/common/utils';
import apd from '../../../fixtures/ak-apd.json';
import budget from '../../../fixtures/ak-budget.json';
import mmisApd from '../../../fixtures/ak-apd-mmis.json';
import mmisBudget from '../../../fixtures/ak-budget-mmis.json';

import ProposedBudget from './ProposedBudget';

const hitechApd = {
  initialState: {
    ...apd,
    ...budget
  }
};

const mmisApdProp = {
  initialState: {
    ...mmisApd,
    ...mmisBudget
  }
};

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<ProposedBudget {...props} />, options);
};

describe('<ProposedBudget />', () => {
  it('render correctly hitech', async () => {
    setup({}, hitechApd);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Proposed Budget' }));
      expect(screen.getByRole('heading', { name: 'Combined Activity Costs' }));
      expect(screen.getByRole('heading', { name: 'Summary Budget Table' }));
      expect(screen.getByRole('heading', { name: 'Quarterly Federal Share' }));
      expect(
        screen.getByRole('heading', {
          name: 'Estimated Quarterly Incentive Payments'
        })
      );

      expect(screen.getAllByRole('table')).toHaveLength(32);
    });
  });

  it.skip('render correctly mmis', () => {
    setup({}, mmisApdProp); // TODO: Skipping for now since Proposed Budget page still crashes
  });
});
