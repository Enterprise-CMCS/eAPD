module.exports = {
  __t: 'MMIS',
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
      email: '',
      name: '',
      phone: ''
    },
    medicaidOffice: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    },
    keyPersonnel: []
  },
  statePriortiesAndScope: {
    medicaidProgramAndPriorities: '',
    mesIntroduction: '',
    scopeOfAPD: ''
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
      name: '',
      activityOverview: {
        activitySnapshot: '',
        problemStatement: '',
        proposedSolution: ''
      },
      activitySchedule: {
        plannedEndDate: null,
        plannedStartDate: null
      },
      analysisOfAlternativesAndRisks: {
        alternativeAnalysis: '',
        costBenefitAnalysis: '',
        feasibilityStudy: '',
        requirementsAnalysis: '',
        forseeableRisks: ''
      },
      conditionsForEnhancedFunding: {
        enhancedFundingQualification: null,
        enhancedFundingJustification: ''
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
      statePersonnel: [],
      expenses: [
        {
          description: '',
          category: 'Training and outreach',
          years: { 2022: 40000, 2023: 40000 }
        }
      ],
      contractorResources: [],
      costAllocation: {
        2023: {
          ffp: {
            federal: 0,
            state: 100
          },
          other: 0
        },
        2024: {
          ffp: {
            federal: 0,
            state: 100
          },
          other: 0
        }
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
      name: '',
      activityOverview: {
        activitySnapshot: '',
        problemStatement: '',
        proposedSolution: ''
      },
      activitySchedule: {
        plannedEndDate: null,
        plannedStartDate: null
      },
      analysisOfAlternativesAndRisks: {
        alternativeAnalysis: '',
        costBenefitAnalysis: '',
        feasibilityStudy: '',
        requirementsAnalysis: '',
        forseeableRisks: ''
      },
      conditionsForEnhancedFunding: {
        enhancedFundingQualification: null,
        enhancedFundingJustification: ''
      },
      milestones: [],
      outcomes: [],
      statePersonnel: [
        {
          title: 'tester',
          description: 'tester',
          years: {
            2023: {
              amt: 12300,
              perc: 1
            },
            2024: {
              amt: 15600,
              perc: 1
            }
          }
        }
      ],
      expenses: [],
      contractorResources: [],
      costAllocation: {
        2023: {
          ffp: {
            federal: 0,
            state: 100
          },
          other: 0
        },
        2024: {
          ffp: {
            federal: 0,
            state: 100
          },
          other: 0
        }
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
      activityId: 'cc7c0cb0',
      name: '',
      activityOverview: {
        activitySnapshot: '',
        problemStatement: '',
        proposedSolution: ''
      },
      activitySchedule: {
        plannedEndDate: null,
        plannedStartDate: null
      },
      analysisOfAlternativesAndRisks: {
        alternativeAnalysis: '',
        costBenefitAnalysis: '',
        feasibilityStudy: '',
        requirementsAnalysis: '',
        forseeableRisks: ''
      },
      conditionsForEnhancedFunding: {
        enhancedFundingQualification: null,
        enhancedFundingJustification: ''
      },
      milestones: [],
      outcomes: [],
      statePersonnel: [],
      expenses: [
        {
          category: 'Equipment and supplies',
          description: 'adfasdfas',
          years: {
            2023: 11232,
            2024: 1232
          }
        }
      ],
      contractorResources: [],
      costAllocation: {
        2023: {
          ffp: {
            federal: 0,
            state: 100
          },
          other: 0
        },
        2024: {
          ffp: {
            federal: 0,
            state: 100
          },
          other: 0
        }
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
  assurancesAndCompliances: {
    procurement: [
      {
        checked: null,
        title: '42 CFR Part 495.348',
        explanation: ''
      },
      {
        checked: null,
        title: 'SMM Section 11267',
        explanation: ''
      },
      {
        checked: null,
        title: '45 CFR 95.613',
        explanation: ''
      },
      {
        checked: null,
        title: '45 CFR 75.326',
        explanation: ''
      }
    ],
    recordsAccess: [
      {
        checked: null,
        title: '42 CFR Part 495.350',
        explanation: ''
      },
      {
        checked: null,
        title: '42 CFR Part 495.352',
        explanation: ''
      },
      {
        checked: null,
        title: '42 CFR Part 495.346',
        explanation: ''
      },
      {
        checked: null,
        title: '42 CFR 433.112(b)',
        explanation: ''
      },
      {
        checked: null,
        title: '45 CFR Part 95.615',
        explanation: ''
      },
      {
        checked: null,
        title: 'SMM Section 11267',
        explanation: ''
      }
    ],
    softwareRights: [
      {
        checked: null,
        title: '42 CFR 495.360',
        explanation: ''
      },
      {
        checked: null,
        title: '45 CFR 95.617',
        explanation: ''
      },
      {
        checked: null,
        title: '42 CFR Part 431.300',
        explanation: ''
      },
      {
        checked: null,
        title: '42 CFR Part 433.112',
        explanation: ''
      }
    ],
    security: [
      {
        checked: null,
        title: '45 CFR 164 Security and Privacy',
        explanation: ''
      }
    ]
  }
};
