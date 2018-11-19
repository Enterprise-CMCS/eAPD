import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as ApdPreviousActivityTableMMIS,
  mapStateToProps,
  mapDispatchToProps
} from './ApdPreviousActivityTableMMIS';
import { updateApd } from '../actions/apd';

describe('apd previous activity table, mmis component', () => {
  const props = {
    previousActivityExpenses: {
      '1': {
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
      '2': {
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
    },
    updateApd: sinon.spy()
  };

  beforeEach(() => {
    props.updateApd.resetHistory();
  });

  test('renders correctly', () => {
    expect(
      shallow(<ApdPreviousActivityTableMMIS {...props} />)
    ).toMatchSnapshot();
  });

  test('dispatches on a change', () => {
    shallow(<ApdPreviousActivityTableMMIS {...props} />)
      .find('InputHolder[name="approved-total-mmis90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(
      props.updateApd.calledWith({
        previousActivityExpenses: {
          '1': { mmis: { '90': { approvedTotal: 'new value' } } }
        }
      })
    );
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          previousActivityExpenses: 'previous activities'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      previousActivityExpenses: 'previous activities'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ updateApd });
  });
});
