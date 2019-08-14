import { FormLabel, Select } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import DollarField from '../../../components/DollarField';
import TextArea from '../../../components/TextArea';
import { getLabelID } from '../../../util';

const NonPersonnelCostForm = ({
  handleEditCost,
  handleEditDesc,
  handleEditCategory,
  index,
  item: { category, desc, years }
}) => {
  const editCategory = useCallback(
    ({ target: { value } }) => handleEditCategory(index, value),
    [index]
  );

  const editDesc = useCallback(
    ({ target: { value } }) => handleEditDesc(index, value),
    [index]
  );

  const getEditCostForYear = useCallback(
    year => ({ target: { value } }) => handleEditCost(index, year, value),
    [index]
  );

  const selectID = getLabelID();

  return (
    <Fragment>
      <h6 className="ds-h4">Non-Personnel Cost {index + 1}:</h6>
      <FormLabel fieldId={selectID}>Category</FormLabel>
      <Select
        id={selectID}
        name="category"
        value={category}
        onChange={editCategory}
      >
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
      <TextArea
        label="Description"
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
    </Fragment>
  );
};

NonPersonnelCostForm.propTypes = {
  handleEditCost: PropTypes.func.isRequired,
  handleEditDesc: PropTypes.func.isRequired,
  handleEditCategory: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    category: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired
};

export default NonPersonnelCostForm;
