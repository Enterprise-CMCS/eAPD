import React from 'react';
import { renderWithConnection, act } from 'apd-testing-library';

import ApdSummary from './ReadOnlyApd';

const emptyInitialStateHITECH = {
  apd: {
    data: {
      apdType: 'HITECH',
      activities: []
    }
  }
};

const emptyInitialStateMMIS = {
  apd: {
    data: {
      apdType: 'MMIS',
      activities: []
    }
  }
};

const initialStateMMIS = {
  apd: {
    data: {
      apdType: 'MMIS',
      name: 'My Fancy APD',
      years: ['2021', '2023'],
      apdOverview: {
        updateStatus: {
          isUpdateAPD: true,
          annualUpdate: false,
          asNeededUpdate: true
        },
        narrativeHIE: '',
        narrativeHIT: '',
        narrativeMMIS: '',
        programOverview: 'mmis overview',
        medicaidBusinessAreas: {
          waiverSupportSystems: true,
          assetVerificationSystem: true,
          claimsProcessing: true,
          decisionSupportSystemDW: true,
          electronicVisitVerification: true,
          encounterProcessingSystemMCS: false,
          financialManagement: true,
          healthInformationExchange: true,
          longTermServicesSupports: false,
          memberManagement: true,
          pharmacyBenefitManagementPOS: false,
          programIntegrity: true,
          providerManagement: false,
          thirdPartyLiability: false,
          other: true,
          otherMedicaidBusinessAreas:
            'This is my other business area. This is my other business area. This is my other business area. This is my other business area. This is my other business area. This is my other business area. This is my other business area. '
        }
      }
    }
  }
};

const initialStateHITECH = {
  apd: {
    data: {
      apdType: 'HITECH',
      name: 'My Fancy APD',
      years: ['2021', '2023'],
      apdOverview: {
        narrativeHIE: 'My narrative for HIE',
        narrativeHIT: 'My narrative for HIT',
        narrativeMMIS: 'My narrative for MMIS',
        programOverview: 'This is the program overview'
      }
    }
  }
};

const setup = async (props = {}, initialState = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(<ApdSummary {...props} />, {
      initialState: initialState
    });
  });
  return {
    util
  };
};

describe('APD Summary/viewOnly component', () => {
  describe('for HITECH apds', () => {
    test('renders correct empty state values', async () => {
      const { util } = await setup({}, emptyInitialStateHITECH);

      expect(util).toMatchSnapshot();
    });

    test('renders correctly with valid data', async () => {
      const { util } = await setup({}, initialStateHITECH);

      expect(util).toMatchSnapshot();
    });
  });

  describe('for MMIS apds', () => {
    test('renders correct empty state values', async () => {
      const { util } = await setup({}, emptyInitialStateMMIS);
      expect(util).toMatchSnapshot();
    });

    test('renders correctly with valid data', async () => {
      const { util } = await setup({}, initialStateMMIS);
      expect(util).toMatchSnapshot();
    });
  });
});
