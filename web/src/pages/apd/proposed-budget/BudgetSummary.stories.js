import React from 'react';
import BudgetSummary from './BudgetSummary';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleBudget = {
  _id: '63f7ce43a104d6032e367070',
  years: ['2022', '2023'],
  mmis: {
    statePersonnel: {
      2022: {
        total: 1153000,
        federal: 1037700,
        medicaid: 1153000,
        state: 115300
      },
      2023: {
        total: 1343000,
        federal: 1007250,
        medicaid: 1343000,
        state: 335750
      },
      total: {
        total: 2496000,
        federal: 2044950,
        medicaid: 2496000,
        state: 451050
      }
    },
    contractors: {
      2022: {
        total: 655000,
        federal: 589500,
        medicaid: 655000,
        state: 65500
      },
      2023: {
        total: 761250,
        federal: 570938,
        medicaid: 761250,
        state: 190312
      },
      total: {
        total: 1416250,
        federal: 1160438,
        medicaid: 1416250,
        state: 255812
      }
    },
    expenses: {
      2022: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      }
    },
    combined: {
      2022: {
        total: 1808000,
        federal: 1627200,
        medicaid: 1808000,
        state: 180800
      },
      2023: {
        total: 2104250,
        federal: 1578188,
        medicaid: 2104250,
        state: 526062
      },
      total: {
        total: 3912250,
        federal: 3205388,
        medicaid: 3912250,
        state: 706862
      }
    }
  },
  combined: {
    2022: {
      total: 6518077,
      federal: 5758269,
      medicaid: 6398077,
      state: 639808
    },
    2023: {
      total: 5099495,
      federal: 4273909,
      medicaid: 5099495,
      state: 825586
    },
    total: {
      total: 11617572,
      federal: 10032178,
      medicaid: 11497572,
      state: 1465394
    }
  },
  activityTotals: [
    {
      id: '235a3d2e',
      name: 'Program Administration',
      fundingSource: 'HIT',
      data: {
        combined: {
          2022: 3454831,
          2023: 2004245,
          total: 5459076
        },
        contractors: {
          2022: 1332756,
          2023: 542444,
          total: 1875200
        },
        expenses: {
          2022: 775000,
          2023: 75000,
          total: 850000
        },
        otherFunding: {
          2022: {
            contractors: 40505,
            expenses: 23554,
            statePersonnel: 40941,
            total: 105000
          },
          2023: {
            contractors: 0,
            expenses: 0,
            statePersonnel: 0,
            total: 0
          }
        },
        statePersonnel: {
          2022: 1347075,
          2023: 1386801,
          total: 2733876
        }
      }
    },
    {
      id: '2313d32a',
      name: 'Claims Data Analytics',
      fundingSource: 'MMIS',
      data: {
        combined: {
          2022: 1808000,
          2023: 2104250,
          total: 3912250
        },
        contractors: {
          2022: 655000,
          2023: 761250,
          total: 1416250
        },
        expenses: {
          2022: 0,
          2023: 0,
          total: 0
        },
        otherFunding: {
          2022: {
            contractors: 0,
            expenses: 0,
            statePersonnel: 0,
            total: 0
          },
          2023: {
            contractors: 0,
            expenses: 0,
            statePersonnel: 0,
            total: 0
          }
        },
        statePersonnel: {
          2022: 1153000,
          2023: 1343000,
          total: 2496000
        }
      }
    },
    {
      id: '543ace23',
      name: 'HIE Enhancement and Onboarding',
      fundingSource: 'HIE',
      data: {
        combined: {
          2022: 470000,
          2023: 486000,
          total: 956000
        },
        contractors: {
          2022: 0,
          2023: 0,
          total: 0
        },
        expenses: {
          2022: 10000,
          2023: 10000,
          total: 20000
        },
        otherFunding: {
          2022: {
            contractors: 0,
            expenses: 0,
            statePersonnel: 0,
            total: 0
          },
          2023: {
            contractors: 0,
            expenses: 0,
            statePersonnel: 0,
            total: 0
          }
        },
        statePersonnel: {
          2022: 460000,
          2023: 476000,
          total: 936000
        }
      }
    },
    {
      id: '7893e324',
      name: 'Medicaid Blue Button',
      fundingSource: 'HIE',
      data: {
        combined: {
          2022: 785246,
          2023: 505000,
          total: 1290246
        },
        contractors: {
          2022: 785246,
          2023: 505000,
          total: 1290246
        },
        expenses: {
          2022: 0,
          2023: 0,
          total: 0
        },
        otherFunding: {
          2022: {
            contractors: 15000,
            expenses: 0,
            statePersonnel: 0,
            total: 15000
          },
          2023: {
            contractors: 0,
            expenses: 0,
            statePersonnel: 0,
            total: 0
          }
        },
        statePersonnel: {
          2022: 0,
          2023: 0,
          total: 0
        }
      }
    }
  ],
  __v: 0
};

export default {
  title: 'Pages/Apd/Tables/BudgetSummary',
  component: BudgetSummary,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['BudgetSummary.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => <BudgetSummary {...args} />;

export const BudgetSummaryStory = Template.bind({});
BudgetSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            years: ['2022', '2023'],
            activities: []
          }
        },
        budget: exampleBudget
      },
      story
    })
];
