import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ApdPreviousActivityTableTotal,
  mapStateToProps
} from './ApdPreviousActivityTableTotal';

describe('apd previous activity table, grand total component', () => {
  const state = {
    apd: {
      data: {
        previousActivities: {
          actualExpenditures: {
            1: {
              hithie: {
                federalActual: 1000,
                totalApproved: 2000
              },
              mmis: {
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
              }
            },
            2: {
              hithie: {
                federalActual: 3000,
                totalApproved: 4000
              },
              mmis: {
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
        actual: 1090,
        approved: 1878
      },
      2: {
        actual: 3900,
        approved: 4380
      }
    }
  };

  test('renders correctly', () => {
    expect(
      shallow(<ApdPreviousActivityTableTotal {...props} />)
    ).toMatchSnapshot();
  });

  test('maps state to props', () => {
    expect(mapStateToProps(state)).toEqual(props);
  });
});
