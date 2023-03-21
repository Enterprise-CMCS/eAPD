import React from 'react';
import SummaryActivityBreakdownTable from './SummaryActivityBreakdown';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleActivity = {
  activityOverview: {
    summary:
      '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
    description:
      '<p><strong><ins>III.A.1: Modifications to the State Level Repository</ins></strong></p>\n<p>Tycho Medicaid is seeking funding to design, develop, and implement modifications to the existing State Level Repository (SLR) for continued administration of the EHR Incentive Program. The modifications of the SLR for CMS program rule changes and guidance changes (Stage 3, IPPS, and OPPS) will require extensive development and implementation efforts and is essential to the effective administration of the Medicaid EHR Incentive Program. Modifications to the SLR are done in phases depending on how CMS rule changes occur. The implementation of the design elements will require provider onboarding activities to be initiated and completed including outreach and training for all program participants. The SLR will increase the efficiency with which Tycho Medicaid administers the program; allow for increased oversight and assure that the program is operated in accordance with the complex and evolving program rules and requirements.</p>\n<p>&nbsp;</p>\n<p>Additionally, Tycho Medicaid is seeking funding to complete a security risk assessment for the State Level Repository to ensure the SLR meets the required system security standards for HIPAA, MARSe, NIST and other state and federal security requirements for information technology.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.B.1 Administrative and Technical Support Consulting</ins></strong></p>\n<p>The DHSS is requesting funding to support activities under the Medicaid EHR Incentive Payment Program to provide technical assistance for statewide activities and implementations. Activities of this initiative will include support of the activities included in this IAPDU, SMPHU development, eCQM implementation, project management services, and assistance with the public health expansion modernization initiative.</p>',
    alternatives:
      '<p>Modifications to State Level Registry (SLR)</p>\n<ul>\n<li>Minimize Modifications</li>\n<li>Minimize cost</li>\n<li>Decreased implementation time.</li>\n</ul>\n<p>The 2015-2017 rule changes are significant and wide ranging; minimally accommodating the new attestations will be problematic for the remainder of the program. Program benefits will potentially not be maximized. To be prepared for Stage 3 and to properly implement all 2015-2017 rule changes; Tycho plans to implement all necessary modifications.</p>\n<ul>\n<li>Modifications to State Level Registry (SLR)</li>\n<li>Implement the changes as outlined</li>\n<li>The EHR Incentive Program will have the ability to be fully supported.</li>\n<li>Support of electronic submission of CQMs, enhancing the support of the emphasis on interoperability.</li>\n</ul>\n<p>There are no significant disadvantages to this option.</p>\n<p>&nbsp;</p>\n<p>Implementing the changes as outlined provide the optimal opportunity to maximize the benefits of the EHR program and its impact on the delivery of health care with improved quality and outcomes.</p>',
    standardsAndConditions: {
      doesNotSupport: '',
      supports:
        '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
    }
  },
  fundingSource: 'HIT',
  name: 'Program Administration',
  activitySchedule: {
    plannedStartDate: '2017-10-01T00:00:00.000Z',
    plannedEndDate: '2023-09-30T00:00:00.000Z'
  },
  costAllocation: {
    2022: {
      ffp: {
        federal: 90,
        state: 10
      },
      other: 105000
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
    years: {
      2022: {
        otherSources:
          '<p>No other funding is provided for this activity for FFY 2022.</p>'
      },
      2023: {
        otherSources:
          '<p>No other funding is provided for this activity for FFY 2023.</p>'
      }
    },
    methodology: '<p>No cost allocation is necessary for this activity.</p>'
  },
  quarterlyFFP: {
    2022: {
      1: {
        combined: 25,
        contractors: 25,
        inHouse: 25
      },
      2: {
        combined: 25,
        contractors: 25,
        inHouse: 25
      },
      3: {
        combined: 25,
        contractors: 25,
        inHouse: 25
      },
      4: {
        combined: 25,
        contractors: 25,
        inHouse: 25
      }
    },
    2023: {
      1: {
        combined: 25,
        contractors: 25,
        inHouse: 25
      },
      2: {
        combined: 25,
        contractors: 25,
        inHouse: 25
      },
      3: {
        combined: 25,
        contractors: 25,
        inHouse: 25
      },
      4: {
        combined: 25,
        contractors: 25,
        inHouse: 25
      }
    }
  },
  id: null,
  key: '235a3d2e',
  activityId: '235a3d2e',
  milestones: [
    {
      endDate: '2020-09-07T00:00:00.000Z',
      milestone: 'Implementation of Final Rule and Stage 3 System Developments',
      id: null,
      key: '6b1dd67f'
    },
    {
      endDate: '2019-12-31T00:00:00.000Z',
      milestone: 'Environmental Scan Completion',
      id: null,
      key: '98662a8e'
    },
    {
      endDate: '2022-05-30T00:00:00.000Z',
      milestone: 'HIT Roadmap Development',
      id: null,
      key: 'ed04ff32'
    }
  ],
  outcomes: [
    {
      outcome:
        'Accept attestations for 2022, and modify SLR to meet new spec sheets released by CMS.',
      id: null,
      metrics: [
        {
          metric: 'Complete SLR modifications by 11/1/21',
          id: null,
          key: '1deab37a'
        },
        {
          metric: 'Accept attestations through 4/30/22.',
          id: null,
          key: '29c66cdc'
        }
      ],
      key: '85b6c6a2'
    },
    {
      outcome: 'Provide support to EPs and EHs through attestation process.',
      id: null,
      metrics: [
        {
          metric: "Guidance available on Tycho''s websites",
          id: null,
          key: '60186a60'
        },
        {
          metric: 'Office hours availble for EPs and EHs',
          id: null,
          key: '9b713160'
        },
        {
          metric: 'Site visits, as needed, for EPs and EHs',
          id: null,
          key: '912a7466'
        }
      ],
      key: '284d7488'
    }
  ],
  statePersonnel: [
    {
      title: 'Project Assistant',
      description:
        'Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.',
      years: {
        2022: {
          amt: 86000,
          perc: 1
        },
        2023: {
          amt: 88000,
          perc: 1
        }
      },
      id: null,
      key: '1d1c0527'
    },
    {
      title:
        'EHR Incentive Program Meaningful Use Coordinator (Research Analyst III)',
      description:
        'Develop and monitor reports, assist data users in developing and managing queries.',
      years: {
        2022: {
          amt: 101115,
          perc: 1
        },
        2023: {
          amt: 102111,
          perc: 1
        }
      },
      id: null,
      key: 'c06f5b1a'
    },
    {
      title: 'IT Liaison',
      description:
        'Provide analysis and coordination activities between the HIT Program Office and the IT section, to ensure that adequate resources and priority are established to complete the technology projects as identified.',
      years: {
        2022: {
          amt: 101000,
          perc: 1
        },
        2023: {
          amt: 104000,
          perc: 1
        }
      },
      id: null,
      key: '40e238fa'
    },
    {
      title: 'Accountant III',
      description:
        'Coordinate program state and federal budget and expense reporting, review and validate charges to CMS federal reports.',
      years: {
        2022: {
          amt: 101000,
          perc: 3
        },
        2023: {
          amt: 109000,
          perc: 3
        }
      },
      id: null,
      key: 'e3d4e825'
    },
    {
      title: 'Public Information Officer',
      description:
        'Develop outreach materials including: written, television and radio publications to support outreach for the Medicaid EHR Incentive Program',
      years: {
        2022: {
          amt: 165000,
          perc: 0.5
        },
        2023: {
          amt: 170000,
          perc: 0.5
        }
      },
      id: null,
      key: '7762fa5f'
    },
    {
      title: 'Systems Chief',
      description:
        'Coordinate office resources, manage staff, budget, and resource assignments, and report program status.',
      years: {
        2022: {
          amt: 135000,
          perc: 0.5
        },
        2023: {
          amt: 140000,
          perc: 0.5
        }
      },
      id: null,
      key: '1cbeb394'
    },
    {
      title:
        'Medicaid EHR Incentive Program Manager (Medical Assistance Administrator III)',
      description:
        'Data collection and analysis, reporting, planning, service delivery modification, support administration of the EHR Incentive Payment Program including provider application review.',
      years: {
        2022: {
          amt: 110012,
          perc: 1
        },
        2023: {
          amt: 111102,
          perc: 1
        }
      },
      id: null,
      key: 'abb038b2'
    },
    {
      title: 'System Analyst (Analyst Programmer IV)',
      description:
        'Supports design, development and implementation of information technology infrastructure for the projects/programs under the IT Planning office supported by this Implementation Advanced Planning Document.',
      years: {
        2022: {
          amt: 98987,
          perc: 4
        },
        2023: {
          amt: 99897,
          perc: 4
        }
      },
      id: null,
      key: '3006ba21'
    }
  ],
  expenses: [
    {
      description: 'Training and outreach',
      category: 'Training and outreach',
      years: {
        2022: 40000,
        2023: 40000
      },
      id: null,
      key: '7c482720'
    },
    {
      description: 'Travel',
      category: 'Travel',
      years: {
        2022: 35000,
        2023: 35000
      },
      id: null,
      key: '24b4a937'
    },
    {
      description: 'Hardware, software, and licensing',
      category: 'Hardware, software, and licensing',
      years: {
        2022: 700000,
        2023: 0
      },
      id: null,
      key: '6d0672cc'
    }
  ],
  contractorResources: [
    {
      description: 'Maintain SLR',
      end: '2022-05-31T00:00:00.000Z',
      hourly: {
        2022: {
          hours: null,
          rate: null
        },
        2023: {
          hours: null,
          rate: null
        }
      },
      useHourly: false,
      name: 'Super SLR Incorporated',
      start: '2022-01-01T00:00:00.000Z',
      totalCost: 32423,
      years: {
        2022: 999756,
        2023: 342444
      },
      id: null,
      key: '1e36e164'
    },
    {
      description: 'Technology consulting and planning services.',
      end: '2022-05-31T00:00:00.000Z',
      hourly: {
        2022: {
          hours: null,
          rate: null
        },
        2023: {
          hours: null,
          rate: null
        }
      },
      useHourly: false,
      name: 'Tech Consulting Inc.',
      start: '2022-01-01T00:00:00.000Z',
      totalCost: 473573,
      years: {
        2022: 333000,
        2023: 200000
      },
      id: null,
      key: '809c2f1d'
    }
  ]
};

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
    }
  },
  __v: 0
};

export default {
  title: 'Pages/Apd/Tables/SummaryBudgetByActivityBreakdown',
  component: SummaryActivityBreakdownTable,
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

const Template = args => (
  <SummaryActivityBreakdownTable
    {...args}
    key={'abc123'}
    ffy={'2022'}
    activityIndex={0}
    otherFunding={exampleBudget.activityTotals[0].data.otherFunding}
  />
);

export const SummaryActivityBreakdownTableStory = Template.bind({});
SummaryActivityBreakdownTableStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            keyStatePersonnel: {
              medicaidDirector: {
                name: 'Cornelius Fudge',
                email: 'c.fudge@ministry.magic',
                phone: '5551234567'
              },
              medicaidOffice: {
                address1: '100 Round Sq',
                address2: '',
                city: 'Cityville',
                state: 'AK',
                zip: '12345'
              },
              keyPersonnel: [
                {
                  name: 'James Holden',
                  position: 'HIT Coordinator',
                  email: 'JimPushesButtons@tycho.com',
                  isPrimary: true,
                  fte: {
                    2022: 1,
                    2023: 1
                  },
                  hasCosts: true,
                  costs: {
                    2022: 100000,
                    2023: 100000
                  },
                  split: {
                    2022: {
                      federal: 90,
                      state: 10,
                      fundingCategory: 'DDI'
                    },
                    2023: {
                      federal: 90,
                      state: 10,
                      fundingCategory: 'DDI'
                    }
                  },
                  medicaidShare: {
                    2022: 100,
                    2023: 100
                  },
                  id: null,
                  key: '8e97cfe2'
                },
                {
                  name: 'Fred Johnson',
                  position: 'Project Management Office Director',
                  email: 'FJohnson@tycho.com',
                  isPrimary: false,
                  fte: {
                    2022: 0.3,
                    2023: 0.3
                  },
                  hasCosts: false,
                  costs: {
                    2022: 0,
                    2023: 0
                  },
                  split: {
                    2022: {
                      federal: 90,
                      state: 10,
                      fundingCategory: 'DDI'
                    },
                    2023: {
                      federal: 90,
                      state: 10,
                      fundingCategory: 'DDI'
                    }
                  },
                  medicaidShare: {
                    2022: 100,
                    2023: 100
                  },
                  id: null,
                  key: 'a2b5eea2'
                }
              ]
            },
            years: ['2022'],
            apdType: 'HITECH',
            activities: [exampleActivity]
          }
        },
        budget: exampleBudget
      },
      story
    })
];
