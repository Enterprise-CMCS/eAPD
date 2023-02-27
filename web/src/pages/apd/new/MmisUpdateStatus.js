import React from 'react';
import PropTypes from 'prop-types';

import { ChoiceList } from '@cmsgov/design-system';
import { Controller, useFormContext } from 'react-hook-form';

const MmisUpdateStatus = ({ updateStatus, setUpdateStatus, setUpdateAPD }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <Controller
        name="updateAPD"
        control={control}
        render={({ field: { onBlur, onChange, value, ...props } }) => (
          <ChoiceList
            {...props}
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
              if (value === 'yes') {
                updateStatus.isUpdateAPD = true;
              } else {
                updateStatus = {
                  isUpdateAPD: false,
                  annualUpdate: false,
                  asNeededUpdate: false
                };
              }
              setUpdateStatus(updateStatus);
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
    </div>
  );
};

MmisUpdateStatus.propTypes = {
  updateStatus: PropTypes.object.isRequired,
  setUpdateStatus: PropTypes.func.isRequired,
  setUpdateAPD: PropTypes.func.isRequired
};

export default MmisUpdateStatus;
