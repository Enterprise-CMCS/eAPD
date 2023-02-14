import { APD_TYPE } from '@cms-eapd/common';

export default {
  apdType: APD_TYPE.MMIS,
  name: 'MMIS IAPD No Activities',
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
        fte: { 2023: 1, 2024: 1 },
        hasCosts: true,
        costs: { 2023: 100000, 2024: 100000 },
        split: {
          2023: { federal: 90, state: 10 },
          2024: { federal: 90, state: 10 }
        },
        medicaidShare: {
          2023: 90,
          2024: 50
        }
      },
      {
        name: 'Fred Johnson',
        position: 'Project Management Office Director',
        email: 'FJohnson@tycho.com',
        isPrimary: false,
        fte: { 2023: 0.3, 2024: 0.3 },
        hasCosts: false,
        costs: { 2023: 0, 2024: 0 },
        split: {
          2023: { federal: 90, state: 10 },
          2024: { federal: 90, state: 10 }
        },
        medicaidShare: {
          2023: 50,
          2024: 10
        }
      }
    ]
  },
  statePrioritiesAndScope: {
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
  activities: [],
  securityPlanning: {
    securityAndInterfacePlan: '',
    businessContinuityAndDisasterRecovery: ''
  },
  assurancesAndCompliances: {
    procurement: [
      { title: 'SMM, Part 11', checked: null, explanation: '' },
      { title: '45 CFR Part 95.615', checked: null, explanation: '' },
      { title: '45 CFR Part 75.326', checked: null, explanation: '' }
    ],
    recordsAccess: [
      {
        title: '42 CFR Part 433.112 (b)(5)-(9)',
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
