import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApdKeyPersonForm, ApdKeyPersonReview } from './ApdKeyPerson';
import { addKeyPerson, removeKeyPerson } from '../actions/editApd';
import FormAndReviewList from '../components/FormAndReviewList';

const ApdStateKeyPersonnel = () => {
  const dispatch = useDispatch();

  const { poc, years } = useSelector(
    ({
      apd: {
        data: { keyPersonnel, years: yearsFromAPD }
      }
    }) => ({
      poc: keyPersonnel,
      years: yearsFromAPD
    })
  );

  const deletePerson = key => {
    const index = poc.findIndex(p => p.key === key);
    if (index >= 0) {
      dispatch(removeKeyPerson(index));
    }
  };

  return (
    <FormAndReviewList
      addButtonText="Add another person"
      list={poc}
      collapsed={ApdKeyPersonReview}
      expanded={ApdKeyPersonForm}
      onAddClick={() => dispatch(addKeyPerson())}
      onDeleteClick={deletePerson}
      years={years}
    />
  );
};

export default ApdStateKeyPersonnel;

export { ApdStateKeyPersonnel as plain };
