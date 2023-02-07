import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';
import mmisApd from '../../../fixtures/ak-apd-mmis.json';
import mmisBudget from '../../../fixtures/ak-budget-mmis.json';

import SummaryKeyStatePersonnel from './SummaryKeyStatePersonnel';

const mmisApdProp = {
  initialState: {
    ...mmisApd,
    ...mmisBudget
  }
};

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<SummaryKeyStatePersonnel {...props} />, options);
};

describe('<SummaryKeyStatePersonnel />', () => {
  it('renders correctly', async () => {
    setup({ ffy: '2023' }, mmisApdProp);

    expect(
      screen.getByRole('row', {
        name: `${mmisApd.apd.data.name} Personnel Cost × FTE x Medicaid Share (%) Total cost`
      })
    );

    expect(
      screen.getByRole('rowheader', {
        name: `Key State Personnel`
      })
    );

    expect(
      screen.getByRole('cell', {
        name: `Key Personnel Subtotal`
      })
    );
  });
});
