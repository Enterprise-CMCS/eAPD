import { TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import DollarField from '../../../components/DollarField';
import TextArea from '../../../components/TextArea';
import NumberField from '../../../components/NumberField';

const StatePersonForm = ({
  item: { description, title, years },
  handleEditCost,
  handleEditFTE,
  handleEditPersonDesc,
  handleEditPersonTitle,
  index
}) => {
  const editTitle = useCallback(
    ({ target: { value } }) => handleEditPersonTitle(index, value),
    [index]
  );

  const editDesc = useCallback(
    ({ target: { value } }) => handleEditPersonDesc(index, value),
    [index]
  );

  const getEditCostForYear = useCallback(
    year => ({ target: { value } }) => handleEditCost(index, year, value),
    [index]
  );

  const getEditFTEForYear = useCallback(
    year => ({ target: { value } }) => handleEditFTE(index, year, value),
    [index]
  );

  return (
    <Fragment>
      <h6 className="ds-h4">Personnel {index + 1}:</h6>
      <TextField
        autoFocus="true"
        label="Personnel title"
        name="title"
        value={title}
        onChange={editTitle}
      />
      <TextArea
        label="Description"
        rows={5}
        name="desc"
        value={description}
        onChange={editDesc}
      />
      {Object.entries(years).map(([year, { amt, perc }]) => (
        <Fragment key={year}>
          <h5 className="ds-h5">{year} Costs</h5>
          <div className="ds-c-choice__checkedChild ds-u-padding-y--0">
            <DollarField
              label="Costs with benefits"
              name="cost"
              size="medium"
              value={amt}
              onChange={getEditCostForYear(year)}
            />
            <NumberField
              label="Number of FTEs"
              name="ftes"
              size="medium"
              type="number"
              value={perc}
              onChange={getEditFTEForYear(year)}
            />
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

StatePersonForm.propTypes = {
  handleEditCost: PropTypes.func.isRequired,
  handleEditFTE: PropTypes.func.isRequired,
  handleEditPersonDesc: PropTypes.func.isRequired,
  handleEditPersonTitle: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired
};

export default StatePersonForm;
