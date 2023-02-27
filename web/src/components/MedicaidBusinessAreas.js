import React from 'react';
import TextArea from './TextArea';
import { MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING } from '@cms-eapd/common';
import { ChoiceList } from '@cmsgov/design-system';
import { Controller, useFormContext } from 'react-hook-form';

const MedicaidBusinessAreas = ({
  controllerNameForOtherDetails,
  errorMessage,
  errorOtherDetails,
  medicaidBusinessAreas,
  setMedicaidBusinessAreas,
  onBlur,
  onChange
}) => {
  const { control } = useFormContext();

  return (
    <ChoiceList
      label="Medicaid Business Areas"
      hint={
        <div>
          Select the Medicaid Enterprise Systems Business Area(s) that cover the
          scope of this APD. A more detailed description of these business
          areas, along with the associated outcomes and metrics, are available
          at the&nbsp;
          <a
            href="https://cmsgov.github.io/CMCS-DSG-DSS-Certification/"
            target="_blank"
            rel="noreferrer"
          >
            MES Certification Repository
          </a>
          .
        </div>
      }
      type="checkbox"
      choices={[
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.waiverSupportSystems,
          value: 'waiverSupportSystems',
          checked: medicaidBusinessAreas.waiverSupportSystems
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.assetVerificationSystem,
          value: 'assetVerificationSystem',
          checked: medicaidBusinessAreas.assetVerificationSystem
        },
        {
          label: MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.claimsProcessing,
          value: 'claimsProcessing',
          checked: medicaidBusinessAreas.claimsProcessing
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.decisionSupportSystemDW,
          value: 'decisionSupportSystemDW',
          checked: medicaidBusinessAreas.decisionSupportSystemDW
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.electronicVisitVerification,
          value: 'electronicVisitVerification',
          checked: medicaidBusinessAreas.electronicVisitVerification
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.encounterProcessingSystemMCS,
          value: 'encounterProcessingSystemMCS',
          checked: medicaidBusinessAreas.encounterProcessingSystemMCS
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.financialManagement,
          value: 'financialManagement',
          checked: medicaidBusinessAreas.financialManagement
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.healthInformationExchange,
          value: 'healthInformationExchange',
          checked: medicaidBusinessAreas.healthInformationExchange
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.longTermServicesSupports,
          value: 'longTermServicesSupports',
          checked: medicaidBusinessAreas.longTermServicesSupports
        },
        {
          label: MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.memberManagement,
          value: 'memberManagement',
          checked: medicaidBusinessAreas.memberManagement
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.pharmacyBenefitManagementPOS,
          value: 'pharmacyBenefitManagementPOS',
          checked: medicaidBusinessAreas.pharmacyBenefitManagementPOS
        },
        {
          label: MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.programIntegrity,
          value: 'programIntegrity',
          checked: medicaidBusinessAreas.programIntegrity
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.providerManagement,
          value: 'providerManagement',
          checked: medicaidBusinessAreas.providerManagement
        },
        {
          label:
            MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.thirdPartyLiability,
          value: 'thirdPartyLiability',
          checked: medicaidBusinessAreas.thirdPartyLiability
        },
        {
          label: MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.other,
          value: 'other',
          checked: medicaidBusinessAreas.other,
          checkedChildren: (
            <div className="ds-c-choice__checkedChild">
              <Controller
                name={controllerNameForOtherDetails}
                control={control}
                render={({ field: { onBlur, ...props } }) => (
                  <TextArea
                    {...props}
                    label={
                      MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.otherMedicaidBusinessAreas
                    }
                    data-cy="other_details"
                    hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
                    onBlur={onBlur}
                    onComponentBlur={onBlur}
                    errorMessage={errorOtherDetails}
                    errorPlacement="bottom"
                  />
                )}
              />
            </div>
          )
        }
      ]}
      onChange={({ target: { value, checked } }) => {
        medicaidBusinessAreas[value] = checked;
        setMedicaidBusinessAreas(medicaidBusinessAreas);
        onChange(medicaidBusinessAreas);
      }}
      onBlur={onBlur}
      onComponentBlur={onBlur}
      errorMessage={errorMessage}
      errorPlacement="bottom"
    />
  );
};

export default MedicaidBusinessAreas;
