import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as NonPersonnelCosts,
  mapStateToProps,
  mapDispatchToProps
} from './NonPersonnelCosts';

import {
  addActivityExpense,
  removeActivityExpense,
  updateActivity
} from '../../actions/activities';

describe('activity non-personnel costs subsection', () => {
  const props = {
    activityKey: 'activity key',
    addExpense: jest.fn(),
    expenses: [
      {
        category: 'test category',
        desc: 'test desc',
        initialCollapsed: false,
        key: 'cost key',
        years: {
          2027: 34355,
          2028: 48833
        }
      }
    ],
    removeExpense: jest.fn(),
    updateActivity: jest.fn()
  };
  const component = shallow(<NonPersonnelCosts {...props} />);

  beforeEach(() => {
    props.addExpense.mockClear();
    props.removeExpense.mockClear();
    props.updateActivity.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new cost', () => {
      list.prop('onAddClick')();
      expect(props.addExpense).toHaveBeenCalledWith('activity key');
    });

    it('handles deleting a cost', () => {
      list.prop('onDeleteClick')('cost key');
      expect(props.removeExpense).toHaveBeenCalledWith(
        'activity key',
        'cost key'
      );
    });

    it('handles editing a cost category', () => {
      list.prop('handleEditCategory')(3, 'new category');
      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        expenses: { 3: { category: 'new category' } }
      });
    });

    it('handles editing a cost description', () => {
      list.prop('handleEditDesc')(3, 'new description');
      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        expenses: { 3: { desc: 'new description' } }
      });
    });

    it('handles editing a cost for a fiscal year', () => {
      list.prop('handleEditCost')(3, 1997, 'new cost');
      expect(props.updateActivity).toHaveBeenCalledWith(
        'activity key',
        {
          expenses: { 3: { years: { 1997: 'new cost' } } }
        },
        true
      );
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps(
        {
          activities: {
            byKey: {
              'activity 1': {
                expenses: 'these are expenses'
              },
              'activity 2': {}
            }
          }
        },
        { aKey: 'activity 1' }
      )
    ).toEqual({ activityKey: 'activity 1', expenses: 'these are expenses' });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      addExpense: addActivityExpense,
      removeExpense: removeActivityExpense,
      updateActivity
    });
  });
});
