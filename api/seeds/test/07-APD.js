import { APD_TYPE, FUNDING_CATEGORY_TYPE } from '@cms-eapd/common';

export default {
  _id: '62a76c4c10a0f01aaa737882',
  status: 'draft',
  stateId: 'ak',
  apdType: APD_TYPE.HITECH,
  name: 'HITECH IAPD Dio 3',
  years: ['2022', '2023'],
  yearOptions: ['2022', '2023', '2024'],
  apdOverview: {
    updateStatus: {
      isUpdateAPD: false,
      annualUpdate: false,
      asNeededUpdate: false
    },
    narrativeHIE:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. At risus viverra adipiscing at in tellus integer feugiat. Pharetra et ultrices neque ornare aenean euismod elementum nisi quis. Sed odio morbi quis commodo odio aenean sed.</p>',
    narrativeHIT:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. Sagittis id consectetur purus ut. Erat imperdiet sed euismod nisi porta lorem. Quis hendrerit dolor magna eget est.</p>',
    narrativeMMIS:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit amet nisl purus. Donec enim diam vulputate ut pharetra sit amet aliquam id. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae. Eu lobortis elementum nibh tellus molestie nunc non.</p>',
    programOverview:
      '<p><span style="font-weight:400">APD 3; This APD has missing fields for Admin check, the missing fields are in the NO short Overview, NO Schedule dates, NO Standards and Conditions, NO Outcome, NO Milestone, NO State Staff, NO State Expenses, NO Private Contractor Costs, NO other funding</span></p>\n<ul>\n<li><span style="font-weight:400">FFY 2022-2023</span></li>\n<li><span style="font-weight:400">1 Key State Personnel</span></li>\n<li><span style="font-weight:400">2 Activities</span></li>\n<ul>\n<li><span style="font-weight:400">Activity 1</span></li>\n<ul>\n<li><span style="font-weight:400">Funding Source: HIT</span></li>\n<li><span style="font-weight:400">Standards and Conditions</span></li>\n<li><span style="font-weight:400">NO short Overview</span></li>\n<li><span style="font-weight:400">NO Schedule dates</span></li>\n<li><span style="font-weight:400">NO Standards and Conditions</span></li>\n<li><span style="font-weight:400">NO Outcome</span></li>\n<li><span style="font-weight:400">NO Milestone</span></li>\n<li><span style="font-weight:400">NO State Staff</span></li>\n<li><span style="font-weight:400">NO State Expenses</span></li>\n<li><span style="font-weight:400">NO Private Contractor Costs</span></li>\n<li><span style="font-weight:400">NO other funding</span></li>\n</ul>\n<li><span style="font-weight:400">Activity 2</span></li>\n<ul>\n<li><span style="font-weight:400">Funding Source: MMIS</span></li>\n<li><span style="font-weight:400">NO Outcome</span></li>\n<li><span style="font-weight:400">3 Milestone</span></li>\n<li><span style="font-weight:400">1 State Staff</span></li>\n<li><span style="font-weight:400">2 State Expenses</span></li>\n<li><span style="font-weight:400">1 Private Contractor Costs</span></li>\n<li><span style="font-weight:400">Include other funding</span></li>\n</ul>\n</ul>\n</ul>'
  },
  previousActivities: {
    previousActivitySummary:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida rutrum quisque non tellus orci ac auctor augue. Malesuada pellentesque elit eget gravida cum sociis. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Egestas dui id ornare arcu odio.</p>',
    actualExpenditures: {
      2020: {
        hithie: {
          federalActual: 0,
          totalApproved: 130000
        },
        mmis: {
          50: {
            federalActual: 0,
            totalApproved: 0
          },
          75: {
            federalActual: 0,
            totalApproved: 0
          },
          90: {
            federalActual: 0,
            totalApproved: 130000
          }
        }
      },
      2021: {
        hithie: {
          federalActual: 0,
          totalApproved: 150000
        },
        mmis: {
          50: {
            federalActual: 0,
            totalApproved: 0
          },
          75: {
            federalActual: 0,
            totalApproved: 0
          },
          90: {
            federalActual: 0,
            totalApproved: 159000
          }
        }
      },
      2022: {
        hithie: {
          federalActual: 0,
          totalApproved: 248000
        },
        mmis: {
          50: {
            federalActual: 0,
            totalApproved: 0
          },
          75: {
            federalActual: 0,
            totalApproved: 0
          },
          90: {
            federalActual: 0,
            totalApproved: 231000
          }
        }
      }
    }
  },
  keyStatePersonnel: {
    medicaidDirector: {
      email: 'c.fudge@ministry.magic',
      name: 'Cornelius Fudge',
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
        name: ' Kendrick Rollins',
        position: 'Chief of Guards',
        email: 'KRollings@sample.com',
        isPrimary: true,
        fte: {
          2022: 2,
          2023: 3
        },
        hasCosts: true,
        costs: {
          2022: 180000,
          2023: 230000
        },
        split: {
          2022: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.ddi
          },
          2023: {
            federal: 75,
            state: 25,
            fundingCategory: FUNDING_CATEGORY_TYPE.mando
          }
        },
        medicaidShare: {
          2022: 100,
          2023: 100
        }
      }
    ]
  },
  activities: [
    {
      fundingSource: 'HIT',
      name: 'Program Administration',
      activityOverview: {
        summary: '',
        description: '',
        alternatives: '',
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        }
      },
      activitySchedule: {
        plannedStartDate: null,
        plannedEndDate: null
      },
      milestones: [],
      outcomes: [],
      statePersonnel: [],
      expenses: [],
      contractorResources: [],
      costAllocation: {
        2022: {
          ffp: {
            federal: 0,
            state: 100,
            fundingCategory: null
          },
          other: 0
        },
        2023: {
          ffp: {
            federal: 0,
            state: 100,
            fundingCategory: null
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
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          2: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          3: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          4: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          }
        },
        2023: {
          1: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          2: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          3: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          4: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          }
        }
      }
    },
    {
      fundingSource: 'MMIS',
      name: 'Wheelz',
      activityOverview: {
        summary:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eros donec ac odio tempor orci dapibus ultrices in iaculis. Amet nisl suscipit adipiscing bibendum est ultricies integer. Quis risus sed vulputate odio ut enim blandit. Sodales ut etiam sit amet nisl purus in mollis nunc.</p>',
        description:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus. Eget mauris pharetra et ultrices neque ornare. Amet luctus venenatis lectus magna fringilla. Dolor sit amet consectetur adipiscing.</p>',
        alternatives:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum velit euismod in pellentesque massa placerat duis ultricies lacus. Morbi enim nunc faucibus a pellentesque. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras.</p>',
        standardsAndConditions: {
          doesNotSupport: '',
          supports:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin ac orci phasellus egestas tellus. Diam quam nulla porttitor massa id. In hac habitasse platea dictumst. Tristique risus nec feugiat in fermentum posuere urna nec.</p>'
        }
      },
      activitySchedule: {
        plannedStartDate: '2020-11-30T00:00:00.000+0000',
        plannedEndDate: '2022-08-31T00:00:00.000+0000'
      },
      milestones: [
        {
          milestone: 'Complete test 1',
          endDate: '2022-07-04T00:00:00.000+0000'
        },
        {
          milestone: 'Complete 2',
          endDate: '2022-08-12T00:00:00.000+0000'
        },
        {
          milestone: 'Complete 3',
          endDate: '2022-08-17T00:00:00.000+0000'
        }
      ],
      outcomes: [],
      statePersonnel: [
        {
          title: 'Guardian of the West',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis. Id ornare arcu odio ut sem nulla pharetra. Suspendisse ultrices gravida dictum fusce.',
          years: {
            2022: {
              amt: 80000,
              perc: 2
            },
            2023: {
              amt: 97000,
              perc: 6
            }
          }
        }
      ],
      expenses: [
        {
          category: 'Training and outreach',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque fermentum dui faucibus in ornare.',
          years: {
            2022: 2800,
            2023: 12000
          }
        },
        {
          category: 'Hardware, software, and licensing',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus.',
          years: {
            2022: 42000,
            2023: 27000
          }
        }
      ],
      contractorResources: [
        {
          name: 'Curator of War',
          description:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam. Volutpat odio facilisis mauris sit amet massa vitae. Tincidunt dui ut ornare lectus sit amet est placerat. At tellus at urna condimentum.</p>',
          start: '2020-02-14T00:00:00.000+0000',
          end: '2022-09-09T00:00:00.000+0000',
          totalCost: 840000,
          years: {
            2022: 91540,
            2023: 158832
          },
          useHourly: true,
          hourly: {
            2022: {
              hours: 3980,
              rate: 23
            },
            2023: {
              hours: 3309,
              rate: 48
            }
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.ddi
          },
          other: 32000
        },
        2023: {
          ffp: {
            federal: 50,
            state: 50,
            fundingCategory: FUNDING_CATEGORY_TYPE.ddi
          },
          other: 390200
        }
      },
      costAllocationNarrative: {
        methodology:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed velit dignissim sodales ut eu sem integer. Vitae tempus quam pellentesque nec nam aliquam sem.</p>',
        years: {
          2022: {
            otherSources:
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Purus sit amet volutpat consequat mauris nunc congue nisi vitae.</p>'
          },
          2023: {
            otherSources:
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet id donec ultrices tincidunt arcu. At risus viverra adipiscing at in tellus integer.</p>'
          }
        }
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
      }
    }
  ],
  proposedBudget: {
    incentivePayments: {
      ehAmt: {
        2022: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        2023: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        }
      },
      ehCt: {
        2022: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        2023: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        }
      },
      epAmt: {
        2022: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        2023: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        }
      },
      epCt: {
        2022: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        2023: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        }
      }
    }
  },
  assurancesAndCompliances: {
    procurement: [
      {
        checked: true,
        title: '42 CFR Part 495.348',
        explanation: ''
      },
      {
        checked: true,
        title: 'SMM Section 11267',
        explanation: ''
      },
      {
        checked: true,
        title: '45 CFR 95.613',
        explanation: ''
      },
      {
        checked: true,
        title: '45 CFR 75.326',
        explanation: ''
      }
    ],
    recordsAccess: [
      {
        checked: true,
        title: '42 CFR Part 495.350',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR Part 495.352',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR Part 495.346',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR 433.112(b)',
        explanation: ''
      },
      {
        checked: true,
        title: '45 CFR Part 95.615',
        explanation: ''
      },
      {
        checked: true,
        title: 'SMM Section 11267',
        explanation: ''
      }
    ],
    softwareRights: [
      {
        checked: true,
        title: '42 CFR 495.360',
        explanation: ''
      },
      {
        checked: true,
        title: '45 CFR 95.617',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR Part 431.300',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR Part 433.112',
        explanation: ''
      }
    ],
    security: [
      {
        checked: true,
        title: '45 CFR 164 Security and Privacy',
        explanation: ''
      }
    ]
  },

  createdAt: '2022-06-13T16:56:44.423+0000',
  updatedAt: '2022-06-30T17:11:30.837+0000',
  __v: 0
};
