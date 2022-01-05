import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ApdKeyPersonForm, ApdKeyPersonReview } from './ApdKeyPerson';
import { createKeyPerson, saveKeyPerson, removeKeyPerson } from '../actions/editApd';
import FormAndReviewList from '../components/FormAndReviewList';
import { selectApdYears, selectKeyPersonnel } from '../reducers/apd.selectors';

const ApdStateKeyPersonnel = ({ create, save, remove, poc, years }) => {
  return (
    <FormAndReviewList
      addButtonText={
        poc.length === 0 ? 'Add Primary Contact' : 'Add Key Personnel'
      }
      list={poc}
      collapsed={ApdKeyPersonReview}
      expanded={ApdKeyPersonForm}
      createNew={createKeyPerson}
      onSaveClick={(index, data) => save(index, data)}
      onDeleteClick={index => remove(index)}
      years={years}
    />
  );
};

ApdStateKeyPersonnel.propTypes = {
  create: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  poc: PropTypes.arrayOf(PropTypes.object).isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  poc: selectKeyPersonnel(state),
  years: selectApdYears(state)
});

const mapDispatchToProps = {
  create: createKeyPerson,
  save: saveKeyPerson,
  remove: removeKeyPerson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdStateKeyPersonnel);

export { ApdStateKeyPersonnel as plain, mapStateToProps, mapDispatchToProps };
