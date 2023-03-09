import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import { APD_TYPE } from '@cms-eapd/common';

import Activity from './ActivityReadOnly';

const activity = {
  id: null,
  key: '152a1e2b',
  activityId: '152a1e2b',
  name: 'MITA 3.0 Assessment',
  activitySchedule: {
    plannedStartDate: '2017-10-01T00:00:00.000Z',
    plannedEndDate: '2023-09-30T00:00:00.000Z'
  },
  milestones: [
    {
      endDate: '2020-02-28',
      milestone: 'MITA 3.0 SS-A Project'
    },
    {
      endDate: '2020-12-31',
      milestone: 'HITECH SS-A Assessment'
    }
  ],
  outcomes: [
    {
      outcome: 'Complete MITA 3.0 HITECH portion.',
      metrics: [
        {
          metric: 'Complete MITA 3.0 HITECH portion by July 2020'
        }
      ]
    }
  ],
  statePersonnel: [
    {
      title: 'State MITA Person',
      description: '1',
      years: {
        2022: {
          amt: 100000,
          perc: 0.5
        },
        2023: {
          amt: 100000,
          perc: 1
        }
      }
    }
  ],
  expenses: [
    {
      description: '',
      category: 'Equipment and supplies',
      years: {
        2022: 25000,
        2023: 25000
      }
    }
  ],
  contractorResources: [
    {
      description: 'Research for and RFP development for MITA 3.0 SSA',
      end: '',
      hourly: {
        data: {
          2022: {
            hours: '',
            rate: ''
          },
          2023: {
            hours: '',
            rate: ''
          }
        },
        useHourly: false
      },
      name: 'Tech Consulting Inc.',
      start: '',
      totalCost: 264574,
      years: {
        2022: 450000,
        2023: 150000
      }
    },
    {
      description: 'MITA 3.0 implementation.',
      end: '',
      hourly: {
        data: {
          2022: {
            hours: '',
            rate: ''
          },
          2023: {
            hours: '',
            rate: ''
          }
        },
        useHourly: false
      },
      name: 'TBD',
      start: '',
      totalCost: 64574,
      years: {
        2022: 200000,
        2023: 500000
      }
    }
  ],
  costAllocation: {
    2022: {
      ffp: {
        federal: 50,
        state: 50
      },
      other: 0
    },
    2023: {
      ffp: {
        federal: 90,
        state: 10
      },
      other: 0
    }
  },
  costAllocationNarrative: {
    methodology: '',
    years: {
      2022: {
        otherSources: ''
      },
      2023: {
        otherSources: ''
      }
    }
  },
  quarterlyFFP: {
    2022: {
      1: {
        contractors: 25,
        inHouse: 25
      },
      2: {
        contractors: 25,
        inHouse: 25
      },
      3: {
        contractors: 25,
        inHouse: 25
      },
      4: {
        contractors: 25,
        inHouse: 25
      }
    },
    2023: {
      1: {
        contractors: 25,
        inHouse: 25
      },
      2: {
        contractors: 25,
        inHouse: 25
      },
      3: {
        contractors: 25,
        inHouse: 25
      },
      4: {
        contractors: 25,
        inHouse: 25
      }
    }
  }
};
const activityHitech = {
  ...activity,
  fundingSource: 'HIT',
  activityOverview: {
    summary: 'This is the summary of the activity',
    description: '<p>This is a description of the activity</p>\n',
    alternatives: '<p>This is a list of alternatives</p>\n',
    standardsAndConditions: {
      doesNotSupport: '',
      supports: ''
    }
  }
};

const activityMmis = {
  ...activity,
  activityOverview: {
    activitySnapshot: '<p>This is a snapshot</p>',
    problemStatement: '<p>This is a problem statement</p>',
    proposedSolution: '<p>This is a proposed solution</p>'
  },
  analysisOfAlternativesAndRisks: {
    alternativeAnalysis: 'Alternative and analysis',
    costBenefitAnalysis: 'Cost benefit analysis',
    feasibilityStudy: 'Feasibility study',
    requirementsAnalysis: 'Requirements analysis',
    forseeableRisks: 'Forseeable risks'
  },
  conditionsForEnhancedFunding: {
    enhancedFundingQualification: true,
    enhancedFundingJustification: 'justification'
  }
};

const initialState = {
  apd: {
    data: {
      years: ['2022', '2023'],
      activities: [activity],
      keyStatePersonnel: {
        medicaidDirector: {},
        keyPersonnel: []
      }
    },
    adminCheck: false
  },
  budget: {
    activityTotals: [
      {
        id: '152a1e2b',
        data: {}
      }
    ],
    activities: {
      '152a1e2b': {
        costsByFFY: {
          2022: {
            federal: 0,
            medicaid: 0,
            state: 0,
            total: 300
          },
          2023: {
            federal: 0,
            medicaid: 0,
            state: 0,
            total: 300
          },
          total: {
            federal: 0,
            medicaid: 0,
            state: 0,
            total: 300
          }
        },
        quarterlyFFP: {
          years: {
            2022: {
              1: {
                combined: {
                  dollars: 1938674,
                  percent: 0
                },
                contractors: {
                  dollars: 9692,
                  percent: 0.01
                },
                inHouse: {
                  dollars: 1928982,
                  percent: 1.25
                }
              },
              2: {
                combined: {
                  dollars: 628093,
                  percent: 0
                },
                contractors: {
                  dollars: 242297,
                  percent: 0.25
                },
                inHouse: {
                  dollars: 385796,
                  percent: 0.25
                }
              },
              3: {
                combined: {
                  dollars: 628093,
                  percent: 0
                },
                contractors: {
                  dollars: 242297,
                  percent: 0.25
                },
                inHouse: {
                  dollars: 385796,
                  percent: 0.25
                }
              },
              4: {
                combined: {
                  dollars: 628093,
                  percent: 0
                },
                contractors: {
                  dollars: 242297,
                  percent: 0.25
                },
                inHouse: {
                  dollars: 385796,
                  percent: 0.25
                }
              },
              subtotal: {
                combined: {
                  dollars: 2512373,
                  percent: 0
                },
                contractors: {
                  dollars: 969188,
                  percent: 0.76
                },
                inHouse: {
                  dollars: 1543185,
                  percent: 2
                }
              }
            }
          },
          2023: {
            1: {
              combined: {
                dollars: 1938674,
                percent: 0
              },
              contractors: {
                dollars: 9692,
                percent: 0.01
              },
              inHouse: {
                dollars: 1928982,
                percent: 1.25
              }
            },
            2: {
              combined: {
                dollars: 628093,
                percent: 0
              },
              contractors: {
                dollars: 242297,
                percent: 0.25
              },
              inHouse: {
                dollars: 385796,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 628093,
                percent: 0
              },
              contractors: {
                dollars: 242297,
                percent: 0.25
              },
              inHouse: {
                dollars: 385796,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 628093,
                percent: 0
              },
              contractors: {
                dollars: 242297,
                percent: 0.25
              },
              inHouse: {
                dollars: 385796,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 2512373,
                percent: 0
              },
              contractors: {
                dollars: 969188,
                percent: 0.76
              },
              inHouse: {
                dollars: 1543185,
                percent: 2
              }
            }
          },
          total: {
            combined: 4316194,
            contractors: 1457388,
            inHouse: 2858806
          }
        }
      }
    }
  }
};

const defaultProps = {
  activityIndex: 0,
  years: ['2022', '2023']
};

const setup = async (props = {}, options = {}) =>
  renderWithConnection(<Activity {...defaultProps} {...props} />, {
    initialState,
    ...options
  });

/* eslint-disable testing-library/no-node-access */
describe('<Activity /> component', () => {
  it('renders HITECH dates correctly', async () => {
    await setup({ activity: activityHitech, apdType: APD_TYPE.HITECH });
    expect(screen.getByText(/Start date/i).closest('p')).toHaveTextContent(
      /Start date: 10\/1\/2017/
    );
    expect(screen.getByText(/End date/i).closest('p')).toHaveTextContent(
      /End date: 9\/30\/2023/
    );
  });
  it('renders MMIS dates correctly', async () => {
    await setup({ activity: activityMmis, apdType: APD_TYPE.MMIS });
    expect(screen.getByText(/Start date/i).closest('p')).toHaveTextContent(
      /Start date: 10\/1\/2017/
    );
    expect(screen.getByText(/End date/i).closest('p')).toHaveTextContent(
      /End date: 9\/30\/2023/
    );
  });
});
