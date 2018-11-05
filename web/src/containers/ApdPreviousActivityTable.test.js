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
        hie: {
          federalActual90: 10,
          federalActual75: 20,
          federalActual50: 30,
          federalApproved90: 1,
          federalApproved75: 2,
          federalApproved50: 3,
          stateActual90: 1000,
          stateActual75: 2000,
          stateActual50: 3000,
          stateApproved90: 100,
          stateApproved75: 200,
          stateApproved50: 300
        },
        hit: {
          federalActual90: 10,
          federalActual75: 20,
          federalActual50: 30,
          federalApproved90: 1,
          federalApproved75: 2,
          federalApproved50: 3,
          stateActual90: 1000,
          stateActual75: 2000,
          stateActual50: 3000,
          stateApproved90: 100,
          stateApproved75: 200,
          stateApproved50: 300
        }
      },
      '2': {
        hie: {
          federalActual90: 10,
          federalActual75: 20,
          federalActual50: 30,
          federalApproved90: 1,
          federalApproved75: 2,
          federalApproved50: 3,
          stateActual90: 1000,
          stateActual75: 2000,
          stateActual50: 3000,
          stateApproved90: 100,
          stateApproved75: 200,
          stateApproved50: 300
        },
        hit: {
          federalActual90: 70,
          federalActual75: 80,
          federalActual50: 90,
          federalApproved90: 7,
          federalApproved75: 8,
          federalApproved50: 9,
          stateActual90: 7000,
          stateActual75: 8000,
          stateActual50: 9000,
          stateApproved90: 700,
          stateApproved75: 800,
          stateApproved50: 900
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
      .find('InputHolder[name="approved-federal-hit-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(
      props.updateApd.calledWith({
        previousActivityExpenses: {
          '1': { hit: { federalApproved: 'new value' } }
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
