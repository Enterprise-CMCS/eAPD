import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

import { saveMilestone, removeMilestone } from './scheduleAndMilestones';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for activity schedule and milestones section', () => {
  const state = {
    apd: {
      data: {
        activities: [
          {
            schedule: []
          }
        ]
      }
    }
  };

  const store = mockStore(state);

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for saving a new milestone', () => {
    store.dispatch(saveMilestone(0, 0, {}));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/0/schedule/-',
        state
      },
      {
        type: EDIT_APD,
        path: '/activities/0/schedule/0',
        value: {}
      }
    ]);
  });

  it('dispatches an action for removing a milestone if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removeMilestone(17, 9, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/17/schedule/9'
      }
    ]);
  });

  it('dispatches an action for updating an existing milestone', () => {
    const storeWithMilestone = mockStore({
      apd: {
        data: {
          activities: [
            {
              schedule: [{ milestone: 'milestone' }]
            }
          ]
        }
      }
    });
    const milestone = { key: '123', milestone: 'test milestone updated' };
    storeWithMilestone.dispatch(saveMilestone(0, 0, milestone));

    expect(storeWithMilestone.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/0/schedule/0',
        value: milestone
      }
    ]);
  });
});
