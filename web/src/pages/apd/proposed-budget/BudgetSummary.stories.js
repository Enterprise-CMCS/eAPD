import React from 'react';
import BudgetSummary from './BudgetSummary';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleMMISBudget = {
  years: ['2022', '2023'],
  mmis: {
    keyStatePersonnel: {
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
  ]
};

const exampleHITECHBudget = {
  years: ['2022', '2023'],
  hie: {
    statePersonnel: {
      2022: {
        total: 460000,
        federal: 414000,
        medicaid: 460000,
        state: 46000
      },
      2023: {
        total: 476000,
        federal: 428400,
        medicaid: 476000,
        state: 47600
      },
      total: {
        total: 936000,
        federal: 842400,
        medicaid: 936000,
        state: 93600
      }
    },
    contractors: {
      2022: {
        total: 785246,
        federal: 693221,
        medicaid: 770246,
        state: 77025
      },
      2023: {
        total: 505000,
        federal: 454500,
        medicaid: 505000,
        state: 50500
      },
      total: {
        total: 1290246,
        federal: 1147721,
        medicaid: 1275246,
        state: 127525
      }
    },
    expenses: {
      2022: {
        total: 10000,
        federal: 9000,
        medicaid: 10000,
        state: 1000
      },
      2023: {
        total: 10000,
        federal: 9000,
        medicaid: 10000,
        state: 1000
      },
      total: {
        total: 20000,
        federal: 18000,
        medicaid: 20000,
        state: 2000
      }
    },
    combined: {
      2022: {
        total: 1255246,
        federal: 1116221,
        medicaid: 1240246,
        state: 124025
      },
      2023: {
        total: 991000,
        federal: 891900,
        medicaid: 991000,
        state: 99100
      },
      total: {
        total: 2246246,
        federal: 2008121,
        medicaid: 2231246,
        state: 223125
      }
    }
  },
  hit: {
    statePersonnel: {
      2022: {
        total: 1347075,
        federal: 1175521,
        medicaid: 1306134,
        state: 130613
      },
      2023: {
        total: 1386801,
        federal: 1248121,
        medicaid: 1386801,
        state: 138680
      },
      total: {
        total: 2733876,
        federal: 2423642,
        medicaid: 2692935,
        state: 269293
      }
    },
    contractors: {
      2022: {
        total: 1332756,
        federal: 1163026,
        medicaid: 1292251,
        state: 129225
      },
      2023: {
        total: 542444,
        federal: 488200,
        medicaid: 542444,
        state: 54244
      },
      total: {
        total: 1875200,
        federal: 1651226,
        medicaid: 1834695,
        state: 183469
      }
    },
    expenses: {
      2022: {
        total: 775000,
        federal: 676301,
        medicaid: 751446,
        state: 75145
      },
      2023: {
        total: 75000,
        federal: 67500,
        medicaid: 75000,
        state: 7500
      },
      total: {
        total: 850000,
        federal: 743801,
        medicaid: 826446,
        state: 82645
      }
    },
    combined: {
      2022: {
        total: 3454831,
        federal: 3014848,
        medicaid: 3349831,
        state: 334983
      },
      2023: {
        total: 2004245,
        federal: 1803821,
        medicaid: 2004245,
        state: 200424
      },
      total: {
        total: 5459076,
        federal: 4818669,
        medicaid: 5354076,
        state: 535407
      }
    }
  },
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
  ]
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

export const MMISBudgetSummaryStory = Template.bind();
MMISBudgetSummaryStory.args = {
  apdType: 'MMIS'
};

MMISBudgetSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            years: ['2022', '2023'],
            activities: []
          }
        },
        budget: exampleMMISBudget
      },
      story
    })
];

export const HITECHBudgetSummaryStory = Template.bind();
HITECHBudgetSummaryStory.args = {
  apdType: 'HITECH'
};

HITECHBudgetSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            years: ['2022', '2023'],
            activities: []
          }
        },
        budget: exampleHITECHBudget
      },
      story
    })
];
