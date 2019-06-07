import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

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

  it('renders correctly when there are no expenses', () => {
    expect(
      shallow(
        <NonPersonnelCosts
          activityKey="activity key"
          addExpense={jest.fn()}
          expenses={[]}
          removeExpense={jest.fn()}
          updateActivity={jest.fn()}
        />
      )
    ).toMatchSnapshot();
  });

  it('handles adding a new cost', () => {
    component.find('Button').simulate('click');
    expect(props.addExpense).toHaveBeenCalledWith('activity key');
  });

  it('handles updating a cost category', () => {
    component.find('NonPersonnelCost').prop('handleEditCategory')(
      3,
      'new category'
    );
    expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
      expenses: { 3: { category: 'new category' } }
    });
  });

  it('handles updating a cost description', () => {
    component.find('NonPersonnelCost').prop('handleEditDesc')(3, 'new desc');
    expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
      expenses: { 3: { desc: 'new desc' } }
    });
  });

  it('handles editing a cost FY total', () => {
    component.find('NonPersonnelCost').prop('handleEditCost')(3, 2027, 982357);
    expect(props.updateActivity).toHaveBeenCalledWith(
      'activity key',
      {
        expenses: { 3: { years: { 2027: 982357 } } }
      },
      true
    );
  });

  it('handles deleting a cost', () => {
    component.find('NonPersonnelCost').prop('handleDelete')();
    expect(props.removeExpense).toHaveBeenCalledWith(
      'activity key',
      'cost key'
    );
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
