import React from 'react';
import PropTypes from 'prop-types';

import { ChoiceList } from '@cmsgov/design-system';
import { Controller } from 'react-hook-form';

export default function ApdNewHITECHFields({
  control,
  errors,
  setTypeStatus,
  typeStatus
}) {
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
              typeStatus.isUpdateAPD = true;
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
  );
}

ApdNewHITECHFields.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  typeStatus: PropTypes.object.isRequired,
  setTypeStatus: PropTypes.func.isRequired
};
