import u from 'updeep';

import {
  ADD_ACTIVITY_CONTRACTOR,
  ADD_ACTIVITY_DIRTY,
  ADD_ACTIVITY_GOAL,
  ADD_ACTIVITY_EXPENSE,
  ADD_ACTIVITY_MILESTONE,
  ADD_ACTIVITY_STATE_PERSON,
  REMOVE_ACTIVITY,
  REMOVE_ACTIVITY_CONTRACTOR,
  REMOVE_ACTIVITY_GOAL,
  REMOVE_ACTIVITY_EXPENSE,
  REMOVE_ACTIVITY_MILESTONE,
  REMOVE_ACTIVITY_STATE_PERSON,
  UPDATE_ACTIVITY
} from '../actions/activities';
import {
  ADD_APD_KEY_PERSON,
  REMOVE_APD_KEY_PERSON,
  SAVE_APD_SUCCESS,
  SET_KEY_PERSON_PRIMARY,
  SELECT_APD,
  UPDATE_APD
} from '../actions/apd';

const initialState = {
  data: { apd: {}, activities: { byKey: {} } },
  dirty: false
};

const mapActivityPropToAPI = prop => {
  switch (prop) {
    case 'costAllocationDesc':
    case 'otherFundingDesc':
      return 'costAllocationNarrative';
    default:
      return prop;
  }
};

const up = updates =>
  typeof updates === 'object'
    ? Object.entries(updates).reduce(
        (a, [prop, value]) => ({
          ...a,
          [mapActivityPropToAPI(prop)]: up(value)
        }),
        {}
      )
    : true;

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

    case ADD_ACTIVITY_CONTRACTOR:
    case REMOVE_ACTIVITY_CONTRACTOR:
      return u(
        {
          dirty: true,
          data: {
            activities: {
              byKey: { [action.key]: { contractorResources: true } }
            }
          }
        },
        state
      );

    case ADD_ACTIVITY_GOAL:
    case REMOVE_ACTIVITY_GOAL:
      return u(
        {
          dirty: true,
          data: {
            activities: {
              byKey: { [action.key]: { goals: true } }
            }
          }
        },
        state
      );

    case ADD_ACTIVITY_EXPENSE:
    case REMOVE_ACTIVITY_EXPENSE:
      return u(
        {
          dirty: true,
          data: {
            activities: {
              byKey: { [action.key]: { expenses: true } }
            }
          }
        },
        state
      );

    case ADD_ACTIVITY_MILESTONE:
    case REMOVE_ACTIVITY_MILESTONE:
      return u(
        {
          dirty: true,
          data: {
            activities: {
              byKey: { [action.key]: { schedule: true } }
            }
          }
        },
        state
      );

    case ADD_ACTIVITY_STATE_PERSON:
    case REMOVE_ACTIVITY_STATE_PERSON:
      return u(
        {
          dirty: true,
          data: {
            activities: {
              byKey: { [action.key]: { statePersonnel: true } }
            }
          }
        },
        state
      );

    case ADD_APD_KEY_PERSON:
    case REMOVE_ACTIVITY:
    case REMOVE_APD_KEY_PERSON:
    case SET_KEY_PERSON_PRIMARY:
      return u({ dirty: true }, state);

    case UPDATE_ACTIVITY:
      return u(
        {
          dirty: true,
          data: { activities: { byKey: { [action.key]: up(action.updates) } } }
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
