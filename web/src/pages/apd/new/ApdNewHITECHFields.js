import React from 'react';
import PropTypes from 'prop-types';

import { ChoiceList } from '@cmsgov/design-system';
import { Controller, useFormContext } from 'react-hook-form';

const ApdNewHITECHFields = ({ setUpdateStatus, updateStatus }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <Controller
        name="updateStatus"
        control={control}
        render={({ field: { onBlur, onChange } }) => (
          <ChoiceList
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

ApdNewHITECHFields.propTypes = {
  typeStatus: PropTypes.object.isRequired,
  setUpdateStatus: PropTypes.func.isRequired
};

export default ApdNewHITECHFields;
