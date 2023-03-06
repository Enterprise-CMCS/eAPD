import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ApdPreviousActivityTableTotalsMMIS,
  mapStateToProps
} from './ApdPreviousActivityTableTotalsMMIS';

describe('apd previous activity table, grand total component', () => {
  const state = {
    apd: {
      data: {
        previousActivities: {
          actualExpenditures: {
            1: {
              ddi: {
                90: {
                  federalActual: 10,
                  totalApproved: 20
                },
                75: {
                  federalActual: 30,
                  totalApproved: 40
                },
                50: {
                  federalActual: 50,
                  totalApproved: 60
                }
              },
              mando: {
                75: {
                  federalActual: 3000,
                  totalApproved: 400
                },
                50: {
                  federalActual: 5000,
                  totalApproved: 6000
                }
              }
            },
            2: {
              ddi: {
                90: {
                  federalActual: 100,
                  totalApproved: 200
                },
                75: {
                  federalActual: 300,
                  totalApproved: 400
                },
                50: {
                  federalActual: 500,
                  totalApproved: 600
                }
              },
              mando: {
                75: {
                  federalActual: 3000,
                  totalApproved: 4000
                },
                50: {
                  federalActual: 5000,
                  totalApproved: 6000
                }
              }
            }
          }
        }
      }
    }
  };

  const props = {
    totals: {
      1: {
        actual: 8010,
        approved: 3318
      },
      2: {
        actual: 8100,
        approved: 6180
      }
    }
  };

  test('renders correctly', () => {
    expect(
      shallow(<ApdPreviousActivityTableTotalsMMIS {...props} />)
    ).toMatchSnapshot();
  });

  test('maps state to props', () => {
    expect(mapStateToProps(state)).toEqual(props);
  });
});
