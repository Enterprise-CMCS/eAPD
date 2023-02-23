import React from 'react';
import PropTypes from 'prop-types';

import { ChoiceList } from '@cmsgov/design-system';
import { Controller, useFormContext } from 'react-hook-form';

const ApdNewHITECHFields = ({ setHitechUpdateStatus, hitechUpdateStatus }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <Controller
        name="hitechUpdateStatus"
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
                checked: hitechUpdateStatus.annualUpdate
              },
              {
                label: 'As-needed update',
                value: 'asNeededUpdate',
                checked: hitechUpdateStatus.asNeededUpdate
              }
            ]}
            labelClassName="ds-u-margin-bottom--1"
            type="checkbox"
            onChange={({ target: { value, checked } }) => {
              hitechUpdateStatus[value] = checked;
              hitechUpdateStatus.isUpdateAPD = true;
              setHitechUpdateStatus(hitechUpdateStatus);
              onChange(hitechUpdateStatus);
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={errors?.hitechUpdateStatus?.message}
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );
};

ApdNewHITECHFields.propTypes = {
  hitechUpdateStatus: PropTypes.object.isRequired,
  setHitechUpdateStatus: PropTypes.func.isRequired
};

export default ApdNewHITECHFields;
