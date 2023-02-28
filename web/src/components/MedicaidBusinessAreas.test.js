import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import { FormProvider, useForm } from 'react-hook-form';

import MedicaidBusinessAreas from './MedicaidBusinessAreas';
import {
  MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING,
  MEDICAID_BUSINESS_AREAS_CHECKBOXES
} from '@cms-eapd/common';

export const defaultBusinessAreaOptions = {
  waiverSupportSystems: false,
  assetVerificationSystem: false,
  claimsProcessing: false,
  decisionSupportSystemDW: false,
  electronicVisitVerification: false,
  encounterProcessingSystemMCS: false,
  financialManagement: false,
  healthInformationExchange: false,
  longTermServicesSupports: false,
  memberManagement: false,
  pharmacyBenefitManagementPOS: false,
  programIntegrity: false,
  providerManagement: false,
  thirdPartyLiability: false,
  other: false
};

const defaultProps = {
  name: 'medicaidBusinessAreas',
  onBlur: jest.fn(),
  onChange: jest.fn(),
  setMedicaidBusinessAreas: jest.fn(),
  controllerName: 'medicaidBusinessAreas',
  controllerNameForOtherDetails:
    'medicaidBusinessArea.otherMedicaidBusinessAreas',
  medicaidBusinessAreas: defaultBusinessAreaOptions
};

describe('Medicaid wrapper component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should do render with no checks by default', async () => {
    const Wrapper = props => {
      const formMethods = useForm();
      // eslint-disable-next-line react/prop-types
      return <FormProvider {...formMethods}>{props.children}</FormProvider>;
    };

    renderWithConnection(
      <Wrapper>
        <MedicaidBusinessAreas {...defaultProps} />
      </Wrapper>
    );

    MEDICAID_BUSINESS_AREAS_CHECKBOXES.forEach(key => {
      expect(
        screen.getByLabelText(
          MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING[key]
        )
      ).not.toBeChecked();
    });
  });
});
