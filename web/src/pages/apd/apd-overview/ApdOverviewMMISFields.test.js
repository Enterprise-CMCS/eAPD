import React from 'react';
import { act, renderWithConnection, screen } from 'apd-testing-library';

import { MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING } from '@cms-eapd/common/utils/constants';

import { plain as ApdOverviewMMISFields } from './ApdOverviewMMISFields';

const defaultProps = {
  medicaidBusinessAreas: {
    waiverSupportSystems: true,
    assetVerificationSystem: false,
    claimsProcessing: false,
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
  },
  setBusinessAreaField: jest.fn()
};

const setup = async (props = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(
      <ApdOverviewMMISFields {...defaultProps} {...props} />
    );
  });
  return {
    util
  };
};

describe('APD overview component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.setTimeout(30000);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('displays checkbox as selected or unselected based on initial data', async () => {
    const newProps = Object.assign({}, defaultProps);
    newProps.medicaidBusinessAreas.waiverSupportSystems = true;
    newProps.medicaidBusinessAreas.claimsProcessing = false;
    setup(newProps);

    const selectedMedicaidBusinessAreaElement = screen.getByLabelText(
      MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING['waiverSupportSystems']
    );
    const unselectedMedicaidBusinessAreaElement = screen.getByLabelText(
      MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING['claimsProcessing']
    );

    expect(selectedMedicaidBusinessAreaElement).toBeChecked();
    expect(unselectedMedicaidBusinessAreaElement).not.toBeChecked();
  });

  test('"Other Medicaid Business Area(s)" text area and content displays when "Other" is checked', async () => {
    const newProps = Object.assign({}, defaultProps);
    newProps.medicaidBusinessAreas.other = true;
    newProps.medicaidBusinessAreas.otherMedicaidBusinessAreas =
      'This field is filled in!';
    setup(newProps);

    const otherElement = screen.getByLabelText(
      MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING['other']
    );
    expect(otherElement).toBeChecked();

    expect(
      screen.getByText('Other Medicaid Business Area(s)')
    ).toBeInTheDocument();

    const otherMedicaidBusinessAreasTextAreaContent =
      newProps.medicaidBusinessAreas.otherMedicaidBusinessAreas;
    expect(
      screen.getByDisplayValue(otherMedicaidBusinessAreasTextAreaContent)
    ).toBeInTheDocument();
  });

  test('"Other Medicaid Business Area(s)" text box does NOT display when "Other" is UNchecked', async () => {
    const newProps = Object.assign({}, defaultProps);
    newProps.medicaidBusinessAreas.other = false;
    setup(newProps);

    const otherElement = screen.getByLabelText(
      MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING['other']
    );
    expect(otherElement).not.toBeChecked();

    const otherMedicaidBusinessAreaElement = screen.queryByText(
      'Other Medicaid Business Area(s)'
    );
    expect(otherMedicaidBusinessAreaElement).toBeFalsy();
  });
});
