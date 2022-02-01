import { Dropdown } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import {
  setNonPersonnelCostCategory,
  setNonPersonnelCostDescription,
  setNonPersonnelCostForYear
} from '../../../actions/editActivity';
import DollarField from '../../../components/DollarField';
import TextArea from '../../../components/TextArea';

const NonPersonnelCostForm = ({
  activityIndex,
  index,
  item: { category, description, years },
  setCategory,
  setDescription,
  setCost
}) => {
  const editCategory = useCallback(
    ({ target: { value } }) => setCategory(activityIndex, index, value),
    [activityIndex, index, setCategory]
  );

  const editDesc = useCallback(
    ({ target: { value } }) => setDescription(activityIndex, index, value),
    [activityIndex, index, setDescription]
  );

  const getEditCostForYear = useCallback(
    year =>
      ({ target: { value } }) =>
        setCost(activityIndex, index, year, value),
    [activityIndex, index, setCost]
  );

  const categories = [
    'Hardware, software, and licensing',
    'Equipment and supplies',
    'Training and outreach',
    'Travel',
    'Administrative operations',
    'Miscellaneous expenses for the project'
  ].map(item => ({ label: item, value: item }));
  categories.unshift({ label: 'Select an option', value: '' });
  return (
    <Fragment>
      <h6 className="ds-h4">Non-Personnel Cost {index + 1}:</h6>
      {/* eslint-disable jsx-a11y/no-autofocus */}
      <Dropdown
        autoFocus
        label="Category"
        name="category"
        options={categories}
        value={category}
        onChange={editCategory}
      />

      <TextArea
        label="Description"
        rows={5}
        name="desc"
        value={description}
        onChange={editDesc}
      />

      {Object.entries(years).map(([year, cost]) => (
        <DollarField
          key={year}
          label={`FFY ${year} Cost`}
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
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  setCategory: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setCost: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setCategory: setNonPersonnelCostCategory,
  setDescription: setNonPersonnelCostDescription,
  setCost: setNonPersonnelCostForYear
};

export default connect(null, mapDispatchToProps)(NonPersonnelCostForm);

export { NonPersonnelCostForm as plain, mapDispatchToProps };
