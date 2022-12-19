import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ApdKeyPersonForm from './ApdKeyPersonForm';
import ApdKeyPersonReview from './ApdKeyPersonReview';
import FormAndReviewList from '../../../components/FormAndReviewList';
import {
  selectApdYears,
  selectKeyPersonnel,
  selectApdType
} from '../../../redux/selectors/apd.selectors';

import { removeKeyPersonnel } from '../../../redux/actions/editApd';
import { getKeyPersonnel } from '../../../redux/reducers/apd';

const ApdStateKeyPersonnel = ({ remove, list, years, apdType }) => {
  const [localList, setLocalList] = useState(list);

  useEffect(() => {
    setLocalList(list);
  }, [list]);

  const addClick = () => {
    const isPrimary = list.length === 0;
    const newListItem = getKeyPersonnel(years, isPrimary, apdType);
    console.log('newListItem', apdType);
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
      noDataMessage="Primary Point of Contact has not been added for this activity."
      years={years}
    />
  );
};

ApdStateKeyPersonnel.propTypes = {
  remove: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  apdType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  list: selectKeyPersonnel(state),
  years: selectApdYears(state),
  apdType: selectApdType(state)
});

const mapDispatchToProps = {
  remove: removeKeyPersonnel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdStateKeyPersonnel);

export { ApdStateKeyPersonnel as plain, mapStateToProps, mapDispatchToProps };
