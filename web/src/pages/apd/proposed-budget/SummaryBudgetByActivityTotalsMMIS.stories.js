import React from 'react';
import { SummaryBudgetByActivityTotalsMMIS } from './CombinedActivityCosts';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleMMISBudget = {
  ddi: {
    '90-10': {
      keyStatePersonnel: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
          total: 100000,
          federal: 45000,
          medicaid: 50000,
          state: 5000
        },
        total: {
          total: 100000,
          federal: 45000,
          medicaid: 50000,
          state: 5000
        }
      },
      statePersonnel: {
        2023: {
          total: 2400075,
          federal: 2124939,
          medicaid: 2361044,
          state: 236104
        },
        2024: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
        2024: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
        2024: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
        2024: {
          total: 100000,
          federal: 45000,
          medicaid: 50000,
          state: 5000
        },
        total: {
          total: 5257831,
          federal: 4592548,
          medicaid: 5102831,
          state: 510283
        }
      }
    },
    '75-25': {
      keyStatePersonnel: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
      statePersonnel: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
      keyStatePersonnel: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
      statePersonnel: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
      contractors: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
      expenses: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
        total: 3193000,
        federal: 2364750,
        medicaid: 3143000,
        state: 778250
      },
      total: {
        total: 8350831,
        federal: 6912298,
        medicaid: 8195831,
        state: 1283533
      }
    }
  },
  mando: {
    '75-25': {
      keyStatePersonnel: {
        2023: {
          total: 150000,
          federal: 75000,
          medicaid: 100000,
          state: 25000
        },
        2024: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        total: {
          total: 150000,
          federal: 75000,
          medicaid: 100000,
          state: 25000
        }
      },
      statePersonnel: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
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
        2023: {
          total: 150000,
          federal: 75000,
          medicaid: 100000,
          state: 25000
        },
        2024: {
          total: 1904245,
          federal: 1428184,
          medicaid: 1904245,
          state: 476061
        },
        total: {
          total: 2054245,
          federal: 1503184,
          medicaid: 2004245,
          state: 501061
        }
      }
    },
    '50-50': {
      keyStatePersonnel: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
      statePersonnel: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
      contractors: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
      expenses: {
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
        2023: {
          total: 0,
          federal: 0,
          medicaid: 0,
          state: 0
        },
        2024: {
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
      }
    },
    combined: {
      2023: {
        total: 150000,
        federal: 75000,
        medicaid: 100000,
        state: 25000
      },
      2024: {
        total: 1904245,
        federal: 1428184,
        medicaid: 1904245,
        state: 476061
      },
      total: {
        total: 2054245,
        federal: 1503184,
        medicaid: 2004245,
        state: 501061
      }
    }
  },
  combined: {
    2023: {
      total: 5307831,
      federal: 4622548,
      medicaid: 5152831,
      state: 530283
    },
    2024: {
      total: 5097245,
      federal: 3792934,
      medicaid: 5047245,
      state: 1254311
    },
    total: {
      total: 10405076,
      federal: 8415482,
      medicaid: 10200076,
      state: 1784594
    }
  }
};

export default {
  title: 'Pages/Apd/Tables/SummaryBudgetByActivityTotalsMMIS',
  component: SummaryBudgetByActivityTotalsMMIS,
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

const Template = args => <SummaryBudgetByActivityTotalsMMIS {...args} />;

export const MMISSummaryBudgetByActivityTotalsStory = Template.bind();
MMISSummaryBudgetByActivityTotalsStory.args = {
  data: exampleMMISBudget,
  ffy: '2023',
  apdType: 'MMIS'
};
MMISSummaryBudgetByActivityTotalsStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      story
    })
];
