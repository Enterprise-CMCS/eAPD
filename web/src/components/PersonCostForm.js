import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import DollarField from './DollarField';
import Dollars from './Dollars';
import NumberField from './NumberField';

const PersonCostForm = ({ years, setCost, setFTE }) => {
  const handleCostChange = year => ({ target: { value } }) => {
    setCost(year, value);
  };

  const handleFTEChange = year => ({ target: { value } }) => {
    setFTE(year, value);
  };

  return Object.entries(years).map(([year, { amt, perc }]) => (
    <Fragment key={year}>
      <h5 className="ds-h5">{year} Costs</h5>
      <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
        <DollarField
          label="Costs with benefits"
          name="cost"
          size="medium"
          value={amt}
          onChange={handleCostChange(year)}
        />
        <NumberField
          label="Number of FTEs"
          name="ftes"
          size="medium"
          type="number"
          value={perc}
          onChange={handleFTEChange(year)}
        />
        <p>
          <strong>Total: </strong>
          <Dollars long>{amt * perc}</Dollars>
        </p>
      </div>
    </Fragment>
  ));
};

PersonCostForm.propTypes = {
  years: PropTypes.object.isRequired,
  setCost: PropTypes.func.isRequired,
  setFTE: PropTypes.func.isRequired
};

export default PersonCostForm;
