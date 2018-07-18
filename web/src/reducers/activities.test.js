import activities, {
  aggregateByYear,
  getCategoryTotals,
  getActivityCategoryTotals,
  getActivityTotals,
  setKeyGenerator
} from './activities';

describe('activities reducer', () => {
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
    years: { '2018': 0, '2019': 0 }
  });

  const newPerson = keyFn => ({
    key: keyFn(),
    desc: '',
    title: '',
    years: { '2018': { amt: '', perc: '' }, '2019': { amt: '', perc: '' } }
  });

  const newGoal = keyFn => ({ key: keyFn(), desc: '', obj: '' });

  const newExpense = keyFn => ({
    key: keyFn(),
    category: 'Hardware, software, and licensing',
    desc: '',
    years: { '2018': 0, '2019': 0 }
  });

  const newMilestone = keyFn => ({
    key: keyFn(),
    end: '',
    name: '',
    start: ''
  });

  const newActivity = keyFn => ({
    key: keyFn(),
    altApproach: '',
    contractorResources: [
      newContractor(keyFn),
      newContractor(keyFn),
      newContractor(keyFn)
    ],
    costAllocationDesc: '',
    costAllocation: {
      '2018': { ffp: { federal: 90, state: 10 }, other: 0 },
      '2019': { ffp: { federal: 90, state: 10 }, other: 0 }
    },
    descLong: '',
    descShort: '',
    expenses: [newExpense(keyFn), newExpense(keyFn), newExpense(keyFn)],
    fundingSource: 'HIT',
    goals: [newGoal(keyFn)],
    meta: { expanded: false },
    milestones: [newMilestone(keyFn)],
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
    statePersonnel: [newPerson(keyFn), newPerson(keyFn), newPerson(keyFn)],
    quarterlyFFP: {
      '2018': {
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
      '2019': {
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
    years: ['2018', '2019']
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
        years: ['2018', '2019']
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
      'milestone',
      'ADD_ACTIVITY_MILESTONE',
      'milestones',
      newMilestone(() => 'new key')
    ]
  ].forEach(([title, action, property, newObject]) => {
    it(`handles adding ${title}`, () => {
      expect(
        activities(stateWithOne, {
          type: action,
          key: 1,
          years: ['2018', '2019']
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
      title: 'milestone',
      action: 'REMOVE_ACTIVITY_MILESTONE',
      actionKey: 'milestoneKey',
      property: 'milestones'
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

  describe('it toggles the activity expanded flag', () => {
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
        byKey: {
          '1': {
            ...stateWithOne.byKey['1'],
            contractorResources: [
              {
                ...stateWithOne.byKey['1'].contractorResources[0],
                years: {
                  ...stateWithOne.byKey['1'].contractorResources[0].years,
                  '2020': 0
                }
              },
              {
                ...stateWithOne.byKey['1'].contractorResources[1],
                years: {
                  ...stateWithOne.byKey['1'].contractorResources[1].years,
                  '2020': 0
                }
              },
              {
                ...stateWithOne.byKey['1'].contractorResources[2],
                years: {
                  ...stateWithOne.byKey['1'].contractorResources[2].years,
                  '2020': 0
                }
              }
            ],
            costAllocation: {
              ...stateWithOne.byKey['1'].costAllocation,
              '2020': { ffp: { federal: 90, state: 10 }, other: 0 }
            },
            expenses: [
              {
                ...stateWithOne.byKey['1'].expenses[0],
                years: {
                  ...stateWithOne.byKey['1'].expenses[0].years,
                  '2020': 0
                }
              },
              {
                ...stateWithOne.byKey['1'].expenses[1],
                years: {
                  ...stateWithOne.byKey['1'].expenses[1].years,
                  '2020': 0
                }
              },
              {
                ...stateWithOne.byKey['1'].expenses[2],
                years: {
                  ...stateWithOne.byKey['1'].expenses[2].years,
                  '2020': 0
                }
              }
            ],
            statePersonnel: [
              {
                ...stateWithOne.byKey['1'].statePersonnel[0],
                years: {
                  ...stateWithOne.byKey['1'].statePersonnel[0].years,
                  '2020': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byKey['1'].statePersonnel[1],
                years: {
                  ...stateWithOne.byKey['1'].statePersonnel[1].years,
                  '2020': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byKey['1'].statePersonnel[2],
                years: {
                  ...stateWithOne.byKey['1'].statePersonnel[2].years,
                  '2020': { amt: '', perc: '' }
                }
              }
            ],
            quarterlyFFP: {
              ...stateWithOne.byKey['1'].quarterlyFFP,
              '2020': {
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
        byKey: {
          '1': {
            ...stateWithOne.byKey['1'],
            contractorResources: [
              {
                ...stateWithOne.byKey['1'].contractorResources[0],
                years: {
                  '2018': 0
                }
              },
              {
                ...stateWithOne.byKey['1'].contractorResources[1],
                years: {
                  '2018': 0
                }
              },
              {
                ...stateWithOne.byKey['1'].contractorResources[2],
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
                ...stateWithOne.byKey['1'].expenses[0],
                years: {
                  '2018': 0
                }
              },
              {
                ...stateWithOne.byKey['1'].expenses[1],
                years: {
                  '2018': 0
                }
              },
              {
                ...stateWithOne.byKey['1'].expenses[2],
                years: {
                  '2018': 0
                }
              }
            ],
            statePersonnel: [
              {
                ...stateWithOne.byKey['1'].statePersonnel[0],
                years: {
                  '2018': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byKey['1'].statePersonnel[1],
                years: {
                  '2018': { amt: '', perc: '' }
                }
              },
              {
                ...stateWithOne.byKey['1'].statePersonnel[2],
                years: {
                  '2018': { amt: '', perc: '' }
                }
              }
            ],
            quarterlyFFP: {
              '2018': stateWithOne.byKey['1'].quarterlyFFP['2018'],
              total: stateWithOne.byKey['1'].quarterlyFFP.total
            },
            years: ['2018']
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
            years: ['2018', '2019'],
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
                {
                  id: 998,
                  name: 'activity 998',
                  fundingSource: 'bob',
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
                      id: 'g1',
                      description: 'goal 1 description',
                      objective: 'goal 1 objective'
                    },
                    {
                      id: 'g2',
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
                  },
                  quarterlyFFP: [
                    {
                      q1: {
                        combined: 0.2,
                        contractors: 0.3,
                        state: 0.4
                      },
                      q2: {
                        combined: 0.4,
                        contractors: 0.3,
                        state: 0.2
                      },
                      q3: {
                        combined: 0.3,
                        contractors: 0.2,
                        state: 0.4
                      },
                      q4: {
                        combined: 0.3,
                        contractors: 0.4,
                        state: 0.2
                      },
                      year: 2018
                    },
                    {
                      q1: {
                        combined: 0.25,
                        contractors: 0.25,
                        state: 0.25
                      },
                      q2: {
                        combined: 0.25,
                        contractors: 0.25,
                        state: 0.25
                      },
                      q3: {
                        combined: 0.25,
                        contractors: 0.25,
                        state: 0.25
                      },
                      q4: {
                        combined: 0.25,
                        contractors: 0.25,
                        state: 0.25
                      },
                      year: 2019
                    }
                  ]
                }
              ],
              years: ['2018', '2019']
            }
          }
        )
      ).toEqual({
        byKey: {
          'incoming key': {
            id: 998,
            key: 'incoming key',
            name: 'activity 998',
            fundingSource: 'bob',
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
              {
                id: 'g1',
                key: 'incoming key',
                desc: 'goal 1 description',
                obj: 'goal 1 objective'
              },
              {
                id: 'g2',
                key: 'incoming key',
                desc: 'goal 2 description',
                obj: 'goal 2 objective'
              }
            ],
            milestones: [
              {
                id: 'm1',
                key: 'incoming key',
                name: 'milestone name',
                start: 'start',
                end: 'end'
              }
            ],
            statePersonnel: [
              {
                id: 'person 1',
                key: 'incoming key',
                title: 'job title 1',
                desc: 'desc 1',
                years: {
                  2018: { amt: 100, perc: 50 },
                  2019: { amt: 200, perc: 80 }
                }
              },
              {
                id: 'person 2',
                key: 'incoming key',
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
                key: 'incoming key',
                name: 'contractor 1',
                desc: 'desc 1',
                start: 'start 1',
                end: 'end 1',
                years: { 2018: 1000, 2019: 2000 }
              },
              {
                id: 'contractor 2',
                key: 'incoming key',
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
                key: 'incoming key',
                category: 'category 1',
                desc: 'desc 1',
                years: { 2018: 10, 2019: 20 }
              },
              {
                id: 'e2',
                key: 'incoming key',
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
            quarterlyFFP: {
              '2018': {
                '1': {
                  combined: 20,
                  contractors: 30,
                  state: 40
                },
                '2': {
                  combined: 40,
                  contractors: 30,
                  state: 20
                },
                '3': {
                  combined: 30,
                  contractors: 20,
                  state: 40
                },
                '4': {
                  combined: 30,
                  contractors: 40,
                  state: 20
                }
              },
              '2019': {
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
            meta: { expanded: false }
          }
        },
        allKeys: ['incoming key']
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
          {
            years: {
              '2018': { amt: 3, perc: 40 },
              '2019': { amt: 30, perc: 100 }
            }
          },
          {
            years: {
              '2018': { amt: 6, perc: 55 },
              '2019': { amt: 60, perc: 90 }
            }
          },
          {
            years: {
              '2018': { amt: 9, perc: 99 },
              '2019': { amt: 90, perc: 30 }
            }
          }
        ]
      })
    ).toEqual({
      contractors: { '2018': 6, '2019': 60 },
      expenses: { '2018': 12, '2019': 120 },
      statePersonnel: { '2018': 13.41, '2019': 111 }
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
          {
            years: {
              '2018': { amt: 3, perc: 100 },
              '2019': { amt: 30, perc: 80 }
            }
          },
          {
            years: {
              '2018': { amt: 6, perc: 90 },
              '2019': { amt: 60, perc: 100 }
            }
          },
          {
            years: {
              '2018': { amt: 9, perc: 40 },
              '2019': { amt: 90, perc: 10 }
            }
          }
        ],
        years: ['2018', '2019']
      })
    ).toEqual({ '2018': 30, '2019': 273 });
  });
});
