import React from 'react';
import PropTypes from 'prop-types';

import TextArea from '../../../components/TextArea';
import { ChoiceList } from '@cmsgov/design-system';
import { Controller, useFormContext } from 'react-hook-form';

const ApdNewMMISFields = ({
  medicaidBusinessAreas,
  setMedicaidBusinessAreas,
  updateStatus,
  setUpdateStatus,
  setUpdateAPD
}) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

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
                              checked: updateStatus.annualUpdate
                            },
                            {
                              label: 'As-needed update',
                              value: 'asNeededUpdate',
                              checked: updateStatus.asNeededUpdate
                            }
                          ]}
                          labelClassName="ds-u-margin-bottom--1"
                          type="checkbox"
                          onChange={({ target: { value, checked } }) => {
                            updateStatus[value] = checked;
                            updateStatus.isUpdateAPD = true;
                            setUpdateStatus(updateStatus);
                            onChange(updateStatus);
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
                checked: medicaidBusinessAreas.waiverSupportSystems
              },
              {
                label: 'Asset Verification System',
                value: 'assetVerificationSystem',
                checked: medicaidBusinessAreas.assetVerificationSystem
              },
              {
                label: 'Claims Processing',
                value: 'claimsProcessing',
                checked: medicaidBusinessAreas.claimsProcessing
              },
              {
                label: 'Decision Support System & Data Warehouse',
                value: 'decisionSupportSystemDW',
                checked: medicaidBusinessAreas.decisionSupportSystemDW
              },
              {
                label: 'Electronic Visit Verification (EVV)',
                value: 'electronicVisitVerification',
                checked: medicaidBusinessAreas.electronicVisitVerification
              },
              {
                label:
                  'Encounter Processing System (EPS) & Managed Care System',
                value: 'encounterProcessingSystemMCS',
                checked: medicaidBusinessAreas.encounterProcessingSystemMCS
              },
              {
                label: 'Financial Management',
                value: 'financialManagement',
                checked: medicaidBusinessAreas.financialManagement
              },
              {
                label: 'Health Information Exchange (HIE)',
                value: 'healthInformationExchange',
                checked: medicaidBusinessAreas.healthInformationExchange
              },
              {
                label: 'Long Term Services & Supports (LTSS)',
                value: 'longTermServicesSupports',
                checked: medicaidBusinessAreas.longTermServicesSupports
              },
              {
                label: 'Member Management',
                value: 'memberManagement',
                checked: medicaidBusinessAreas.memberManagement
              },
              {
                label:
                  'Pharmacy Benefit Management (PBM) & Point of Sale (POS)',
                value: 'pharmacyBenefitManagementPOS',
                checked: medicaidBusinessAreas.pharmacyBenefitManagementPOS
              },
              {
                label: 'Program Integrity',
                value: 'programIntegrity',
                checked: medicaidBusinessAreas.programIntegrity
              },
              {
                label: 'Provider Management',
                value: 'providerManagement',
                checked: medicaidBusinessAreas.providerManagement
              },
              {
                label: 'Third Party Liability (TPL)',
                value: 'thirdPartyLiability',
                checked: medicaidBusinessAreas.thirdPartyLiability
              },
              {
                label: 'Other',
                value: 'other',
                checked: medicaidBusinessAreas.other,
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
              medicaidBusinessAreas[value] = checked;
              setMedicaidBusinessAreas(medicaidBusinessAreas);
              onChange(medicaidBusinessAreas);
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
};

ApdNewMMISFields.propTypes = {
  medicaidBusinessAreas: PropTypes.object.isRequired,
  setMedicaidBusinessAreas: PropTypes.func.isRequired,
  updateStatus: PropTypes.object.isRequired,
  setUpdateStatus: PropTypes.func.isRequired,
  setUpdateAPD: PropTypes.func.isRequired
};

export default ApdNewMMISFields;
