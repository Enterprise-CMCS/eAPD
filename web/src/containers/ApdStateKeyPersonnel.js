import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ApdKeyPersonForm, ApdKeyPersonReview } from './ApdKeyPerson';
import { addKeyPerson, removeKeyPerson } from '../actions/editApd';
import FormAndReviewList from '../components/FormAndReviewList';
import { selectApdYears, selectKeyPersonnel } from '../reducers/apd.selectors';

const ApdStateKeyPersonnel = ({ add, poc, remove, years }) => {
  const deletePerson = key => {
    const index = poc.findIndex(p => p.key === key);
    if (index >= 0) {
      remove(index);
    }
  };

  return (
    <FormAndReviewList
      addButtonText="Add another person"
      list={poc}
      collapsed={ApdKeyPersonReview}
      expanded={ApdKeyPersonForm}
      onAddClick={() => add()}
      onDeleteClick={deletePerson}
      years={years}
    />
  );
};

ApdStateKeyPersonnel.propTypes = {
  add: PropTypes.func.isRequired,
  poc: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  poc: selectKeyPersonnel(state),
  years: selectApdYears(state)
});

const mapDispatchToProps = {
  add: addKeyPerson,
  remove: removeKeyPerson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdStateKeyPersonnel);

export { ApdStateKeyPersonnel as plain, mapStateToProps, mapDispatchToProps };
