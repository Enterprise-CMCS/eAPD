import dirty from './dirty';
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
  SELECT_APD,
  SET_KEY_PERSON_PRIMARY,
  UPDATE_APD
} from '../actions/apd';

describe('dirty state reducer', () => {
  const initialState = {
    data: { apd: {}, activities: { byKey: {} } },
    dirty: false
  };

  it('should handle initial state', () => {
    expect(dirty(undefined, {})).toEqual(initialState);
  });

  it('should reset when the APD is saved or a new one is selected', () => {
    expect(dirty({}, { type: SAVE_APD_SUCCESS })).toEqual(initialState);
    expect(dirty({}, { type: SELECT_APD })).toEqual(initialState);
  });

  describe('handles the APD being updated', () => {
    it('updates an unfiltered property', () => {
      expect(
        dirty(initialState, {
          type: UPDATE_APD,
          updates: { whatever: 'some value' }
        })
      ).toEqual({
        data: {
          activities: {
            byKey: {}
          },
          apd: {}
        },
        dirty: true
      });
    });

    [
      'federalCitations',
      'incentivePayments',
      'narrativeHIE',
      'narrativeHIT',
      'narrativeMMIS',
      'programOverview',
      'previousActivityExpenses',
      'previousActivitySummary',
      'stateProfile'
    ].forEach(prop => {
      it(prop, () => {
        expect(
          dirty(initialState, {
            type: UPDATE_APD,
            updates: { [prop]: 'some value' }
          })
        ).toEqual({
          data: {
            activities: {
              byKey: {}
            },
            apd: {
              [prop]: 'some value'
            }
          },
          dirty: true
        });
      });
    });
  });

  it('should handle adding an activity', () => {
    const activity = {
      key: 'abc123',
      name: 'Bob, How ya doin?'
    };
    expect(
      dirty(initialState, { type: ADD_ACTIVITY_DIRTY, data: activity })
    ).toEqual({
      data: {
        apd: {},
        activities: {
          byKey: {
            abc123: {
              key: 'abc123',
              name: 'Bob, How ya doin?'
            }
          }
        }
      },
      dirty: true
    });
  });

  [
    ['adding a key person', ADD_APD_KEY_PERSON],
    ['removing an activity', REMOVE_ACTIVITY],
    ['should handl removing a key person', REMOVE_APD_KEY_PERSON],
    ['setting a primary key person', SET_KEY_PERSON_PRIMARY]
  ].forEach(([desc, action]) => {
    it(`should handle ${desc}`, () => {
      expect(dirty(initialState, { type: action })).toEqual({
        data: { apd: {}, activities: { byKey: {} } },
        dirty: true
      });
    });
  });

  describe('it handles updating an activity', () => {
    it('where the property name is the same in the state and on the API call', () => {
      expect(
        dirty(initialState, {
          type: UPDATE_ACTIVITY,
          key: 'abc123',
          updates: { something: { is: 'here' } }
        })
      ).toEqual({
        data: {
          apd: {},
          activities: {
            byKey: {
              abc123: {
                something: { is: true }
              }
            }
          }
        },
        dirty: true
      });
    });

    it('where the property name needs to be mapped from state to API', () => {
      const expected = {
        data: {
          apd: {},
          activities: {
            byKey: {
              abc123: {
                costAllocationNarrative: true
              }
            }
          }
        },
        dirty: true
      };

      expect(
        dirty(initialState, {
          type: UPDATE_ACTIVITY,
          key: 'abc123',
          updates: {
            costAllocationDesc: 'new one of these'
          }
        })
      ).toEqual(expected);

      expect(
        dirty(initialState, {
          type: UPDATE_ACTIVITY,
          key: 'abc123',
          updates: {
            otherFundingDesc: 'new one of these'
          }
        })
      ).toEqual(expected);
    });
  });

  describe('it handles adding and removing activity components', () => {
    Object.entries({
      [ADD_ACTIVITY_CONTRACTOR]: 'contractorResources',
      [REMOVE_ACTIVITY_CONTRACTOR]: 'contractorResources',
      [ADD_ACTIVITY_GOAL]: 'goals',
      [REMOVE_ACTIVITY_GOAL]: 'goals',
      [ADD_ACTIVITY_EXPENSE]: 'expenses',
      [REMOVE_ACTIVITY_EXPENSE]: 'expenses',
      [ADD_ACTIVITY_MILESTONE]: 'schedule',
      [REMOVE_ACTIVITY_MILESTONE]: 'schedule',
      [ADD_ACTIVITY_STATE_PERSON]: 'statePersonnel',
      [REMOVE_ACTIVITY_STATE_PERSON]: 'statePersonnel'
    }).forEach(([type, prop]) => {
      it(type, () => {
        expect(dirty(initialState, { type, key: 'abc123' })).toEqual({
          data: {
            apd: {},
            activities: {
              byKey: {
                abc123: {
                  [prop]: true
                }
              }
            }
          },
          dirty: true
        });
      });
    });
  });
});
