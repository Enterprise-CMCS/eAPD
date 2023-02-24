import React from 'react';
import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleBudget = {
  _id: '63f7ce43a104d6032e367070',
  federalShareByFFYQuarter: {
    hitAndHie: {
      years: {
        2022: {
          1: {
            inHouse: 568707,
            contractors: 464063,
            combined: 1032770
          },
          2: {
            inHouse: 568705,
            contractors: 464062,
            combined: 1032767
          },
          3: {
            inHouse: 568705,
            contractors: 464061,
            combined: 1032766
          },
          4: {
            inHouse: 568705,
            contractors: 464061,
            combined: 1032766
          },
          subtotal: {
            inHouse: 2274822,
            contractors: 1856247,
            combined: 4131069
          }
        },
        2023: {
          1: {
            inHouse: 438256,
            contractors: 235675,
            combined: 673931
          },
          2: {
            inHouse: 438255,
            contractors: 235675,
            combined: 673930
          },
          3: {
            inHouse: 438255,
            contractors: 235675,
            combined: 673930
          },
          4: {
            inHouse: 438255,
            contractors: 235675,
            combined: 673930
          },
          subtotal: {
            inHouse: 1753021,
            contractors: 942700,
            combined: 2695721
          }
        }
      },
      total: {
        inHouse: 4027843,
        contractors: 2798947,
        combined: 6826790
      }
    },
    mmis: {
      years: {
        2022: {
          1: {
            inHouse: 259425,
            contractors: 147375,
            combined: 406800
          },
          2: {
            inHouse: 259425,
            contractors: 147375,
            combined: 406800
          },
          3: {
            inHouse: 259425,
            contractors: 147375,
            combined: 406800
          },
          4: {
            inHouse: 259425,
            contractors: 147375,
            combined: 406800
          },
          subtotal: {
            inHouse: 1037700,
            contractors: 589500,
            combined: 1627200
          }
        },
        2023: {
          1: {
            inHouse: 251813,
            contractors: 142735,
            combined: 394548
          },
          2: {
            inHouse: 251813,
            contractors: 142735,
            combined: 394548
          },
          3: {
            inHouse: 251812,
            contractors: 142734,
            combined: 394546
          },
          4: {
            inHouse: 251812,
            contractors: 142734,
            combined: 394546
          },
          subtotal: {
            inHouse: 1007250,
            contractors: 570938,
            combined: 1578188
          }
        }
      },
      total: {
        inHouse: 2044950,
        contractors: 1160438,
        combined: 3205388
      }
    }
  },
  years: ['2022', '2023'],
  __t: 'HITECHBudget',
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
  hitAndHie: {
    statePersonnel: {
      2022: {
        total: 1807075,
        federal: 1589521,
        medicaid: 1766134,
        state: 176613
      },
      2023: {
        total: 1862801,
        federal: 1676521,
        medicaid: 1862801,
        state: 186280
      },
      total: {
        total: 3669876,
        federal: 3266042,
        medicaid: 3628935,
        state: 362893
      }
    },
    contractors: {
      2022: {
        total: 2118002,
        federal: 1856247,
        medicaid: 2062497,
        state: 206250
      },
      2023: {
        total: 1047444,
        federal: 942700,
        medicaid: 1047444,
        state: 104744
      },
      total: {
        total: 3165446,
        federal: 2798947,
        medicaid: 3109941,
        state: 310994
      }
    },
    expenses: {
      2022: {
        total: 785000,
        federal: 685301,
        medicaid: 761446,
        state: 76145
      },
      2023: {
        total: 85000,
        federal: 76500,
        medicaid: 85000,
        state: 8500
      },
      total: {
        total: 870000,
        federal: 761801,
        medicaid: 846446,
        state: 84645
      }
    },
    combined: {
      2022: {
        total: 4710077,
        federal: 4131069,
        medicaid: 4590077,
        state: 459008
      },
      2023: {
        total: 2995245,
        federal: 2695721,
        medicaid: 2995245,
        state: 299524
      },
      total: {
        total: 7705322,
        federal: 6826790,
        medicaid: 7585322,
        state: 758532
      }
    }
  },
  mmisByFFP: {
    '90-10': {
      2022: {
        total: 1808000,
        federal: 1627200,
        medicaid: 1808000,
        state: 180800
      },
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 1808000,
        federal: 1627200,
        medicaid: 1808000,
        state: 180800
      }
    },
    '75-25': {
      2022: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2023: {
        total: 2104250,
        federal: 1578188,
        medicaid: 2104250,
        state: 526062
      },
      total: {
        total: 2104250,
        federal: 1578188,
        medicaid: 2104250,
        state: 526062
      }
    },
    '50-50': {
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
    '0-100': {
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
  activities: {
    '235a3d2e': {
      _id: '63f7ce43a104d6032e367071',
      costsByFFY: {
        2022: {
          federal: 3014848,
          medicaid: 3349831,
          state: 334983,
          total: 3454831
        },
        2023: {
          federal: 1803821,
          medicaid: 2004245,
          state: 200424,
          total: 2004245
        },
        total: {
          federal: 4818669,
          medicaid: 5354076,
          state: 535407,
          total: 5459076
        }
      },
      quarterlyFFP: {
        years: {
          2022: {
            1: {
              combined: {
                dollars: 753714,
                percent: 0
              },
              contractors: {
                dollars: 290757,
                percent: 0.25
              },
              inHouse: {
                dollars: 462957,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 753712,
                percent: 0
              },
              contractors: {
                dollars: 290757,
                percent: 0.25
              },
              inHouse: {
                dollars: 462955,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 753711,
                percent: 0
              },
              contractors: {
                dollars: 290756,
                percent: 0.25
              },
              inHouse: {
                dollars: 462955,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 753711,
                percent: 0
              },
              contractors: {
                dollars: 290756,
                percent: 0.25
              },
              inHouse: {
                dollars: 462955,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 3014848,
                percent: 0
              },
              contractors: {
                dollars: 1163026,
                percent: 1
              },
              inHouse: {
                dollars: 1851822,
                percent: 1
              }
            }
          },
          2023: {
            1: {
              combined: {
                dollars: 450956,
                percent: 0
              },
              contractors: {
                dollars: 122050,
                percent: 0.25
              },
              inHouse: {
                dollars: 328906,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 450955,
                percent: 0
              },
              contractors: {
                dollars: 122050,
                percent: 0.25
              },
              inHouse: {
                dollars: 328905,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 450955,
                percent: 0
              },
              contractors: {
                dollars: 122050,
                percent: 0.25
              },
              inHouse: {
                dollars: 328905,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 450955,
                percent: 0
              },
              contractors: {
                dollars: 122050,
                percent: 0.25
              },
              inHouse: {
                dollars: 328905,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 1803821,
                percent: 0
              },
              contractors: {
                dollars: 488200,
                percent: 1
              },
              inHouse: {
                dollars: 1315621,
                percent: 1
              }
            }
          }
        },
        total: {
          combined: 4818669,
          contractors: 1651226,
          inHouse: 3167443
        }
      }
    },
    '2313d32a': {
      _id: '63f7ce43a104d6032e367072',
      costsByFFY: {
        2022: {
          federal: 1627200,
          medicaid: 1808000,
          state: 180800,
          total: 1808000
        },
        2023: {
          federal: 1578188,
          medicaid: 2104250,
          state: 526062,
          total: 2104250
        },
        total: {
          federal: 3205388,
          medicaid: 3912250,
          state: 706862,
          total: 3912250
        }
      },
      quarterlyFFP: {
        years: {
          2022: {
            1: {
              combined: {
                dollars: 406800,
                percent: 0
              },
              contractors: {
                dollars: 147375,
                percent: 0.25
              },
              inHouse: {
                dollars: 259425,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 406800,
                percent: 0
              },
              contractors: {
                dollars: 147375,
                percent: 0.25
              },
              inHouse: {
                dollars: 259425,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 406800,
                percent: 0
              },
              contractors: {
                dollars: 147375,
                percent: 0.25
              },
              inHouse: {
                dollars: 259425,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 406800,
                percent: 0
              },
              contractors: {
                dollars: 147375,
                percent: 0.25
              },
              inHouse: {
                dollars: 259425,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 1627200,
                percent: 0
              },
              contractors: {
                dollars: 589500,
                percent: 1
              },
              inHouse: {
                dollars: 1037700,
                percent: 1
              }
            }
          },
          2023: {
            1: {
              combined: {
                dollars: 394548,
                percent: 0
              },
              contractors: {
                dollars: 142735,
                percent: 0.25
              },
              inHouse: {
                dollars: 251813,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 394548,
                percent: 0
              },
              contractors: {
                dollars: 142735,
                percent: 0.25
              },
              inHouse: {
                dollars: 251813,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 394546,
                percent: 0
              },
              contractors: {
                dollars: 142734,
                percent: 0.25
              },
              inHouse: {
                dollars: 251812,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 394546,
                percent: 0
              },
              contractors: {
                dollars: 142734,
                percent: 0.25
              },
              inHouse: {
                dollars: 251812,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 1578188,
                percent: 0
              },
              contractors: {
                dollars: 570938,
                percent: 1
              },
              inHouse: {
                dollars: 1007250,
                percent: 1
              }
            }
          }
        },
        total: {
          combined: 3205388,
          contractors: 1160438,
          inHouse: 2044950
        }
      }
    },
    '543ace23': {
      _id: '63f7ce43a104d6032e367073',
      costsByFFY: {
        2022: {
          federal: 423000,
          medicaid: 470000,
          state: 47000,
          total: 470000
        },
        2023: {
          federal: 437400,
          medicaid: 486000,
          state: 48600,
          total: 486000
        },
        total: {
          federal: 860400,
          medicaid: 956000,
          state: 95600,
          total: 956000
        }
      },
      quarterlyFFP: {
        years: {
          2022: {
            1: {
              combined: {
                dollars: 105750,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0.25
              },
              inHouse: {
                dollars: 105750,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 105750,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0.25
              },
              inHouse: {
                dollars: 105750,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 105750,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0.25
              },
              inHouse: {
                dollars: 105750,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 105750,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0.25
              },
              inHouse: {
                dollars: 105750,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 423000,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 1
              },
              inHouse: {
                dollars: 423000,
                percent: 1
              }
            }
          },
          2023: {
            1: {
              combined: {
                dollars: 109350,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0.25
              },
              inHouse: {
                dollars: 109350,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 109350,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0.25
              },
              inHouse: {
                dollars: 109350,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 109350,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0.25
              },
              inHouse: {
                dollars: 109350,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 109350,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0.25
              },
              inHouse: {
                dollars: 109350,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 437400,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 1
              },
              inHouse: {
                dollars: 437400,
                percent: 1
              }
            }
          }
        },
        total: {
          combined: 860400,
          contractors: 0,
          inHouse: 860400
        }
      }
    },
    '7893e324': {
      _id: '63f7ce43a104d6032e367074',
      costsByFFY: {
        2022: {
          federal: 693221,
          medicaid: 770246,
          state: 77025,
          total: 785246
        },
        2023: {
          federal: 454500,
          medicaid: 505000,
          state: 50500,
          total: 505000
        },
        total: {
          federal: 1147721,
          medicaid: 1275246,
          state: 127525,
          total: 1290246
        }
      },
      quarterlyFFP: {
        years: {
          2022: {
            1: {
              combined: {
                dollars: 173306,
                percent: 0
              },
              contractors: {
                dollars: 173306,
                percent: 0.25
              },
              inHouse: {
                dollars: 0,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 173305,
                percent: 0
              },
              contractors: {
                dollars: 173305,
                percent: 0.25
              },
              inHouse: {
                dollars: 0,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 173305,
                percent: 0
              },
              contractors: {
                dollars: 173305,
                percent: 0.25
              },
              inHouse: {
                dollars: 0,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 173305,
                percent: 0
              },
              contractors: {
                dollars: 173305,
                percent: 0.25
              },
              inHouse: {
                dollars: 0,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 693221,
                percent: 0
              },
              contractors: {
                dollars: 693221,
                percent: 1
              },
              inHouse: {
                dollars: 0,
                percent: 1
              }
            }
          },
          2023: {
            1: {
              combined: {
                dollars: 113625,
                percent: 0
              },
              contractors: {
                dollars: 113625,
                percent: 0.25
              },
              inHouse: {
                dollars: 0,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 113625,
                percent: 0
              },
              contractors: {
                dollars: 113625,
                percent: 0.25
              },
              inHouse: {
                dollars: 0,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 113625,
                percent: 0
              },
              contractors: {
                dollars: 113625,
                percent: 0.25
              },
              inHouse: {
                dollars: 0,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 113625,
                percent: 0
              },
              contractors: {
                dollars: 113625,
                percent: 0.25
              },
              inHouse: {
                dollars: 0,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 454500,
                percent: 0
              },
              contractors: {
                dollars: 454500,
                percent: 1
              },
              inHouse: {
                dollars: 0,
                percent: 1
              }
            }
          }
        },
        total: {
          combined: 1147721,
          contractors: 1147721,
          inHouse: 0
        }
      }
    }
  },
  __v: 0
};

export default {
  title: 'Pages/Apd/Tables/ExecutiveSummaryBudget',
  component: ExecutiveSummaryBudget,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {},
  argTypes: {}
};

const Template = args => <ExecutiveSummaryBudget {...args} />;

export const ExecutiveSummaryBudgetStory = Template.bind({});
ExecutiveSummaryBudgetStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        router: {
          location: {
            pathname: '/'
          }
        },
        nav: {
          continueLink: {
            label: 'go forth',
            url: '/apd/abc123/go-forth',
            selected: false
          },
          previousLink: null
        },
        apd: {
          data: {
            id: 'abc123',
            years: ['2022', '2023']
          }
        },
        budget: exampleBudget
      },
      story
    })
];
