import { Button, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import DollarField from '../../../components/DollarField';

const StatePersonForm = ({
  collapse,
  desc,
  handleEditCost,
  handleEditFTE,
  handleEditPersonDesc,
  handleEditPersonTitle,
  idx,
  title,
  years
}) => {
  const editTitle = useCallback(
    ({ target: { value } }) => handleEditPersonTitle(idx, value),
    [idx]
  );

  const editDesc = useCallback(
    ({ target: { value } }) => handleEditPersonDesc(idx, value),
    [idx]
  );

  const getEditCostForYear = useCallback(
    year => ({ target: { value } }) => handleEditCost(idx, year, value),
    [idx]
  );

  const getEditFTEForYear = useCallback(
    year => ({ target: { value } }) => handleEditFTE(idx, year, value),
    [idx]
  );

  return (
    <div className="ds-u-border-bottom--2 ds-u-padding-y--2">
      <h6 className="ds-h4">Personnel {idx + 1}:</h6>
      <TextField
        label="Personnel title"
        name="title"
        value={title}
        onChange={editTitle}
      />
      <TextField
        label="Description"
        multiline
        rows={5}
        name="desc"
        value={desc}
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
            <TextField
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
      <Button
        variation="primary"
        className="ds-u-margin-top--2"
        onClick={collapse}
      >
        Done
      </Button>
    </div>
  );
};

StatePersonForm.propTypes = {
  collapse: PropTypes.func.isRequired,
  desc: PropTypes.string.isRequired,
  handleEditCost: PropTypes.func.isRequired,
  handleEditFTE: PropTypes.func.isRequired,
  handleEditPersonDesc: PropTypes.func.isRequired,
  handleEditPersonTitle: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  years: PropTypes.object.isRequired
};

export default StatePersonForm;
