import {
  Button,
  FormLabel,
  Select,
  TextField
} from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import DollarField from '../../../components/DollarField';

const NonPersonnelCostForm = ({
  category,
  collapse,
  desc,
  handleEditCost,
  handleEditDesc,
  handleEditCategory,
  idx,
  years
}) => {
  const editCategory = useCallback(
    ({ target: { value } }) => handleEditCategory(idx, value),
    [idx]
  );

  const editDesc = useCallback(
    ({ target: { value } }) => handleEditDesc(idx, value),
    [idx]
  );

  const getEditCostForYear = useCallback(
    year => ({ target: { value } }) => handleEditCost(idx, year, value),
    [idx]
  );

  return (
    <div className="ds-u-border-bottom--2 ds-u-padding-y--2">
      <h6 className="ds-h4">Personnel {idx + 1}:</h6>
      <FormLabel>Category</FormLabel>
      <Select name="category" value={category} onChange={editCategory}>
        <option value="Hardware, software, and licensing">
          Hardware, software, and licensing
        </option>
        <option value="Equipment and supplies">Equipment and supplies</option>
        <option value="Training and outreach">Training and outreach</option>
        <option value="Travel">Travel</option>
        <option value="Administrative operations">
          Administrative operations
        </option>
        <option value="Miscellaneous expenses for the project">
          Miscellaneous expenses for the project
        </option>
      </Select>
      <TextField
        label="Description"
        multiline
        rows={5}
        name="desc"
        value={desc}
        onChange={editDesc}
      />
      {Object.entries(years).map(([year, cost]) => (
        <DollarField
          key={year}
          label={`${year} Cost`}
          name="cost"
          size="medium"
          value={cost}
          onChange={getEditCostForYear(year)}
        />
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

NonPersonnelCostForm.propTypes = {
  category: PropTypes.string.isRequired,
  collapse: PropTypes.func.isRequired,
  desc: PropTypes.string.isRequired,
  handleEditCost: PropTypes.func.isRequired,
  handleEditDesc: PropTypes.func.isRequired,
  handleEditCategory: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  years: PropTypes.object.isRequired
};

export default NonPersonnelCostForm;
