import React from 'react';
import PropTypes from 'prop-types';

import { ChoiceList } from '@cmsgov/design-system';
import { Controller, useFormContext } from 'react-hook-form';

const HitechUpdateStatus = ({ setUpdateStatus, updateStatus }) => {
  const {
    control,
    formState: { errors },
    setValue
  } = useFormContext();

  return (
    <div>
      <Controller
        name="updateStatus"
        control={control}
        render={({ field: { onBlur, onChange, ...props } }) => (
          <ChoiceList
            {...props}
            label="Update Type"
            hint={
              <div>
                Indicate if this update is an annual APD and/or as need APD
                update.
                <br />
                Keep in mind, an as needed update can serve as an annual update.
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
              setValue('updateStatus', updateStatus, { shouldValidate: true });
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={errors?.updateStatus?.message}
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );
};

HitechUpdateStatus.propTypes = {
  updateStatus: PropTypes.object.isRequired,
  setUpdateStatus: PropTypes.func.isRequired
};

export default HitechUpdateStatus;
