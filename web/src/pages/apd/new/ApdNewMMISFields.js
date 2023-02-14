import React from 'react';

import TextArea from '../../../components/TextArea';
import { ChoiceList } from '@cmsgov/design-system';
import { Controller } from 'react-hook-form';

export default function ApdNewMMISFields({
  control,
  errors,
  businessAreas,
  setBusinessAreas,
  typeStatus,
  setTypeStatus,
  setUpdateAPD,
  setValue
}) {
  return (
    <div>
      <Controller
        name="updateAPD"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <ChoiceList
            label="Is this an APD update?"
            hint="Indicate if this APD is for a new project or if it is an update to an existing one."
            type="radio"
            choices={[
              {
                label: 'Yes, it is an update.',
                value: 'yes',
                checked: value === 'yes',
                checkedChildren: (
                  <div className="ds-c-choice__checkedChild">
                    <Controller
                      name="updateStatus"
                      control={control}
                      render={({ field: { onBlur, onChange } }) => (
                        <ChoiceList
                          label="Update Type"
                          hint={
                            <div>
                              Indicate if this update is an annual APD and/or as
                              need APD update.
                              <br />
                              Keep in mind, an as needed update can serve as an
                              annual update.
                            </div>
                          }
                          choices={[
                            {
                              label: 'Annual update',
                              value: 'annualUpdate',
                              checked: typeStatus.annualUpdate
                            },
                            {
                              label: 'As-needed update',
                              value: 'asNeededUpdate',
                              checked: typeStatus.asNeededUpdate
                            }
                          ]}
                          labelClassName="ds-u-margin-bottom--1"
                          type="checkbox"
                          onChange={({ target: { value, checked } }) => {
                            typeStatus[value] = checked;
                            setTypeStatus(typeStatus);
                            onChange(typeStatus);
                          }}
                          onBlur={onBlur}
                          onComponentBlur={onBlur}
                          errorMessage={errors?.updateStatus?.message}
                          errorPlacement="bottom"
                        />
                      )}
                    />
                  </div>
                )
              },
              {
                label: 'No, this is for a new project.',
                value: 'no',
                checked: value === 'no'
              }
            ]}
            onChange={({ target: { value } }) => {
              setUpdateAPD(value);
              setTypeStatus({
                annualUpdate: false,
                asNeededUpdate: false
              });
              onChange(value);
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={errors?.updateAPD?.message}
            errorPlacement="bottom"
          />
        )}
      />

      <Controller
        name="medicaidBusinessAreas"
        control={control}
        render={({ field: { onBlur, onChange } }) => (
          <ChoiceList
            label="Medicaid Business Areas"
            hint={
              <div>
                Select the Medicaid Enterprise Systems Business Area(s) that
                cover the scope of this APD. A more detailed description of
                these business areas, along with the associated outcomes and
                metrics, are available at the&nbsp;
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
                label: '1115 or Waiver Support Systems',
                value: 'waiverSupportSystems',
                checked: businessAreas.waiverSupportSystems
              },
              {
                label: 'Asset Verification System',
                value: 'assetVerificationSystem',
                checked: businessAreas.assetVerificationSystem
              },
              {
                label: 'Claims Processing',
                value: 'claimsProcessing',
                checked: businessAreas.claimsProcessing
              },
              {
                label: 'Decision Support System & Data Warehouse',
                value: 'decisionSupportSystemDW',
                checked: businessAreas.decisionSupportSystemDW
              },
              {
                label: 'Electronic Visit Verification (EVV)',
                value: 'electronicVisitVerification',
                checked: businessAreas.electronicVisitVerification
              },
              {
                label:
                  'Encounter Processing System (EPS) & Managed Care System',
                value: 'encounterProcessingSystemMCS',
                checked: businessAreas.encounterProcessingSystemMCS
              },
              {
                label: 'Financial Management',
                value: 'financialManagement',
                checked: businessAreas.financialManagement
              },
              {
                label: 'Health Information Exchange (HIE)',
                value: 'healthInformationExchange',
                checked: businessAreas.healthInformationExchange
              },
              {
                label: 'Long Term Services & Supports (LTSS)',
                value: 'longTermServicesSupports',
                checked: businessAreas.longTermServicesSupports
              },
              {
                label: 'Member Management',
                value: 'memberManagement',
                checked: businessAreas.memberManagement
              },
              {
                label:
                  'Pharmacy Benefit Management (PBM) & Point of Sale (POS)',
                value: 'pharmacyBenefitManagementPOS',
                checked: businessAreas.pharmacyBenefitManagementPOS
              },
              {
                label: 'Program Integrity',
                value: 'programIntegrity',
                checked: businessAreas.programIntegrity
              },
              {
                label: 'Provider Management',
                value: 'providerManagement',
                checked: businessAreas.providerManagement
              },
              {
                label: 'Third Party Liability (TPL)',
                value: 'thirdPartyLiability',
                checked: businessAreas.thirdPartyLiability
              },
              {
                label: 'Other',
                value: 'other',
                checked: businessAreas.other,
                checkedChildren: (
                  <div className="ds-c-choice__checkedChild">
                    <Controller
                      name="medicaidBusinessAreas.otherMedicaidBusinessAreas"
                      control={control}
                      render={({ field: { onBlur, ...props } }) => (
                        <TextArea
                          {...props}
                          label="Other Medicaid Business Area(s)"
                          data-cy="other_details"
                          hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
                          onBlur={onBlur}
                          onComponentBlur={onBlur}
                          errorMessage={
                            errors?.medicaidBusinessAreas
                              ?.otherMedicaidBusinessAreas?.message
                          }
                          errorPlacement="bottom"
                        />
                      )}
                    />
                  </div>
                )
              }
            ]}
            onChange={({ target: { value, checked } }) => {
              businessAreas[value] = checked;
              setBusinessAreas(businessAreas);
              onChange(businessAreas);
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={errors?.medicaidBusinessAreas?.message}
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );
}
