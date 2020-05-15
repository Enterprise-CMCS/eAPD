import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import DollarField from './DollarField';
import Dollars from './Dollars';
import NumberField from './NumberField';

const PersonCostForm = ({ items, costLabel, fteLabel, setCost, setFTE }) => {
  const handleCostChange = year => ({ target: { value } }) => {
    setCost(year, value);
  };

  const handleFTEChange = year => ({ target: { value } }) => {
    setFTE(year, value);
  };

  return (
    <div>
      {Object.entries(items).map(([year, { amt, perc }]) => (
        <Fragment key={year}>
          <h5 className="ds-h5">{year} Costs</h5>
          <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
            <DollarField
              label={costLabel}
              name="cost"
              size="medium"
              value={amt}
              onChange={handleCostChange(year)}
            />
            <NumberField
              label={fteLabel}
              name="ftes"
              size="medium"
              numeric
              value={perc}
              onChange={handleFTEChange(year)}
            />
            <p>
              <strong>Total: </strong>
              <Dollars long>{amt * perc}</Dollars>
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
  setFTE: PropTypes.func.isRequired
};

PersonCostForm.defaultProps = {
  costLabel: 'Costs with benefits',
  fteLabel: 'Number of FTEs'
};

export default PersonCostForm;
