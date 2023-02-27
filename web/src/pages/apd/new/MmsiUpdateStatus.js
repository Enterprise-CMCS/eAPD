import React from 'react';
import PropTypes from 'prop-types';

import MedicaidBusinessAreas from '../../../components/MedicaidBusinessAreas';

import { ChoiceList } from '@cmsgov/design-system';
import { Controller, useFormContext } from 'react-hook-form';

const MmsiUpdateStatus = ({
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
          <MedicaidBusinessAreas
            controllerNameForOtherDetails="medicaidBusinessAreas.otherMedicaidBusinessAreas"
            errorMessage={errors?.medicaidBusinessAreas?.message}
            errorOtherDetails={
              errors?.medicaidBusinessAreas?.otherMedicaidBusinessAreas?.message
            }
            medicaidBusinessAreaChoices={medicaidBusinessAreas}
            setMedicaidBusinessAreas={setMedicaidBusinessAreas}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};

MmsiUpdateStatus.propTypes = {
  medicaidBusinessAreas: PropTypes.object.isRequired,
  setMedicaidBusinessAreas: PropTypes.func.isRequired,
  updateStatus: PropTypes.object.isRequired,
  setUpdateStatus: PropTypes.func.isRequired,
  setUpdateAPD: PropTypes.func.isRequired
};

export default MmsiUpdateStatus;
