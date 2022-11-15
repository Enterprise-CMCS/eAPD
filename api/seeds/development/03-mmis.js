const mmis = {
  apdType: 'MMIS',
  name: 'MMIS IAPD',
  years: ['2023', '2024'],
  yearOptions: ['2023', '2024', '2025'],
  apdOverview: {
    updateStatus: {
      isUpdateAPD: false,
      annualUpdate: false,
      asNeededUpdate: false
    },
    medicaidBusinessAreas: {
      waiverSupportSystems: false,
      assetVerificationSystem: false,
      claimsProcessing: true,
      decisionSupportSystemDW: false,
      electronicVisitVerification: false,
      encounterProcessingSystemMCS: false,
      financialManagement: true,
      healthInformationExchange: false,
      longTermServicesSupports: false,
      memberManagement: false,
      pharmacyBenefitManagementPOS: false,
      programIntegrity: true,
      providerManagement: false,
      thirdPartyLiability: false,
      other: false,
      otherMedicaidBusinessAreas: ''
    }
  },
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
        fte: { 2022: 1, 2023: 1 },
        hasCosts: true,
        costs: { 2022: 100000, 2023: 100000 }
      },
      {
        name: 'Fred Johnson',
        position: 'Project Management Office Director',
        email: 'FJohnson@tycho.com',
        isPrimary: false,
        fte: { 2022: 0.3, 2023: 0.3 },
        hasCosts: false,
        costs: { 2022: 0, 2023: 0 }
      }
    ]
  },
  statePriortiesAndScope: {
    medicaidProgramAndPriorities: 'Medicaid program and priorities',
    mesIntroduction: 'Introduction',
    scopeOfAPD: 'scope'
  },
  previousActivities: {
    previousActivitySummary: '',
    actualExpenditures: {
      2021: {
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
      2022: {
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
      2023: {
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
      }
    }
  },
  activities: [
    {
      activityId: '152a1e2b',
      name: 'Activity 1',
      activityOverview: {
        activitySnapshot: 'This is an snapshot',
        problemStatement: 'This is a problem statement',
        proposedSolution: 'This is a proposed solution'
      },
      activitySchedule: {
        plannedStartDate: '2017-10-01',
        plannedEndDate: '2023-09-30'
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
      milestones: [
        {
          endDate: '2020-09-07',
          milestone:
            'Implementation of Final Rule and Stage 3 System Developments'
        },
        {
          endDate: '2019-12-31',
          milestone: 'Environmental Scan Completion'
        },
        {
          endDate: '2022-05-30',
          milestone: 'HIT Roadmap Development'
        }
      ],
      outcomes: [
        {
          outcome:
            'Accept attestations for 2022, and modify SLR to meet new spec sheets released by CMS.',
          metrics: [
            { metric: 'Complete SLR modifications by 11/1/21' },
            { metric: 'Accept attestations through 4/30/22.' }
          ]
        },
        {
          outcome:
            'Provide support to EPs and EHs through attestation process.',
          metrics: [
            { metric: "Guidance available on Tycho''s websites" },
            { metric: 'Office hours availble for EPs and EHs' },
            { metric: 'Site visits, as needed, for EPs and EHs' }
          ]
        }
      ],
      statePersonnel: [
        {
          title: 'Project Assistant',
          description:
            'Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.',
          years: {
            2022: { amt: 86000, perc: 1 },
            2023: { amt: 88000, perc: 1 }
          }
        },
        {
          title:
            'EHR Incentive Program Meaningful Use Coordinator (Research Analyst III)',
          description:
            'Develop and monitor reports, assist data users in developing and managing queries.',
          years: {
            2022: { amt: 101115, perc: 1 },
            2023: { amt: 102111, perc: 1 }
          }
        },
        {
          title: 'IT Liaison',
          description:
            'Provide analysis and coordination activities between the HIT Program Office and the IT section, to ensure that adequate resources and priority are established to complete the technology projects as identified.',
          years: {
            2022: { amt: 101000, perc: 1 },
            2023: { amt: 104000, perc: 1 }
          }
        },
        {
          title: 'Accountant III',
          description:
            'Coordinate program state and federal budget and expense reporting, review and validate charges to CMS federal reports.',
          years: {
            2022: { amt: 101000, perc: 3 },
            2023: { amt: 109000, perc: 3 }
          }
        },
        {
          title: 'Public Information Officer',
          description:
            'Develop outreach materials including: written, television and radio publications to support outreach for the Medicaid EHR Incentive Program',
          years: {
            2022: { amt: 165000, perc: 0.5 },
            2023: { amt: 170000, perc: 0.5 }
          }
        },
        {
          title: 'Systems Chief',
          description:
            'Coordinate office resources, manage staff, budget, and resource assignments, and report program status.',
          years: {
            2022: { amt: 135000, perc: 0.5 },
            2023: { amt: 140000, perc: 0.5 }
          }
        },
        {
          title:
            'Medicaid EHR Incentive Program Manager (Medical Assistance Administrator III)',
          description:
            'Data collection and analysis, reporting, planning, service delivery modification, support administration of the EHR Incentive Payment Program including provider application review.',
          years: {
            2022: { amt: 110012, perc: 1 },
            2023: { amt: 111102, perc: 1 }
          }
        },
        {
          title: 'System Analyst (Analyst Programmer IV)',
          description:
            'Supports design, development and implementation of information technology infrastructure for the projects/programs under the IT Planning office supported by this Implementation Advanced Planning Document.',
          years: {
            2022: { amt: 98987, perc: 4 },
            2023: { amt: 99897, perc: 4 }
          }
        }
      ],
      expenses: [
        {
          description: '',
          category: 'Training and outreach',
          years: { 2022: 40000, 2023: 40000 }
        },
        {
          description: '',
          category: 'Travel',
          years: { 2022: 35000, 2023: 35000 }
        },
        {
          description: '',
          category: 'Hardware, software, and licensing',
          years: { 2022: 700000, 2023: 0 }
        }
      ],
      contractorResources: [
        {
          description: 'Maintain SLR',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'Super SLR Incorporated',
          start: '',
          totalCost: 32423,
          years: { 2022: 999756, 2023: 342444 }
        },
        {
          description: 'Technology consulting and planning services.',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'Tech Consulting Inc.',
          start: '',
          totalCost: 473573,
          years: { 2022: 333000, 2023: 200000 }
        }
      ],
      costAllocation: {
        2022: { ffp: { federal: 90, state: 10 }, other: 105000 },
        2023: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      quarterlyFFP: {
        2023: {
          1: { combined: 25, contractors: 25, inHouse: 25 },
          2: { combined: 25, contractors: 25, inHouse: 25 },
          3: { combined: 25, contractors: 25, inHouse: 25 },
          4: { combined: 25, contractors: 25, inHouse: 25 }
        },
        2024: {
          1: { combined: 25, contractors: 25, inHouse: 25 },
          2: { combined: 25, contractors: 25, inHouse: 25 },
          3: { combined: 25, contractors: 25, inHouse: 25 },
          4: { combined: 25, contractors: 25, inHouse: 25 }
        }
      }
    },
    {
      activityId: '3110a314',
      name: 'Activity 2',
      activityOverview: {
        activitySnapshot: 'Snapshot',
        problemStatement: 'Problem statement',
        proposedSolution: 'Prosed solution'
      },
      activitySchedule: {
        plannedStartDate: '2019-10-01',
        plannedEndDate: '2022-09-30'
      },
      analysisOfAlternativesAndRisks: {
        alternativeAnalysis: 'Alternative analysis',
        costBenefitAnalysis: 'Cost benefit analysis',
        feasibilityStudy: 'Feasibility study',
        requirementsAnalysis: 'Requirements analysis',
        forseeableRisks: 'Forseeable risks'
      },
      conditionsForEnhancedFunding: {
        enhancedFundingQualification: false,
        enhancedFundingJustification: ''
      },
      milestones: [
        {
          endDate: '2022-12-31',
          milestone: 'Implement MMIS-HIE Interface'
        },
        {
          endDate: '2022-12-31',
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
            { metric: 'Provide support for using open API for DW' }
          ]
        }
      ],
      statePersonnel: [
        {
          title: 'Project Assistant',
          description: 'Assist with stuff',
          years: {
            2022: { amt: 98000, perc: 1 },
            2023: { amt: 99000, perc: 1 }
          }
        },
        {
          title: 'MMIS Project Manager',
          description:
            'This position is responsible for the program development, planning, coordination, evaluation, independent management and oversight of the Tycho Automated Info',
          years: {
            2022: { amt: 140000, perc: 1 },
            2023: { amt: 144000, perc: 1 }
          }
        },
        {
          title: 'MMIS Trainer',
          description:
            'Under the direct supervision of the Project Manager, this position is responsible for the development of a comprehensive training and support program for the Tycho Automated Information Management System',
          years: {
            2022: { amt: 115000, perc: 1 },
            2023: { amt: 115000, perc: 1 }
          }
        },
        {
          title: 'Programmer IV',
          description:
            'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
          years: {
            2022: { amt: 140000, perc: 1 },
            2023: { amt: 145000, perc: 1 }
          }
        },
        {
          title: 'Security IT',
          description: 'Make sure its secure.',
          years: {
            2022: { amt: 115000, perc: 1 },
            2023: { amt: 120000, perc: 1 }
          }
        },
        {
          title: 'Operations Specialist',
          description: 'Run the day to day.',
          years: {
            2022: { amt: 125000, perc: 1 },
            2023: { amt: 130000, perc: 1 }
          }
        },
        {
          title: 'Programmer V',
          description:
            'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
          years: {
            2022: { amt: 150000, perc: 2 },
            2023: { amt: 155000, perc: 3 }
          }
        },
        {
          title: 'Programmer III',
          description:
            'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
          years: {
            2022: { amt: 120000, perc: 1 },
            2023: { amt: 125000, perc: 1 }
          }
        }
      ],
      expenses: [
        {
          description: '',
          category: 'Travel',
          years: { 2022: 0, 2023: 0 }
        }
      ],
      contractorResources: [
        {
          description: 'Hosting and development support.',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'Interface Vendor Inc.',
          start: '',
          totalCost: 26453574,
          years: { 2022: 650000, 2023: 750000 }
        },
        {
          description: 'Interface M&O contractor.',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'TBD',
          start: '',
          totalCost: 7398,
          years: { 2022: 0, 2023: 1000000 }
        }
      ],
      costAllocation: {
        2022: { ffp: { federal: 90, state: 10 }, other: 0 },
        2023: { ffp: { federal: 75, state: 25 }, other: 0 }
      },
      quarterlyFFP: {
        2023: {
          1: { combined: 25, contractors: 25, inHouse: 25 },
          2: { combined: 25, contractors: 25, inHouse: 25 },
          3: { combined: 25, contractors: 25, inHouse: 25 },
          4: { combined: 25, contractors: 25, inHouse: 25 }
        },
        2024: {
          1: { combined: 25, contractors: 25, inHouse: 25 },
          2: { combined: 25, contractors: 25, inHouse: 25 },
          3: { combined: 25, contractors: 25, inHouse: 25 },
          4: { combined: 25, contractors: 25, inHouse: 25 }
        }
      }
    }
  ],
  securityPlanning: {
    securityAndInterfacePlan: '',
    businessContinuityAndDisasterRecovery: ''
  },
  assurancesAndCompliances: {
    procurement: [
      { title: 'SSM, Part 11', checked: null, explanation: '' },
      { title: '45 CFR Part 95.615', checked: null, explanation: '' },
      { title: '45 CFR Part 92.36', checked: null, explanation: '' }
    ],
    recordsAccess: [
      {
        title: '42 CFR Part 433.112(b)(5)-(9)',
        checked: null,
        explanation: ''
      },
      { title: '45 CFR Part 95.615', checked: null, explanation: '' },
      { title: 'SMM Section 11267', checked: null, explanation: '' }
    ],
    softwareRights: [
      { title: '45 CFR Part 95.617', checked: null, explanation: '' },
      { title: '42 CFR Part 431.300', checked: null, explanation: '' },
      { title: '45 CFR Part 164', checked: null, explanation: '' }
    ],
    independentVV: [
      {
        title: '45 CFR Part 95.626',
        checked: null,
        explanation: ''
      }
    ]
  }
};

module.exports = { mmis };
