import { APD_TYPE, FUNDING_CATEGORY_TYPE } from '../constants.js';

export const hitechApd = {
  apdType: APD_TYPE.HITECH,
  activities: [
    {
      id: 1,
      key: '1',
      activityId: '1',
      name: 'hieOne',
      fundingSource: 'HIE',
      years: ['1931', '1932', '1933'],
      costAllocation: {
        1931: { ffp: { federal: 90, state: 10 }, other: 0 },
        1932: { ffp: { federal: 90, state: 10 }, other: 0 },
        1933: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      contractorResources: [
        { years: { 1931: 1000, 1932: 1000, 1933: 1000 } },
        { years: { 1931: 1000, 1932: 1000, 1933: 1000 } }
      ],
      expenses: [
        { years: { 1931: 1000, 1932: 1000, 1933: 1000 } },
        { years: { 1931: 1000, 1932: 1000, 1933: 1000 } }
      ],
      statePersonnel: [
        {
          years: {
            1931: { amt: 1000, perc: 1 },
            1932: { amt: 1000, perc: 0.7 },
            1933: { amt: 1000, perc: 0.4 }
          }
        },
        {
          years: {
            1931: { amt: 1000, perc: 0.4 },
            1932: { amt: 1000, perc: 0.5 },
            1933: { amt: 1000, perc: 0.3 }
          }
        }
      ],
      quarterlyFFP: {
        1931: {
          1: { inHouse: 30, contractors: 40 },
          2: { inHouse: 20, contractors: 20 },
          3: { inHouse: 40, contractors: 30 },
          4: { inHouse: 10, contractors: 10 }
        },
        1932: {
          1: { inHouse: 25, contractors: 50 },
          2: { inHouse: 25, contractors: 20 },
          3: { inHouse: 25, contractors: 20 },
          4: { inHouse: 25, contractors: 10 }
        },
        1933: {
          1: { inHouse: 10, contractors: 40 },
          2: { inHouse: 20, contractors: 30 },
          3: { inHouse: 30, contractors: 20 },
          4: { inHouse: 40, contractors: 10 }
        }
      }
    },
    {
      id: 2,
      key: '2',
      activityId: '2',
      name: 'hieTwo',
      fundingSource: 'HIE',
      years: ['1931', '1932', '1933'],
      costAllocation: {
        1931: { ffp: { federal: 90, state: 10 }, other: 0 },
        1932: { ffp: { federal: 90, state: 10 }, other: 0 },
        1933: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      contractorResources: [{ years: { 1931: 1000, 1932: 1000, 1933: 1000 } }],
      expenses: [{ years: { 1931: 1000, 1932: 1000, 1933: 1000 } }],
      statePersonnel: [
        {
          years: {
            1931: { amt: 1000, perc: 1 },
            1932: { amt: 1000, perc: 1 },
            1933: { amt: 1000, perc: 1 }
          }
        }
      ],
      quarterlyFFP: {
        1931: {
          1: { inHouse: 25, contractors: 50 },
          2: { inHouse: 25, contractors: 20 },
          3: { inHouse: 25, contractors: 20 },
          4: { inHouse: 25, contractors: 10 }
        },
        1932: {
          1: { inHouse: 30, contractors: 40 },
          2: { inHouse: 20, contractors: 20 },
          3: { inHouse: 40, contractors: 30 },
          4: { inHouse: 10, contractors: 10 }
        },
        1933: {
          1: { inHouse: 10, contractors: 40 },
          2: { inHouse: 20, contractors: 30 },
          3: { inHouse: 30, contractors: 20 },
          4: { inHouse: 40, contractors: 10 }
        }
      }
    },
    {
      id: 3,
      key: '3',
      activityId: '3',
      name: 'Program Administration',
      fundingSource: 'HIT',
      years: ['1931', '1932', '1933'],
      costAllocation: {
        1931: { ffp: { federal: 90, state: 10 }, other: 0 },
        1932: { ffp: { federal: 90, state: 10 }, other: 0 },
        1933: { ffp: { federal: 90, state: 10 }, other: 1000 }
      },
      contractorResources: [{ years: { 1931: 1000, 1932: 1000, 1933: 1000 } }],
      expenses: [{ years: { 1931: 1000, 1932: 1000, 1933: 1000 } }],
      statePersonnel: [
        {
          years: {
            1931: { amt: 1000, perc: 1 },
            1932: { amt: 1000, perc: 1 },
            1933: { amt: 1000, perc: 1 }
          }
        }
      ],
      quarterlyFFP: {
        1931: {
          1: { inHouse: 10, contractors: 40 },
          2: { inHouse: 20, contractors: 30 },
          3: { inHouse: 30, contractors: 20 },
          4: { inHouse: 40, contractors: 10 }
        },
        1932: {
          1: { inHouse: 25, contractors: 50 },
          2: { inHouse: 25, contractors: 20 },
          3: { inHouse: 25, contractors: 20 },
          4: { inHouse: 25, contractors: 10 }
        },
        1933: {
          // Contractor percent is 120%
          1: { inHouse: 30, contractors: 40 },
          2: { inHouse: 20, contractors: 20 },
          3: { inHouse: 40, contractors: 30 },
          4: { inHouse: 10, contractors: 30 }
        }
      }
    },
    {
      id: 4,
      key: '4',
      activityId: '4',
      name: 'mmisOne',
      fundingSource: 'MMIS',
      years: ['1931', '1932', '1933'],
      costAllocation: {
        1931: { ffp: { federal: 50, state: 50 }, other: 1000 },
        1932: { ffp: { federal: 75, state: 25 }, other: 1000 },
        1933: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      contractorResources: [{ years: { 1931: 1000, 1932: 1000, 1933: 1000 } }],
      expenses: [{ years: { 1931: 1000, 1932: 1000, 1933: 1000 } }],
      statePersonnel: [
        {
          years: {
            1931: { amt: 1000, perc: 0.5 },
            1932: { amt: 1000, perc: 1 },
            1933: { amt: 1000, perc: 0.1 }
          }
        }
      ],
      quarterlyFFP: {
        1931: {
          1: { inHouse: 10, contractors: 40 },
          2: { inHouse: 20, contractors: 30 },
          3: { inHouse: 30, contractors: 20 },
          4: { inHouse: 40, contractors: 10 }
        },
        1932: {
          // Contractor percent is 120%
          1: { inHouse: 30, contractors: 40 },
          2: { inHouse: 20, contractors: 20 },
          3: { inHouse: 40, contractors: 30 },
          4: { inHouse: 10, contractors: 30 }
        },
        1933: {
          1: { inHouse: 25, contractors: 50 },
          2: { inHouse: 25, contractors: 20 },
          3: { inHouse: 25, contractors: 20 },
          4: { inHouse: 25, contractors: 10 }
        }
      }
    },
    {
      // This activity is to represent the case where an activity's
      // total costs are zero, because that was causing budget math
      // errors. https://github.com/Enterprise-CMCS/eAPD/issues/1740
      id: 5,
      key: '5',
      activityId: '5',
      name: 'zero total',
      fundingSource: 'MMIS',
      years: ['1931', '1932', '1933'],
      costAllocation: {
        1931: { ffp: { federal: 50, state: 50 }, other: 0 },
        1932: { ffp: { federal: 75, state: 25 }, other: 0 },
        1933: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      contractorResources: [{ years: { 1931: 0, 1932: 0, 1933: 0 } }],
      expenses: [{ years: { 1931: 0, 1932: 0, 1933: 0 } }],
      statePersonnel: [
        {
          years: {
            1931: { amt: 0, perc: 0 },
            1932: { amt: 0, perc: 0 },
            1933: { amt: 0, perc: 0 }
          }
        }
      ],
      quarterlyFFP: {
        1931: {
          1: { inHouse: 0, contractors: 0 },
          2: { inHouse: 0, contractors: 0 },
          3: { inHouse: 0, contractors: 0 },
          4: { inHouse: 0, contractors: 0 }
        },
        1932: {
          1: { inHouse: 0, contractors: 0 },
          2: { inHouse: 0, contractors: 0 },
          3: { inHouse: 0, contractors: 0 },
          4: { inHouse: 0, contractors: 0 }
        },
        1933: {
          1: { inHouse: 0, contractors: 0 },
          2: { inHouse: 0, contractors: 0 },
          3: { inHouse: 0, contractors: 0 },
          4: { inHouse: 0, contractors: 0 }
        }
      }
    },
    {
      // This activity is to represent the case where an activity
      // does not have a funding program yet. New activities do not
      // get a funding program by default.
      // https://github.com/Enterprise-CMCS/eAPD/issues/2059
      id: 6,
      key: '6',
      activityId: '6',
      name: 'no funding program',
      fundingSource: null,
      years: ['1931', '1932', '1933'],
      costAllocation: {
        1931: { ffp: { federal: 50, state: 50 }, other: 0 },
        1932: { ffp: { federal: 75, state: 25 }, other: 0 },
        1933: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      contractorResources: [{ years: { 1931: 100, 1932: 100, 1933: 100 } }],
      expenses: [{ years: { 1931: 100, 1932: 100, 1933: 100 } }],
      statePersonnel: [
        {
          years: {
            1931: { amt: 100, perc: 1 },
            1932: { amt: 100, perc: 1 },
            1933: { amt: 100, perc: 1 }
          }
        }
      ],
      quarterlyFFP: {
        1931: {
          1: { inHouse: 25, contractors: 25 },
          2: { inHouse: 25, contractors: 25 },
          3: { inHouse: 25, contractors: 25 },
          4: { inHouse: 25, contractors: 25 }
        },
        1932: {
          1: { inHouse: 25, contractors: 25 },
          2: { inHouse: 25, contractors: 25 },
          3: { inHouse: 25, contractors: 25 },
          4: { inHouse: 25, contractors: 25 }
        },
        1933: {
          1: { inHouse: 25, contractors: 25 },
          2: { inHouse: 25, contractors: 25 },
          3: { inHouse: 25, contractors: 25 },
          4: { inHouse: 25, contractors: 25 }
        }
      }
    }
  ],
  keyStatePersonnel: {
    keyPersonnel: [
      {
        costs: { 1931: 150, 1932: 151, 1933: 152 },
        fte: { 1931: 0, 1932: 0.5, 1933: 1 },
        hasCosts: false
      },
      {
        costs: { 1931: 150, 1932: 1500, 1933: 15000 },
        fte: { 1931: 0, 1932: 0.3, 1933: 1 },
        hasCosts: true
      }
    ]
  },
  years: ['1931', '1932', '1933']
};

export const mmisApd = {
  apdType: APD_TYPE.MMIS,
  activities: [
    {
      id: 1,
      key: '1',
      activityId: '1',
      name: 'One',
      years: ['2017', '2018'],
      costAllocation: {
        2017: {
          ffp: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          other: 0
        },
        2018: {
          ffp: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          other: 0
        }
      },
      contractorResources: [
        { years: { 2017: 1000, 2018: 1000 } },
        { years: { 2017: 1000, 2018: 1000 } }
      ],
      expenses: [
        { years: { 2017: 1000, 2018: 1000 } },
        { years: { 2017: 1000, 2018: 1000 } }
      ],
      statePersonnel: [
        {
          years: {
            2017: { amt: 1000, perc: 1 },
            2018: { amt: 1000, perc: 0.7 }
          }
        },
        {
          years: {
            2017: { amt: 1000, perc: 0.4 },
            2018: { amt: 1000, perc: 0.5 }
          }
        }
      ],
      quarterlyFFP: {
        2017: {
          1: { inHouse: 30, contractors: 40 },
          2: { inHouse: 20, contractors: 20 },
          3: { inHouse: 40, contractors: 30 },
          4: { inHouse: 10, contractors: 10 }
        },
        2018: {
          1: { inHouse: 25, contractors: 50 },
          2: { inHouse: 25, contractors: 20 },
          3: { inHouse: 25, contractors: 20 },
          4: { inHouse: 25, contractors: 10 }
        }
      }
    },
    {
      id: 2,
      key: '2',
      activityId: '2',
      name: 'Two',
      years: ['2017', '2018'],
      costAllocation: {
        2017: {
          ffp: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          other: 0
        },
        2018: {
          ffp: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          other: 0
        }
      },
      contractorResources: [{ years: { 2017: 1000, 2018: 1000 } }],
      expenses: [{ years: { 2017: 1000, 2018: 1000 } }],
      statePersonnel: [
        {
          years: {
            2017: { amt: 1000, perc: 1 },
            2018: { amt: 1000, perc: 1 }
          }
        }
      ],
      quarterlyFFP: {
        2017: {
          1: { inHouse: 25, contractors: 50 },
          2: { inHouse: 25, contractors: 20 },
          3: { inHouse: 25, contractors: 20 },
          4: { inHouse: 25, contractors: 10 }
        },
        2018: {
          1: { inHouse: 30, contractors: 40 },
          2: { inHouse: 20, contractors: 20 },
          3: { inHouse: 40, contractors: 30 },
          4: { inHouse: 10, contractors: 10 }
        }
      }
    }
  ],
  keyStatePersonnel: {
    keyPersonnel: [
      {
        costs: { 2017: 100000, 2018: 150000 },
        fte: { 2017: 1, 2018: 0.5 },
        split: {
          2017: {
            federal: 90,
            state: 10
          },
          2018: {
            federal: 90,
            state: 10
          }
        },
        medicaidShare: {
          2017: 50,
          2018: 100
        },
        hasCosts: true
      },
      {
        costs: { 2017: 200000, 2018: 150000 },
        fte: { 2017: 0.66, 2018: 0.3 },
        split: {
          2017: {
            federal: 75,
            state: 25
          },
          2018: {
            federal: 75,
            state: 25
          }
        },
        medicaidShare: {
          2017: 1,
          2018: 90
        },
        hasCosts: true
      },
      {
        costs: { 2017: 0, 2018: 0 },
        fte: { 2017: 0, 2018: 0 },
        split: {
          2017: {
            federal: 0,
            state: 0
          },
          2018: {
            federal: 0,
            state: 0
          }
        },
        medicaidShare: {
          2017: 0,
          2018: null
        },
        hasCosts: false
      }
    ]
  },
  years: ['2017', '2018']
};
