import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { t } from '../../../../i18n';

import {
  ContractorResourceForm,
  ContractorResourceReview
} from './ContractorResource';
import FormAndReviewList from '../../../../components/FormAndReviewList';
import { Subsection } from '../../../../components/Section';

import { selectContractorsByActivityIndex } from '../../../../redux/selectors/activities.selectors';
import {
  selectApdYears,
  selectApdType
} from '../../../../redux/selectors/apd.selectors';

import { removeContractor as removeAction } from '../../../../redux/actions/editActivity';
import { newContractor } from '../../../../redux/reducers/activities';

const ContractorResources = ({
  activityIndex,
  list,
  removeContractor,
  years,
  apdType
}) => {
  const [localList, setLocalList] = useState(list);

  useEffect(() => {
    setLocalList(list);
  }, [list]);

  const addClick = () => {
    const newListItem = newContractor(years);
    setLocalList([...localList, newListItem]);
  };

  const onCancel = () => {
    setLocalList(list);
  };

  const handleDelete = index => {
    removeContractor(activityIndex, index);
  };
  return (
    <Subsection
      resource={`activities.contractorResources.${apdType}`}
      id={`activity-contractor-costs-${activityIndex}`}
    >
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText="Add Contractor"
        list={localList}
        collapsed={ContractorResourceReview}
        expanded={ContractorResourceForm}
        noDataMessage={t('activities.contractorResources.noDataNotice')}
        onAddClick={addClick}
        onCancelClick={onCancel}
        onDeleteClick={handleDelete}
        allowDeleteAll
      />
    </Subsection>
  );
};

ContractorResources.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  removeContractor: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  apdType: PropTypes.string.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  list: selectContractorsByActivityIndex(state, { activityIndex }),
  years: selectApdYears(state),
  apdType: selectApdType(state)
});

const mapDispatchToProps = {
  removeContractor: removeAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorResources);
export { ContractorResources as plain, mapStateToProps, mapDispatchToProps };
