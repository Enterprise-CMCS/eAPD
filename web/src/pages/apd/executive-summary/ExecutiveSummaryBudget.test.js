import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ExecutiveSummaryBudget,
  mapStateToProps,
  DollarCell
} from './ExecutiveSummaryBudget';

describe('executive summary budget component', () => {
  test('renders correctly without data', () => {
    expect(
      shallow(<ExecutiveSummaryBudget budget={{ years: [] }} />)
    ).toMatchSnapshot();
  });

  test('renders correctly with data', () => {
    const component = shallow(
      <ExecutiveSummaryBudget
        budget={{
          hit: {
            combined: {
              1: { federal: 1, state: 2, medicaid: 3 },
              2: { federal: 3, state: 4, medicaid: 7 },
              total: { federal: 5, state: 6, medicaid: 11 }
            }
          },
          hie: {
            combined: {
              1: { federal: 10, state: 20, medicaid: 30 },
              2: { federal: 30, state: 40, medicaid: 70 },
              total: { federal: 50, state: 60, medicaid: 110 }
            }
          },
          hitAndHie: {
            combined: {
              1: { federal: 100, state: 200, total: 300, medicaid: 300 },
              2: { federal: 400, state: 500, total: 600, medicaid: 700 },
              total: { federal: 700, state: 800, total: 900, medicaid: 1500 }
            }
          },
          mmisByFFP: {
            '90-10': {
              1: { federal: 1, state: 2, medicaid: 3 },
              2: { federal: 3, state: 4, medicaid: 7 },
              total: { federal: 5, state: 6, medicaid: 11 }
            },
            '75-25': {
              1: { federal: 10, state: 20, medicaid: 30 },
              2: { federal: 30, state: 40, medicaid: 70 },
              total: { federal: 50, state: 60, medicaid: 110 }
            },
            '50-50': {
              1: { federal: 100, state: 200, medicaid: 300 },
              2: { federal: 300, state: 400, medicaid: 700 },
              total: { federal: 500, state: 600, medicaid: 1100 }
            },
            combined: {
              1: { federal: 1000, state: 2000, total: 3000, medicaid: 3000 },
              2: { federal: 4000, state: 5000, total: 6000, medicaid: 9000 },
              total: {
                federal: 7000,
                state: 8000,
                total: 9000,
                medicaid: 15000
              }
            }
          },
          years: ['1', '2']
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('DollarCell renders correctly', () => {
    expect(
      shallow(<DollarCell headers="one two three" value="32.57" />)
    ).toMatchSnapshot();

    expect(
      shallow(<DollarCell headers="one two three" value={75.23} />)
    ).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const state = {
      budget: 'this is the budget'
    };

    expect(mapStateToProps(state)).toEqual({ budget: 'this is the budget' });
  });
});
