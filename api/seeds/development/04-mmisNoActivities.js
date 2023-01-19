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
  statePrioritiesAndScope: {
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
  activities: [],
  securityPlanning: {
    securityAndInterfacePlan: '',
    businessContinuityAndDisasterRecovery: ''
  },
  assurancesAndCompliances: {
    procurement: [
      { title: 'SMM, Part 11', checked: null, explanation: '' },
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
