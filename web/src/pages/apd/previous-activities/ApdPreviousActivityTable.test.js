import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ApdPreviousActivityTable,
  mapStateToProps,
  mapDispatchToProps
} from './ApdPreviousActivityTable';

import {
  setPreviousActivityApprovedExpenseForHITandHIE,
  setPreviousActivityFederalActualExpenseForHITandHIE
} from '../../../actions/editApd';

describe('apd previous activity table, mmis component', () => {
  const props = {
    previousActivityExpenses: {
      1: {
        federalActual: 10,
        totalApproved: 20
      },
      2: {
        federalActual: 100,
        totalApproved: 200
      }
    },
    setActual: jest.fn(),
    setApproved: jest.fn()
  };

  beforeEach(() => {
    props.setActual.mockClear();
    props.setApproved.mockClear();
  });

  test('renders correctly', () => {
    expect(shallow(<ApdPreviousActivityTable {...props} />)).toMatchSnapshot();
  });

  test('handles changing an approved expense', () => {
    shallow(<ApdPreviousActivityTable {...props} />)
      .find('DollarField[name="hithie-approved-total-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith('1', 'new value');
  });

  test('handles changing an actual expense', () => {
    shallow(<ApdPreviousActivityTable {...props} />)
      .find('DollarField[name="hithie-actual-federal-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value');
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            previousActivityExpenses: {
              1: {
                hithie: {
                  federalActual: 1,
                  totalApproved: 2
                },
                mmis: {
                  some: 'junk'
                }
              },
              2: {
                hithie: {
                  federalActual: 3,
                  totalApproved: 4
                },
                mmis: {
                  more: 'garbage'
                }
              }
            }
          }
        }
      })
    ).toEqual({
      previousActivityExpenses: {
        1: { federalActual: 1, totalApproved: 2 },
        2: { federalActual: 3, totalApproved: 4 }
      }
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setActual: setPreviousActivityFederalActualExpenseForHITandHIE,
      setApproved: setPreviousActivityApprovedExpenseForHITandHIE
    });
  });
});
