import sinon from 'sinon';

// The last person on the moon re-boards the Lunar Excursion Module on December
// 13, 1972.  (As everyone knows, December is the 11th month.)  FFY 1973.  Set
// this clock before we import anything, so that the stuff we import will use
// our faked-out clock.
const mockClock = sinon.useFakeTimers(new Date(1972, 11, 13).getTime());

// Need to use require() here instead of import, because apparently Babel will
// reorder code and put imports before everything else.  The upshot is that
// the code under test would get loaded before the clock is faked, and the util
// library computes years as soon as it's loaded, so...  require() is left
// alone, so it will come after the clock fakery.  :pixar-joy:
const imported = require('./activities');

const activities = imported.default;
const {
  aggregateByYear,
  getCategoryTotals,
  getActivityCategoryTotals,
  getActivityTotals,
  setKeyGenerator
} = imported;

describe('activities reducer', () => {
  afterAll(() => {
    mockClock.restore();
  });

  const initialState = {
    byKey: {},
    allKeys: []
  };

  const newContractor = keyFn => ({
    key: keyFn(),
    desc: '',
    end: '',
    name: '',
    start: '',
    files: [],
    years: { '1973': 0, '1974': 0 },
    hourly: {
      useHourly: false,
      data: {
        '1973': { hours: '', rate: '' },
        '1974': { hours: '', rate: '' }
      }
    }
  });

  const newPerson = keyFn => ({
    key: keyFn(),
    desc: '',
    title: '',
    isKeyPersonnel: false,
    years: { '1973': { amt: '', perc: '' }, '1974': { amt: '', perc: '' } }
  });

  const newGoal = keyFn => ({ key: keyFn(), description: '', objective: '' });

  const newExpense = keyFn => ({
    key: keyFn(),
    category: 'Hardware, software, and licensing',
    desc: '',
    years: { '1973': 0, '1974': 0 }
  });

  const newMilestone = keyFn => ({
    key: keyFn(),
    milestone: '',
    endDate: ''
  });

  const newActivity = keyFn => ({
    key: keyFn(),
    alternatives: '',
    contractorResources: [newContractor(keyFn)],
    costAllocationDesc: '',
    costAllocation: {
      '1973': { ffp: { federal: 90, state: 10 }, other: 0 },
      '1974': { ffp: { federal: 90, state: 10 }, other: 0 }
    },
    description: '',
    expenses: [newExpense(keyFn)],
    fundingSource: 'HIT',
    goals: [newGoal(keyFn)],
    meta: { expanded: false },
    plannedStartDate: '',
    plannedEndDate: '',
    schedule: [newMilestone(keyFn)],
    name: '',
    otherFundingDesc: '',
    standardsAndConditions: {
      businessResults: '',
      documentation: '',
      industryStandards: '',
      interoperability: '',
      keyPersonnel: '',
      leverage: '',
      minimizeCost: '',
      mita: '',
      mitigationStrategy: '',
      modularity: '',
      reporting: ''
    },
    statePersonnel: [newPerson(keyFn)],
    summary: '',
    quarterlyFFP: {
      '1973': {
        '1': {
          combined: 25,
          contractors: 25,
          state: 25
        },
        '2': {
          combined: 25,
          contractors: 25,
          state: 25
        },
        '3': {
          combined: 25,
          contractors: 25,
          state: 25
        },
        '4': {
          combined: 25,
          contractors: 25,
          state: 25
        }
      },
      '1974': {
        '1': {
          combined: 25,
          contractors: 25,
          state: 25
        },
        '2': {
          combined: 25,
          contractors: 25,
          state: 25
        },
        '3': {
          combined: 25,
          contractors: 25,
          state: 25
        },
        '4': {
          combined: 25,
          contractors: 25,
          state: 25
        }
      }
    },
    years: ['1973', '1974']
  });

  const uniqueKey = () => {
    let key = 0;
    return () => {
      key += 1;
      return key;
    };
  };

  const stateWithOne = {
    byKey: { '1': newActivity(uniqueKey()) },
    allKeys: ['1']
  };

  it('should handle initial state', () => {
    expect(activities(undefined, {})).toEqual(initialState);
  });

  it('handles adding a new activity', () => {
    const key = () => 'new key';
    setKeyGenerator(key);
    expect(
      activities(initialState, {
        type: 'ADD_ACTIVITY',
        years: ['1973', '1974']
      })
    ).toEqual({
      byKey: {
        'new key': newActivity(key)
      },
      allKeys: ['new key']
    });
  });

  it('handles removing an activity', () => {
    expect(
      activities(stateWithOne, { type: 'REMOVE_ACTIVITY', key: '1' })
    ).toEqual({
      byKey: {},
      allKeys: []
    });
  });

  [
    [
      'contractor',
      'ADD_ACTIVITY_CONTRACTOR',
      'contractorResources',
      newContractor(() => 'new key')
    ],
    [
      'person',
      'ADD_ACTIVITY_STATE_PERSON',
      'statePersonnel',
      newPerson(() => 'new key')
    ],
    ['goal', 'ADD_ACTIVITY_GOAL', 'goals', newGoal(() => 'new key')],
    [
      'expense',
      'ADD_ACTIVITY_EXPENSE',
      'expenses',
      newExpense(() => 'new key')
    ],
    [
      'schedule milestone',
      'ADD_ACTIVITY_MILESTONE',
      'schedule',
      newMilestone(() => 'new key')
    ]
  ].forEach(([title, action, property, newObject]) => {
    it(`handles adding ${title}`, () => {
      expect(
        activities(stateWithOne, {
          type: action,
          key: 1,
          years: ['1973', '1974']
        })
      ).toEqual({
        ...stateWithOne,
        byKey: {
          '1': {
            ...stateWithOne.byKey['1'],
            [property]: [
              ...stateWithOne.byKey['1'][property],
              {
                ...newObject,
                key: 'new key'
              }
            ]
          }
        }
      });
    });
  });

  [
    {
      title: 'contractor',
      action: 'REMOVE_ACTIVITY_CONTRACTOR',
      actionKey: 'contractorKey',
      property: 'contractorResources'
    },
    {
      title: 'state personnel',
      action: 'REMOVE_ACTIVITY_STATE_PERSON',
      actionKey: 'personKey',
      property: 'statePersonnel'
    },
    {
      title: 'goal',
      action: 'REMOVE_ACTIVITY_GOAL',
      actionKey: 'goalKey',
      property: 'goals'
    },
    {
      title: 'expense',
      action: 'REMOVE_ACTIVITY_EXPENSE',
      actionKey: 'expenseKey',
      property: 'expenses'
    },
    {
      title: 'schedule milestone',
      action: 'REMOVE_ACTIVITY_MILESTONE',
      actionKey: 'milestoneKey',
      property: 'schedule'
    }
  ].forEach(({ title, action, actionKey, property }) => {
    it(`handles removing ${title}`, () => {
      const propId = Math.max(
        ...stateWithOne.byKey['1'][property].map(p => p.key)
      );

      expect(
        activities(stateWithOne, {
          type: action,
          key: 1,
          [actionKey]: propId
        })
      ).toEqual({
        ...stateWithOne,
        byKey: {
          '1': {
            ...stateWithOne.byKey['1'],
            [property]: stateWithOne.byKey['1'][property].slice(
              0,
              stateWithOne.byKey['1'][property].length - 1
            )
          }
        }
      });
    });
  });

  it('sets the activity to expanded', () => {
    expect(
      activities(stateWithOne, { type: 'EXPAND_ACTIVITY_SECTION', key: 1 })
    ).toEqual({
      ...stateWithOne,
      byKey: {
        '1': {
          ...stateWithOne.byKey['1'],
          meta: { ...stateWithOne.byKey['1'].meta, expanded: true }
        }
      }
    });
  });

  it('it toggles the activity expanded flag', () => {
    expect(
      activities(
        { byKey: { '1': { meta: { expanded: false } } } },
        { type: 'TOGGLE_ACTIVITY_SECTION', key: 1 }
      )
    ).toEqual({ byKey: { '1': { meta: { expanded: true } } } });

    expect(
      activities(
        { byKey: { '1': { meta: { expanded: true } } } },
        { type: 'TOGGLE_ACTIVITY_SECTION', key: 1 }
      )
    ).toEqual({ byKey: { '1': { meta: { expanded: false } } } });
  });

  it('handles arbitrary activity updates', () => {
    expect(
      activities(stateWithOne, {
        type: 'UPDATE_ACTIVITY',
        key: '1',
        updates: {
          descShort: 'new short description',
          standardsAndConditions: { mita: 'new mita text' }
        }
      })
    ).toEqual({
      ...stateWithOne,
      byKey: {
        '1': {
          ...stateWithOne.byKey['1'],
          descShort: 'new short description',
          standardsAndConditions: {
            ...stateWithOne.byKey['1'].standardsAndConditions,
            mita: 'new mita text'
          }
        }
      }
    });
  });

  it('handles hourly data toggling', () => {
    const activity = stateWithOne.byKey['1'];
    const contractor = activity.contractorResources[0];
    const contractorNew = {
      ...contractor,
      years: { '1973': 100, '1974': 200 }
    };

    const state = {
      ...stateWithOne,
      byKey: {
        '1': {
          ...activity,
          contractorResources: [contractorNew]
        }
      }
    };

    expect(
      activities(state, {
        type: 'TOGGLE_ACTIVITY_CONTRACTOR_HOURLY',
        key: '1',
        contractorKey: contractor.key,
        useHourly: true
      })
    ).toEqual({
      ...state,
      byKey: {
        '1': {
          ...state.byKey['1'],
          contractorResources: [
            {
              ...contractorNew,
              years: { '1973': 0, '1974': 0 },
              hourly: {
                ...contractorNew.hourly,
                useHourly: true
              }
            }
          ]
        }
      }
    });
  });

  describe('it responds to APD updates', () => {
    const type = 'UPDATE_APD';

    it(`doesn't do anything if APD years aren't being updated`, () => {
      expect(activities(stateWithOne, { type, updates: {} })).toEqual(
        stateWithOne
      );
    });

    it('adds year-based pieces if a new year was added', () => {
      expect(
        activities(stateWithOne, {
          type,
          updates: { years: ['1973', '1974', '1975'] }
        })
      ).toEqual({
        ...stateWithOne,
        byKey: {
          '1': {
            ...stateWithOne.byKey['1'],
            contractorResources: [
              {
                ...stateWithOne.byKey['1'].contractorResources[0],
                years: {
                  ...stateWithOne.byKey['1'].contractorResources[0].years,
                  '1975': 0
                }
              }
            ],
            costAllocation: {
              ...stateWithOne.byKey['1'].costAllocation,
              '1975': { ffp: { federal: 90, state: 10 }, other: 0 }
            },
            expenses: [
              {
                ...stateWithOne.byKey['1'].expenses[0],
                years: {
                  ...stateWithOne.byKey['1'].expenses[0].years,
                  '1975': 0
                }
              }
            ],
            statePersonnel: [
              {
                ...stateWithOne.byKey['1'].statePersonnel[0],
                years: {
                  ...stateWithOne.byKey['1'].statePersonnel[0].years,
                  '1975': { amt: '', perc: '' }
                }
              }
            ],
            quarterlyFFP: {
              ...stateWithOne.byKey['1'].quarterlyFFP,
              '1975': {
                '1': {
                  combined: 25,
                  contractors: 25,
                  state: 25
                },
                '2': {
                  combined: 25,
                  contractors: 25,
                  state: 25
                },
                '3': {
                  combined: 25,
                  contractors: 25,
                  state: 25
                },
                '4': {
                  combined: 25,
                  contractors: 25,
                  state: 25
                }
              }
            },
            years: ['1973', '1974', '1975']
          }
        }
      });
    });

    it('removes year-based pieces if a year was removed', () => {
      expect(
        activities(stateWithOne, { type, updates: { years: ['1973'] } })
      ).toEqual({
        ...stateWithOne,
        byKey: {
          '1': {
            ...stateWithOne.byKey['1'],
            contractorResources: [
              {
                ...stateWithOne.byKey['1'].contractorResources[0],
                years: {
                  '1973': 0
                }
              }
            ],
            costAllocation: {
              '1973': { ffp: { federal: 90, state: 10 }, other: 0 }
            },
            expenses: [
              {
                ...stateWithOne.byKey['1'].expenses[0],
                years: {
                  '1973': 0
                }
              }
            ],
            statePersonnel: [
              {
                ...stateWithOne.byKey['1'].statePersonnel[0],
                years: {
                  '1973': { amt: '', perc: '' }
                }
              }
            ],
            quarterlyFFP: {
              '1973': stateWithOne.byKey['1'].quarterlyFFP['1973'],
              total: stateWithOne.byKey['1'].quarterlyFFP.total
            },
            years: ['1973']
          }
        }
      });
    });
  });

  describe('handles receiving an APD', () => {
    it(`adds a default activity if the APD doesn't have any`, () => {
      const key = () => 'default key';
      setKeyGenerator(key);
      expect(
        activities(
          {
            anything: 'we',
            want: 'because',
            it: 'gets',
            replaced: true
          },
          {
            type: 'SELECT_APD',
            data: {
              activities: []
            }
          }
        )
      ).toEqual({
        byKey: {
          'default key': {
            ...newActivity(key),
            name: 'Program Administration',
            fundingSource: 'HIT',
            years: ['1973', '1974'],
            meta: { ...newActivity.meta, expanded: true }
          }
        },
        allKeys: ['default key']
      });
    });

    it('ingests activities from the incoming APD object', () => {
      setKeyGenerator(() => 'incoming key');
      expect(
        activities(
          {
            anything: 'we',
            want: 'because',
            it: 'gets',
            replaced: true
          },
          {
            type: 'SELECT_APD',
            apd: {
              activities: [
                { key: 'a' },
                { key: 'b', name: 'Program Administration' },
                { key: 'c' }
              ]
            }
          }
        )
      ).toEqual({
        byKey: {
          a: { key: 'a', meta: { expanded: false } },
          b: {
            key: 'b',
            meta: { expanded: true },
            name: 'Program Administration'
          },
          c: { key: 'c', meta: { expanded: false } }
        },
        allKeys: ['a', 'b', 'c']
      });
    });
  });

  describe('assigns IDs to new activities after an APD save', () => {
    it('skips updates if all local activities have IDs', () => {
      const state = {
        byKey: {
          activityKey1: { id: 1, key: 'activityKey1', name: 'one' },
          activityKey2: { id: 2, key: 'activityKey2', name: 'two' }
        }
      };

      expect(activities(state, { type: 'SAVE_APD_SUCCESS', data: {} })).toEqual(
        state
      );
    });

    it('only updates local activities without IDs', () => {
      expect(
        activities(
          {
            byKey: {
              activityKey1: { id: 1, key: 'activityKey1', name: 'one' },
              activityKey2: { key: 'activityKey2', name: 'two' }
            }
          },
          {
            type: 'SAVE_APD_SUCCESS',
            data: {
              activities: [
                {
                  id: 1,
                  name: 'one'
                },
                {
                  id: 2,
                  name: 'two'
                }
              ]
            }
          }
        )
      ).toMatchObject({
        byKey: {
          activityKey1: { id: 1, key: 'activityKey1', name: 'one' },
          activityKey2: { id: 2, key: 'activityKey2', name: 'two' }
        }
      });
    });
  });

  it('aggregates data by year', () => {
    expect(
      aggregateByYear(
        [{ '1972': 10, '1973': 7 }, { '1972': 46, '1973': 8 }],
        ['1972', '1973']
      )
    ).toEqual({ '1972': 56, '1973': 15 });
  });

  it('gets yearly totals for a category', () => {
    expect(
      getCategoryTotals(
        [
          { years: { '1972': 10, '1973': 7 } },
          { years: { '1972': 46, '1973': 8 } }
        ],
        ['1972', '1973']
      )
    ).toEqual({ '1972': 56, '1973': 15 });
  });

  it('get cost totals per category per year for an activity', () => {
    expect(
      getActivityCategoryTotals({
        contractorResources: [
          { years: { '1972': 1, '1973': 10 } },
          { years: { '1972': 2, '1973': 20 } },
          { years: { '1972': 3, '1973': 30 } }
        ],
        expenses: [
          { years: { '1972': 2, '1973': 20 } },
          { years: { '1972': 4, '1973': 40 } },
          { years: { '1972': 6, '1973': 60 } }
        ],
        statePersonnel: [
          {
            years: {
              '1972': { amt: 3, perc: 40 },
              '1973': { amt: 30, perc: 100 }
            }
          },
          {
            years: {
              '1972': { amt: 6, perc: 55 },
              '1973': { amt: 60, perc: 90 }
            }
          },
          {
            years: {
              '1972': { amt: 9, perc: 99 },
              '1973': { amt: 90, perc: 30 }
            }
          }
        ],
        years: ['1972', '1973']
      })
    ).toEqual({
      contractors: { '1972': 6, '1973': 60 },
      expenses: { '1972': 12, '1973': 120 },
      statePersonnel: { '1972': 13.41, '1973': 111 }
    });
  });

  it('get cost totals per year for an activity', () => {
    expect(
      getActivityTotals({
        contractorResources: [
          { years: { '1972': 1, '1973': 10 } },
          { years: { '1972': 2, '1973': 20 } },
          { years: { '1972': 3, '1973': 30 } }
        ],
        expenses: [
          { years: { '1972': 2, '1973': 20 } },
          { years: { '1972': 4, '1973': 40 } },
          { years: { '1972': 6, '1973': 60 } }
        ],
        statePersonnel: [
          {
            years: {
              '1972': { amt: 3, perc: 100 },
              '1973': { amt: 30, perc: 80 }
            }
          },
          {
            years: {
              '1972': { amt: 6, perc: 90 },
              '1973': { amt: 60, perc: 100 }
            }
          },
          {
            years: {
              '1972': { amt: 9, perc: 40 },
              '1973': { amt: 90, perc: 10 }
            }
          }
        ],
        years: ['1972', '1973']
      })
    ).toEqual({ '1972': 30, '1973': 273 });
  });
});
