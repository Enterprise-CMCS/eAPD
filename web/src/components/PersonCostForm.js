import PropTypes from 'prop-types';
import React, { useEffect, Fragment } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import personCostSchema from '../static/schemas/personCost'

import DollarField from './DollarField';
import Dollars from './Dollars';
import NumberField from './NumberField';

const PersonCostForm = ({
  value,
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
    getValues,
    setValue
  } = useForm({
    defaultValues: {
      ...value
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(personCostSchema)
  });
  
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
  }, [isValid])
  
  return (
    <div>
      {Object.entries(value).map(([year, { amt, perc }]) => (
        <Fragment key={year}>
          <h5 className="ds-h5">FFY {year} Cost</h5>
          <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
            
          <Controller
            control={control}
            name={`[${year}].amt`}
            render={({
              field: { onBlur, value, ...props }
            }) => (
            <DollarField
              {...props}
              label={costLabel}
              name={`[${year}].amt`}
              size="medium"
              value={value}
              onChange={handleCostChange(year)}
              onBlur={onBlur}
              errorMessage={errors && errors[`${year}`]?.amt?.message}
            />
            )}
          />
          
          <Controller
            control={control}
            name={`[${year}].perc`}
            render={({
              field: { onBlur, value, ...props }
            }) => (
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
  value: PropTypes.object.isRequired,
  costLabel: PropTypes.string,
  fteLabel: PropTypes.string,
  setCost: PropTypes.func.isRequired,
  setFTE: PropTypes.func.isRequired,
  hint: PropTypes.string
};

PersonCostForm.defaultProps = {
  costLabel: 'Cost with benefits',
  fteLabel: 'Number of FTEs',
  hint: ''
};

export default PersonCostForm;
