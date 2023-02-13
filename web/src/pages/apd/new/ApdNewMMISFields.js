import React from 'react';

import TextArea from '../../../components/TextArea';
import { ChoiceList } from '@cmsgov/design-system';
import { Controller } from 'react-hook-form';

export default function ApdNewMMISFields({
  control,
  errors,
  businessAreas,
  setBusinessAreas,
  setBusinessList,
  setOtherDetails,
  typeStatus,
  setTypeStatus
}) {
  return (
    <div>
      <Controller
        name="mmisUpdate"
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
                      name="updateStatus.typeStatus"
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
                          onChange={({ target: { value } }) => {
                            typeStatus[value] = !typeStatus[value];
                            setTypeStatus(typeStatus);
                            onChange(typeStatus);
                          }}
                          onBlur={onBlur}
                          onComponentBlur={onBlur}
                          errorMessage={
                            errors?.updateStatus?.typeStatus?.message
                          }
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
            onChange={e => {
              onChange(e);
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={errors?.mmisUpdate?.message}
            errorPlacement="bottom"
          />
        )}
      />

      <Controller
        name="businessList"
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
                value: 'waiverSupport',
                checked: businessAreas.waiverSupport
              },
              {
                label: 'Asset Verification System',
                value: 'assetVerification',
                checked: businessAreas.assetVerification
              },
              {
                label: 'Claims Processing',
                value: 'claimsProcessing',
                checked: businessAreas.claimsProcessing
              },
              {
                label: 'Decision Support System & Data Warehouse',
                value: 'decisionSupport',
                checked: businessAreas.decisionSupport
              },
              {
                label: 'Electronic Visit Verification (EVV)',
                value: 'electronicVisitVerify',
                checked: businessAreas.electronicVisitVerify
              },
              {
                label:
                  'Encounter Processing System (EPS) & Managed Care System',
                value: 'encounterProcessingSystem',
                checked: businessAreas.encounterProcessingSystem
              },
              {
                label: 'Financial Management',
                value: 'financialMangement',
                checked: businessAreas.financialMangement
              },
              {
                label: 'Health Information Exchange (HIE)',
                value: 'healthInfoExchange',
                checked: businessAreas.healthInfoExchange
              },
              {
                label: 'Long Term Services & Suports (LTSS)',
                value: 'longTermServiceSupport',
                checked: businessAreas.longTermServiceSupport
              },
              {
                label: 'Member Management',
                value: 'memberMangagement',
                checked: businessAreas.memberMangagement
              },
              {
                label: 'Pharmacy Beefit Management (PBM) & Point of Sale (POS)',
                value: 'pharmacyBenefitManagement',
                checked: businessAreas.pharmacyBenefitManagement
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
                      name="otherDetails"
                      control={control}
                      render={({ field: { onBlur, ...props } }) => (
                        <TextArea
                          {...props}
                          label="Other Medicaid Business Area(s)"
                          name="other-mbas"
                          data-cy="other_details"
                          hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
                          onBlur={onBlur}
                          onChange={e => {
                            setOtherDetails(e.target.value);
                          }}
                          onComponentBlur={onBlur}
                          errorMessage={errors?.otherDetails?.message}
                          errorPlacement="bottom"
                        />
                      )}
                    />
                  </div>
                )
              }
            ]}
            onChange={({ target: { value } }) => {
              // Set boolean values for medicaid business areas
              // For createApd
              businessAreas[value] = !businessAreas[value];
              setBusinessAreas(businessAreas);

              // For validation
              let keys = Object.keys(businessAreas).filter(
                key => businessAreas[key]
              );
              onChange(keys);
              setBusinessList(keys);
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={errors?.businessList?.message}
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );
}
