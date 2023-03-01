import React from 'react';
import { SummaryBudgetByActivityTotals } from './CombinedActivityCosts';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

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
  }
};

const exampleMMISBudget = {
  _id: '63ff5e7b7ed64d005f031160',
  federalShareByFFYQuarter: {
    mmis: {
      years: {
        2023: {
          1: {
            inHouse: 700153,
            contractors: 436735,
            combined: 1136888
          },
          2: {
            inHouse: 700153,
            contractors: 436735,
            combined: 1136888
          },
          3: {
            inHouse: 700152,
            contractors: 436735,
            combined: 1136887
          },
          4: {
            inHouse: 700151,
            contractors: 436734,
            combined: 1136885
          },
          subtotal: {
            inHouse: 2800609,
            contractors: 1746939,
            combined: 4547548
          }
        },
        2024: {
          1: {
            inHouse: 507152,
            contractors: 429834,
            combined: 936986
          },
          2: {
            inHouse: 507151,
            contractors: 429833,
            combined: 936984
          },
          3: {
            inHouse: 507149,
            contractors: 429833,
            combined: 936982
          },
          4: {
            inHouse: 507149,
            contractors: 429833,
            combined: 936982
          },
          subtotal: {
            inHouse: 2028601,
            contractors: 1719333,
            combined: 3747934
          }
        }
      },
      total: {
        inHouse: 4829210,
        contractors: 3466272,
        combined: 8295482
      }
    }
  },
  years: ['2022', '2023'],
  __t: 'MMISBudget',
  mmis: {
    statePersonnel: {
      2022: {
        total: 2400075,
        federal: 2124939,
        medicaid: 2361044,
        state: 236104
      },
      2023: {
        total: 2629801,
        federal: 1972351,
        medicaid: 2629801,
        state: 657450
      },
      total: {
        total: 5029876,
        federal: 4097290,
        medicaid: 4990845,
        state: 893554
      }
    },
    contractors: {
      2022: {
        total: 1982756,
        federal: 1746939,
        medicaid: 1941043,
        state: 194104
      },
      2023: {
        total: 2292444,
        federal: 1719333,
        medicaid: 2292444,
        state: 573111
      },
      total: {
        total: 4275200,
        federal: 3466272,
        medicaid: 4233487,
        state: 767215
      }
    },
    expenses: {
      2022: {
        total: 775000,
        federal: 675670,
        medicaid: 750744,
        state: 75075
      },
      2023: {
        total: 75000,
        federal: 56250,
        medicaid: 75000,
        state: 18750
      },
      total: {
        total: 850000,
        federal: 731920,
        medicaid: 825744,
        state: 93825
      }
    },
    combined: {
      2022: {
        total: 5257831,
        federal: 4628548,
        medicaid: 5142831,
        state: 514283
      },
      2023: {
        total: 5097245,
        federal: 3792934,
        medicaid: 5047245,
        state: 1254311
      },
      total: {
        total: 10355076,
        federal: 8421482,
        medicaid: 10190076,
        state: 1768594
      }
    },
    keyStatePersonnel: {
      2022: {
        total: 100000,
        federal: 81000,
        medicaid: 90000,
        state: 9000
      },
      2023: {
        total: 100000,
        federal: 45000,
        medicaid: 50000,
        state: 5000
      },
      total: {
        total: 200000,
        federal: 126000,
        medicaid: 140000,
        state: 14000
      }
    }
  },
  combined: {
    2022: {
      total: 5257831,
      federal: 4628548,
      medicaid: 5142831,
      state: 514283
    },
    2023: {
      total: 5097245,
      federal: 3792934,
      medicaid: 5047245,
      state: 1254311
    },
    total: {
      total: 10355076,
      federal: 8421482,
      medicaid: 10190076,
      state: 1768594
    }
  },
  __v: 0
};

export default {
  title: 'Pages/Apd/Tables/SummaryBudgetByActivityTotals',
  component: SummaryBudgetByActivityTotals,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['CombinedActivityCosts.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => <SummaryBudgetByActivityTotals {...args} />;

export const HITECHSummaryBudgetByActivityTotalsStory = Template.bind();
HITECHSummaryBudgetByActivityTotalsStory.args = {
  data: exampleHITECHBudget,
  ffy: '2022',
  apdType: 'HITECH'
};
HITECHSummaryBudgetByActivityTotalsStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      story
    })
];

export const MMISSummaryBudgetByActivityTotalsStory = Template.bind();
MMISSummaryBudgetByActivityTotalsStory.args = {
  data: exampleMMISBudget,
  ffy: '2022',
  apdType: 'MMIS'
};
MMISSummaryBudgetByActivityTotalsStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      story
    })
];
