import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { ApdKeyPersonForm, ApdKeyPersonReview } from './ApdKeyPerson';
import FormAndReviewList from '../components/FormAndReviewList';

import {
  addKeyPerson,
  removeKeyPerson,
  updateApd as updateApdAction,
  updateBudget
} from '../actions/apd';

const ApdStateKeyPersonnel = ({
  addKeyPerson: addPerson,
  poc,
  removeKeyPerson: deletePerson,
  updateApd,
  updateBudget: dispatchBudget,
  years
}) => {
  const handleChange = useCallback((index, field, value, isExpense = false) => {
    updateApd({ keyPersonnel: { [index]: { [field]: value } } });
    if (isExpense) {
      dispatchBudget();
    }
  }, []);

  const handleYearChange = useCallback((index, year, value) => {
    updateApd({
      keyPersonnel: {
        [index]: { costs: { [year]: value } }
      }
    });
    dispatchBudget();
  }, []);

  return (
    <FormAndReviewList
      addButtonText="Add another person"
      list={poc}
      collapsed={ApdKeyPersonReview}
      expanded={ApdKeyPersonForm}
      onAddClick={addPerson}
      handleChange={handleChange}
      handleYearChange={handleYearChange}
      onDeleteClick={deletePerson}
      years={years}
    />
  );
};

ApdStateKeyPersonnel.propTypes = {
  addKeyPerson: PropTypes.func.isRequired,
  poc: PropTypes.array.isRequired,
  removeKeyPerson: PropTypes.func.isRequired,
  updateApd: PropTypes.func.isRequired,
  updateBudget: PropTypes.func.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = ({
  apd: {
    data: { keyPersonnel, years }
  }
}) => ({
  poc: keyPersonnel,
  years
});

const mapDispatchToProps = {
  addKeyPerson,
  removeKeyPerson,
  updateApd: updateApdAction,
  updateBudget
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdStateKeyPersonnel);

export { ApdStateKeyPersonnel as plain, mapStateToProps, mapDispatchToProps };
