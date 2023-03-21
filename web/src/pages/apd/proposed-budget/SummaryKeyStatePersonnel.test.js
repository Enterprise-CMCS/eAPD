import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
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
        name: `Key State Personnel Personnel Cost × FTE × Medicaid Share (%) Total cost`
      })
    );

    expect(
      screen.getByRole('rowheader', {
        name: `Key State Personnel`
      })
    );

    expect(
      screen.getByRole('cell', {
        name: `Key Personnel Total`
      })
    );
  });

  it('renders correctly with no key state personnel', async () => {
    setup(
      { ffy: '2023' },
      {
        initialState: {
          apd: {
            data: {
              keyStatePersonnel: {
                keyPersonnel: []
              },
              years: ['2022', '2023']
            }
          }
        }
      }
    );

    expect(
      screen.getByRole('cell', {
        name: `No Key State Personnel Specified`
      })
    );
  });
});
