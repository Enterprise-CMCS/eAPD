import React from 'react';
import { default as MmisBudgetSummary } from './MmisBudgetSummary';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/Tables/MmisBudgetSummary',
  component: MmisBudgetSummary,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const rowKeys = [
  {
    year: '2023',
    display: 'FFY 2023'
  },
  {
    year: '2024',
    display: 'FFY 2024'
  },
  {
    year: 'total',
    display: 'Total'
  }
];

const budget = {
  ddi: {
    '90-10': {
      statePersonnel: {
        2023: {
          total: 2400075,
          federal: 2124939,
          medicaid: 2361044,
          state: 236104
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 2400075,
          federal: 2124939,
          medicaid: 2361044,
          state: 236104
        }
      },
      contractors: {
        2023: {
          total: 1982756,
          federal: 1746939,
          medicaid: 1941043,
          state: 194104
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 1982756,
          federal: 1746939,
          medicaid: 1941043,
          state: 194104
        }
      },
      expenses: {
        2023: {
          total: 775000,
          federal: 675670,
          medicaid: 750744,
          state: 75075
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 775000,
          federal: 675670,
          medicaid: 750744,
          state: 75075
        }
      },
      combined: {
        2023: {
          total: 5157831,
          federal: 4547548,
          medicaid: 5052831,
          state: 505283
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 5157831,
          federal: 4547548,
          medicaid: 5052831,
          state: 505283
        }
      }
    },
    '75-25': {
      statePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 1343000,
          federal: 1007250,
          medicaid: 1343000,
          state: 335750
        },
        total: {
          total: 1343000,
          federal: 1007250,
          medicaid: 1343000,
          state: 335750
        }
      },
      contractors: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 1750000,
          federal: 1312500,
          medicaid: 1750000,
          state: 437500
        },
        total: {
          total: 1750000,
          federal: 1312500,
          medicaid: 1750000,
          state: 437500
        }
      },
      expenses: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      combined: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 3093000,
          federal: 2319750,
          medicaid: 3093000,
          state: 773250
        },
        total: {
          total: 3093000,
          federal: 2319750,
          medicaid: 3093000,
          state: 773250
        }
      }
    },
    '50-50': {
      statePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      contractors: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      expenses: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      combined: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      }
    },
    combined: {
      2023: {
        total: 5157831,
        federal: 4547548,
        medicaid: 5052831,
        state: 505283
      },
      2024: {
        total: 3093000,
        federal: 2319750,
        medicaid: 3093000,
        state: 773250
      },
      total: {
        total: 8250831,
        federal: 6867298,
        medicaid: 8145831,
        state: 1278533
      }
    }
  },
  mando: {
    '75-25': {
      statePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 1286801,
          federal: 965101,
          medicaid: 1286801,
          state: 321700
        },
        total: {
          total: 1286801,
          federal: 965101,
          medicaid: 1286801,
          state: 321700
        }
      },
      contractors: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 542444,
          federal: 406833,
          medicaid: 542444,
          state: 135611
        },
        total: {
          total: 542444,
          federal: 406833,
          medicaid: 542444,
          state: 135611
        }
      },
      expenses: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 75000,
          federal: 56250,
          medicaid: 75000,
          state: 18750
        },
        total: {
          total: 75000,
          federal: 56250,
          medicaid: 75000,
          state: 18750
        }
      },
      combined: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 1904245,
          federal: 1428184,
          medicaid: 1904245,
          state: 476061
        },
        total: {
          total: 1904245,
          federal: 1428184,
          medicaid: 1904245,
          state: 476061
        }
      }
    },
    '50-50': {
      statePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      contractors: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      expenses: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      combined: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      }
    },
    combined: {
      2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
      2024: {
        total: 1904245,
        federal: 1428184,
        medicaid: 1904245,
        state: 476061
      },
      total: {
        total: 1904245,
        federal: 1428184,
        medicaid: 1904245,
        state: 476061
      }
    }
  }
};

const Template = args => (
  <MmisBudgetSummary {...args} budget={budget} rowKeys={rowKeys} />
);

export const MmisBudgetSummaryStory = Template.bind({});
MmisBudgetSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {}
        }
      },
      story
    })
];
