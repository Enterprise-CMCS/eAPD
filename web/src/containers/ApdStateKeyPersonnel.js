import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { ApdKeyPersonForm, ApdKeyPersonReview } from './ApdKeyPerson';
import FormAndReviewList from '../components/FormAndReviewList';
import { selectApdYears, selectKeyPersonnel } from '../reducers/apd.selectors';

import { removeKeyPersonnel } from '../actions/editApd';
import { getKeyPersonnel } from '../reducers/apd';

const ApdStateKeyPersonnel = ({ remove, list, years }) => {

  const [localList, setLocalList] = useState(list);

  useEffect(() => {
    setLocalList(list)
  }, [list])

  const addClick = () => {
    const isPrimary = list.length === 0;
    const newListItem = getKeyPersonnel(years, isPrimary);
    setLocalList([...localList, newListItem]);
  };
  
  const onCancel = () => {
    setLocalList(list);
  };
    
  return (
    <FormAndReviewList
      addButtonText={
        list.length === 0 ? 'Add Primary Contact' : 'Add Key Personnel'
      }
      list={localList}
      collapsed={ApdKeyPersonReview}
      expanded={ApdKeyPersonForm}
      onAddClick={addClick}
      onCancelClick={onCancel}
      onDeleteClick={index => remove(index)}
      years={years}
    />
  );
};

ApdStateKeyPersonnel.propTypes = {
  remove: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  list: selectKeyPersonnel(state),
  years: selectApdYears(state)
});

const mapDispatchToProps = {
  remove: removeKeyPersonnel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdStateKeyPersonnel);

export { ApdStateKeyPersonnel as plain, mapStateToProps, mapDispatchToProps };
