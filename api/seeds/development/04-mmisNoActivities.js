module.exports = {
  __t: 'MMIS',
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
  activities: [],
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
