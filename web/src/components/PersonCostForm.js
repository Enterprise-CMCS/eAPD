import PropTypes from 'prop-types';
import React, { useEffect, Fragment } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import personCostSchema from '../static/schemas/personCost'

import DollarField from './DollarField';
import Dollars from './Dollars';
import NumberField from './NumberField';

const PersonCostForm = ({
  items,
  costLabel,
  fteLabel,
  setCost,
  setFTE,
  hint
}) => {
  
  const {
    control,
    formState: { errors, isValid },
    getValues,
    setValue
  } = useForm({
    defaultValues: {
      ...items
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(personCostSchema)
  });
  
  const handleCostChange =
    year =>
    ({ target: { value } }) => {
      setCost(year, value);
    };

  const handleFTEChange =
    year =>
    ({ target: { value } }) => {
      setFTE(year, value);
    };
  
  return (
    <div>
      {Object.entries(items.years).map(([year, { amt, perc }]) => (
        <Fragment key={year}>
          <h5 className="ds-h5">FFY {year} Cost</h5>
          <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
            
          <Controller
            control={control}
            name="amt"
            render={({
              field: { onBlur, value }
            }) => (
            <DollarField
              label={costLabel}
              name="amt"
              size="medium"
              value={amt}
              onChange={handleCostChange(year)}
              errorMessage={'todo'}
            />
            )}
          />
          
          <Controller
            control={control}
            name={`years[${year}].perc`}
            render={({
              field: { onBlur, value }
            }) => (
            <NumberField
              label={fteLabel}
              name="ftes"
              size="medium"
              min={0}
              hint={hint}
              value={perc}
              onChange={handleFTEChange(year)}
              errorMessage={'todo'}
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
  hint: PropTypes.string
};

PersonCostForm.defaultProps = {
  costLabel: 'Cost with benefits',
  fteLabel: 'Number of FTEs',
  hint: ''
};

export default PersonCostForm;
