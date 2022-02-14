import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

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
  const handleCostChange =
    year =>
    ({ target: { value } }) => {
      console.log(`handleCostChange ${year} ${value}`);
      setCost(year, value);
    };

  const handleFTEChange =
    year =>
    ({ target: { value } }) => {
      console.log(`handleFTEChange ${year} ${value}`);
      setFTE(year, value);
    };

  return (
    <div>
      {Object.entries(items).map(([year, { amt, perc }]) => (
        <Fragment key={year}>
          <h5 className="ds-h5">FFY {year} Cost</h5>
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
              min={0}
              numeric
              hint={hint}
              value={perc}
              onChange={handleFTEChange(year)}
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
