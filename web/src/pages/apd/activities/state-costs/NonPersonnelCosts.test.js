import { shallow } from 'enzyme';
import React from 'react';
import { APD_TYPE } from '@cms-eapd/common';

import {
  plain as NonPersonnelCosts,
  mapStateToProps,
  mapDispatchToProps
} from './NonPersonnelCosts';

import { removeNonPersonnelCost } from '../../../../redux/actions/editActivity';

describe('activity non-personnel costs subsection', () => {
  const props = {
    activityIndex: 58,
    expenses: [
      {
        category: 'test category',
        desc: 'test desc',
        key: 'cost key',
        years: {
          2027: 34355,
          2028: 48833
        }
      }
    ],
    removeExpense: jest.fn()
  };
  const component = shallow(<NonPersonnelCosts {...props} />);

  beforeEach(() => {
    props.removeExpense.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles deleting a cost', () => {
      list.prop('onDeleteClick')(0);
      expect(props.removeExpense).toHaveBeenCalledWith(58, 0);
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps(
        {
          apd: {
            data: {
              apdType: APD_TYPE.HITECH,
              activities: [
                {
                  expenses: 'these are wrong expenses'
                },
                {
                  expenses: 'these are wrong expenses'
                },
                {
                  expenses: 'these are expenses'
                }
              ],
              years: [2027, 2028]
            }
          }
        },
        { activityIndex: 2 }
      )
    ).toEqual({
      expenses: 'these are expenses',
      apdType: 'HITECH',
      years: [2027, 2028]
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      removeExpense: removeNonPersonnelCost
    });
  });
});
