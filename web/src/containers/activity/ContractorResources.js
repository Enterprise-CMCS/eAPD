import PropTypes from 'prop-types';
import React from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  ContractorResourceForm,
  ContractorResourceReview
} from './ContractorResource';
import FormAndReviewList from '../../components/FormAndReviewList';

import { addContractor, removeContractor } from '../../actions/editActivity';

import { selectContractorsByActivityIndex } from '../../reducers/activities.selectors';

import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

const ContractorResources = ({ activityIndex, contractors }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addContractor(activityIndex));
  };

  const handleDelete = key => {
    contractors.forEach(({ key: contractorKey }, i) => {
      if (contractorKey === key) {
        dispatch(removeContractor(activityIndex, i));
      }
    });
  };

  return (
    <Subsection resource="activities.contractorResources" nested>
      <FormAndReviewList
        addButtonText="Add another contractor"
        list={contractors}
        collapsed={ContractorResourceReview}
        expanded={ContractorResourceForm}
        noDataMessage={t('activities.contractorResources.noDataNotice')}
        onAddClick={handleAdd}
        onDeleteClick={handleDelete}
      />
    </Subsection>
  );
};

ContractorResources.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  contractors: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  contractors: selectContractorsByActivityIndex(state, ownProps)
});

export default connect(mapStateToProps)(ContractorResources);
