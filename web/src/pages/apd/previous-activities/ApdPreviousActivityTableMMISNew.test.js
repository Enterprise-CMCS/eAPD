import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as MmisApdPreviousActivityTable,
  mapStateToProps,
  mapDispatchToProps
} from './MmisApdPreviousActivityTable';

import {
  setPreviousActivityFederalActualExpenseforMMISNew,
  setPreviousActivityApprovedExpenseforMMISNew
} from '../../../redux/actions/editApd';

describe('apd previous activity table, mmis component', () => {
  const props = {
    previousActivityExpenses: {
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
    setActual: jest.fn(),
    setApproved: jest.fn()
  };

  beforeEach(() => {
    props.setActual.mockClear();
    props.setApproved.mockClear();
  });

  test('renders correctly', () => {
    expect(
      shallow(<MmisApdPreviousActivityTable {...props} />)
    ).toMatchSnapshot();
  });

  test('handles changing a 50/50 ddi approved expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="approved-total-ddi50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith('1', 'new value', 50, 'ddi');
  });

  test('handles changing a 50/50 mando approved expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="approved-total-mando50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith(
      '1',
      'new value',
      50,
      'mando'
    );
  });

  test('handles changing a 50/50 ddi actual expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="actual-federal-ddi50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value', 50, 'ddi');
  });

  test('handles changing a 50/50 mando actual expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="actual-federal-mando50-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value', 50, 'mando');
  });

  test('handles changing a 75/25 ddi approved expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="approved-total-ddi75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith('1', 'new value', 75, 'ddi');
  });

  test('handles changing a 75/25 mando approved expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="approved-total-mando75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith(
      '1',
      'new value',
      75,
      'mando'
    );
  });

  test('handles changing a 75/25 ddi actual expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="actual-federal-ddi75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value', 75, 'ddi');
  });

  test('handles changing a 75/25 mando actual expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="actual-federal-mando75-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value', 75, 'mando');
  });

  test('handles changing a 90/10 ddi approved expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="approved-total-ddi90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setApproved).toHaveBeenCalledWith('1', 'new value', 90, 'ddi');
  });

  test('handles changing a 90/10 ddi actual expense', () => {
    shallow(<MmisApdPreviousActivityTable {...props} />)
      .find('DollarField[name="actual-federal-ddi90-1"]')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setActual).toHaveBeenCalledWith('1', 'new value', 90, 'ddi');
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            previousActivities: {
              actualExpenditures: {
                1: {
                  ddi: {
                    some: 'junk'
                  },
                  mando: {
                    the: 'good stuff'
                  }
                },
                2: {
                  ddi: {
                    more: 'garbage'
                  },
                  mando: {
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
        1: { ddi: { some: 'junk' }, mando: { the: 'good stuff' } },
        2: { ddi: { more: 'garbage' }, mando: { finders: 'keepers' } }
      }
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setActual: setPreviousActivityFederalActualExpenseforMMISNew,
      setApproved: setPreviousActivityApprovedExpenseforMMISNew
    });
  });
});
