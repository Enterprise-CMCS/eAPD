import { APD_TYPE } from '@cms-eapd/common';

export default {
  apdType: APD_TYPE.HITECH,
  name: 'MN-1936-08-03-HITECH-APD',
  years: [],
  yearOptions: [],
  apdOverview: {
    updateStatus: {
      isUpdateAPD: false,
      annualUpdate: false,
      asNeededUpdate: false
    },
    programOverview: '',
    narrativeHIE: '',
    narrativeHIT: '',
    narrativeMMIS: ''
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
    keyPersonnel: []
  },
  previousActivities: {
    previousActivitySummary: '',
    actualExpenditures: {}
  },
  activities: [],
  proposedBudget: {
    incentivePayments: {
      ehAmt: {},
      ehCt: {},
      epAmt: {},
      epCt: {}
    }
  },
  assurancesAndCompliances: {}
};
