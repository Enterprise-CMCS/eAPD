import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as IncentivePayments,
  mapStateToProps,
  mapDispatchToProps
} from './IncentivePayments';

import {
  setIncentiveEHCount,
  setIncentiveEPCount,
  setIncentiveEHPayment,
  setIncentiveEPPayment
} from '../../../actions/editApd';

describe('incentive payments component', () => {
  const props = {
    data: {
      ehAmt: { 1: [1, 2, 3, 4], 2: [5, 6, 7, 8] },
      ehCt: { 1: [9, 10, 11, 12], 2: [13, 14, 15, 16] },
      epAmt: { 1: [17, 18, 19, 20], 2: [21, 22, 23, 24] },
      epCt: { 1: [25, 26, 27, 28], 2: [29, 30, 31, 32] }
    },
    totals: {
      ehAmt: { allYears: 36, byYear: { 1: 10, 2: 26 } },
      ehCt: { allYears: 100, byYear: { 1: 42, 2: 58 } },
      epAmt: { allYears: 164, byYear: { 1: 74, 2: 90 } },
      epCt: { allYears: 228, byYear: { 1: 106, 2: 122 } }
    },
    years: ['1', '2'],
    setEHCount: jest.fn(),
    setEPCount: jest.fn(),
    setEHPayment: jest.fn(),
    setEPPayment: jest.fn()
  };

  beforeEach(() => {
    props.setEHCount.mockClear();
    props.setEPCount.mockClear();
    props.setEHPayment.mockClear();
    props.setEPPayment.mockClear();
  });

  it('renders correctly', () => {
    const component = shallow(<IncentivePayments {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('handles changes', () => {
    const component = shallow(<IncentivePayments {...props} />);

    const actions = [
      props.setEHPayment,
      props.setEHCount,
      props.setEPPayment,
      props.setEPCount
    ];

    [
      // The first pair of dollar/number fields will be for the EH things
      // for the first year, and the first quarter
      component.find('DollarField').at(0),
      component.find('NumberField').at(0),
      // We do all quarters of EH for a year before switching over to EP,
      // so the 5th (index 4) pair will be for EP, first year, first quarter
      component.find('DollarField').at(4),
      component.find('NumberField').at(4)
    ].forEach((c, i) => {
      c.simulate('change', { target: { value: 99 } });

      const action = actions[Math.floor(i / 4) % actions.length];

      expect(action).toHaveBeenCalledWith('1', 1, 99);
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            incentivePayments: {
              ehAmt: { 1: [1, 2, 3, 4], 2: [5, 6, 7, 8] },
              ehCt: { 1: [9, 10, 11, 12], 2: [13, 14, 15, 16] },
              epAmt: { 1: [17, 18, 19, 20], 2: [21, 22, 23, 24] },
              epCt: { 1: [25, 26, 27, 28], 2: [29, 30, 31, 32] }
            },
            years: ['1', '2']
          }
        }
      })
    ).toEqual({
      data: {
        ehAmt: { 1: [1, 2, 3, 4], 2: [5, 6, 7, 8] },
        ehCt: { 1: [9, 10, 11, 12], 2: [13, 14, 15, 16] },
        epAmt: { 1: [17, 18, 19, 20], 2: [21, 22, 23, 24] },
        epCt: { 1: [25, 26, 27, 28], 2: [29, 30, 31, 32] }
      },
      totals: {
        ehAmt: { allYears: 36, byYear: { 1: 10, 2: 26 } },
        ehCt: { allYears: 100, byYear: { 1: 42, 2: 58 } },
        epAmt: { allYears: 164, byYear: { 1: 74, 2: 90 } },
        epCt: { allYears: 228, byYear: { 1: 106, 2: 122 } }
      },
      years: ['1', '2']
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setEHCount: setIncentiveEHCount,
      setEPCount: setIncentiveEPCount,
      setEHPayment: setIncentiveEHPayment,
      setEPPayment: setIncentiveEPPayment
    });
  });
});
