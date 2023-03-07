import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as HitechApdPreviousActivityTables,
  mapStateToProps,
  mapDispatchToProps
} from './HitechApdPreviousActivityTables';

import {
  setPreviousActivityFederalActualExpense,
  setPreviousActivityApprovedExpense,
  setPreviousActivityFederalActualExpenseForHITandHIE,
  setPreviousActivityApprovedExpenseForHITandHIE
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
    setActualMmis: jest.fn(),
    setApprovedMmis: jest.fn(),
    setActualHitech: jest.fn(),
    setApprovedHitech: jest.fn()
  };

  beforeEach(() => {
    props.setActualMmis.mockClear();
    props.setApprovedMmis.mockClear();
    props.setActualHitech.mockClear();
    props.setApprovedHitech.mockClear();
  });

  test('renders correctly', () => {
    expect(
      shallow(<HitechApdPreviousActivityTables {...props} />)
    ).toMatchSnapshot();
  });

  test('handles changing a 50/50 approved expense hitech', () => {
    shallow(<HitechApdPreviousActivityTables {...props} />)
      .find('DollarField[name="approved-total-hithie90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApprovedHitech).toHaveBeenCalledWith('1', 'new value');
  });

  test('handles changing a 50/50 actual expense hitech', () => {
    shallow(<HitechApdPreviousActivityTables {...props} />)
      .find('DollarField[name="actual-federal-hithie90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActualHitech).toHaveBeenCalledWith('1', 'new value');
  });

  test('handles changing a 50/50 approved expense mmis', () => {
    shallow(<HitechApdPreviousActivityTables {...props} />)
      .find('DollarField[name="approved-total-mmis50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApprovedMmis).toHaveBeenCalledWith(
      '1',
      'new value',
      50,
      'mmis'
    );
  });

  test('handles changing a 50/50 actual expense mmis', () => {
    shallow(<HitechApdPreviousActivityTables {...props} />)
      .find('DollarField[name="actual-federal-mmis50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActualMmis).toHaveBeenCalledWith(
      '1',
      'new value',
      50,
      'mmis'
    );
  });

  test('handles changing a 75/25 approved expense mmis', () => {
    shallow(<HitechApdPreviousActivityTables {...props} />)
      .find('DollarField[name="approved-total-mmis75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApprovedMmis).toHaveBeenCalledWith(
      '1',
      'new value',
      75,
      'mmis'
    );
  });

  test('handles changing a 75/25 actual expense mmis', () => {
    shallow(<HitechApdPreviousActivityTables {...props} />)
      .find('DollarField[name="actual-federal-mmis75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActualMmis).toHaveBeenCalledWith(
      '1',
      'new value',
      75,
      'mmis'
    );
  });

  test('handles changing a 90/10 approved expense mmis', () => {
    shallow(<HitechApdPreviousActivityTables {...props} />)
      .find('DollarField[name="approved-total-mmis90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApprovedMmis).toHaveBeenCalledWith(
      '1',
      'new value',
      90,
      'mmis'
    );
  });

  test('handles changing a 90/10 actual expense mmis', () => {
    shallow(<HitechApdPreviousActivityTables {...props} />)
      .find('DollarField[name="actual-federal-mmis90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActualMmis).toHaveBeenCalledWith(
      '1',
      'new value',
      90,
      'mmis'
    );
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
      setActualMmis: setPreviousActivityFederalActualExpense,
      setApprovedMmis: setPreviousActivityApprovedExpense,
      setActualHitech: setPreviousActivityFederalActualExpenseForHITandHIE,
      setApprovedHitech: setPreviousActivityApprovedExpenseForHITandHIE
    });
  });
});
