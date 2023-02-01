import { APD_TYPE } from '@cms-eapd/common';

export default {
  apdType: APD_TYPE.HITECH,
  name: 'MN-1921-07-11-HITECH-APD',
  years: ['2022', '2023'],
  yearOptions: ['2022', '2023', '2024'],
  apdOverview: {
    updateStatus: {
      isUpdateAPD: false,
      annualUpdate: false,
      asNeededUpdate: false
    },
    narrativeHIE: '',
    narrativeHIT: '',
    narrativeMMIS: '',
    programOverview: ''
  },
  keyStatePersonnel: {
    medicaidDirector: {
      name: '',
      email: '',
      phone: ''
    },
    medicaidOffice: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    },
    keyPersonnel: [
      {
        name: 'James Holden',
        position: 'HIT Coordinator',
        email: 'JimPushesButtons@tycho.com',
        isPrimary: true,
        fte: {
          2022: 1.0,
          2023: 1.0
        },
        hasCosts: true,
        costs: {
          2022: 100000,
          2023: 100000
        },
        split: {
          2022: { federal: 90, state: 10 },
          2023: { federal: 90, state: 10 }
        },
        medicaidShare: {
          2022: 100,
          2023: 100
        }
      },
      {
        name: 'Fred Johnson',
        position: 'State Medicaid Director',
        email: 'FJohnson@tycho.com',
        isPrimary: false,
        fte: {
          2022: 0.3,
          2023: 0.3
        },
        hasCosts: false,
        costs: {},
        split: {},
        medicaidShare: {}
      }
    ]
  },
  previousActivities: {
    previousActivitySummary: '',
    actualExpenditures: {
      2019: {
        hithie: {
          federalActual: 320000,
          totalApproved: 540000
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
            totalApproved: 0
          }
        }
      },
      2020: {
        hithie: {
          federalActual: 140000,
          totalApproved: 280000
        },
        mmis: {
          50: {
            federalActual: 23445,
            totalApproved: 82545
          },
          75: {
            federalActual: 23440,
            totalApproved: 75340
          },
          90: {
            federalActual: 235720,
            totalApproved: 262460
          }
        }
      },
      2021: {
        hithie: {
          federalActual: 146346,
          totalApproved: 234526
        },
        mmis: {
          50: {
            federalActual: 129387,
            totalApproved: 375445
          },
          75: {
            federalActual: 413246,
            totalApproved: 654455
          },
          90: {
            federalActual: 614544,
            totalApproved: 863455
          }
        }
      }
    }
  },
  activities: [
    {
      activityId: 'efgh5678',
      fundingSource: 'HIT',
      name: 'Program Administration',
      activityOverview: {
        summary:
          'Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
        description:
          '<p><strong><ins>III.A.1: Modifications to the State Level Repository</ins></strong></p>\n<p>Tycho Medicaid is seeking funding to design, develop, and implement modifications to the existing State Level Repository (SLR) for continued administration of the EHR Incentive Program. The modifications of the SLR for CMS program rule changes and guidance changes (Stage 3, IPPS, and OPPS) will require extensive development and implementation efforts and is essential to the effective administration of the Medicaid EHR Incentive Program. Modifications to the SLR are done in phases depending on how CMS rule changes occur. The implementation of the design elements will require provider onboarding activities to be initiated and completed including outreach and training for all program participants. The SLR will increase the efficiency with which Tycho Medicaid administers the program; allow for increased oversight and assure that the program is operated in accordance with the complex and evolving program rules and requirements.</p>\n<p></p>\n<p>Additionally, Tycho Medicaid is seeking funding to complete a security risk assessment for the State Level Repository to ensure the SLR meets the required system security standards for HIPAA, MARSe, NIST and other state and federal security requirements for information technology.</p>\n<p></p>\n<p><strong><ins>III.B.1 Administrative and Technical Support Consulting</ins></strong></p>\n<p>The DHSS is requesting funding to support activities under the Medicaid EHR Incentive Payment Program to provide technical assistance for statewide activities and implementations. Activities of this initiative will include support of the activities included in this IAPDU, SMPHU development, eCQM implementation, project management services, and assistance with the public health expansion modernization initiative.</p>\n',
        alternatives:
          '<p>Modifications to State Level Registry (SLR)</p>\n<ul>\n<li>Minimize Modifications</li>\n<li>Minimize cost</li>\n<li>Decreased implementation time.</li>\n</ul>\n<p>The 2015-2017 rule changes are significant and wide ranging; minimally accommodating the new attestations will be problematic for the remainder of the program. Program benefits will potentially not be maximized. To be prepared for Stage 3 and to properly implement all 2015-2017 rule changes; Tycho plans to implement all necessary modifications.</p>\n<ul>\n<li>Modifications to State Level Registry (SLR)</li>\n<li>Implement the changes as outlined</li>\n<li>The EHR Incentive Program will have the ability to be fully supported.</li>\n<li>Support of electronic submission of CQMs, enhancing the support of the emphasis on interoperability.</li>\n</ul>\n<p>There are no significant disadvantages to this option.</p>\n<p></p>\n<p>Implementing the changes as outlined provide the optimal opportunity to maximize the benefits of the EHR program and its impact on the delivery of health care with improved quality and outcomes.</p>\n',
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        }
      },
      activitySchedule: {
        plannedStartDate: '',
        plannedEndDate: ''
      },
      milestones: [
        {
          endDate: '2021-09-07',
          milestone:
            'Implementation of Final Rule and Stage 3 System Developments'
        },
        {
          endDate: '2017-12-31',
          milestone: 'Environmental Scan Completion'
        },
        {
          endDate: '2021-05-30',
          milestone: 'HIT Roadmap Development'
        }
      ],
      outcomes: [
        {
          outcome:
            'Accept attestations for 2021, and modify SLR to meet new spec sheets released by CMS.',
          metrics: [
            {
              metric: 'Complete SLR modifications by 11/1/18'
            },
            {
              metric: 'Accept attestations through 4/30/19.'
            }
          ]
        },
        {
          outcome:
            '<p>Provide support to EPs and EHs through attestation process.</p>\n',
          metrics: [
            {
              metric:
                "<ol>\n<li>Guidance available on Tycho's websites</li>\n<li>Office hours availble for EPs and EHs</li>\n<li>Site visits, as needed, for EPs and EHs</li>\n</ol>\n"
            }
          ]
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
        }
      ],
      expenses: [
        {
          description: '',
          category: 'Training and outreach',
          years: {
            2022: 40000,
            2023: 40000
          }
        },
        {
          description: '',
          category: 'Travel',
          years: {
            2022: 35000,
            2023: 35000
          }
        },
        {
          description: '',
          category: 'Hardware, software, and licensing',
          years: {
            2022: 700000,
            2023: 0
          }
        }
      ],
      contractorResources: [
        {
          description: 'Maintain SLR',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: 'Super SLR Incorporated',
          start: '',
          totalCost: 32423,
          years: {
            2022: 999756,
            2023: 342444
          }
        },
        {
          description: 'Technology consulting and planning services.',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: 'Tech Consulting Inc.',
          start: '',
          totalCost: 473573,
          years: {
            2022: 333000,
            2023: 200000
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 90,
            state: 10
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
        methodology:
          '<p>No cost allocation is necessary for this activity.</p>\n',
        years: {
          2022: {
            otherSources:
              '<p>No other funding is provided for this activity for FFY 2022.</p>\n'
          },
          2023: {
            otherSources:
              '<p>No other funding is provided for this activity for FFY 2023.</p>\n'
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
    },
    {
      activityId: 'fghi6789',
      fundingSource: 'MMIS',
      name: 'HIE Claims Data Analytics',
      activityOverview: {
        summary:
          'To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. ',
        alternatives:
          "<p>Medicaid Claims Data Feed to the HIE</p>\n<p>Periodic Uploads of Medicaid Claims Data from MMIS to the HIE</p>\n<p>The HIE could consume Medicaid claims data from periodic uploads of an extract/export from the MMIS</p>\n<p>Increase of administrative burden on development staff.</p>\n<p>Short term cost savings, with a higher long-term cost. No real-time data.</p>\n<p>The periodic MMIS uploads would not provide real time data. Therefore, Tycho plans to use a Medicaid claims data feed</p>\n<p>Medicaid Claims Data Feed to the HIE</p>\n<p>Create a Medicaid Claims Data Feed to the HIE</p>\n<p>Implementing a Medicaid Claims Data Feed to the HIE would provide information regarding Medicaid claims to participating providers, Hospitals, and patients</p>\n<p>Data regarding medications prescribed, tests performed, and the resulting diagnosis would improve care coordination</p>\n<p>There are no significant disadvantages to this option</p>\n<p>Implementing a Medicaid Claims data feed to the HIE provides updated claims data in real-time to improve care coordination and increase MU. Because data is updated in real-time, a data feed meets Tycho's needs</p>\n",
        description:
          "<p><strong><ins>III.B.3 Medicaid Claims Data Feed to the HIE</ins></strong></p>\n<p>Currently, Tycho does not have an All-Payers’ Claims database that can provide consumers and DHSS with consolidated claims data. To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. This initiative will require contractor assistance from Conduent, LLC to complete required MMIS changes as well as Tycho's HIE Service provider, Orion Health to implement the necessary HIE updates. DHSS IT Planning Office will coordinate the efforts of the three vendors.</p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n",
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        }
      },
      activitySchedule: {
        plannedStartDate: '',
        plannedEndDate: ''
      },
      milestones: [
        {
          endDate: '2021-12-31',
          milestone: 'Implement MMIS-HIE Interface'
        },
        {
          endDate: '2021-12-31',
          milestone: 'Develop MMIS-HIE Interface Requirements'
        }
      ],
      outcomes: [
        {
          outcome:
            'Build interface between the MMIS Data Warehouse (DW) and the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE.',
          metrics: [
            {
              metric:
                'Hire contracted support to build an open API for the DW that the HIE and PHR can consume.'
            },
            {
              metric: 'Provide support for using open API for DW'
            }
          ]
        }
      ],
      statePersonnel: [
        {
          title: 'Project Assistant',
          description: 'Assist with stuff',
          years: {
            2022: {
              amt: 98000,
              perc: 1
            },
            2023: {
              amt: 99000,
              perc: 1
            }
          }
        },
        {
          title: 'MMIS Project Manager',
          description:
            'This position is responsible for the program development, planning, coordination, evaluation, independent management and oversight of the Tycho Automated Info',
          years: {
            2022: {
              amt: 140000,
              perc: 1
            },
            2023: {
              amt: 144000,
              perc: 1
            }
          }
        },
        {
          title: 'MMIS Trainer',
          description:
            'Under the direct supervision of the Project Manager, this position is responsible for the development of a comprehensive training and support program for the Tycho Automated Information Management System',
          years: {
            2022: {
              amt: 115000,
              perc: 1
            },
            2023: {
              amt: 115000,
              perc: 1
            }
          }
        },
        {
          title: 'Programmer IV',
          description:
            'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
          years: {
            2022: {
              amt: 140000,
              perc: 1
            },
            2023: {
              amt: 145000,
              perc: 1
            }
          }
        },
        {
          title: 'Security IT',
          description: 'Make sure its secure.',
          years: {
            2022: {
              amt: 115000,
              perc: 1
            },
            2023: {
              amt: 120000,
              perc: 1
            }
          }
        },
        {
          title: 'Operations Specialist',
          description: 'Run the day to day.',
          years: {
            2022: {
              amt: 125000,
              perc: 1
            },
            2023: {
              amt: 130000,
              perc: 1
            }
          }
        },
        {
          title: 'Programmer V',
          description:
            'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
          years: {
            2022: {
              amt: 150000,
              perc: 2
            },
            2023: {
              amt: 155000,
              perc: 3
            }
          }
        },
        {
          title: 'Programmer III',
          description:
            'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
          years: {
            2022: {
              amt: 120000,
              perc: 1
            },
            2023: {
              amt: 125000,
              perc: 1
            }
          }
        }
      ],
      expenses: [
        {
          description: '',
          category: 'Travel',
          years: {
            2022: 0,
            2023: 0
          }
        }
      ],
      contractorResources: [
        {
          description: 'Hosting and development support.',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: 'Interface Vendor Inc.',
          start: '',
          totalCost: 26453574,
          years: {
            2022: 650000,
            2023: 750000
          }
        },
        {
          description: 'Interface M&O contractor.',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: 'TBD',
          start: '',
          totalCost: 7398,
          years: {
            2022: 0,
            2023: 1000000
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 90,
            state: 10
          },
          other: 0
        },
        2023: {
          ffp: {
            federal: 75,
            state: 25
          },
          other: 0
        }
      },
      costAllocationNarrative: {
        methodology:
          '<p>No cost allocation is necessary for this activity.</p>\n',
        years: {
          2022: {
            otherSources:
              '<p>No other funding is provided for this activity for FFY 2022.</p>\n'
          },
          2023: {
            otherSources:
              '<p>No other funding is provided for this activity for FFY 2023.</p>\n'
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
    },
    {
      activityId: 'ghij7890',
      fundingSource: 'HIE',
      name: 'HIE Enhancement and Onboarding',
      activityOverview: {
        summary: 'Statewide HIE enhancement and onboarding.',
        description:
          "<p></p>\n<img src=\"data:image/jpeg;base64,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ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAAABEQIRAD8A9VooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKazBRuJAA6k9KAFNNeRIxukYKB3JwKz7nVgCUthkjjeen4etZrvJM2+Ulm960jSb1eiMZ14rRas1ZdWgTiMFz69Fqq+q3TH5NqD2GT+tVAtLtq1CK8zF1Zy629CRr27frKf0H8hTDLMeS7fnRtpdtVouiIu3uxvmy/32/OnrdXSfdkP6H+lJtpNtGnYNVsyddUvE6lX+o/wxVmLV0PEyFT6ryKzitIVqeSL6WLVWcetzoIp4ZhmJw30PNSCubGVO5TgjoRV221aSPC3Hzj+8MAiolTa21NYV09JaM2KKjilSZA8bBgfSpKzN73CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkpaazBQWY4AGTQA2WaOFC8h2qBWLd3sl0xAysfZfX3NJe3bXUmAcRqflHr7moQK2hC2r3OWrVcnyrYQLTwKUCnYq2zJIQClxS4pQKRVhMUYp2KXFAWGYoxT8UmKAsMxSEVJikxQFiIrTStS4ppFO5LQQXEts4aM8Z5Xsa27W7iuY9yHkfeXuKwSKdBNJbyiSPt1HYj0qZQUlpuaU6jg7PY6LNLUUEyTxrKnQj8qlrDY607q6CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKzNXuCALZerYLfTsK0T61z1xIZp3kPdjj6DgVdNXfoZVp8sbdxgFPApFFPArZnKhQKcBSCnAUikGKcBQBTwKVxpCAUYp4FLilcqxHijbUmKQigLERFJipCKaaaZLRGaQinkU2mJkZFMIqUimEU9iWWNLuDDP5LfdkP5N2raFc1yDkcEciuht5RNAko/iUE/XvWVVdTow8tLdiWiiiszcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIrltkEjeiN/KueFb95zay/7hrAWtqWzObEbx9Br3EMMkUUrbXncpEME7mALEcewNT7lUZYhR0yTisrVo7k3GnXNvA9wLe5d5Fj27gpjdc/MR3YVBdw313fw3cttIbQ2zR+Q6LMUl353FPMAJK8Ajpj3qmzNR6m8WVRliFHTJOKXegAJYAHoSQAa5WeC5S5tNNTN00WnTs6XeGKh5AiOR5iDcMEA5Jx+dTRIbuxtIrG1FzZCxdUuJEDymYHYVIMiBOhJbmp5ilHzOoLKoyxCjOMk4qQFeTkcda5aysNTRNOOr20l7HFpawSRblkKXIPzMwLfMSOA3an6lFdrqCaTblkh16JRJh/3lv9nCiUjn+KPAyO9JspROhury1sYhNdSBEZ1ReCzM7HCqoUEsT2AFOguYrhC8e9QG2kSxyQNn02yKp/Squr2kNzZLbvbyToroV8ghZ4ivKyoSR8wwORzzWX5Wum3heVJpktNShliWRk+2PbhSGL4YKTubIHBIpDtobd5f22nwia6YqrTRQggFjvlYIgwPc1OH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guP3UhNNzSZoFcdmkJpM00mgLik0wmgmmlqaRLYhNX9LtC7faZBwv3Pr61FZWT3Tb34iB5/2vYVtKoVQq8AcAVFSdtEbUad/ee3QWlpKWsTpCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKSlooAhuLWK5XbIM+h7isa5sZ7ZjwXTs4H8xW/TSAcg1UZuPoZzpKfk+5zYNODVrXGlwSndHmJv8AZHy/lWfNp91Dzt3r6r/hWqnGRzypSh0uvIjDUu6oiSDg8H0pd1UQ3Yk3Ubqj3UbqLBckzRuqPcaC1FguP3U0tSIskp2xqWPtVyHSZpOZj5Y9Byf50m0t2NRlLZFMbmOFBJPYcmr1ppbOQ9yMDsnc/Wr9vZQW4+Rct/ePLVPWcqjeiN4UEtZasRUVAFUAAdAKWlorM3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKQ0UUAxjxRycSIrfUA1TubO2AJEYH04ooqovUiSVtjNljRTwMfnUYAooreOxyS3LNvBE7fMufxNacVnaqoIiXPqRn+dFFZTbudFJLsWAAvCgAe3FOoorM2CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==\" alt=\"undefined\" style=\"float:none;height: auto;width: auto\"/>\n<p></p>\n<p></p>\n<p><strong><ins>III.D. Statewide HIE Enhancement, Onboarding, and Support of Statewide HIE Operational Strategic Plan</ins></strong></p>\n<p>DHSS is requesting funding to support the continued enhancement and provider onboarding activities to the statewide HIE. The success of the statewide HIE is critical for improving data exchange, coordination of care, and modernizing healthcare across Tycho. The following funding requests are for projects that will provide enhanced technical capabilities to providers, support providers in onboarding, support modernizations required for Medicaid redesign, and ensure sustainability beyond State of Tycho and CMS funding. The projects have been designed to meet the following goals and desires for the statewide HIE:</p>\n<ul>\n<li>• Support the HIE’s operational needs, including staffing, contract resources, administrative expenses, and technology expenses to support operations and ongoing maintenance of the HIE</li>\n<li>• Provide technical assistance to support HIE onboarding and implementation within provider organizations who are meaningful use-eligible and who refer directly with tribal organizations</li>\n<li>• Develop tools and HIE interfaces that support enhanced care coordination services, and increase HIE value to ensure sustainability beyond current funding streams</li>\n<li>All initiatives described below are funded at 90/10 funds and do not require cost allocation. All projects below support the onboarding and connection for Medicaid providers, EPs, EHs, and additional providers supported by SMD #16-003. Section VII. Cost Allocation Plan and Appendix D of this IAPD further describes the cost allocation methodology.</li>\n</ul>\n<p><strong><ins>III.D.1 Behavioral Health Onboarding &amp; Care Coordination</ins></strong></p>\n<p>The Department recognizes the need to increase Behavioral Health (BH) data capacity and sharing to achieve its goals and outcomes related to care coordination. This includes promoting effective communication to coordinate care and enhancing the ability for providers to share and gain access to Protected Class Patient Data where appropriate. To support the capacity of data sharing and improving coordination of care, funding is requested to support Behavioral Health provider connectivity through the onboarding program by the development and implementation of a Behavioral Health-centric Unified Landing Page Application. The Behavioral Health Unified Landing Page Application will improve the quality and completeness of behavioral health data and thus, support the ability for providers to achieve MU.</p>\n<p></p>\n<p>In addition to the Unified Landing Page, funding is requested to support behavioral health provider onboarding to the HIE. The HIE onboarding program will provide funds to offset expenses required for behavioral health providers to adequately participate in statewide health information exchange. The onboarding program will support Tycho's HIE vision of increasing onboarding Medicaid providers and care coordination to help Tycho providers demonstrate MU. This program relates to the guidance provided by CMS in the SMD 16-003 letter dated February 2016 and will assist with covering costs associated with connectivity including but not limited to the following activities:</p>\n<ul>\n<li>• Legal activities including establishment of user agreements</li>\n<li>• Configuration and technical development activities</li>\n<li>• Testing of connection</li>\n<li>• Workflow integration</li>\n<li>• Implementation support and user training</li>\n<li>• Post production support</li>\n</ul>\n<p>The goal is for the onboarding program to support 40 provider organizations across the State. The initial phase of the program will be focused on Medicaid behavioral health providers with additional provider types potentially targeted in later phases of the initiative. Administrative offset funding will be on-time funding only and will be issued as pass-through funding through healtheConnect (Tycho's HIE organization). The funding will be distributed in 2 parts: 75% upon onboarding initialization (participation/contract signed) and the remaining 25% upon the HIE connection being live or in production.</p>\n<p></p>\n<p><strong><ins>III.D.2 HIE Strategic Planning</ins></strong></p>\n<p>Having a robust HIE is a critical component of Tycho's HIT landscape and will continue to play a role in enhancing Tycho's EPs and EHs ability to achieve MU. As part of the Department’s responsibility for administration of the EHR Incentive Program and in an effort to enhance the maturity of HIE in Tycho, the Department is requesting funds to support a health information exchange assessment using CMS’ standards of the HIE Maturity Model and MITA and a Strategic Plan to enhance platform functionality and initial steps necessary to establish a long-term vision of HIE in Tycho's HIT landscape. This work will further ensure that the Department’s goals and target state (To-Be vision) aligns with CMS guidelines as specified under 42 CFR 495.338, as well as the HIE Maturity Model, MITA and the Seven Standards and Conditions.</p>\n<p></p>\n<p>The Department is requesting funds to support the statewide HIE in conducting an HIE Assessment using the CMS HIE Maturity Model and MITA standards. The information gathered in the assessment will help clearly articulate the long-term HIE vision for Tycho, define a governance model, and establish a robust sustainability plan built on the framework of the HIE Maturity Model and MITA standards. This information will also be used to identify areas where the statewide HIE can provide services and make connections with the Medicaid enterprise of systems to support health information exchange requirements and sustainability of the HIE.</p>\n<p></p>\n<p><strong><ins>III.D.3 Integration of Social Determinants of Health</ins></strong></p>\n<p>To further drive Tycho's goals around improved health outcomes through HIE, the Department is seeking funds to support the integration of the Social Determinants of Health into the statewide HIE system which will improve coordination of care and information exchange across the state.</p>\n<p></p>\n<p>This is an important and practical step to help the healthcare delivery system build effective, coordinated, data-driven healthcare services into communities hit hardest by social structures and economic systems. The integration of social determinants of health data will provide support for addressing social determinants of health drivers in Tycho and will identify ways to improve intervention using Social Determinants of Health as part of a comprehensive coordinated care model impacting payment, incentivizing purposeful intervention in the specific needs of their patients and populations to improve health outcomes.</p>\n<p></p>\n<p>To complete the scope of work, the HIE will integrate a limited CDR and interface to the network as well as provide onboarding services to connect Medicaid providers. The integration of the Social Determinates of Health project will support Medicaid providers ability to achieve meaningful use by allowing providers to incorporate summary of care information from other providers into their EHR using the functions of CEHRT through the HIE.</p>\n<p></p>\n<p><strong><ins>III.D.4 Staff Augmentation for Adoption and Utilization</ins></strong></p>\n<p>DHSS seeks to support onboarding efforts to connect Medicaid Meaningful Use eligible providers and providers supporting eligible providers to the HIE. The provider onboarding program will fund staffing outreach/educational support and technical services to Medicaid EPs that have adopted EHRs but not made HIE use part of day to day operations, not made use of new HIE capabilities, not yet connected, or were unable to take advantage of the ONC Regional Extension Center (REC) services because they were not eligible.</p>\n<p>Onboarding will include efforts to provide outreach/educational support and technical services. The Provider Onboarding Program includes the following outcomes:</p>\n<ul>\n<li>Provide staff for outreach, education, training, and organization change management to targeted provider groups to assist with interfacing and connecting to the HIE to support ongoing utilization of the HIE services</li>\n<li>Meet milestones established by the HIE and the Department for provider connectivity to the HIE</li>\n<li>Cover the onboarding costs (personnel and technical) for connecting Medicaid providers and hospitals to the statewide HIE and integrating HIE use into the provider workflow</li>\n</ul>\n<p>The funds requested in this IAPD-U will be used to establish provider groups for onboarding support, establish onboarding benchmarks, and specifically implement training and technical assistance services. Funds will be used to assess barriers to onboarding and adoption of the HIE services, strategies for work flow analysis, and other ways to reduce Medicaid provider burden to onboard to the HIE. The proposed solution shall provide support services that coordinate with HIE processes to onboard and improve participant interoperability (e.g., clinic readiness assessments, bi-directional connection builds development and deployment of bi-directional interface with Medicaid) through utilization of the HIE system.</p>\n<p></p>\n<p>The adoption and utilization program will continue to expand outreach efforts and technical services to Medicaid providers and continue to boost MU numbers and milestones in Tycho to enhance the HIT vision outlined in the SMHP. In addition to AIU and MU education and technical services, the program will also seek to assist providers in meeting MU Stages 2 and 3 through onboarding provider interfaces and providing the capabilities to automatically meet several MU measures through the enhanced functionality of the HIE.</p>\n<p></p>\n<p><strong><ins>III.D.5 Trauma Registry</ins></strong></p>\n<p>DHSS recognizes the need for a trauma registry as an essential component of information exchange. The trauma registry is necessary to drive an efficient and effective performance improvement program for the care of injured enrollees. Furthermore, as published recently by SAMHSA, there are a range of evidence-based treatments that are effective in helping children and youth who have experienced trauma. Through the HIE, health providers will share and gain access to trauma information to drive an efficient and effective performance improvement program for the care of injured enrollees. The trauma register information will interoperate with the Behavioral Health Unified Landing Page Application to promote evidence-based treatments that are effective in helping enrollees who have experienced trauma. The trauma registry will be recognized as a specialized registry by the State to support MU and data exchange.</p>\n<p></p>\n<p><strong><ins>III.D.6 Air Medical Resource Location</ins></strong></p>\n<p>Tycho is currently struggling with tracking and maintaining the location and availability of air medical resources within the state. This information is critical to the timely delivery of care given the remote nature of Tycho's geography and unique dependence on air transportation. Currently, Tycho's air medical resources are using out of state dispatch centers who do not clearly understand the geography of Tycho or time needed to travel within the state. To address this gap in services and mitigate potential life-threatening delays in air medical resources, the Department would like to request funds to support the integration of the LifeMed application into the HIE. This application will allow healthcare entities: Public Health, hospitals, primary care providers, EMS, and all other authorized provider types to track all air medical resources in the state. The LifeMed application allows for tracking of specific tail numbers on planes and locations/timing for air resources.</p>\n<p></p>\n<p>The HIE will integrate with the LifeMed application so that Tycho providers and healthcare entities are able to seamlessly track all air medical resources in the state, thus greatly improve coordination and transition of care. The ability to track this information through the HIE will further support providers ability to enhance care coordination by accurately tracking patient location and improves health information exchange by giving providers access to information on patient’s location to submit summary of care records through the HIE to other provider EHR systems. Funds will be used to support the LifeMed software costs, provider training and implementation services.</p>\n<p></p>\n<p><strong><ins>III.D.7 AURORA-HIE Integration</ins></strong></p>\n<p>AURORA is a Public Health online patient care reporting system for EMS developed by Image Trend. The Department is requesting funds to support the connection of the AURORA system to the HIE. This activity would activate the HIE integration with the Image Trend solution to allow for Medicaid providers to send patient information to the AURORA system through the HIE. Upon delivery of the patient to the hospital the patient’s health data from EMS would be transmitted via the HIE to the hospital’s EHR system, and when the patient is discharge the ADT feed from the hospital would be transmitted back to EMS to the AURORA system.</p>\n<p>DHSS is seeking funds to integrate the AURORA Public Health online patient care reporting system for EMS to the HIE to help support Medicaid providers ability to achieve Meaningful Use by meeting outcomes and measures pertaining to Health Information Exchange, Coordination of Care, and Public Health Reporting. Funds will be used to develop interfaces between the HIE and 10 hospitals and provider training and technical onboarding assistance to providers to connect to the HIE and AURORA system.</p>\n",
        alternatives:
          '<p>Health Information Exchange</p>\n<p>Maintain existing system.</p>\n<p>The existing system has a few benefits. The current EDI process while dated still forms the backbone of the Division’s data sharing needs. The technology works in the fashion that it always has.</p>\n<p>The drawbacks of this approach are significant. While the current Edi process affords behavioral health agencies to submit their data to the state, it does not allow for sharing the same data to other providers in either the primary care or behavioral health treatment contexts.</p>\n<p>There are more disadvantages than advantages in pursuing this approach. The drawbacks are substantial, such as absence of data normalization, difficulties with aligning the user interface and application design with industry best practices, inconsistencies in design, and difficulties with support and maintenance, making this approach less favorable than the other two alternatives considered.</p>\n<p>Health Information Exchange</p>\n<p>Update and Enhance Existing System(s), connecting AKAIMS to the Health Information Exchange</p>\n<p>Connecting AKAIMS to the Health Information Exchange will provide for the sending and receiving of data across healthcare disciplines. This data sharing is thought to enhance and provide for better care outcomes for patients who are participating in care across multiple providers. This solution future proofs AKAIMS as it will integrate current technologies and leverages those technologies for a more feature rich process.</p>\n<p>Training and integration of this updated technology will require some effort and outreach. Newly on-boarded agencies will need to adjust to new data collection protocols.</p>\n<p>Full participation in the Health Information Exchange will reduce double data entry at all levels (reducing costs). It is anticipated that efficiencies gained with simplification of data collection and reporting will greatly enhance patient care outcomes.</p>\n<p>HIE Platform</p>\n<p>Upgrade HIE to the Audacious Inquiry (Ai) platform</p>\n<p>Ai offers a strong foundation on which additional functionality can be built. Transitioning to the Ai platform has the potential to minimize the effort required to modernize the HIE, while delivering additional services to users.</p>\n<p>Transitioning to Ai means that the State will be leaving the current HIE platform. There is potential risk in adoption and migration of services and data.</p>\n<p>The HIE platform will be transitioned to Ai to offer additional services, contain costs on enhancements, and maximize the scalability and flexibility of the HIE to support modernization across the enterprise.</p>\n<p>HIE Platform</p>\n<p>Keep platform as it is without upgrade.</p>\n<p>Keeping the platform as it is without upgrade would allow focus to remain on onboarding.</p>\n<p>Functionality supported by existing HIE is not adequate to support future applications. The value delivered by the service as it is could be improved with additional functionality. Potential to ingest different critical types of data is limited without a platform upgrade.</p>\n<p>Alternative solutions will leverage existing infrastructure where applicable; will not increase annual maintenance fees, and will follow DHSS purchasing policy.</p>\n<p></p>\n<p>HIE Platform</p>\n<p>Partner with another state HIE for services ranging from sharing the platform itself, to specific services or commonly-developed interfaces.</p>\n<p>Sharing with another state offers the potential to</p>\n<p>• decrease costs</p>\n<p>• Increase speed of onboarding</p>\n<p>• Increase functionality</p>\n<p>• Provide for greater sustainability</p>\n<p>• Address the needs of our partners faster or better</p>\n<p>No states currently share HIE services entirely, due to perceived legal constraints; this option presents multiple factors to consider ranging from legal to technical. Potential for cost savings is limited because pricing models are usually based on volume. There is a possibility for significant disruption to service during a transition of this type; significant issues with legal arrangements complying with other states.</p>\n<p>Alternative solutions will leverage existing infrastructure where applicable; will not increase annual maintenance fees, and will follow DHSS purchasing policy.</p>\n<p>HIE Tools for Care Coordination</p>\n<p>Add functional tools to support care coordination, referrals and analytics through other module developers or collaborators</p>\n<p>Sharing with another state or regional HIE to develop or utilize HIE tools offers the potential to</p>\n<p>• decrease costs</p>\n<p>• Increase speed of onboarding</p>\n<p>• Increase functionality</p>\n<p>• Provide for greater sustainability</p>\n<p>• Address the needs of our partners faster or better</p>\n<p>If another commercial developer is selected to offer these modules, there is some likelihood that integrating into the HIE platform will be more difficult without the transition to Ai.</p>\n<p>Alternative solutions will leverage existing infrastructure where applicable; will not increase annual maintenance fees, and will follow DHSS purchasing policy.</p>\n<p>HIE Functionality</p>\n<p>Enhancing functionality for participating hospitals</p>\n<p>Hospitals are critical stakeholders in the HIE. Providing functionality to assist hospitals in meeting MU3 and in evaluating ER patients are two areas where HIE could provide valuable information.</p>\n<p>Hospital focus is based on patient safety. Thus far, there has been little incentive for using HIE data for patient safety.</p>\n<p>DHSS is actively pursuing additional functionality for hospitals. This involves hospital stakeholder meetings, vendor discussions, board review and clinical workgroup input.</p>\n<p></p>\n<p>HIE Functionality</p>\n<p>Implement connections with high-value state and federal data sources (Corrections, DJJ, SSA, DoD)</p>\n<p>Including health data from correctional facilities (ADT, ORU and/or CCD files) will help provide better more coordinated care for this vulnerable population, many of whom are also Medicaid-eligible.</p>\n<p>Aside from the need to allocate staff time across projects, there are no significant drawbacks to this option.</p>\n<p>This project should proceed.</p>\n<p>HIE Functionality</p>\n<p>Keep health information exchange functionality substantially the same regarding state and federal data source connections</p>\n<p>Less work for the HIE team, DHSS and other teams to accomplish, allowing for greater focus on onboarding providers and implementing new technology modules.</p>\n<p>Leaving the information gap among these agencies open will lead to continued delays in needed services.</p>\n<p>This option is not preferred.</p>\n<p>HIE Functionality</p>\n<p>Keep health information exchange functionality substantially the same regarding emergency department information exchange</p>\n<p>Giving providers better tools to coordinate care for high-risk, high-utilizer members of the population has the potential to substantially reduce spending and improve outcomes for this vulnerable population.</p>\n<p>Aside from the need to allocate staff time across projects, there are no significant drawbacks to this option.</p>\n<p>This project should proceed.</p>\n<p>HIE Functionality</p>\n<p>Keep health information exchange functionality substantially the same regarding prescription information</p>\n<p>Less work for the HIE, DHSS and other teams to accomplish, allowing for greater focus on onboarding providers and implementing new technology modules</p>\n<p>A continuing information gap around prescriptions filled will limit the potential to improve care coordination for Tycho citizens and heighten patient safety.</p>\n<p>This project should proceed.</p>\n<p>HIE Functionality</p>\n<p>Keep health information exchange functionality substantially the same regarding image exchange</p>\n<p>Less work for the HIE, DHSS and other teams to accomplish, allowing for greater focus on onboarding providers and implementing new technology modules</p>\n<p>The lack of simple diagnostic image exchange presents a significant barrier to widespread health information exchange. Without these technologies, patients often hand-carry their films or electronic files with them, which can present a high risk of lost images and inefficiency.</p>\n<p>This option is not preferred at this time.</p>\n',
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        }
      },
      activitySchedule: {
        plannedStartDate: '',
        plannedEndDate: ''
      },
      milestones: [
        {
          endDate: '2023-09-30',
          milestone: 'Onboard providers to assistance program'
        },
        {
          endDate: '2022-12-31',
          milestone: 'Development of Roadmap'
        },
        {
          endDate: '2022-01-01',
          milestone: 'HIE Staff Augmentation'
        },
        {
          endDate: '2022-01-01',
          milestone: 'Modules for Care Coordination'
        },
        {
          endDate: '2023-09-30',
          milestone: 'Provider Onboarding'
        },
        {
          endDate: '2022-01-01',
          milestone: 'EDIE System Implementation'
        },
        {
          endDate: '2022-12-31',
          milestone: 'Develop myAlaska HIE Authentication Requirements'
        },
        {
          endDate: '2022-03-31',
          milestone:
            'Completion of requirements gathering to prepare to receive ELR'
        },
        {
          endDate: '2022-12-31',
          milestone:
            'Configuration of internal BizTalk HL7 processes to translate the HL7 messages to PRISM'
        },
        {
          endDate: '2022-09-30',
          milestone: 'Onboard Lab Providers'
        },
        {
          endDate: '2021-12-31',
          milestone:
            'Establishment of program requirements and outreach strategy'
        }
      ],
      outcomes: [
        {
          outcome: 'Plan to do a thing.',
          metrics: [
            {
              metric: 'Do a thing.'
            }
          ]
        },
        {
          outcome: 'Onboard 100 providers.',
          metrics: [
            {
              metric: '100 providers onboarded.'
            }
          ]
        }
      ],
      statePersonnel: [
        {
          title:
            'Services Integration Architect/ Programmer (Analyst Programmer V)',
          description:
            'Lead technical architecture design and development efforts for designing, implementing and maintaining services integrations leveraging resources such as the MCI, MPI and state HIE along with other DHSS Business Systems.',
          years: {
            2022: {
              amt: 115000,
              perc: 4
            },
            2023: {
              amt: 119000,
              perc: 4
            }
          }
        }
      ],
      expenses: [
        {
          description: '',
          category: 'Hardware, software, and licensing',
          years: {
            2022: 0,
            2023: 0
          }
        }
      ],
      contractorResources: [
        {
          description: '',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: '',
          start: '',
          totalCost: 3496874,
          years: {
            2022: 0,
            2023: 0
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 90,
            state: 10
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
    },
    {
      activityId: 'hijk8901',
      fundingSource: 'HIE',
      name: 'Medicaid Blue Button',
      activityOverview: {
        summary:
          'DHSS is requesting HITECH funding to support the onboarding of Medicaid recipients to the developed personal health record (PHR) available within the HIE.',
        description:
          '<p><strong><ins>III.C.1 Medicaid Personal Health Record (PHR)/Blue Button Initiative</ins></strong></p>\n<p>DHSS is requesting HITECH funding to support the onboarding of Medicaid recipients to the developed personal health record (PHR) available within the HIE. The requested funds will be utilized to enhance the ability of patients to access their own health care data in an electronic format that supports MU CQMs including EP Core Measure: Electronic copy of health information. Medicaid PHR/Blue Button (or similar) implementation supports this functionality.</p>\n<p></p>\n<p>The PHR will not collect CQMs or interface to public health registries. However, it will provide short and long-term value to providers by assisting them in achieving MU.</p>\n<p>Alaska plans to integrate the MMIS DW into the HIE, allowing Medicaid recipients to view their Medicaid claims information in a portal and access it through a Blue Button (or similar) download. Additionally, this initiative will benefit providers by assisting them in achieving MU by helping them meet View, Download, and Transmit (VDT) requirements.</p>\n<p></p>\n<p>This Medicaid PHR/Blue Button (or similar) approach allows providers to meet VDT requirements without having to create individual patient portals. This supports providers in achieving MU. Medicaid Eligible population will benefit by being able to obtain their Medicaid claim information, along with access to their PHRs. See further cost allocation details in Section VIII and Appendix D.</p>\n',
        alternatives:
          '<p>Medicaid PHR/Blue Button</p>\n<p>Integrate MMIS DW into the HIE with Blue Button download</p>\n<p>Allows Medicaid recipients to view their Medicaid claims information in a portal and access it through a Blue Button download</p>\n<p>Assists providers in achieving MU by helping them meet the VDT requirements</p>\n<p>Supports the MU CQMs including EP Core Measure:Electronic Copy of health information</p>\n<p>Alaskans will be able to access their PHRs</p>\n<p>User friendly, easy to use technology helps ensure access</p>\n<p>There are no significant negatives to this approach</p>\n<p>Implement Medicaid PHR/Blue Button</p>\n',
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        }
      },
      activitySchedule: {
        plannedStartDate: '',
        plannedEndDate: ''
      },
      milestones: [
        {
          endDate: '2022-04-01',
          milestone: 'PHR/Blue Button HIE Build'
        },
        {
          endDate: '2021-12-31',
          milestone: 'Blue Button Implementation'
        },
        {
          endDate: '2021-12-31',
          milestone: 'On-Boarding of PHR/Blue Button Participants'
        }
      ],
      outcomes: [
        {
          outcome: 'Build blue button.',
          metrics: [
            {
              metric: 'Test blue button with 10 providers.'
            }
          ]
        }
      ],
      statePersonnel: [
        {
          title: '',
          description: '',
          years: {
            2022: {
              amt: 0,
              perc: 0
            },
            2023: {
              amt: 0,
              perc: 0
            }
          }
        }
      ],
      expenses: [
        {
          description: '',
          category: 'Hardware, software, and licensing',
          years: {
            2022: 0,
            2023: 0
          }
        }
      ],
      contractorResources: [
        {
          description: '',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: 'RFP Planning Vendor Inc.',
          start: '',
          totalCost: 4368734,
          years: {
            2022: 500000,
            2023: 0
          }
        },
        {
          description: '',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: 'Blue Button Builder Inc.',
          start: '',
          totalCost: 35246,
          years: {
            2022: 0,
            2023: 2000000
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 90,
            state: 10
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
            otherSources: 'none'
          },
          2023: {
            otherSources: 'none'
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
    },
    {
      activityId: 'ijkl9012',
      fundingSource: 'HIE',
      name: 'Public Health System Modernization',
      activityOverview: {
        summary:
          'The purpose of PH modernization is to provide Medicaid EPs and EHs with the tools to improve the coordination of care, transition of care and the availability of specialty registries; increasing the number of providers attesting for meaningful use.',
        description:
          "<p></p>\n<p><strong><ins>III.C.2 Public Health System Modernization</ins></strong></p>\n<p>In order to support meaningful use and provide specialized registries for EPs and EHs to have the ability to electronically report to the registries, Tycho is requesting funding to undergo a transformation and modernization of the current public health systems. The purpose of this modernization initiative is to provide Medicaid EPs and EHs with the tools to improve the coordination of care, transition of care and the availability of specialty registries; increasing the number of providers attesting for and meeting meaningful use requirements.</p>\n<p></p>\n<p>DHSS in partnership with the DPH has identified multiple public health systems and registries in which the current “as is” process is a manual process for reporting and data submission of public health data. Through this modernization initiative, over 15 public health systems have been defined as meeting the specifications as specialized registries. However, the submissions vary in format, transport and destination. Additionally, the registry data is housed in multiple databases that are used across the agency.</p>\n<p>The anticipated registries to be made available for electronic submission by providers include, but not limited to:</p>\n<ul>\n<li>• AK Facility Data Reporting – hospital inpatient and outpatient discharges (hospitals only)</li>\n<li>• Lead Electronic Lab Reporting – currently reported by hospitals; this will be expanded for EP electronic submission</li>\n<li>• OZ System – new born screening and hearing detection, including post-discharge follow-up</li>\n<li>• AK Birth Defects Registry – infants and young children with birth defects</li>\n<li>• Death and Injury Reporting – including multiple registries:</li>\n<ul>\n<li>o AK Firearm Injury Reporting Surveillance System – firearm related injuries</li>\n<li>o AK Fatality Assessment and Control Evaluation Registry – occupational injury data collection</li>\n<li>o AK Violent Death Reporting – injuries resulting in death</li>\n<li>o AK Drowning Surveillance System – drowning related fatalities</li>\n<li>The above listed registries will be in addition to the existing registries available:</li>\n</ul>\n<li>• Lead ELR – currently available to hospitals only</li>\n<li>• Cancer Registry</li>\n<li>• AKSTARS – reportable disease registry</li>\n<li>• BioSense – syndromic surveillance reporting</li>\n<li>• Electronic Lab Results reporting – hospitals only</li>\n<li></li>\n</ul>\n<p>The requested funding will provide a mechanism for the design, development and implementation of registry database will store registry data in a centralized location; improving security of the data, reliability, performance, integration of datasets, and the range of analytical methods available. Funding is requested for the implementation of Microsoft’s Dynamic CRM tool, which sits on top of SQL Server and provides the required functionality to provide robust reporting and programming methods. This modular approach will provide rapid integration of the Master Client Index (MCI) with registries, and can support the DHSS Enterprise Service Bus (ESB) which already supports integration with the statewide HIE.</p>\n<p></p>\n<p>The projected data flow, named the DHSS Gateway, is up at the top.<strong><ins> @Bren bug fix!</ins></strong></p>\n<p></p>\n<p>Through the implementation of the modernization initiative, providers will have the ability to submit public health data to a single point of entry; the HIE. The HIE will then pass the received submissions through the DHSS Gateway data store, which will store and parse the data for the individual registries; offering a streamlined and efficient method of submission.</p>\n<p></p>\n<p><strong><ins>III.C.3 Case Management System Implementation</ins></strong></p>\n<p>The Department of Health and Social Services is requesting funding for the design, development, and implementation of a robust, modular care management solution to support the care and services provided to Tycho citizens. This solution will allow Department of Health and Social Services to be more efficient in treating Tycho citizenswe serve across multiple divisions and will allow the patient’s healthcare record to more easily follow their care in a secure, electronic manner. In turn, this will support coordination of care for patients receiving services by various entities. This solution will be designed and implanted through contracting within the statewide Health Information Exchange to take advantage of other service offerings provided by the statewide Health Information Exchange. The modular solution implemented will align with the Medicaid Information Technology Architecture 3.0 business processes to meet the requirements for the department. The department will utilize existing functionality or modules to meet the requirements wherever possible.</p>\n<p></p>\n<p><strong><ins>III.C.4 MCI Enhancement</ins></strong></p>\n<p>Tycho's Medicaid is requesting funding to support the continued design, development and implementation of modifications to the statewide MCI to improve activities for EPs and EHs trying to achieve meaningful use across the state of Tycho. Development of the MCI will provide short and long-term value to providers by reducing de-duplication of client data. An enhanced MCI will support creation of a unique client identifier for each individual. This will allow correlation of all known instances of client data and records for each client. The requested funding will support the cost of state personnel and resources to develop requirements and synchronize the Department’s MCI to the HIE Master Patient Index (eMPI) to provide a more robust demographic source of data for the HIE eMPI and provide new data or updated demographic information from the HIE to the Department’s MCI. This project is critical for improving coordination of care through the HIE.</p>\n",
        alternatives:
          '<p>HIE Functionality</p>\n<p>Update and enhance existing system, adding interfaces with PDMP, PRISM, and Special registries via Public Health Modernization</p>\n<p>Connecting these systems to the health information exchange would improve efficiencies for providers and for public health registrars. Reporting to several of these registries is an essential component of meaningful use for EPs and EHs; integrating this function into the HIE helps to reinforce value for the HIE, and will have the benefit of easing reporting.</p>\n<p>Expanding the utility of the Health Information Exchange will reduce double data entry at all levels (reducing costs) and simplify reporting for participating EPs and EHs.</p>\n<p>Training and integration of this updated technology will require some effort and outreach. Newly on-boarded agencies will need to adjust to new data collection protocols, and currently connected providers will need outreach to help them understand the new functionality.</p>\n<p>It is anticipated that efficiencies gained with simplification of data collection and reporting will greatly enhance patient care outcomes, and will assist EPs and EHs in attesting to meaningful use.</p>\n',
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        }
      },
      activitySchedule: {
        plannedStartDate: '',
        plannedEndDate: ''
      },
      milestones: [
        {
          endDate: '2017-03-31',
          milestone: 'PH Completion of requirements gathering'
        },
        {
          endDate: '2023-09-30',
          milestone: 'PH Development and implementation of CRM Tool'
        },
        {
          endDate: '2023-09-30',
          milestone: 'PH Connection of Public Health systems to HIE'
        }
      ],
      outcomes: [
        {
          outcome: 'Identifiy PH needs',
          metrics: [
            {
              metric: 'Complete a build/implementation plan by Summery 2022'
            }
          ]
        },
        {
          outcome: 'Connect PH systems to HIE',
          metrics: [
            {
              metric: 'Connect all 3 PH systems to HIE by Fall 2022'
            }
          ]
        }
      ],
      statePersonnel: [
        {
          title: '',
          description: '',
          years: {
            2022: {
              amt: 0,
              perc: 0
            },
            2023: {
              amt: 0,
              perc: 0
            }
          }
        }
      ],
      expenses: [
        {
          description: '',
          category: 'Hardware, software, and licensing',
          years: {
            2022: 0,
            2023: 0
          }
        }
      ],
      contractorResources: [
        {
          description: 'Gateway Implementation.',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: 'TBD',
          start: '',
          totalCost: 246477,
          years: {
            2022: 0,
            2023: 1500000
          }
        },
        {
          description: 'Gateway Development Planning and RFP',
          end: '',
          hourly: {
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
          name: 'Gateway Vendor Inc.',
          start: '',
          totalCost: 7473747,
          years: {
            2022: 500000,
            2023: 0
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 90,
            state: 10
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
            otherSources: 'none'
          },
          2023: {
            otherSources: 'none'
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
    },
    {
      activityId: 'jklm0123',
      fundingSource: 'HIT',
      name: 'MITA 3.0 Assessment',
      activityOverview: {
        summary:
          'DHSS is requesting funding to support the completion of a MITA 3.0 State Self-Assessment. Initially, funding will be utilized to support the development of a competitive procurement and support of planning efforts for the MITA 3.0 SS-A.',
        description:
          '<p><strong><ins>III.B.4 HITECH MITA 3.0 Development and Implementation</ins></strong></p>\n<p>DHSS is requesting funding to support the completion of a MITA 3.0 State Self-Assessment. Initially, funding will be utilized to support the development of a competitive procurement and support of planning efforts for the MITA 3.0 SS-A. Following the release of the procurement, a vendor will be selected to design, develop, and implement a commercial off the shelf solution for completing a HITECH MITA 3.0 SS-A and supporting the modernization of enterprise systems by assuring compliance to the MITA standards.</p>\n',
        alternatives:
          '<p>Must do MITA 3.0 because MITA is awesome and gives Tycho a standardized view of their Medicaid IT maturity.&nbsp;</p>\n',
        standardsAndConditions: {
          doesNotSupport: '',
          supports: ''
        }
      },
      activitySchedule: {
        plannedStartDate: '',
        plannedEndDate: ''
      },
      milestones: [
        {
          endDate: '2022-02-28',
          milestone: 'MITA 3.0 SS-A Project'
        },
        {
          endDate: '2022-12-31',
          milestone: 'HITECH SS-A Assessment'
        }
      ],
      outcomes: [
        {
          outcome: 'Complete MITA 3.0 HITECH portion.',
          metrics: [
            {
              metric: 'Complete MITA 3.0 HITECH portion by July 2022'
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
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
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
            2022: {
              hours: '',
              rate: ''
            },
            2023: {
              hours: '',
              rate: ''
            }
          },
          useHourly: false,
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
          other: 125000
        },
        2023: {
          ffp: {
            federal: 90,
            state: 10
          },
          other: 125000
        }
      },
      costAllocationNarrative: {
        methodology: '',
        years: {
          2022: {
            otherSources: 'none'
          },
          2023: {
            otherSources: 'none'
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
        2021: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
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
        2021: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
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
        2021: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
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
        2021: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
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
      { title: '42 CFR Part 495.348', checked: null, explanation: '' },
      { title: 'SMM Section 11267', checked: null, explanation: '' },
      { title: '45 CFR 95.613', checked: null, explanation: '' },
      { title: '45 CFR 75.326', checked: null, explanation: '' }
    ],
    recordsAccess: [
      { title: '42 CFR Part 495.350', checked: null, explanation: '' },
      { title: '42 CFR Part 495.352', checked: null, explanation: '' },
      { title: '42 CFR Part 495.346', checked: null, explanation: '' },
      { title: '42 CFR 433.112(b)', checked: null, explanation: '' },
      { title: '45 CFR Part 95.615', checked: null, explanation: '' },
      { title: 'SMM Section 11267', checked: null, explanation: '' }
    ],
    softwareRights: [
      { title: '42 CFR 495.360', checked: null, explanation: '' },
      { title: '45 CFR 95.617', checked: null, explanation: '' },
      { title: '42 CFR Part 431.300', checked: null, explanation: '' },
      { title: '42 CFR Part 433.112', checked: null, explanation: '' }
    ],
    security: [
      {
        title: '45 CFR 164 Security and Privacy',
        checked: null,
        explanation: ''
      }
    ]
  }
};
