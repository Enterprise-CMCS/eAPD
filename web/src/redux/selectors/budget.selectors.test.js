import { selectBudgetExecutiveSummary } from './budget.selectors';

describe('Budget selectors', () => {
  // HITECH types
  it('selects the summary field from "summary" when the field is present', () => {
    expect(
      selectBudgetExecutiveSummary({
        apd: {
          data: {
            activities: [
              {
                activityOverview: {
                  summary: 'I am a summary!'
                },
                name: 'Activity 1',
                activitySchedule: {
                  plannedStartDate: '2017-10-01T00:00:00.000Z',
                  plannedEndDate: '2023-09-30T00:00:00.000Z'
                },
                activityId: '235a3d2e'
              }
            ]
          }
        },
        budget: {
          activities: {
            '235a3d2e': {
              costsByFFY: {
                2023: {
                  federal: 2924848,
                  medicaid: 3249831,
                  state: 324983,
                  total: 3354831
                },
                2024: {
                  federal: 1428184,
                  medicaid: 1904245,
                  state: 476061,
                  total: 1904245
                },
                total: {
                  federal: 4353032,
                  medicaid: 5154076,
                  state: 801044,
                  total: 5259076
                }
              }
            }
          }
        }
      })
    ).toEqual([
      {
        activityId: '235a3d2e',
        combined: 5259076,
        dateRange: '10/1/2017 - 9/30/2023',
        federal: 4353032,
        ffys: {
          2023: {
            federal: 2924848,
            medicaid: 3249831,
            state: 324983,
            total: 3354831
          },
          2024: {
            federal: 1428184,
            medicaid: 1904245,
            state: 476061,
            total: 1904245
          }
        },
        medicaid: 5154076,
        name: 'Activity 1',
        summary: 'I am a summary!'
      }
    ]);
  });

  // MMIS types
  it('selects the summary field from "activitySnapshot" when there is no activity summary', () => {
    expect(
      selectBudgetExecutiveSummary({
        apd: {
          data: {
            activities: [
              {
                activityOverview: {
                  activitySnapshot: 'This is a summary',
                  problemStatement: 'This is a problem statement',
                  proposedSolution: 'This is a proposed solution'
                },
                name: 'Activity 1',
                activitySchedule: {
                  plannedStartDate: '2017-10-01T00:00:00.000Z',
                  plannedEndDate: '2024-09-30T00:00:00.000Z'
                },
                activityId: '152a1e2b'
              }
            ]
          }
        },
        budget: {
          activities: {
            '152a1e2b': {
              _id: '643953d4f8c872008fe05be3',
              costsByFFY: {
                2023: {
                  federal: 2924848,
                  medicaid: 3249831,
                  state: 324983,
                  total: 3354831
                },
                2024: {
                  federal: 1428184,
                  medicaid: 1904245,
                  state: 476061,
                  total: 1904245
                },
                total: {
                  federal: 4353032,
                  medicaid: 5154076,
                  state: 801044,
                  total: 5259076
                }
              }
            }
          }
        }
      })
    ).toEqual([
      {
        activityId: '152a1e2b',
        combined: 5259076,
        dateRange: '10/1/2017 - 9/30/2024',
        federal: 4353032,
        ffys: {
          2023: {
            federal: 2924848,
            medicaid: 3249831,
            state: 324983,
            total: 3354831
          },
          2024: {
            federal: 1428184,
            medicaid: 1904245,
            state: 476061,
            total: 1904245
          }
        },
        medicaid: 5154076,
        name: 'Activity 1',
        summary: 'This is a summary'
      }
    ]);
  });
});
