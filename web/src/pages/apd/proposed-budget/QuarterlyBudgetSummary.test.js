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
            years: {
              1: {
                1: {
                  combined: 1,
                  contractors: 2,
                  inHouse: 3
                },
                2: {
                  combined: 4,
                  contractors: 5,
                  inHouse: 6
                },
                3: {
                  combined: 7,
                  contractors: 8,
                  inHouse: 9
                },
                4: {
                  combined: 10,
                  contractors: 11,
                  stainHousete: 12
                },
                subtotal: {
                  combined: 13,
                  contractors: 14,
                  inHouse: 15
                }
              },
              2: {
                1: {
                  combined: 101,
                  contractors: 102,
                  inHouse: 103
                },
                2: {
                  combined: 104,
                  contractors: 105,
                  inHouse: 106
                },
                3: {
                  combined: 107,
                  contractors: 108,
                  inHouse: 109
                },
                4: {
                  combined: 110,
                  contractors: 111,
                  inHouse: 112
                },
                subtotal: {
                  combined: 113,
                  contractors: 114,
                  inHouse: 115
                }
              }
            },
            total: {
              combined: 3000,
              contractors: 3001,
              inHouse: 3002
            }
          },
          mmis: {
            years: {
              1: {
                1: {
                  combined: 201,
                  contractors: 202,
                  inHouse: 203
                },
                2: {
                  combined: 204,
                  contractors: 205,
                  inHouse: 206
                },
                3: {
                  combined: 207,
                  contractors: 208,
                  inHouse: 209
                },
                4: {
                  combined: 210,
                  contractors: 211,
                  inHouse: 212
                },
                subtotal: {
                  combined: 213,
                  contractors: 214,
                  inHouse: 215
                }
              },
              2: {
                1: {
                  combined: 1101,
                  contractors: 1102,
                  inHouse: 1103
                },
                2: {
                  combined: 1104,
                  contractors: 1105,
                  inHouse: 1106
                },
                3: {
                  combined: 1107,
                  contractors: 1108,
                  inHouse: 1109
                },
                4: {
                  combined: 1110,
                  contractors: 1111,
                  inHouse: 1112
                },
                subtotal: {
                  combined: 1113,
                  contractors: 1114,
                  inHouse: 1115
                }
              }
            },
            total: {
              combined: 4000,
              contractors: 4001,
              inHouse: 4002
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
