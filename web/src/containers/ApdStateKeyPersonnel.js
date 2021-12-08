import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ApdKeyPersonForm, ApdKeyPersonReview } from './ApdKeyPerson';
import { createKeyPerson, saveKeyPerson, editKeyPerson, removeKeyPerson } from '../actions/editApd';
import FormAndReviewList from '../components/FormAndReviewList';
import { selectApdYears, selectKeyPersonnel } from '../reducers/apd.selectors';

// Should we move this to a helper function since it's no longer
// connected to redux? It's just creating the boilerplate object
import { getKeyPersonnel } from '../reducers/apd';
// 1. try useRef
// 2. manage all of the state here

const ApdStateKeyPersonnel = ({ save, edit, poc, remove, years }) => {  
  return (
    <FormAndReviewList
      addButtonText={
        poc.length === 0 ? 'Add Primary Contact' : 'Add Key Personnel'
      }
      list={poc}
      collapsed={ApdKeyPersonReview}
      expanded={ApdKeyPersonForm}
      createNew={getKeyPersonnel}
      onSaveClick={() => save()}
      onDeleteClick={index => remove(index)}
      years={years}
    />
  );
};

ApdStateKeyPersonnel.propTypes = {
  create: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  poc: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  poc: selectKeyPersonnel(state),
  years: selectApdYears(state)
});

// Todo: Add an edit
const mapDispatchToProps = {
  save: saveKeyPerson,
  edit: editKeyPerson,
  remove: removeKeyPerson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdStateKeyPersonnel);

export { ApdStateKeyPersonnel as plain, mapStateToProps, mapDispatchToProps };
