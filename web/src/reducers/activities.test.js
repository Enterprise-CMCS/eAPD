import activities from './activities';

describe('activities reducer', () => {
  const initialState = {
    byId: {},
    allIds: []
  };

  const newContractor = {
    id: 0,
    desc: '',
    end: '',
    name: '',
    start: '',
    years: { '1': 0, '2': 0 }
  };

  const newPerson = {
    id: 0,
    desc: '',
    title: '',
    years: { '1': { amt: '', perc: '' }, '2': { amt: '', perc: '' } }
  };

  const newGoal = { desc: '', obj: '' };

  const newExpense = {
    id: 0,
    category: 'Hardware, software, and licensing',
    desc: '',
    years: { '1': 0, '2': 0 }
  };

  const newMilestone = { end: '', name: '', start: '' };

  const newActivity = {
    id: 1,
    altApproach: '',
    contractorResources: [
      {
        ...newContractor,
        id: 1
      },
      {
        ...newContractor,
        id: 2
      },
      {
        ...newContractor,
        id: 3
      }
    ],
    costAllocateDesc: '',
    costFFP: {
      '1': { fed: 90, other: 0, state: 10 },
      '2': { fed: 90, other: 0, state: 10 }
    },
    descLong: '',
    descShort: '',
    expenses: [
      {
        ...newExpense,
        id: 1
      },
      {
        ...newExpense,
        id: 2
      },
      {
        ...newExpense,
        id: 3
      }
    ],
    fundingSource: 'HIT',
    goals: [{ ...newGoal }],
    meta: { expanded: false },
    milestones: [{ ...newMilestone }, { ...newMilestone }, { ...newMilestone }],
    name: '',
    otherFundingAmt: '',
    otherFundingDesc: '',
    standardsAndConditions: {
      bizResults: '',
      documentation: '',
      industry: '',
      interoperability: '',
      keyPersonnel: '',
      leverage: '',
      minimizeCost: '',
      mita: '',
      mitigation: '',
      modularity: '',
      reporting: ''
    },
    statePersonnel: [
      {
        ...newPerson,
        id: 1
      },
      {
        ...newPerson,
        id: 2
      },
      {
        ...newPerson,
        id: 3
      }
    ],
    years: ['1', '2']
  };

  const stateWithOne = { byId: { '1': newActivity }, allIds: [1] };

  it('should handle initial state', () => {
    expect(activities(undefined, {})).toEqual(initialState);
  });

  it('handles adding a new activity', () => {
    expect(
      activities(initialState, {
        type: 'ADD_ACTIVITY',
        years: ['1', '2']
      })
    ).toEqual({
      byId: {
        '1': newActivity
      },
      allIds: [1]
    });
  });

  it('handles removing an activity', () => {
    expect(
      activities(stateWithOne, { type: 'REMOVE_ACTIVITY', id: 1 })
    ).toEqual({
      byId: {},
      allIds: []
    });
  });

  [
    [
      'contractor',
      'ADD_ACTIVITY_CONTRACTOR',
      'contractorResources',
      newContractor
    ],
    ['person', 'ADD_ACTIVITY_STATE_PERSON', 'statePersonnel', newPerson],
    ['goal', 'ADD_ACTIVITY_GOAL', 'goals', newGoal],
    ['expense', 'ADD_ACTIVITY_EXPENSE', 'expenses', newExpense],
    ['milestone', 'ADD_ACTIVITY_MILESTONE', 'milestones', newMilestone]
  ].forEach(([title, action, property, newObject]) => {
    it(`handles adding ${title}`, () => {
      expect(
        activities(stateWithOne, {
          type: action,
          id: 1,
          years: ['1', '2']
        })
      ).toEqual({
        ...stateWithOne,
        byId: {
          '1': {
            ...stateWithOne.byId['1'],
            [property]: [
              ...stateWithOne.byId['1'][property],
              {
                ...newObject,
                // For the activity properties that we create distinct
                // IDs for, make sure we made the right new one. For the
                // properties that are just plain arrays, don't bother
                // checking the ID.
                id: stateWithOne.byId['1'][property][0].id
                  ? stateWithOne.byId['1'][property].length + 1
                  : undefined
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
      id: 'contractorId',
      property: 'contractorResources'
    },
    {
      title: 'state personnel',
      action: 'REMOVE_ACTIVITY_STATE_PERSON',
      id: 'personId',
      property: 'statePersonnel'
    },
    {
      title: 'goal',
      action: 'REMOVE_ACTIVITY_GOAL',
      id: 'goalIdx',
      property: 'goals'
    },
    {
      title: 'expense',
      action: 'REMOVE_ACTIVITY_EXPENSE',
      id: 'expenseId',
      property: 'expenses'
    },
    {
      title: 'mileston',
      action: 'REMOVE_ACTIVITY_MILESTONE',
      id: 'milestoneIdx',
      property: 'milestones'
    }
  ].forEach(({ title, action, id, property }) => {
    it(`handles removing ${title}`, () => {
      let propId = stateWithOne.byId['1'][property].length;

      // For properties that have distinct IDs, they being
      // at 1.  For properties that we key off indices,
      // they begin at 0.  This accounts for that.
      if (id.endsWith('Idx')) {
        propId -= 1;
      }

      expect(
        activities(stateWithOne, {
          type: action,
          id: 1,
          [id]: propId
        })
      ).toEqual({
        ...stateWithOne,
        byId: {
          '1': {
            ...stateWithOne.byId['1'],
            [property]: stateWithOne.byId['1'][property].slice(
              0,
              stateWithOne.byId['1'][property].length - 1
            )
          }
        }
      });
    });
  });

  it('sets the activity to expanded', () => {
    expect(
      activities(stateWithOne, { type: 'EXPAND_ACTIVITY_SECTION', id: 1 })
    ).toEqual({
      ...stateWithOne,
      byId: {
        '1': {
          ...stateWithOne.byId['1'],
          meta: { ...stateWithOne.byId['1'].meta, expanded: true }
        }
      }
    });
  });

  describe('it toggles the activity expanded flag', () => {
    expect(
      activities(
        { byId: { '1': { meta: { expanded: false } } } },
        { type: 'TOGGLE_ACTIVITY_SECTION', id: 1 }
      )
    ).toEqual({ byId: { '1': { meta: { expanded: true } } } });

    expect(
      activities(
        { byId: { '1': { meta: { expanded: true } } } },
        { type: 'TOGGLE_ACTIVITY_SECTION', id: 1 }
      )
    ).toEqual({ byId: { '1': { meta: { expanded: false } } } });
  });

  it('handles arbitrary activity updates', () => {
    expect(
      activities(stateWithOne, {
        type: 'UPDATE_ACTIVITY',
        id: '1',
        updates: {
          descShort: 'new short description',
          standardsAndConditions: { mita: 'new mita text' }
        }
      })
    ).toEqual({
      ...stateWithOne,
      byId: {
        '1': {
          ...stateWithOne.byId['1'],
          descShort: 'new short description',
          standardsAndConditions: {
            ...stateWithOne.byId['1'].standardsAndConditions,
            mita: 'new mita text'
          }
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
          updates: { years: ['1', '2', '3'] }
        })
      ).toEqual({
        ...stateWithOne,
        byId: {
          '1': {
            ...stateWithOne.byId['1'],
            contractorResources: [
              {
                ...stateWithOne.byId['1'].contractorResources[0],
                years: {
                  ...stateWithOne.byId['1'].contractorResources[0].years,
                  '3': 0
                }
              },
              {
                ...stateWithOne.byId['1'].contractorResources[1],
                years: {
                  ...stateWithOne.byId['1'].contractorResources[1].years,
                  '3': 0
                }
              },
              {
                ...stateWithOne.byId['1'].contractorResources[2],
                years: {
                  ...stateWithOne.byId['1'].contractorResources[2].years,
                  '3': 0
                }
              }
            ],
            costFFP: {
              ...stateWithOne.byId['1'].costFFP,
              '3': { fed: 90, other: 0, state: 10 }
            },
            expenses: [
              {
                ...stateWithOne.byId['1'].expenses[0],
                years: {
                  ...stateWithOne.byId['1'].expenses[0].years,
                  '3': 0
                }
              },
              {
                ...stateWithOne.byId['1'].expenses[1],
                years: {
                  ...stateWithOne.byId['1'].expenses[1].years,
                  '3': 0
                }
              },
              {
                ...stateWithOne.byId['1'].expenses[2],
                years: {
                  ...stateWithOne.byId['1'].expenses[2].years,
                  '3': 0
                }
              }
            ],
            statePersonnel: [
              {
                ...stateWithOne.byId['1'].statePersonnel[0],
                years: {
                  ...stateWithOne.byId['1'].statePersonnel[0].years,
                  '3': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byId['1'].statePersonnel[1],
                years: {
                  ...stateWithOne.byId['1'].statePersonnel[1].years,
                  '3': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byId['1'].statePersonnel[2],
                years: {
                  ...stateWithOne.byId['1'].statePersonnel[2].years,
                  '3': { amt: '', perc: '' }
                }
              }
            ],
            years: ['1', '2', '3']
          }
        }
      });
    });

    it('removes year-based pieces if a year was removed', () => {
      expect(
        activities(stateWithOne, { type, updates: { years: ['1'] } })
      ).toEqual({
        ...stateWithOne,
        byId: {
          '1': {
            ...stateWithOne.byId['1'],
            contractorResources: [
              {
                ...stateWithOne.byId['1'].contractorResources[0],
                years: {
                  '1': 0
                }
              },
              {
                ...stateWithOne.byId['1'].contractorResources[1],
                years: {
                  '1': 0
                }
              },
              {
                ...stateWithOne.byId['1'].contractorResources[2],
                years: {
                  '1': 0
                }
              }
            ],
            costFFP: {
              '1': { fed: 90, other: 0, state: 10 }
            },
            expenses: [
              {
                ...stateWithOne.byId['1'].expenses[0],
                years: {
                  '1': 0
                }
              },
              {
                ...stateWithOne.byId['1'].expenses[1],
                years: {
                  '1': 0
                }
              },
              {
                ...stateWithOne.byId['1'].expenses[2],
                years: {
                  '1': 0
                }
              }
            ],
            statePersonnel: [
              {
                ...stateWithOne.byId['1'].statePersonnel[0],
                years: {
                  '1': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byId['1'].statePersonnel[1],
                years: {
                  '1': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byId['1'].statePersonnel[2],
                years: {
                  '1': { amt: '', perc: '' }
                }
              }
            ],
            years: ['1']
          }
        }
      });
    });
  });
});
