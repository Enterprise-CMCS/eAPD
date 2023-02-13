import React from 'react';

import { ChoiceList } from '@cmsgov/design-system';
import { Controller } from 'react-hook-form';

export default function ApdNewHITECHFields({
  control,
  errors,
  typeStatus,
  setTypeStatus
}) {
  return (
    <div>
      <Controller
        name="updateStatus.typeStatus"
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
            onChange={({ target: { value } }) => {
              typeStatus[value] = !typeStatus[value];
              setTypeStatus(typeStatus);
              onChange(typeStatus);
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={errors?.updateStatus?.typeStatus?.message}
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );
}
