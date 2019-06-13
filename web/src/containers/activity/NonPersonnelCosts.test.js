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
