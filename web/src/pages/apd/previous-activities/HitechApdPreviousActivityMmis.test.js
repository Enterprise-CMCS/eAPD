import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as HitechApdPreviousActivityMmis,
  mapStateToProps,
  mapDispatchToProps
} from './HitechApdPreviousActivityMmis ';

import {
  setPreviousActivityFederalActualExpenseforMMISOld,
  setPreviousActivityApprovedExpenseforMMISOld
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
    setActual: jest.fn(),
    setApproved: jest.fn()
  };

  beforeEach(() => {
    props.setActual.mockClear();
    props.setApproved.mockClear();
  });

  test('renders correctly', () => {
    expect(
      shallow(<HitechApdPreviousActivityMmis {...props} />)
    ).toMatchSnapshot();
  });

  test('handles changing a 50/50 approved expense', () => {
    shallow(<HitechApdPreviousActivityMmis {...props} />)
      .find('DollarField[name="approved-total-mmis50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith('1', 'new value', 50);
  });

  test('handles changing a 50/50 actual expense', () => {
    shallow(<HitechApdPreviousActivityMmis {...props} />)
      .find('DollarField[name="actual-federal-mmis50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value', 50);
  });

  test('handles changing a 75/25 approved expense', () => {
    shallow(<HitechApdPreviousActivityMmis {...props} />)
      .find('DollarField[name="approved-total-mmis75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith('1', 'new value', 75);
  });

  test('handles changing a 75/25 actual expense', () => {
    shallow(<HitechApdPreviousActivityMmis {...props} />)
      .find('DollarField[name="actual-federal-mmis75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value', 75);
  });

  test('handles changing a 90/10 approved expense', () => {
    shallow(<HitechApdPreviousActivityMmis {...props} />)
      .find('DollarField[name="approved-total-mmis90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith('1', 'new value', 90);
  });

  test('handles changing a 90/10 actual expense', () => {
    shallow(<HitechApdPreviousActivityMmis {...props} />)
      .find('DollarField[name="actual-federal-mmis90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value', 90);
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
      setActual: setPreviousActivityFederalActualExpenseforMMISOld,
      setApproved: setPreviousActivityApprovedExpenseforMMISOld
    });
  });
});
