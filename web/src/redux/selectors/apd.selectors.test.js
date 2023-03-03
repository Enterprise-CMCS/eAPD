import {
  selectApds,
  selectApdData,
  selectApdDashboard,
  selectApdYears,
  selectFederalCitations,
  selectIncentivePayments,
  selectIncentivePaymentTotals,
  selectKeyPersonnel,
  selectPreviousActivityExpensesTotalsHITECH,
  selectPreviousActivitySummary,
  selectPreviousHITHIEActivities,
  selectPreviousMMISActivitiesHITECH,
  selectPreviousActivityExpensesTotalsMMIS,
  selectKeyStatePersonnel,
  selectSummary
} from './apd.selectors';

describe('APD selectors', () => {
  it('selects everything in the apd state', () => {
    expect(selectApds({ apd: 'bob' })).toEqual('bob');
  });

  it('selects data for the current APD', () => {
    expect(selectApdData({ apd: { data: 'data' } })).toEqual('data');
  });

  it('selects current APD data necessary for the dashboard', () => {
    expect(
      selectApdDashboard({
        apd: {
          byId: {
            1: {
              id: '1',
              created: 'creation 1',
              name: 'apd 1',
              updated: 'updated 1'
            },
            2: {
              id: '2',
              created: 'creation 2',
              name: 'apd 2',
              updated: 'updated 2'
            }
          }
        }
      })
    ).toEqual([
      { id: '1', created: 'creation 1', name: 'apd 1', updated: 'updated 1' },
      { id: '2', created: 'creation 2', name: 'apd 2', updated: 'updated 2' }
    ]);
  });

  it('selects the years for the current APD', () => {
    expect(selectApdYears({ apd: { data: { years: 'years' } } })).toEqual(
      'years'
    );
  });

  it('selects the federal citations for the current APD', () => {
    expect(
      selectFederalCitations({
        apd: { data: { assurancesAndCompliances: 'citations' } }
      })
    ).toEqual('citations');
  });

  it('selects the raw incentive payment data for the current APD', () => {
    expect(
      selectIncentivePayments({
        apd: { data: { proposedBudget: { incentivePayments: 'payments' } } }
      })
    ).toEqual('payments');
  });

  it('selects the computed totals for incentive payment data for the current APD', () => {
    expect(
      selectIncentivePaymentTotals({
        apd: {
          data: {
            proposedBudget: {
              incentivePayments: {
                ehAmt: {
                  2014: { 1: 10, 2: 20, 3: 30, 4: 40 },
                  2015: { 1: 100, 2: 200, 3: 300, 4: 400 }
                },
                ehCt: {
                  2014: { 1: 1, 2: 2, 3: 3, 4: 4 },
                  2015: { 1: 5, 2: 6, 3: 7, 4: 8 }
                },
                epAmt: {
                  2014: { 1: 10, 2: 15, 3: 20, 4: 25 },
                  2015: { 1: 30, 2: 35, 3: 40, 4: 45 }
                },
                epCt: {
                  2014: { 1: 5, 2: 5, 3: 5, 4: 5 },
                  2015: { 1: 3, 2: 3, 3: 3, 4: 3 }
                }
              }
            },
            years: ['2014', '2015']
          }
        }
      })
    ).toEqual({
      ehAmt: { allYears: 1100, byYear: { 2014: 100, 2015: 1000 } },
      ehCt: { allYears: 36, byYear: { 2014: 10, 2015: 26 } },
      epAmt: { allYears: 220, byYear: { 2014: 70, 2015: 150 } },
      epCt: { allYears: 32, byYear: { 2014: 20, 2015: 12 } }
    });
  });

  it('selects the key personnel for the current APD', () => {
    expect(
      selectKeyPersonnel({
        apd: { data: { keyStatePersonnel: { keyPersonnel: 'people' } } }
      })
    ).toEqual('people');
  });

  it('selects the computed totals for previous activity expenses for the current APD', () => {
    expect(
      selectPreviousActivityExpensesTotalsHITECH({
        apd: {
          data: {
            previousActivities: {
              actualExpenditures: {
                2014: {
                  hithie: { federalActual: 10, totalApproved: 100 },
                  mmis: {
                    50: { federalActual: 20, totalApproved: 200 },
                    75: { federalActual: 30, totalApproved: 300 },
                    90: { federalActual: 40, totalApproved: 400 }
                  }
                },
                2015: {
                  hithie: { federalActual: 5, totalApproved: 100 },
                  mmis: {
                    50: { federalActual: 10, totalApproved: 100 },
                    75: { federalActual: 15, totalApproved: 100 },
                    90: { federalActual: 20, totalApproved: 100 }
                  }
                }
              }
            }
          }
        }
      })
    ).toEqual({
      // Approved is scaled based on the FFP. HIT/HIE is 90%.
      2014: { actual: 100, approved: 775 },
      // Eg, approved here is:
      //    HIT/HIE      MMIS 50       MMIS 75        MMIS 90
      //   (100 * 0.9) + (100 * 0.5) + (100 * 0.75) + (100 * 0.9)
      2015: { actual: 50, approved: 305 }
    });
  });

  it('selects the computed totals for previous activity expenses for the current MMIS APD', () => {
    expect(
      selectPreviousActivityExpensesTotalsMMIS({
        apd: {
          data: {
            previousActivities: {
              actualExpenditures: {
                2014: {
                  ddi: {
                    50: { federalActual: 20, totalApproved: 200 },
                    75: { federalActual: 30, totalApproved: 300 },
                    90: { federalActual: 40, totalApproved: 400 }
                  },
                  mando: {
                    50: { federalActual: 20, totalApproved: 200 },
                    75: { federalActual: 30, totalApproved: 300 }
                  }
                },
                2015: {
                  ddi: {
                    50: { federalActual: 10, totalApproved: 100 },
                    75: { federalActual: 15, totalApproved: 100 },
                    90: { federalActual: 20, totalApproved: 100 }
                  },
                  mando: {
                    50: { federalActual: 10, totalApproved: 100 },
                    75: { federalActual: 15, totalApproved: 100 }
                  }
                }
              }
            }
          }
        }
      })
    ).toEqual({
      2014: { actual: 90, approved: 685 },
      2015: { actual: 45, approved: 215 }
    });
  });

  it('selects the previous activity summary for the current APD', () => {
    expect(
      selectPreviousActivitySummary({
        apd: {
          data: { previousActivities: { previousActivitySummary: 'summary' } }
        }
      })
    ).toEqual('summary');
  });

  it('selects previous HIT/HIE activity costs for the current APD', () => {
    expect(
      selectPreviousHITHIEActivities({
        apd: {
          data: {
            previousActivities: {
              actualExpenditures: {
                2014: { hithie: { federalActual: 123, totalApproved: 456 } },
                2015: { hithie: { federalActual: 789, totalApproved: 'abc' } }
              }
            }
          }
        }
      })
    ).toEqual({
      2014: { federalActual: 123, totalApproved: 456 },
      2015: { federalActual: 789, totalApproved: 'abc' }
    });
  });

  it('selects previous MMIS activity costs for the current APD', () => {
    expect(
      selectPreviousMMISActivitiesHITECH({
        apd: {
          data: {
            previousActivities: {
              actualExpenditures: {
                2014: { mmis: '2014 data' },
                2015: { mmis: '2015 data' }
              }
            }
          }
        }
      })
    ).toEqual({
      2014: '2014 data',
      2015: '2015 data'
    });
  });

  it('selects the key state personnel for the current APD', () => {
    expect(
      selectKeyStatePersonnel({ apd: { data: { keyStatePersonnel: 'state' } } })
    ).toEqual('state');
  });

  it('selects overview/summary info for the current APD', () => {
    expect(
      selectSummary({
        apd: {
          data: {
            apdOverview: {
              narrativeHIE: 'HIE narrative',
              narrativeHIT: 'HIT narrative',
              narrativeMMIS: 'MMIS narrative',
              programOverview: 'program overview'
            },
            years: 'federal fiscal years of this APD',
            yearOptions: 'available federal fiscal years'
          }
        }
      })
    ).toEqual({
      narrativeHIE: 'HIE narrative',
      narrativeHIT: 'HIT narrative',
      narrativeMMIS: 'MMIS narrative',
      programOverview: 'program overview',
      years: 'federal fiscal years of this APD',
      yearOptions: 'available federal fiscal years'
    });
  });
});
