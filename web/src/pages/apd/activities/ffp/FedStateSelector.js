import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Dropdown } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import Instruction from '../../../../components/Instruction';

const FedStateSelector = ({ ffp, ffy, setFederalStateSplit, adminCheck }) => {
  const {
    control,
    formState: { errors },
    setValue,
    trigger
  } = useFormContext();
  const [fedStateSplit, setFedStateSplit] = useState(
    `${ffp.federal}-${ffp.state}`
  );

  useEffect(() => {
    setFedStateSplit(`${ffp.federal}-${ffp.state}`);
  }, [ffp.federal, ffp.state]);

  const handleFedStateSplit = e => {
    const [federal, state] = e.target.value.split('-').map(Number);
    setValue(`${ffy}.ffp.federal`, federal);
    setValue(`${ffy}.ffp.state`, state);
    if (adminCheck) {
      trigger();
    }
    setFedStateSplit(`${federal}-${state}`);
    setFederalStateSplit(ffy, federal, state);
  };

  return (
    <div className="data-entry-box ds-u-margin-bottom--5">
      <Instruction
        source="activities.costAllocate.ffp.federalStateSplitInstruction"
        headingDisplay={{
          level: 'p',
          className: 'ds-h4'
        }}
      />
      <Controller
        name={`${ffy}.ffp`}
        control={control}
        render={({ field: { ...props } }) => (
          <Dropdown
            {...props}
            label="federal-state split"
            labelClassName="sr-only"
            options={[
              { label: 'Select an option', value: '0-100' },
              { label: '90-10', value: '90-10' },
              { label: '75-25', value: '75-25' },
              { label: '50-50', value: '50-50' }
            ]}
            value={fedStateSplit}
            onChange={handleFedStateSplit}
            errorMessage={adminCheck && errors[ffy]?.ffp?.state?.message}
            errorPlacement="bottom"
            data-cy="cost-allocation-dropdown"
          />
        )}
      />
    </div>
  );
};

FedStateSelector.propTypes = {
  ffp: PropTypes.string.isRequired,
  ffy: PropTypes.string.isRequired,
  setFederalStateSplit: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

export default FedStateSelector;
