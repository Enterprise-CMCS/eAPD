import { TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import {
  setPersonnelFTEForYear,
  setPersonnelCostForYear,
  setPersonnelDescription,
  setPersonnelTitle
} from '../../../actions/editActivity';

import TextArea from '../../../components/TextArea';
import PersonCostForm from '../../../components/PersonCostForm';

const StatePersonForm = ({
  activityIndex,
  item: { description, title, years },
  index,
  setCost,
  setDescription,
  setFTE,
  setTitle
}) => {
  const editTitle = useCallback(
    ({ target: { value } }) => setTitle(activityIndex, index, value),
    [index]
  );

  const editDesc = useCallback(
    ({ target: { value } }) => setDescription(activityIndex, index, value),
    [index]
  );

  const editCostForYear = useCallback(
    (year, value) => {
      setCost(activityIndex, index, year, value);
    },
    [index]
  );

  const editFTEForYear = useCallback(
    (year, value) => {
      setFTE(activityIndex, index, year, value);
    },
    [index]
  );

  return (
    <Fragment>
      <h6 className="ds-h4">Personnel {index + 1}:</h6>
      <TextField
        autoFocus
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
      <PersonCostForm
        items={years}
        setCost={editCostForYear}
        setFTE={editFTEForYear}
      />
    </Fragment>
  );
};

StatePersonForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  setCost: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setFTE: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setFTE: setPersonnelFTEForYear,
  setCost: setPersonnelCostForYear,
  setDescription: setPersonnelDescription,
  setTitle: setPersonnelTitle
};

export default connect(null, mapDispatchToProps)(StatePersonForm);

export { StatePersonForm as plain, mapDispatchToProps };
