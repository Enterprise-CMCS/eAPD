import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as ApdPreviousActivityTable,
  mapStateToProps,
  mapDispatchToProps
} from './ApdPreviousActivityTable';
import { updateApd } from '../actions/apd';

describe('apd previous activity table, mmis component', () => {
  const props = {
    previousActivityExpenses: {
      '1': {
        hithie: {
          federalActual: 10,
          totalApproved: 20
        }
      },
      '2': {
        hithie: {
          federalActual: 100,
          totalApproved: 200
        }
      }
    },
    updateApd: sinon.spy()
  };

  beforeEach(() => {
    props.updateApd.resetHistory();
  });

  test('renders correctly', () => {
    expect(shallow(<ApdPreviousActivityTable {...props} />)).toMatchSnapshot();
  });

  test('dispatches on a change', () => {
    shallow(<ApdPreviousActivityTable {...props} />)
      .find('InputHolder[name="hithie-approved-total-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(
      props.updateApd.calledWith({
        previousActivityExpenses: {
          '1': { hithie: { totalApproved: 'new value' } }
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
