import PropTypes from 'prop-types';
import React, { useEffect, Fragment } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { personYearlyCostsSchema } from '@cms-eapd/common/schemas/statePersonnel';

import DollarField from './DollarField';
import Dollars from './Dollars';
import NumberField from './NumberField';

const PersonCostForm = ({
  items,
  costLabel,
  fteLabel,
  setCost,
  setFTE,
  hint,
  setFormValid
}) => {
  const {
    control,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      ...items
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(personYearlyCostsSchema)
  });

  const formValues = watch();

  const handleCostChange =
    year =>
    ({ target: { value } }) => {
      setCost(year, value);
      setValue(`[${year}].amt`, value);
    };

  const handleFTEChange =
    year =>
    ({ target: { value } }) => {
      setFTE(year, value);
      setValue(`[${year}].perc`, value);
    };

  useEffect(() => {
    setFormValid(isValid);
  }, [isValid]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {Object.entries(formValues).map(([year, { amt, perc }]) => (
        <Fragment key={year}>
          <h5 className="ds-h5">FFY {year} Cost</h5>
          <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
            <Controller
              control={control}
              name={`[${year}].amt`}
              render={({ field: { onBlur, value, ...props } }) => (
                <DollarField
                  {...props}
                  label={costLabel}
                  name={`[${year}].amt`}
                  size="medium"
                  value={value}
                  onChange={handleCostChange(year)}
                  onBlur={onBlur}
                  errorMessage={errors && errors[`${year}`]?.amt?.message}
                  errorPlacement="bottom"
                />
              )}
            />

            <Controller
              control={control}
              name={`[${year}].perc`}
              render={({ field: { onBlur, value, ...props } }) => (
                <NumberField
                  {...props}
                  label={fteLabel}
                  size="medium"
                  min={0}
                  hint={hint}
                  value={value}
                  onChange={handleFTEChange(year)}
                  onBlur={onBlur}
                  errorMessage={errors && errors[`${year}`]?.perc?.message}
                  errorPlacement="bottom"
                />
              )}
            />

            <p>
              <strong>Total: </strong>
              <Dollars>{amt * perc}</Dollars>
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

PersonCostForm.propTypes = {
  items: PropTypes.object.isRequired,
  costLabel: PropTypes.string,
  fteLabel: PropTypes.string,
  setCost: PropTypes.func.isRequired,
  setFTE: PropTypes.func.isRequired,
  hint: PropTypes.string,
  setFormValid: PropTypes.func.isRequired
};

PersonCostForm.defaultProps = {
  costLabel: 'Cost with benefits',
  fteLabel: 'Number of FTEs',
  hint: ''
};

export default PersonCostForm;
