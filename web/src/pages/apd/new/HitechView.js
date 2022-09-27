import React from 'react';
import { ChoiceList } from '@cmsgov/design-system';

const hitechView = () => {
  return (
    <div>
      <ChoiceList
        label="Update Type"
        hint={
          <div>
            Indicate if this update is an annual APD and/or as need APD update.
            <br />
            Keep in mind, an as needed update can serve as an annual update.
          </div>
        }
        name="update-type"
        choices={[
          {
            label: 'Annual update',
            value: 'annual'
          },
          {
            label: 'As-needed update',
            value: 'as-needed'
          }
        ]}
        labelClassName="ds-u-margin-bottom--1"
        type="checkbox"
      />
    </div>
  );
};

export default hitechView;
