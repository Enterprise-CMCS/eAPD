import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as QuarterlyBudgetSummary,
  mapStateToProps
} from './QuarterlyBudgetSummary';

describe('quarterly budget summary component', () => {
  test('renders correctly if data is not loaded', () => {
    const component = shallow(
      <QuarterlyBudgetSummary budget={{}} years={[]} />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if data is loaded', () => {
    const component = shallow(
      <QuarterlyBudgetSummary
        budget={{
          hitAndHie: {
            '1': {
              1: {
                combined: 1,
                contractors: 2,
                state: 3
              },
              2: {
                combined: 4,
                contractors: 5,
                state: 6
              },
              3: {
                combined: 7,
                contractors: 8,
                state: 9
              },
              4: {
                combined: 10,
                contractors: 11,
                state: 12
              },
              subtotal: {
                combined: 13,
                contractors: 14,
                state: 15
              }
            },
            '2': {
              1: {
                combined: 101,
                contractors: 102,
                state: 103
              },
              2: {
                combined: 104,
                contractors: 105,
                state: 106
              },
              3: {
                combined: 107,
                contractors: 108,
                state: 109
              },
              4: {
                combined: 110,
                contractors: 111,
                state: 112
              },
              subtotal: {
                combined: 113,
                contractors: 114,
                state: 115
              }
            },
            total: {
              combined: 3000,
              contractors: 3001,
              state: 3002
            }
          },
          mmis: {
            '1': {
              1: {
                combined: 201,
                contractors: 202,
                state: 203
              },
              2: {
                combined: 204,
                contractors: 205,
                state: 206
              },
              3: {
                combined: 207,
                contractors: 208,
                state: 209
              },
              4: {
                combined: 210,
                contractors: 211,
                state: 212
              },
              subtotal: {
                combined: 213,
                contractors: 214,
                state: 215
              }
            },
            '2': {
              1: {
                combined: 1101,
                contractors: 1102,
                state: 1103
              },
              2: {
                combined: 1104,
                contractors: 1105,
                state: 1106
              },
              3: {
                combined: 1107,
                contractors: 1108,
                state: 1109
              },
              4: {
                combined: 1110,
                contractors: 1111,
                state: 1112
              },
              subtotal: {
                combined: 1113,
                contractors: 1114,
                state: 1115
              }
            },
            total: {
              combined: 4000,
              contractors: 4001,
              state: 4002
            }
          }
        }}
        years={['1', '2']}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const state = {
      apd: { data: { years: 'years' } },
      budget: { federalShareByFFYQuarter: 'federal share' }
    };

    expect(mapStateToProps(state)).toEqual({
      budget: 'federal share',
      years: 'years'
    });
  });
});
