import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as actions from './activities';
import * as apdActions from './apd';

import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('activities actions', () => {
  const updatedBudgetAction = state => ({
    type: apdActions.UPDATE_BUDGET,
    state
  });

  it('addActivity creates ADD_ACTIVITY action', () => {
    const newActivity = { this: 'is', a: 'new', activity: 'abc123' };
    const state = {
      activities: { allKeys: [], byKey: {} },
      apd: { data: { years: 'years' } }
    };

    let firstStoreCall = true;
    const store = mockStore(() => {
      if (!firstStoreCall) {
        state.activities.allKeys.push('abc123');
        state.activities.byKey.abc123 = newActivity;
      }

      firstStoreCall = false;
      return state;
    });

    const expectedActions = [
      {
        type: actions.ADD_ACTIVITY,
        years: 'years'
      },
      { type: apdActions.UPDATE_BUDGET, state },
      { type: actions.ADD_ACTIVITY_DIRTY, data: newActivity }
    ];

    store.dispatch(actions.addActivity());

    expect(store.getActions()).toEqual(expectedActions);
  });

  // These are the actions that JUST take an activity key
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
          key: 'activity key'
        }
      ];
      if (updatesBudget) {
        expectedActions.push(updatedBudgetAction({}));
      }

      store.dispatch(actions[method]('activity key'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // These are the ADD_* actions that take an activity key, but
  // are also loaded with years data
  [
    ['addActivityExpense', 'ADD_ACTIVITY_EXPENSE'],
    ['addActivityStatePerson', 'ADD_ACTIVITY_STATE_PERSON']
  ].forEach(([method, action]) => {
    it(`${method} creates ${action} action`, () => {
      const store = mockStore({ apd: { data: { years: 'years' } } });

      const expectedActions = [
        { type: actions[action], key: 'activity key', years: 'years' }
      ];

      store.dispatch(actions[method]('activity key'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // These are the REMOVE_* actions that take an activity key and
  // and item key
  [
    [
      'removeActivityContractor',
      'REMOVE_ACTIVITY_CONTRACTOR',
      'contractorKey',
      true
    ],
    ['removeActivityGoal', 'REMOVE_ACTIVITY_GOAL', 'goalKey'],
    ['removeActivityExpense', 'REMOVE_ACTIVITY_EXPENSE', 'expenseKey', true],
    ['removeActivityMilestone', 'REMOVE_ACTIVITY_MILESTONE', 'milestoneKey'],
    [
      'removeActivityStatePerson',
      'REMOVE_ACTIVITY_STATE_PERSON',
      'personKey',
      true
    ]
  ].forEach(([method, action, keyName, updatesBudget]) => {
    it(`${method} creates ${action} action`, () => {
      const state = { apd: { data: { years: 'years' } } };
      const store = mockStore(state);

      const expectedActions = [
        {
          type: actions[action],
          key: 'activity key',
          [keyName]: 'item key'
        }
      ];
      if (updatesBudget) {
        expectedActions.push(updatedBudgetAction(state));
      }

      store.dispatch(actions[method]('activity key', 'item key'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('updateActivity', () => {
    it('creates UPDATE_ACTIVITY action, but does not update the budget if this is not an expense update', () => {
      const store = mockStore({});
      const updates = { this: 'is', my: 'update' };

      const expectedActions = [
        { type: actions.UPDATE_ACTIVITY, key: 'activity key', updates }
      ];

      store.dispatch(actions.updateActivity('activity key', updates));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates UPDATE_ACTIVITY action, and updates the budget if this is an expense update', () => {
    const state = { this: 'is', my: 'state' };
    const store = mockStore(state);
    const updates = { this: 'is', my: 'update' };

    const expectedActions = [
      { type: actions.UPDATE_ACTIVITY, key: 'activity key', updates },
      { type: apdActions.UPDATE_BUDGET, state }
    ];

    store.dispatch(actions.updateActivity('activity key', updates, true));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates a contractor and saves the APD', async () => {
    const state = {
      activities: {
        byKey: {
          'activity key': {
            id: 'activity id',
            contractorResources: [{ id: 1 }, { id: 2 }]
          }
        }
      },
      apd: { data: { years: 'years' } }
    };
    const store = mockStore(state);
    const save = sinon.stub().returns(
      sinon.stub().resolves({
        activities: [
          {
            id: 'activity id',
            contractorResources: [
              { id: 1 },
              { id: 2 },
              { id: 'new contractor id' }
            ]
          }
        ]
      })
    );

    const expectedActions = [
      { type: 'ADD_ACTIVITY_CONTRACTOR', key: 'activity key', years: 'years' },
      {
        type: 'UPDATE_ACTIVITY',
        key: 'activity key',
        updates: { contractorResources: { 2: { id: 'new contractor id' } } }
      }
    ];

    await store.dispatch(
      actions.addActivityContractor('activity key', { save })
    );

    expect(store.getActions()).toEqual(expectedActions);
    expect(save.calledOnce).toEqual(true);
  });

  it('creates TOGGLE_ACTIVITY_CONTRACTOR_HOURLY action, and updates the budget', () => {
    const state = { this: 'is', my: 'state' };
    const store = mockStore(state);

    const payload = {
      key: 'activity key',
      contractorKey: 'contractor key',
      useHourly: true
    };

    const expectedActions = [
      {
        type: actions.TOGGLE_ACTIVITY_CONTRACTOR_HOURLY,
        ...payload
      },
      { type: apdActions.UPDATE_BUDGET, state }
    ];

    store.dispatch(
      actions.toggleActivityContractorHourly(...Object.values(payload))
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('can upload a new file attached to a contractor', async () => {
    const state = {
      activities: {
        byKey: {
          'activity key': {
            contractorResources: [
              {
                id: 'contractor id',
                files: [{ id: 1 }, { id: 2 }]
              }
            ]
          }
        }
      }
    };
    const store = mockStore(state);

    const file = {
      name: 'bob',
      size: 'big',
      type: 'serif',
      category: 'famous piano painters of the 1730s'
    };

    const formdata = {
      append: sinon.stub()
    };
    const FormData = sinon.stub().returns(formdata);

    fetchMock.onPost('/files/contractor/contractor id').reply(200, {
      id: 'new file id',
      metadata: 'bloop bloop'
    });

    const notifyAction = sinon.stub().returns({ type: 'notification stub' });

    const expectedActions = [
      {
        type: actions.UPDATE_ACTIVITY,
        key: 'activity key',
        updates: {
          contractorResources: {
            0: {
              files: [
                { id: 1 },
                { id: 2 },
                {
                  id: 'new file id',
                  metadata: 'bloop bloop',
                  url: 'undefined/files/new file id'
                }
              ]
            }
          }
        }
      },
      { type: 'notification stub' }
    ];

    await store.dispatch(
      actions.uploadActivityContractorFile(
        'activity key',
        0,
        'magic document',
        file,
        { FormData, notifyAction }
      )
    );

    expect(store.getActions()).toEqual(expectedActions);
    expect(formdata.append.calledWith('file', file)).toEqual(true);
    expect(formdata.append.calledWith('metadata', JSON.stringify(file)));
    expect(notifyAction.calledWith('Upload successful!')).toEqual(true);
  });

  it('notifies when a contractor file upload files', async () => {
    const store = mockStore({});

    const file = {
      name: 'bob',
      size: 'big',
      type: 'serif',
      category: 'famous piano painters of the 1730s'
    };

    fetchMock.onPost('/files/contractor/contractor id').reply(500);

    const notifyAction = sinon.stub().returns({ type: 'notification stub' });

    const expectedActions = [{ type: 'notification stub' }];

    await store.dispatch(
      actions.uploadActivityContractorFile(
        'activity key',
        0,
        'magic document',
        file,
        { FormData, notifyAction }
      )
    );

    expect(store.getActions()).toEqual(expectedActions);
    expect(notifyAction.calledWith('Upload failed (not-sure-why)')).toEqual(
      true
    );
  });

  it('deletes a contractor file', async () => {
    const state = {
      activities: {
        byKey: {
          'activity key': {
            contractorResources: [
              { id: 'contractor 1' },
              {
                id: 'contractor 2',
                files: [{ id: 'file 1' }, { id: 'file 2' }]
              }
            ]
          }
        }
      }
    };
    const store = mockStore(state);

    const notifyAction = sinon.stub().returns({ type: 'notification stub' });

    const expectedActions = [
      {
        type: 'UPDATE_ACTIVITY',
        key: 'activity key',
        updates: { contractorResources: { 1: { files: [{ id: 'file 1' }] } } }
      },
      { type: 'notification stub' }
    ];

    fetchMock.onDelete('/files/contractor/contractor 2/file 2').reply(204);

    await store.dispatch(
      actions.deleteActivityContractorFile('activity key', 1, 1, {
        notifyAction
      })
    );

    expect(store.getActions()).toEqual(expectedActions);
    expect(notifyAction.calledWith('File deleted successfully!')).toEqual(true);
  });

  it('notifies when a contractor file delete files', async () => {
    const store = mockStore();
    const notifyAction = sinon.stub().returns({ type: 'notification stub' });

    const expectedActions = [{ type: 'notification stub' }];

    await store.dispatch(
      actions.deleteActivityContractorFile('activity key', 1, 1, {
        notifyAction
      })
    );

    expect(store.getActions()).toEqual(expectedActions);
    expect(
      notifyAction.calledWith('Deleting file failed (not-sure-why)')
    ).toEqual(true);
  });
});
