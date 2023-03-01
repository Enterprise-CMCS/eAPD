import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ApdPreviousActivityTableMMISOld,
  mapStateToProps,
  mapDispatchToProps
} from './ApdPreviousActivityTableMMISOld';

import {
  setPreviousActivityApprovedExpenseforMMIS50FFP,
  setPreviousActivityApprovedExpenseforMMIS75FFP,
  setPreviousActivityApprovedExpenseforMMIS90FFP, // these need to be deleted
  setPreviousActivityFederalActualExpenseforMMIS50FFP,
  setPreviousActivityFederalActualExpenseforMMIS75FFP,
  setPreviousActivityFederalActualExpenseforMMIS90FFP
} from '../../../redux/actions/editApd';

describe('apd previous activity table, mmis component', () => {
  const props = {
    previousActivityExpenses: {
      1: {
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
      2: {
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
    },
    setActual50: jest.fn(),
    setActual75: jest.fn(),
    setActual90: jest.fn(),
    setApproved50: jest.fn(),
    setApproved75: jest.fn(),
    setApproved90: jest.fn()
  };

  beforeEach(() => {
    props.setActual50.mockClear();
    props.setActual75.mockClear();
    props.setActual90.mockClear();
    props.setApproved50.mockClear();
    props.setApproved75.mockClear();
    props.setApproved90.mockClear();
  });

  test('renders correctly', () => {
    expect(
      shallow(<ApdPreviousActivityTableMMISOld {...props} />)
    ).toMatchSnapshot();
  });

  test('handles changing a 50/50 approved expense', () => {
    shallow(<ApdPreviousActivityTableMMISOld {...props} />)
      .find('DollarField[name="approved-total-mmis50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved50).toHaveBeenCalledWith('1', 'new value');
  });

  test('handles changing a 50/50 actual expense', () => {
    shallow(<ApdPreviousActivityTableMMISOld {...props} />)
      .find('DollarField[name="actual-federal-mmis50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual50).toHaveBeenCalledWith('1', 'new value');
  });

  test('handles changing a 75/25 approved expense', () => {
    shallow(<ApdPreviousActivityTableMMISOld {...props} />)
      .find('DollarField[name="approved-total-mmis75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved75).toHaveBeenCalledWith('1', 'new value');
  });

  test('handles changing a 75/25 actual expense', () => {
    shallow(<ApdPreviousActivityTableMMISOld {...props} />)
      .find('DollarField[name="actual-federal-mmis75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual75).toHaveBeenCalledWith('1', 'new value');
  });

  test('handles changing a 90/10 approved expense', () => {
    shallow(<ApdPreviousActivityTableMMISOld {...props} />)
      .find('DollarField[name="approved-total-mmis90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved90).toHaveBeenCalledWith('1', 'new value');
  });

  test('handles changing a 90/10 actual expense', () => {
    shallow(<ApdPreviousActivityTableMMISOld {...props} />)
      .find('DollarField[name="actual-federal-mmis90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual90).toHaveBeenCalledWith('1', 'new value');
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            previousActivities: {
              actualExpenditures: {
                1: {
                  hithie: {
                    some: 'junk'
                  },
                  mmis: {
                    the: 'good stuff'
                  }
                },
                2: {
                  hithie: {
                    more: 'garbage'
                  },
                  mmis: {
                    finders: 'keepers'
                  }
                }
              }
            }
          }
        }
      })
    ).toEqual({
      previousActivityExpenses: {
        1: { the: 'good stuff' },
        2: { finders: 'keepers' }
      }
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setActual50: setPreviousActivityFederalActualExpenseforMMIS50FFP,
      setActual75: setPreviousActivityFederalActualExpenseforMMIS75FFP,
      setActual90: setPreviousActivityFederalActualExpenseforMMIS90FFP,
      setApproved50: setPreviousActivityApprovedExpenseforMMIS50FFP,
      setApproved75: setPreviousActivityApprovedExpenseforMMIS75FFP,
      setApproved90: setPreviousActivityApprovedExpenseforMMIS90FFP
    });
  });
});
