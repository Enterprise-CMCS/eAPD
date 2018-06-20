import activities, {
  aggregateByYear,
  getCategoryTotals,
  getActivityCategoryTotals,
  getActivityTotals
} from './activities';

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
    years: { '2018': 0, '2019': 0 }
  };

  const newPerson = {
    id: 0,
    desc: '',
    title: '',
    years: { '2018': { amt: '', perc: '' }, '2019': { amt: '', perc: '' } }
  };

  const newGoal = { desc: '', obj: '' };

  const newExpense = {
    id: 0,
    category: 'Hardware, software, and licensing',
    desc: '',
    years: { '2018': 0, '2019': 0 }
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
    costAllocationDesc: '',
    costAllocation: {
      '2018': { ffp: { federal: 90, state: 10 }, other: 0 },
      '2019': { ffp: { federal: 90, state: 10 }, other: 0 }
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
    years: ['2018', '2019']
  };

  const stateWithOne = { byId: { '1': newActivity }, allIds: [1] };

  it('should handle initial state', () => {
    expect(activities(undefined, {})).toEqual(initialState);
  });

  it('handles adding a new activity', () => {
    expect(
      activities(initialState, {
        type: 'ADD_ACTIVITY',
        years: ['2018', '2019']
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
          years: ['2018', '2019']
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
          updates: { years: ['2018', '2019', '2020'] }
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
                  '2020': 0
                }
              },
              {
                ...stateWithOne.byId['1'].contractorResources[1],
                years: {
                  ...stateWithOne.byId['1'].contractorResources[1].years,
                  '2020': 0
                }
              },
              {
                ...stateWithOne.byId['1'].contractorResources[2],
                years: {
                  ...stateWithOne.byId['1'].contractorResources[2].years,
                  '2020': 0
                }
              }
            ],
            costAllocation: {
              ...stateWithOne.byId['1'].costAllocation,
              '2020': { ffp: { federal: 90, state: 10 }, other: 0 }
            },
            expenses: [
              {
                ...stateWithOne.byId['1'].expenses[0],
                years: {
                  ...stateWithOne.byId['1'].expenses[0].years,
                  '2020': 0
                }
              },
              {
                ...stateWithOne.byId['1'].expenses[1],
                years: {
                  ...stateWithOne.byId['1'].expenses[1].years,
                  '2020': 0
                }
              },
              {
                ...stateWithOne.byId['1'].expenses[2],
                years: {
                  ...stateWithOne.byId['1'].expenses[2].years,
                  '2020': 0
                }
              }
            ],
            statePersonnel: [
              {
                ...stateWithOne.byId['1'].statePersonnel[0],
                years: {
                  ...stateWithOne.byId['1'].statePersonnel[0].years,
                  '2020': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byId['1'].statePersonnel[1],
                years: {
                  ...stateWithOne.byId['1'].statePersonnel[1].years,
                  '2020': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byId['1'].statePersonnel[2],
                years: {
                  ...stateWithOne.byId['1'].statePersonnel[2].years,
                  '2020': { amt: '', perc: '' }
                }
              }
            ],
            years: ['2018', '2019', '2020']
          }
        }
      });
    });

    it('removes year-based pieces if a year was removed', () => {
      expect(
        activities(stateWithOne, { type, updates: { years: ['2018'] } })
      ).toEqual({
        ...stateWithOne,
        byId: {
          '1': {
            ...stateWithOne.byId['1'],
            contractorResources: [
              {
                ...stateWithOne.byId['1'].contractorResources[0],
                years: {
                  '2018': 0
                }
              },
              {
                ...stateWithOne.byId['1'].contractorResources[1],
                years: {
                  '2018': 0
                }
              },
              {
                ...stateWithOne.byId['1'].contractorResources[2],
                years: {
                  '2018': 0
                }
              }
            ],
            costAllocation: {
              '2018': { ffp: { federal: 90, state: 10 }, other: 0 }
            },
            expenses: [
              {
                ...stateWithOne.byId['1'].expenses[0],
                years: {
                  '2018': 0
                }
              },
              {
                ...stateWithOne.byId['1'].expenses[1],
                years: {
                  '2018': 0
                }
              },
              {
                ...stateWithOne.byId['1'].expenses[2],
                years: {
                  '2018': 0
                }
              }
            ],
            statePersonnel: [
              {
                ...stateWithOne.byId['1'].statePersonnel[0],
                years: {
                  '2018': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byId['1'].statePersonnel[1],
                years: {
                  '2018': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byId['1'].statePersonnel[2],
                years: {
                  '2018': { amt: '', perc: '' }
                }
              }
            ],
            years: ['2018']
          }
        }
      });
    });
  });

  describe('handles receiving an APD', () => {
    it(`adds a default activity if the APD doesn't have any`, () => {
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
        byId: {
          '1': {
            ...newActivity,
            id: 1,
            name: 'Program Administration',
            fundingSource: 'HIT',
            years: ['2018', '2019']
          }
        },
        allIds: ['1']
      });
    });

    it('ingests activities from the incoming APD object', () => {
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
                {
                  id: 998,
                  name: 'activity 998',
                  // fundingSource TODO:
                  summary: 'summary',
                  description: 'description',
                  alternatives: 'different things',
                  costAllocationNarrative: {
                    methodology: 'how',
                    otherSources: 'which'
                  },
                  costAllocation: [
                    {
                      year: 2018,
                      federalPercent: 0.8,
                      statePercent: 0.15,
                      otherAmount: 100
                    },
                    {
                      year: 2019,
                      federalPercent: 0.6,
                      statePercent: 0.2,
                      otherAmount: 200
                    }
                  ],
                  goals: [
                    {
                      description: 'goal 1 description',
                      objective: 'goal 1 objective'
                    },
                    {
                      description: 'goal 2 description',
                      objective: 'goal 2 objective'
                    }
                  ],
                  schedule: [
                    {
                      id: 'm1',
                      milestone: 'milestone name',
                      plannedStart: 'start',
                      plannedEnd: 'end'
                    }
                  ],
                  statePersonnel: [
                    {
                      id: 'person 1',
                      title: 'job title 1',
                      description: 'desc 1',
                      years: [
                        { year: '2018', cost: 100, fte: 0.5 },
                        { year: '2019', cost: 200, fte: 0.8 }
                      ]
                    },
                    {
                      id: 'person 2',
                      title: 'job title 2',
                      description: 'desc 2',
                      years: [
                        { year: '2018', cost: 300, fte: 0.3 },
                        { year: '2019', cost: 400, fte: 0.6 }
                      ]
                    }
                  ],
                  contractorResources: [
                    {
                      id: 'contractor 1',
                      name: 'contractor 1',
                      description: 'desc 1',
                      start: 'start 1',
                      end: 'end 1',
                      years: [
                        { year: '2018', cost: '1000' },
                        { year: '2019', cost: '2000' }
                      ]
                    },
                    {
                      id: 'contractor 2',
                      name: 'contractor 2',
                      description: 'desc 2',
                      start: 'start 2',
                      end: 'end 2',
                      years: [
                        { year: '2018', cost: '3000' },
                        { year: '2019', cost: '4000' }
                      ]
                    }
                  ],
                  expenses: [
                    {
                      id: 'e1',
                      category: 'category 1',
                      description: 'desc 1',
                      entries: [
                        { year: '2018', amount: 10 },
                        { year: '2019', amount: 20 }
                      ]
                    },
                    {
                      id: 'e2',
                      category: 'category 2',
                      description: 'desc 2',
                      entries: [
                        { year: '2018', amount: 30 },
                        { year: '2019', amount: 40 }
                      ]
                    }
                  ],
                  standardsAndConditions: {
                    businessResults: 'biz results',
                    documentation: 'docs',
                    industryStandards: 'standards',
                    interoperability: 'interop',
                    keyPersonnel: 'locksmiths',
                    leverage: 'lever',
                    modularity: 'lego blocks',
                    minimizeCost: 'save money',
                    mita: 'meeta',
                    mitigationStrategy: 'run away',
                    reporting: 'moop moop'
                  }
                }
              ],
              years: ['2018', '2019']
            }
          }
        )
      ).toEqual({
        byId: {
          '998': {
            id: 998,
            name: 'activity 998',
            fundingSource: 'HIT',
            years: ['2018', '2019'],
            descShort: 'summary',
            descLong: 'description',
            altApproach: 'different things',
            costAllocationDesc: 'how',
            otherFundingDesc: 'which',
            costAllocation: {
              2018: { ffp: { federal: 80, state: 15 }, other: 100 },
              2019: { ffp: { federal: 60, state: 20 }, other: 200 }
            },
            goals: [
              { desc: 'goal 1 description', obj: 'goal 1 objective' },
              { desc: 'goal 2 description', obj: 'goal 2 objective' }
            ],
            milestones: [
              { id: 'm1', name: 'milestone name', start: 'start', end: 'end' }
            ],
            statePersonnel: [
              {
                id: 'person 1',
                title: 'job title 1',
                desc: 'desc 1',
                years: {
                  2018: { amt: 100, perc: 50 },
                  2019: { amt: 200, perc: 80 }
                }
              },
              {
                id: 'person 2',
                title: 'job title 2',
                desc: 'desc 2',
                years: {
                  2018: { amt: 300, perc: 30 },
                  2019: { amt: 400, perc: 60 }
                }
              }
            ],
            contractorResources: [
              {
                id: 'contractor 1',
                name: 'contractor 1',
                desc: 'desc 1',
                start: 'start 1',
                end: 'end 1',
                years: { 2018: 1000, 2019: 2000 }
              },
              {
                id: 'contractor 2',
                name: 'contractor 2',
                desc: 'desc 2',
                start: 'start 2',
                end: 'end 2',
                years: { 2018: 3000, 2019: 4000 }
              }
            ],
            expenses: [
              {
                id: 'e1',
                category: 'category 1',
                desc: 'desc 1',
                years: { 2018: 10, 2019: 20 }
              },
              {
                id: 'e2',
                category: 'category 2',
                desc: 'desc 2',
                years: { 2018: 30, 2019: 40 }
              }
            ],
            standardsAndConditions: {
              bizResults: 'biz results',
              documentation: 'docs',
              industry: 'standards',
              interoperability: 'interop',
              keyPersonnel: 'locksmiths',
              leverage: 'lever',
              minimizeCost: 'save money',
              mita: 'meeta',
              mitigation: 'run away',
              modularity: 'lego blocks',
              reporting: 'moop moop'
            },
            meta: { expanded: false }
          }
        },
        allIds: ['998']
      });
    });
  });

  it('aggregates data by year', () => {
    expect(
      aggregateByYear(
        [{ '2018': 10, '2019': 7 }, { '2018': 46, '2019': 8 }],
        ['2018', '2019']
      )
    ).toEqual({ '2018': 56, '2019': 15 });
  });

  it('gets yearly totals for a category', () => {
    expect(
      getCategoryTotals([
        { years: { '2018': 10, '2019': 7 } },
        { years: { '2018': 46, '2019': 8 } }
      ])
    ).toEqual({ '2018': 56, '2019': 15 });
  });

  it('get cost totals per category per year for an activity', () => {
    expect(
      getActivityCategoryTotals({
        contractorResources: [
          { years: { '2018': 1, '2019': 10 } },
          { years: { '2018': 2, '2019': 20 } },
          { years: { '2018': 3, '2019': 30 } }
        ],
        expenses: [
          { years: { '2018': 2, '2019': 20 } },
          { years: { '2018': 4, '2019': 40 } },
          { years: { '2018': 6, '2019': 60 } }
        ],
        statePersonnel: [
          { years: { '2018': { amt: 3 }, '2019': { amt: 30 } } },
          { years: { '2018': { amt: 6 }, '2019': { amt: 60 } } },
          { years: { '2018': { amt: 9 }, '2019': { amt: 90 } } }
        ]
      })
    ).toEqual({
      contractors: { '2018': 6, '2019': 60 },
      expenses: { '2018': 12, '2019': 120 },
      statePersonnel: { '2018': 18, '2019': 180 }
    });
  });

  it('get cost totals per year for an activity', () => {
    expect(
      getActivityTotals({
        contractorResources: [
          { years: { '2018': 1, '2019': 10 } },
          { years: { '2018': 2, '2019': 20 } },
          { years: { '2018': 3, '2019': 30 } }
        ],
        expenses: [
          { years: { '2018': 2, '2019': 20 } },
          { years: { '2018': 4, '2019': 40 } },
          { years: { '2018': 6, '2019': 60 } }
        ],
        statePersonnel: [
          { years: { '2018': { amt: 3 }, '2019': { amt: 30 } } },
          { years: { '2018': { amt: 6 }, '2019': { amt: 60 } } },
          { years: { '2018': { amt: 9 }, '2019': { amt: 90 } } }
        ],
        years: ['2018', '2019']
      })
    ).toEqual({ '2018': 36, '2019': 360 });
  });
});
