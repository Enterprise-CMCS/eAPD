import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './activities';
import * as apdActions from './apd';

const mockStore = configureStore([thunk]);

describe('activities actions', () => {
  const updatedBudgetAction = state => ({
    type: apdActions.UPDATE_BUDGET,
    state
  });

  it('addActivity creates ADD_ACTIVITY action', () => {
    const store = mockStore({ apd: { data: { years: 'years' } } });

    const expectedActions = [
      {
        type: actions.ADD_ACTIVITY,
        years: 'years'
      }
    ];

    store.dispatch(actions.addActivity());

    expect(store.getActions()).toEqual(expectedActions);
  });

  // These are the actions that JUST take an activity ID
  [
    ['addActivityGoal', 'ADD_ACTIVITY_GOAL'],
    ['addActivityMilestone', 'ADD_ACTIVITY_MILESTONE'],
    ['expandActivitySection', 'EXPAND_ACTIVITY_SECTION'],
    ['removeActivity', 'REMOVE_ACTIVITY', true],
    ['toggleActivitySection', 'TOGGLE_ACTIVITY_SECTION']
  ].forEach(([method, action, updatesBudget]) => {
    it(`${method} creates ${action} action`, () => {
      const store = mockStore({});

      const expectedActions = [
        {
          type: actions[action],
          id: 'activity id'
        }
      ];
      if (updatesBudget) {
        expectedActions.push(updatedBudgetAction({}));
      }

      store.dispatch(actions[method]('activity id'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // These are the ADD_* actions that take an activity ID, but
  // are also loaded with years data
  [
    ['addActivityContractor', 'ADD_ACTIVITY_CONTRACTOR'],
    ['addActivityExpense', 'ADD_ACTIVITY_EXPENSE'],
    ['addActivityStatePerson', 'ADD_ACTIVITY_STATE_PERSON']
  ].forEach(([method, action]) => {
    it(`${method} creates ${action} action`, () => {
      const store = mockStore({ apd: { data: { years: 'years' } } });

      const expectedActions = [
        { type: actions[action], id: 'activity id', years: 'years' }
      ];

      store.dispatch(actions[method]('activity id'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // These are the REMOVE_* actions that take an activity ID and
  // and item ID
  [
    [
      'removeActivityContractor',
      'REMOVE_ACTIVITY_CONTRACTOR',
      'contractorId',
      true
    ],
    ['removeActivityGoal', 'REMOVE_ACTIVITY_GOAL', 'goalIdx'],
    ['removeActivityExpense', 'REMOVE_ACTIVITY_EXPENSE', 'expenseId', true],
    ['removeActivityMilestone', 'REMOVE_ACTIVITY_MILESTONE', 'milestoneIdx'],
    [
      'removeActivityStatePerson',
      'REMOVE_ACTIVITY_STATE_PERSON',
      'personId',
      true
    ]
  ].forEach(([method, action, idName, updatesBudget]) => {
    it(`${method} creates ${action} action`, () => {
      const state = { apd: { data: { years: 'years' } } };
      const store = mockStore(state);

      const expectedActions = [
        {
          type: actions[action],
          id: 'activity id',
          [idName]: 'item id'
        }
      ];
      if (updatesBudget) {
        expectedActions.push(updatedBudgetAction(state));
      }

      store.dispatch(actions[method]('activity id', 'item id'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('updateActivity', () => {
    it('creates UPDATE_ACTIVITY action, but does not update the budget if this is not an expense update', () => {
      const store = mockStore({});
      const updates = { this: 'is', my: 'update' };

      const expectedActions = [
        { type: actions.UPDATE_ACTIVITY, id: 'activity id', updates }
      ];

      store.dispatch(actions.updateActivity('activity id', updates));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates UPDATE_ACTIVITY action, and updates the budget if this is not an expense update', () => {
    const state = { this: 'is', my: 'state' };
    const store = mockStore(state);
    const updates = { this: 'is', my: 'update' };

    const expectedActions = [
      { type: actions.UPDATE_ACTIVITY, id: 'activity id', updates },
      { type: apdActions.UPDATE_BUDGET, state }
    ];

    store.dispatch(actions.updateActivity('activity id', updates, true));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
