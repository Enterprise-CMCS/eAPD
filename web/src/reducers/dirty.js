import u from 'updeep';

import { ADD_ACTIVITY_DIRTY, UPDATE_ACTIVITY } from '../actions/activities';
import { UPDATE_APD, SAVE_APD_SUCCESS, SELECT_APD } from '../actions/apd';

const initialState = {
  data: { apd: {}, activities: { byKey: {} } },
  dirty: false
};

const dirty = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_APD_SUCCESS:
    case SELECT_APD:
      return initialState;

    case ADD_ACTIVITY_DIRTY:
      // when an activity is added, we need to add the
      // whole new activity to the dirty state since it
      // is populated with initial data
      return u(
        {
          dirty: true,
          data: { activities: { byKey: { [action.data.key]: action.data } } }
        },
        state
      );

    case UPDATE_ACTIVITY:
      return u(
        {
          dirty: true,
          data: { activities: { byKey: { [action.key]: action.updates } } }
        },
        state
      );

    case UPDATE_APD:
      if (
        action.updates.federalCitations ||
        action.updates.incentivePayments ||
        action.updates.narrativeHIE ||
        action.updates.narrativeHIT ||
        action.updates.narrativeMMIS ||
        action.updates.programOverview ||
        action.updates.previousActivityExpenses ||
        action.updates.previousActivitySummary ||
        action.updates.stateProfile
      ) {
        return u({ dirty: true, data: { apd: { ...action.updates } } }, state);
      }
      return u({ dirty: true }, state);

    default:
      return state;
  }
};

export default dirty;
