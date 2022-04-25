import { shallow } from 'enzyme';
import React from 'react';

import Activity from './ActivityReadOnly';

const activity = {
  alternatives: '<p>This is a list of alternatives</p>\n',
  costAllocation: {
    2020: {
      ffp: {
        federal: 50,
        state: 50
      },
      other: 0
    },
    2021: {
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
      2020: {
        otherSources: ''
      },
      2021: {
        otherSources: ''
      }
    }
  },
  description: '<p>This is a description of the activity</p>\n',
  fundingSource: 'HIT',
  name: 'MITA 3.0 Assessment',
  plannedEndDate: '2021-08-04',
  plannedStartDate: '2020-08-03',
  standardsAndConditions: {
    doesNotSupport: '',
    supports: ''
  },
  summary: 'This is the summary of the activity',
  quarterlyFFP: {
    2020: {
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
    2021: {
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
  },
  contractorResources: [
    {
      description: 'Research for and RFP development for MITA 3.0 SSA',
      end: '',
      hourly: {
        data: {
          2020: {
            hours: '',
            rate: ''
          },
          2021: {
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
        2020: 450000,
        2021: 150000
      }
    },
    {
      description: 'MITA 3.0 implementation.',
      end: '',
      hourly: {
        data: {
          2020: {
            hours: '',
            rate: ''
          },
          2021: {
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
        2020: 200000,
        2021: 500000
      }
    }
  ],
  expenses: [
    {
      description: '',
      category: 'Equipment and supplies',
      years: {
        2020: 25000,
        2021: 25000
      }
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
  schedule: [
    {
      endDate: '2020-02-28',
      milestone: 'MITA 3.0 SS-A Project'
    },
    {
      endDate: '2020-12-31',
      milestone: 'HITECH SS-A Assessment'
    }
  ],
  statePersonnel: [
    {
      title: 'State MITA Person',
      description: '1',
      years: {
        2020: {
          amt: 100000,
          perc: 0.5
        },
        2021: {
          amt: 100000,
          perc: 1
        }
      }
    }
  ]
};

describe('<Activity /> component', () => {
  test('renders dates correctly', () => {
    const component = shallow(
      <Activity activity={activity} activityIndex={0} />
    );
    expect(component.text()).toMatch(/Start date: 8\/3\/2020/);
    expect(component.text()).toMatch(/End date: 8\/4\/2021/);
  });
});
