import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as IncentivePayments,
  mapStateToProps,
  mapDispatchToProps
} from './IncentivePayments';
import { updateApd } from '../actions/apd';

describe('incentive payments component', () => {
  const props = {
    data: {
      ehAmt: { '1': [1, 2, 3, 4], '2': [5, 6, 7, 8] },
      ehCt: { '1': [9, 10, 11, 12], '2': [13, 14, 15, 16] },
      epAmt: { '1': [17, 18, 19, 20], '2': [21, 22, 23, 24] },
      epCt: { '1': [25, 26, 27, 28], '2': [29, 30, 31, 32] }
    },
    totals: {
      ehAmt: {
        byYear: { '1': 10, '2': 26 },
        allYears: 36
      },
      ehCt: {
        byYear: { '1': 42, '2': 58 },
        allYears: 100
      },
      epAmt: {
        byYear: { '1': 74, '2': 90 },
        allYears: 164
      },
      epCt: {
        byYear: { '1': 106, '2': 122 },
        allYears: 228
      }
    },
    years: ['1', '2']
  };

  test('renders correctly', () => {
    const component = shallow(
      <IncentivePayments {...props} updateApd={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('handles changes', () => {
    const updateApdProp = sinon.spy();
    const component = shallow(
      <IncentivePayments {...props} updateApd={updateApdProp} />
    );

    const types = ['ehAmt', 'ehCt', 'epAmt', 'epCt'];
    const years = ['1', '2'];

    component.find('InputHolder').not('.fake-spacer-input').forEach((c, i) => {
      c.simulate('change', { target: { value: 99 } });

      const q = i % 4 + 1;
      const year = years[Math.floor(i / 4) % years.length];
      const type =
        types[Math.floor(Math.floor(i / 4) / years.length) % types.length];

      expect(
        updateApdProp.calledWith({
          incentivePayments: { [type]: { [year]: { [q]: 99 } } }
        })
      ).toBeTruthy();
    });
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          incentivePayments: {
            ehAmt: { '1': [1, 2, 3, 4], '2': [5, 6, 7, 8] },
            ehCt: { '1': [9, 10, 11, 12], '2': [13, 14, 15, 16] },
            epAmt: { '1': [17, 18, 19, 20], '2': [21, 22, 23, 24] },
            epCt: { '1': [25, 26, 27, 28], '2': [29, 30, 31, 32] }
          },
          years: ['1', '2']
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      data: {
        ehAmt: { '1': [1, 2, 3, 4], '2': [5, 6, 7, 8] },
        ehCt: { '1': [9, 10, 11, 12], '2': [13, 14, 15, 16] },
        epAmt: { '1': [17, 18, 19, 20], '2': [21, 22, 23, 24] },
        epCt: { '1': [25, 26, 27, 28], '2': [29, 30, 31, 32] }
      },
      totals: {
        ehAmt: {
          byYear: { '1': 10, '2': 26 },
          allYears: 36
        },
        ehCt: {
          byYear: { '1': 42, '2': 58 },
          allYears: 100
        },
        epAmt: {
          byYear: { '1': 74, '2': 90 },
          allYears: 164
        },
        epCt: {
          byYear: { '1': 106, '2': 122 },
          allYears: 228
        }
      },
      years: ['1', '2']
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ updateApd });
  });
});
