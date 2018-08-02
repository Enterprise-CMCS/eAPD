import u from 'updeep';

import { UPDATE_ACTIVITY } from '../actions/activities';
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
        action.updates.hieNarrative ||
        action.updates.hitNarrative ||
        action.updates.mmisNarrative ||
        action.updates.programOverview ||
        action.updates.previousActivitySummary
      ) {
        return u({ dirty: true, data: { apd: { ...action.updates } } }, state);
      }
      return u({ dirty: true }, state);

    default:
      return state;
  }
};

export default dirty;
