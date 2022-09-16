import {
  selectActivityByIndex,
  selectActivityKeyByIndex,
  selectAllActivities,
  selectCostAllocationForActivityByIndex,
  selectActivityCostSummary,
  selectActivitySchedule,
  selectActivityNonPersonnelCosts,
  selectContractorsByActivityIndex,
  selectActivityStatePersonnel,
  selectActivitiesSidebar,
  selectOMsByActivityIndex,
  selectActivityTotalForBudgetByActivityIndex,
  makeSelectCostAllocateFFPBudget,
  selectActivityCount
} from './activities.selectors';

describe('activities state selectors', () => {
  it('selects the activity count', () => {
    expect(
      selectActivityCount({
        apd: { data: { activities: ['one', { key: 'two' }, 'three'] } }
      })
    ).toEqual(3);
  });

  describe('selecting a single activity from its index', () => {
    it('returns the activity if it exists', () => {
      const state = { apd: { data: { activities: ['one', 'two', 'three'] } } };
      expect(selectActivityByIndex(state, { activityIndex: 2 })).toEqual(
        'three'
      );

      expect(selectActivityByIndex(state, { activityIndex: '2' })).toEqual(
        'three'
      );
    });

    it('returns null if the activity index is out of range or invalid', () => {
      const state = { apd: { data: { activities: ['one'] } } };

      expect(selectActivityByIndex(state, { activityIndex: -1 })).toEqual(null);
      expect(selectActivityByIndex(state, { activityIndex: 1 })).toEqual(null);
      expect(selectActivityByIndex(state, { activityIndex: '-1' })).toEqual(
        null
      );
      expect(selectActivityByIndex(state, { activityIndex: '1' })).toEqual(
        null
      );
    });
  });

  it('selects an activity key from its index', () => {
    expect(
      selectActivityKeyByIndex(
        {
          apd: { data: { activities: ['one', { key: 'two' }, 'three'] } }
        },
        { activityIndex: 1 }
      )
    ).toEqual('two');
  });

  it('selects all activities in the APD', () => {
    expect(
      selectAllActivities({ apd: { data: { activities: 'all activities' } } })
    ).toEqual('all activities');
  });

  it('selects activity cost allocation data by index', () => {
    expect(
      selectCostAllocationForActivityByIndex(
        {
          apd: {
            data: {
              activities: [
                'one',
                { costAllocation: 'cost allocation' },
                'three'
              ]
            }
          }
        },
        { activityIndex: 1 }
      )
    ).toEqual('cost allocation');
  });

  it('selects an activity cost summary by index', () => {
    const state = {
      apd: {
        data: {
          activities: [
            {
              activityId: 'activity one',
              contractorResources: [],
              costAllocation: { 1990: { other: 0 }, 1991: { other: 0 } },
              expenses: [],
              statePersonnel: []
            },
            {
              activityId: 'activity two',
              contractorResources: [
                {
                  name: 'contractor 2.1',
                  hourly: {
                    1990: { hours: 10, rate: 10 },
                    1991: { hours: 20, rate: 20 }
                  },
                  useHourly: false,
                  years: { 1990: 1000, 1991: 2000 }
                },
                {
                  name: 'contractor 2.2',
                  hourly: {
                    1990: { hours: 30, rate: 30 },
                    1991: { hours: 40, rate: 40 }
                  },
                  useHourly: true,
                  years: { 1990: 3000, 1991: 4000 }
                }
              ],
              costAllocation: {
                1990: { other: 10 },
                1991: { other: 20 }
              },
              expenses: [
                {
                  category: 'costly costs',
                  years: { 1990: 500, 1991: 5000 }
                }
              ],
              statePersonnel: [
                {
                  title: 'personnel role',
                  years: {
                    1990: { amt: 100000, perc: 0.5 },
                    1991: { amt: 200000, perc: 2.0 }
                  }
                }
              ]
            },
            'three'
          ],
          keyStatePersonnel: {
            keyPersonnel: [
              {
                costs: { 1990: 100, 1991: 200 },
                hasCosts: true,
                name: 'key person',
                fte: { 1990: 1.0, 1991: 0.75 }
              }
            ]
          },
          years: ['1990', '1991']
        }
      },
      budget: {
        activities: {
          'activity one': {
            costsByFFY: {
              1990: {
                federal: 0,
                medicaid: 0,
                state: 0,
                total: 0
              },
              1991: {
                federal: 0,
                medicaid: 0,
                state: 0,
                total: 0
              }
            }
          },
          'activity two': {
            costsByFFY: {
              1990: {
                federal: 2222,
                medicaid: 3333,
                state: 4444,
                total: 5555
              },
              1991: {
                federal: 6666,
                medicaid: 7777,
                state: 8888,
                total: 9999
              }
            }
          }
        }
      }
    };

    // Select with index 0 to make sure key personnel get wrapped up into
    // the activity.
    expect(selectActivityCostSummary(state, { activityIndex: 0 })).toEqual({
      total: {
        federalShare: 0,
        medicaidShare: 0,
        otherFunding: 0,
        stateShare: 0,
        totalCost: 0
      },
      years: {
        1990: {
          contractorResources: [],
          contractorResourcesTotal: 0,
          federalPercent: 0,
          federalShare: 0,
          keyPersonnel: [
            {
              description: 'key person (APD Key Personnel)',
              totalCost: 100,
              unitCost: 100,
              units: '1 FTE'
            }
          ],
          medicaidShare: 0,
          nonPersonnel: [],
          nonPersonnelTotal: 0,
          otherFunding: 0,
          statePercent: 0,
          statePersonnel: [],
          statePersonnelTotal: 100,
          stateShare: 0,
          totalCost: 0
        },
        1991: {
          contractorResources: [],
          contractorResourcesTotal: 0,
          federalPercent: 0,
          federalShare: 0,
          keyPersonnel: [
            {
              description: 'key person (APD Key Personnel)',
              totalCost: 150,
              unitCost: 200,
              units: '0.75 FTE'
            }
          ],
          medicaidShare: 0,
          nonPersonnel: [],
          nonPersonnelTotal: 0,
          otherFunding: 0,
          statePercent: 0,
          statePersonnel: [],
          statePersonnelTotal: 150,
          stateShare: 0,
          totalCost: 0
        }
      }
    });

    // Select with a different index to make sure they don't.
    expect(selectActivityCostSummary(state, { activityIndex: 1 })).toEqual({
      total: {
        federalShare: 8888,
        medicaidShare: 11110,
        otherFunding: 30,
        stateShare: 13332,
        totalCost: 15554
      },
      years: {
        1990: {
          contractorResources: [
            {
              description: 'contractor 2.1',
              totalCost: 1000,
              unitCost: null,
              units: null
            },
            {
              description: 'contractor 2.2',
              totalCost: 3000,
              unitCost: 30,
              units: '30 hours'
            }
          ],
          contractorResourcesTotal: 4000,
          federalPercent: 0,
          federalShare: 2222,
          keyPersonnel: [],
          medicaidShare: 3333,
          nonPersonnel: [
            {
              description: 'costly costs',
              totalCost: 500,
              unitCost: null,
              units: null
            }
          ],
          nonPersonnelTotal: 500,
          otherFunding: 10,
          statePercent: 0,
          statePersonnel: [
            {
              description: 'personnel role',
              totalCost: 50000,
              unitCost: 100000,
              units: '0.5 FTE'
            }
          ],
          statePersonnelTotal: 50000,
          stateShare: 4444,
          totalCost: 5555
        },
        1991: {
          contractorResources: [
            {
              description: 'contractor 2.1',
              totalCost: 2000,
              unitCost: null,
              units: null
            },
            {
              description: 'contractor 2.2',
              totalCost: 4000,
              unitCost: 40,
              units: '40 hours'
            }
          ],
          contractorResourcesTotal: 6000,
          federalPercent: 0,
          federalShare: 6666,
          keyPersonnel: [],
          medicaidShare: 7777,
          nonPersonnel: [
            {
              description: 'costly costs',
              totalCost: 5000,
              unitCost: null,
              units: null
            }
          ],
          nonPersonnelTotal: 5000,
          otherFunding: 20,
          statePercent: 0,
          statePersonnel: [
            {
              description: 'personnel role',
              totalCost: 400000,
              unitCost: 200000,
              units: '2 FTE'
            }
          ],
          statePersonnelTotal: 400000,
          stateShare: 8888,
          totalCost: 9999
        }
      }
    });
  });

  it('selects the quarterly FFP budget data for an activity by activity key', () => {
    const selector = makeSelectCostAllocateFFPBudget();
    expect(
      selector(
        {
          apd: {
            data: { years: ['1991', '1992'] },
            activities: [{ activityId: 'activity key' }]
          },
          budget: {
            activities: {
              'activity key': {
                quarterlyFFP: {
                  years: { 1990: 'quarterly ffp budget' },
                  total: 'total ffp budget'
                }
              }
            }
          }
        },
        { activityId: 'activity key' }
      )
    ).toEqual({
      quarterlyFFP: {
        1990: 'quarterly ffp budget',
        total: 'total ffp budget'
      },
      years: ['1991', '1992']
    });
  });

  it('selects the full activities schedule', () => {
    expect(
      selectActivitySchedule({
        apd: {
          data: {
            activities: [
              {
                name: 'activity 1',
                plannedEndDate: '1997-01-01',
                plannedStartDate: '1996-06-01',
                schedule: [
                  // Test all the weird orderings to make sure sorting works
                  // as intended.
                  { milestone: 'milestone 1.1', endDate: '1996-12-15' },
                  { milestone: 'milestone 1.2', endDate: '1996-08-02' },
                  { milestone: 'milestone 1.3', endDate: '1998-08-02' },
                  { milestone: 'milestone 1.4', endDate: '1994-08-02' },
                  { milestone: 'milestone 1.5', endDate: '1996-12-14' },
                  { milestone: 'milestone 1.6', endDate: '1996-12-16' },
                  { milestone: 'milestone 1.7', endDate: '1996-12-15' },
                  { milestone: 'milestone 1.8', endDate: '1996-08-02' }
                ]
              }
            ]
          }
        }
      })
    ).toEqual([
      {
        dateRange: '6/1/1996 - 1/1/1997',
        end: '1/1/1997',
        milestones: [
          { end: '8/2/1994', name: 'milestone 1.4', start: '6/1/1996' },
          { end: '8/2/1996', name: 'milestone 1.2', start: '6/1/1996' },
          { end: '8/2/1996', name: 'milestone 1.8', start: '6/1/1996' },
          { end: '12/14/1996', name: 'milestone 1.5', start: '6/1/1996' },
          { end: '12/15/1996', name: 'milestone 1.1', start: '6/1/1996' },
          { end: '12/15/1996', name: 'milestone 1.7', start: '6/1/1996' },
          { end: '12/16/1996', name: 'milestone 1.6', start: '6/1/1996' },
          { end: '8/2/1998', name: 'milestone 1.3', start: '6/1/1996' }
        ],
        name: 'activity 1',
        start: '6/1/1996'
      }
    ]);
  });

  it('selects activity non-personnel costs by index', () => {
    expect(
      selectActivityNonPersonnelCosts(
        {
          apd: {
            data: {
              activities: ['one', { expenses: 'non-personnel costs' }, 'two']
            }
          }
        },
        1
      )
    ).toEqual('non-personnel costs');
  });

  it('selects activity state personnel by index', () => {
    expect(
      selectActivityStatePersonnel(
        {
          apd: {
            data: {
              activities: ['one', { statePersonnel: 'state personnel' }, 'two']
            }
          }
        },
        { activityIndex: 1 }
      )
    ).toEqual('state personnel');
  });

  describe('selects activity contractors by index', () => {
    it('returns contractors if the activity exists', () => {
      expect(
        selectContractorsByActivityIndex(
          {
            apd: {
              data: {
                activities: [
                  'one',
                  { contractorResources: 'contractors' },
                  'two'
                ]
              }
            }
          },
          { activityIndex: 1 }
        )
      ).toEqual('contractors');
    });

    it('returns null if the activity does not exist', () => {
      expect(
        selectContractorsByActivityIndex(
          {
            apd: {
              data: {
                activities: []
              }
            }
          },
          { activityIndex: 1 }
        )
      ).toEqual(null);
    });
  });

  it('maps activities into nav bar objects', () => {
    expect(
      selectActivitiesSidebar({
        apd: {
          data: {
            activities: [
              { key: 'activity 1', name: 'Alice' },
              { key: 'activity 2', name: 'Bob' }
            ]
          }
        }
      })
    ).toEqual([
      { key: 'activity 1', anchor: 'activity-activity 1', name: 'Alice' },
      { key: 'activity 2', anchor: 'activity-activity 2', name: 'Bob' }
    ]);
  });

  describe('selects activity OKRs by index', () => {
    it('returns OKRs if the activity exists', () => {
      expect(
        selectOMsByActivityIndex(
          {
            apd: {
              data: {
                activities: [
                  'one',
                  { outcomes: 'outcomes and metrics' },
                  'three'
                ]
              }
            }
          },
          { activityIndex: 1 }
        )
      ).toEqual('outcomes and metrics');
    });

    it('returns null if the activity does not exist', () => {
      expect(
        selectOMsByActivityIndex(
          {
            apd: {
              data: {
                activities: []
              }
            }
          },
          { activityIndex: 1 }
        )
      ).toEqual(null);
    });
  });

  describe('selects activity total by index', () => {
    it('returns outcomes if the activity exists', () => {
      expect(
        selectActivityTotalForBudgetByActivityIndex(
          {
            budget: {
              activityTotals: [
                {
                  data: {
                    otherFunding: { 2020: { total: 0 }, 2021: { total: 0 } }
                  }
                }
              ]
            }
          },
          { activityIndex: 0 }
        )
      ).toEqual({
        data: { otherFunding: { 2020: { total: 0 }, 2021: { total: 0 } } }
      });
    });

    it('returns null if the activity does not exist', () => {
      expect(
        selectActivityTotalForBudgetByActivityIndex(
          {
            budget: {
              activityTotals: []
            }
          },
          { activityIndex: 1 }
        )
      ).toEqual(null);
    });
  });
});
