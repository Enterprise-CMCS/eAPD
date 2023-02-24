import React from 'react';
import CostAllocateFFP from './CostAllocateFFP';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleActivity = {
  activityOverview: {
    activitySnapshot: '<p>This is a snapshot</p>',
    problemStatement: '<p>This is a problem statement</p>',
    proposedSolution: '<p>This is a proposed solution</p>'
  },
  name: 'Activity 1',
  activitySchedule: {
    plannedStartDate: '2017-10-01T00:00:00.000Z',
    plannedEndDate: '2024-09-30T00:00:00.000Z'
  },
  analysisOfAlternativesAndRisks: {
    alternativeAnalysis: 'Alternative and analysis',
    costBenefitAnalysis: 'Cost benefit analysis',
    feasibilityStudy: 'Feasibility study',
    requirementsAnalysis: 'Requirements analysis',
    forseeableRisks: 'Forseeable risks'
  },
  conditionsForEnhancedFunding: {
    enhancedFundingQualification: true,
    enhancedFundingJustification: 'justification'
  },
  costAllocation: {
    2023: {
      ffp: {
        federal: 90,
        state: 10
      },
      other: 105000
    },
    2024: {
      ffp: {
        federal: 90,
        state: 10
      },
      other: 0
    }
  },
  costAllocationNarrative: {
    years: {
      2023: {
        otherSources:
          '<p>No other funding is provided for this activity for FFY 2022.</p>'
      },
      2024: {
        otherSources:
          '<p>No other funding is provided for this activity for FFY 2023.</p>'
      }
    },
    methodology: '<p>No cost allocation is necessary for this activity.</p>'
  },
  quarterlyFFP: {
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
    },
    2024: {
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
  key: '152a1e2b',
  activityId: '152a1e2b',
  milestones: [
    {
      endDate: '2020-09-07T00:00:00.000Z',
      milestone: 'Implementation of Final Rule and Stage 3 System Developments',
      id: null,
      key: '2ca59a61'
    },
    {
      endDate: '2019-12-31T00:00:00.000Z',
      milestone: 'Environmental Scan Completion',
      id: null,
      key: 'bcf06d2a'
    },
    {
      endDate: '2022-05-30T00:00:00.000Z',
      milestone: 'HIT Roadmap Development',
      id: null,
      key: '284f1f86'
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
          key: '4d48f765'
        },
        {
          metric: 'Accept attestations through 4/30/22.',
          id: null,
          key: 'dd160fd3'
        }
      ],
      key: 'b52cbaf1'
    },
    {
      outcome: 'Provide support to EPs and EHs through attestation process.',
      id: null,
      metrics: [
        {
          metric: "Guidance available on Tycho''s websites",
          id: null,
          key: '7718a94c'
        },
        {
          metric: 'Office hours availble for EPs and EHs',
          id: null,
          key: 'c9cd2793'
        },
        {
          metric: 'Site visits, as needed, for EPs and EHs',
          id: null,
          key: '4665cc31'
        }
      ],
      key: 'a23c9701'
    }
  ],
  statePersonnel: [
    {
      title: 'Project Assistant',
      description:
        'Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.',
      years: {
        2023: {
          amt: 86000,
          perc: 1
        },
        2024: {
          amt: 88000,
          perc: 1
        }
      },
      id: null,
      key: '632bdd69'
    },
    {
      title:
        'EHR Incentive Program Meaningful Use Coordinator (Research Analyst III)',
      description:
        'Develop and monitor reports, assist data users in developing and managing queries.',
      years: {
        2023: {
          amt: 101115,
          perc: 1
        },
        2024: {
          amt: 102111,
          perc: 1
        }
      },
      id: null,
      key: 'bde47188'
    },
    {
      title: 'IT Liaison',
      description:
        'Provide analysis and coordination activities between the HIT Program Office and the IT section, to ensure that adequate resources and priority are established to complete the technology projects as identified.',
      years: {
        2023: {
          amt: 101000,
          perc: 1
        },
        2024: {
          amt: 104000,
          perc: 1
        }
      },
      id: null,
      key: 'f5e78686'
    },
    {
      title: 'Accountant III',
      description:
        'Coordinate program state and federal budget and expense reporting, review and validate charges to CMS federal reports.',
      years: {
        2023: {
          amt: 101000,
          perc: 3
        },
        2024: {
          amt: 109000,
          perc: 3
        }
      },
      id: null,
      key: '7fb5e3ce'
    },
    {
      title: 'Public Information Officer',
      description:
        'Develop outreach materials including: written, television and radio publications to support outreach for the Medicaid EHR Incentive Program',
      years: {
        2023: {
          amt: 165000,
          perc: 0.5
        },
        2024: {
          amt: 170000,
          perc: 0.5
        }
      },
      id: null,
      key: 'f79b22da'
    },
    {
      title: 'Systems Chief',
      description:
        'Coordinate office resources, manage staff, budget, and resource assignments, and report program status.',
      years: {
        2023: {
          amt: 135000,
          perc: 0.5
        },
        2024: {
          amt: 140000,
          perc: 0.5
        }
      },
      id: null,
      key: '5f3f6b0e'
    },
    {
      title:
        'Medicaid EHR Incentive Program Manager (Medical Assistance Administrator III)',
      description:
        'Data collection and analysis, reporting, planning, service delivery modification, support administration of the EHR Incentive Payment Program including provider application review.',
      years: {
        2023: {
          amt: 110012,
          perc: 1
        },
        2024: {
          amt: 111102,
          perc: 1
        }
      },
      id: null,
      key: '318a29d0'
    },
    {
      title: 'System Analyst (Analyst Programmer IV)',
      description:
        'Supports design, development and implementation of information technology infrastructure for the projects/programs under the IT Planning office supported by this Implementation Advanced Planning Document.',
      years: {
        2023: {
          amt: 98987,
          perc: 4
        },
        2024: {
          amt: 99897,
          perc: 4
        }
      },
      id: null,
      key: 'b77673d2'
    }
  ],
  expenses: [
    {
      description: '',
      category: 'Training and outreach',
      years: {
        2023: 40000,
        2024: 40000
      },
      id: null,
      key: '4771d99f'
    },
    {
      description: '',
      category: 'Travel',
      years: {
        2023: 35000,
        2024: 35000
      },
      id: null,
      key: 'a976c42e'
    },
    {
      description: '',
      category: 'Hardware, software, and licensing',
      years: {
        2023: 700000,
        2024: 0
      },
      id: null,
      key: 'd7126dcf'
    }
  ],
  contractorResources: [
    {
      description: 'Maintain SLR',
      end: null,
      hourly: {
        2023: {
          hours: null,
          rate: null
        },
        2024: {
          hours: null,
          rate: null
        }
      },
      useHourly: false,
      name: 'Super SLR Incorporated',
      start: null,
      totalCost: 32423,
      years: {
        2023: 999756,
        2024: 342444
      },
      id: null,
      key: 'a036987e'
    },
    {
      description: 'Technology consulting and planning services.',
      end: null,
      hourly: {
        2023: {
          hours: null,
          rate: null
        },
        2024: {
          hours: null,
          rate: null
        }
      },
      useHourly: false,
      name: 'Tech Consulting Inc.',
      start: null,
      totalCost: 473573,
      years: {
        2023: 333000,
        2024: 200000
      },
      id: null,
      key: '6e23550e'
    }
  ]
};

export default {
  title: 'Pages/Apd/Tables/CostAllocateFFP',
  component: CostAllocateFFP,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['CostAllocateFFP.test.js']
  },
  argTypes: {}
};

const Template = args => <CostAllocateFFP {...args} activityIndex={0} />;

export const CostAllocateFFPStory = Template.bind({});
CostAllocateFFPStory.decorators = [
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
            keyStatePersonnel: {
              medicaidDirector: {
                name: 'Benedick Padua',
                email: 'benedick@much.ado',
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
                    2023: 1,
                    2024: 1
                  },
                  hasCosts: true,
                  costs: {
                    2023: 100000,
                    2024: 100000
                  },
                  split: {
                    2023: {
                      federal: 90,
                      state: 10
                    },
                    2024: {
                      federal: 90,
                      state: 10
                    }
                  },
                  medicaidShare: {
                    2023: 90,
                    2024: 50
                  },
                  id: null,
                  key: '3b8c847d'
                },
                {
                  name: 'Fred Johnson',
                  position: 'Project Management Office Director',
                  email: 'FJohnson@tycho.com',
                  isPrimary: false,
                  fte: {
                    2023: 0.3,
                    2024: 0.3
                  },
                  hasCosts: false,
                  costs: {
                    2023: 0,
                    2024: 0
                  },
                  split: {
                    2023: {
                      federal: 90,
                      state: 10
                    },
                    2024: {
                      federal: 90,
                      state: 10
                    }
                  },
                  medicaidShare: {
                    2023: 50,
                    2024: 10
                  },
                  id: null,
                  key: 'a6ce1cce'
                }
              ]
            },
            id: 'abc123',
            years: ['2023', '2024'],
            activities: [exampleActivity]
          }
        },
        user: {
          data: {
            id: '00u6o1xytrLX8qcQj297',
            name: 'State Admin',
            username: 'stateadmin',
            role: 'eAPD State Staff',
            state: {
              id: 'ak',
              name: 'Alaska',
              medicaid_office: {
                address1: '100 Round Sq',
                city: 'Cityville',
                zip: '12345',
                state: 'Alaska',
                director: {
                  name: 'Cornelius Fudge',
                  email: 'c.fudge@ministry.magic',
                  phone: '5551234567'
                }
              }
            },
            states: {
              ak: 'approved',
              md: 'approved'
            },
            permissions: [
              {
                ak: [
                  'create-draft',
                  'view-document',
                  'edit-document',
                  'export-document'
                ]
              }
            ],
            activities: [
              'create-draft',
              'view-document',
              'edit-document',
              'export-document'
            ],
            affiliation: {
              id: 1001,
              user_id: '00u6o1xytrLX8qcQj297',
              state_id: 'ak',
              role_id: 38,
              status: 'approved',
              created_at: '2023-02-23T20:36:19.239Z',
              updated_at: '2023-02-23T20:36:19.239Z',
              username: 'stateadmin',
              expires_at: '2024-07-30T00:00:00.000Z'
            },
            iat: 1677246905,
            nbf: 1677246905,
            exp: 1677290105,
            aud: 'eAPD-development',
            iss: 'eAPD'
          }
        },
        budget: {
          _id: '63f7ce43a104d6032e367076',
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
                    inHouse: 558219,
                    contractors: 450175,
                    combined: 1008394
                  },
                  2: {
                    inHouse: 558218,
                    contractors: 450175,
                    combined: 1008393
                  },
                  3: {
                    inHouse: 558217,
                    contractors: 450175,
                    combined: 1008392
                  },
                  4: {
                    inHouse: 558217,
                    contractors: 450175,
                    combined: 1008392
                  },
                  subtotal: {
                    inHouse: 2232871,
                    contractors: 1800700,
                    combined: 4033571
                  }
                }
              },
              total: {
                inHouse: 5033480,
                contractors: 3547639,
                combined: 8581119
              }
            }
          },
          years: ['2023', '2024'],
          __t: 'MMISBudget',
          mmis: {
            statePersonnel: {
              2023: {
                total: 2400075,
                federal: 2124939,
                medicaid: 2361044,
                state: 236104
              },
              2024: {
                total: 2629801,
                federal: 2165371,
                medicaid: 2629801,
                state: 464430
              },
              total: {
                total: 5029876,
                federal: 4290310,
                medicaid: 4990845,
                state: 700534
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
                total: 2292444,
                federal: 1800700,
                medicaid: 2292444,
                state: 491744
              },
              total: {
                total: 4275200,
                federal: 3547639,
                medicaid: 4233487,
                state: 685848
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
                total: 75000,
                federal: 67500,
                medicaid: 75000,
                state: 7500
              },
              total: {
                total: 850000,
                federal: 743170,
                medicaid: 825744,
                state: 82575
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
                total: 4997245,
                federal: 4033571,
                medicaid: 4997245,
                state: 963674
              },
              total: {
                total: 10155076,
                federal: 8581119,
                medicaid: 10050076,
                state: 1468957
              }
            }
          },
          mmisByFFP: {
            '90-10': {
              2023: {
                total: 5157831,
                federal: 4547548,
                medicaid: 5052831,
                state: 505283
              },
              2024: {
                total: 1904245,
                federal: 1713821,
                medicaid: 1904245,
                state: 190424
              },
              total: {
                total: 7062076,
                federal: 6261369,
                medicaid: 6957076,
                state: 695707
              }
            },
            '75-25': {
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
            },
            '50-50': {
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
            '0-100': {
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
                total: 5157831,
                federal: 4547548,
                medicaid: 5052831,
                state: 505283
              },
              2024: {
                total: 4997245,
                federal: 4033571,
                medicaid: 4997245,
                state: 963674
              },
              total: {
                total: 10155076,
                federal: 8581119,
                medicaid: 10050076,
                state: 1468957
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
              total: 4997245,
              federal: 4033571,
              medicaid: 4997245,
              state: 963674
            },
            total: {
              total: 10155076,
              federal: 8581119,
              medicaid: 10050076,
              state: 1468957
            }
          },
          activityTotals: [
            {
              id: '152a1e2b',
              name: 'Activity 1',
              fundingSource: null,
              data: {
                combined: {
                  2023: 3354831,
                  2024: 1904245,
                  total: 5259076
                },
                contractors: {
                  2023: 1332756,
                  2024: 542444,
                  total: 1875200
                },
                expenses: {
                  2023: 775000,
                  2024: 75000,
                  total: 850000
                },
                otherFunding: {
                  2023: {
                    contractors: 41713,
                    expenses: 24256,
                    statePersonnel: 39031,
                    total: 105000
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 1247075,
                  2024: 1286801,
                  total: 2533876
                }
              }
            },
            {
              id: '3110a314',
              name: 'Activity 2',
              fundingSource: null,
              data: {
                combined: {
                  2023: 1803000,
                  2024: 3093000,
                  total: 4896000
                },
                contractors: {
                  2023: 650000,
                  2024: 1750000,
                  total: 2400000
                },
                expenses: {
                  2023: 0,
                  2024: 0,
                  total: 0
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 1153000,
                  2024: 1343000,
                  total: 2496000
                }
              }
            }
          ],
          activities: {
            '152a1e2b': {
              _id: '63f7ce43a104d6032e367077',
              costsByFFY: {
                2023: {
                  federal: 2924848,
                  medicaid: 3249831,
                  state: 324983,
                  total: 3354831
                },
                2024: {
                  federal: 1713821,
                  medicaid: 1904245,
                  state: 190424,
                  total: 1904245
                },
                total: {
                  federal: 4638669,
                  medicaid: 5154076,
                  state: 515407,
                  total: 5259076
                }
              },
              quarterlyFFP: {
                years: {
                  2023: {
                    1: {
                      combined: {
                        dollars: 731213,
                        percent: 0
                      },
                      contractors: {
                        dollars: 290485,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 440728,
                        percent: 0.25
                      }
                    },
                    2: {
                      combined: {
                        dollars: 731213,
                        percent: 0
                      },
                      contractors: {
                        dollars: 290485,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 440728,
                        percent: 0.25
                      }
                    },
                    3: {
                      combined: {
                        dollars: 731212,
                        percent: 0
                      },
                      contractors: {
                        dollars: 290485,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 440727,
                        percent: 0.25
                      }
                    },
                    4: {
                      combined: {
                        dollars: 731210,
                        percent: 0
                      },
                      contractors: {
                        dollars: 290484,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 440726,
                        percent: 0.25
                      }
                    },
                    subtotal: {
                      combined: {
                        dollars: 2924848,
                        percent: 0
                      },
                      contractors: {
                        dollars: 1161939,
                        percent: 1
                      },
                      inHouse: {
                        dollars: 1762909,
                        percent: 1
                      }
                    }
                  },
                  2024: {
                    1: {
                      combined: {
                        dollars: 428456,
                        percent: 0
                      },
                      contractors: {
                        dollars: 122050,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 306406,
                        percent: 0.25
                      }
                    },
                    2: {
                      combined: {
                        dollars: 428455,
                        percent: 0
                      },
                      contractors: {
                        dollars: 122050,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 306405,
                        percent: 0.25
                      }
                    },
                    3: {
                      combined: {
                        dollars: 428455,
                        percent: 0
                      },
                      contractors: {
                        dollars: 122050,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 306405,
                        percent: 0.25
                      }
                    },
                    4: {
                      combined: {
                        dollars: 428455,
                        percent: 0
                      },
                      contractors: {
                        dollars: 122050,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 306405,
                        percent: 0.25
                      }
                    },
                    subtotal: {
                      combined: {
                        dollars: 1713821,
                        percent: 0
                      },
                      contractors: {
                        dollars: 488200,
                        percent: 1
                      },
                      inHouse: {
                        dollars: 1225621,
                        percent: 1
                      }
                    }
                  }
                },
                total: {
                  combined: 4638669,
                  contractors: 1650139,
                  inHouse: 2988530
                }
              }
            },
            '3110a314': {
              _id: '63f7ce43a104d6032e367078',
              costsByFFY: {
                2023: {
                  federal: 1622700,
                  medicaid: 1803000,
                  state: 180300,
                  total: 1803000
                },
                2024: {
                  federal: 2319750,
                  medicaid: 3093000,
                  state: 773250,
                  total: 3093000
                },
                total: {
                  federal: 3942450,
                  medicaid: 4896000,
                  state: 953550,
                  total: 4896000
                }
              },
              quarterlyFFP: {
                years: {
                  2023: {
                    1: {
                      combined: {
                        dollars: 405675,
                        percent: 0
                      },
                      contractors: {
                        dollars: 146250,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 259425,
                        percent: 0.25
                      }
                    },
                    2: {
                      combined: {
                        dollars: 405675,
                        percent: 0
                      },
                      contractors: {
                        dollars: 146250,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 259425,
                        percent: 0.25
                      }
                    },
                    3: {
                      combined: {
                        dollars: 405675,
                        percent: 0
                      },
                      contractors: {
                        dollars: 146250,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 259425,
                        percent: 0.25
                      }
                    },
                    4: {
                      combined: {
                        dollars: 405675,
                        percent: 0
                      },
                      contractors: {
                        dollars: 146250,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 259425,
                        percent: 0.25
                      }
                    },
                    subtotal: {
                      combined: {
                        dollars: 1622700,
                        percent: 0
                      },
                      contractors: {
                        dollars: 585000,
                        percent: 1
                      },
                      inHouse: {
                        dollars: 1037700,
                        percent: 1
                      }
                    }
                  },
                  2024: {
                    1: {
                      combined: {
                        dollars: 579938,
                        percent: 0
                      },
                      contractors: {
                        dollars: 328125,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 251813,
                        percent: 0.25
                      }
                    },
                    2: {
                      combined: {
                        dollars: 579938,
                        percent: 0
                      },
                      contractors: {
                        dollars: 328125,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 251813,
                        percent: 0.25
                      }
                    },
                    3: {
                      combined: {
                        dollars: 579937,
                        percent: 0
                      },
                      contractors: {
                        dollars: 328125,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 251812,
                        percent: 0.25
                      }
                    },
                    4: {
                      combined: {
                        dollars: 579937,
                        percent: 0
                      },
                      contractors: {
                        dollars: 328125,
                        percent: 0.25
                      },
                      inHouse: {
                        dollars: 251812,
                        percent: 0.25
                      }
                    },
                    subtotal: {
                      combined: {
                        dollars: 2319750,
                        percent: 0
                      },
                      contractors: {
                        dollars: 1312500,
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
                  combined: 3942450,
                  contractors: 1897500,
                  inHouse: 2044950
                }
              }
            }
          },
          __v: 0
        }
      },
      story
    })
];
