import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  ContractorResourceForm,
  ContractorResourceReview
} from './ContractorResource';
import FormAndReviewList from '../../components/FormAndReviewList';

import {
  addContractor as addAction,
  removeContractor as removeAction
} from '../../actions/editActivity';

import { selectContractorsByActivityIndex } from '../../reducers/activities.selectors';

import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

const ContractorResources = ({
  activityIndex,
  addContractor,
  contractors,
  removeContractor
}) => {
  const handleAdd = () => {
    addContractor(activityIndex);
  };

  const handleDelete = key => {
    contractors.forEach(({ key: contractorKey }, i) => {
      if (contractorKey === key) {
        removeContractor(activityIndex, i);
      }
    });
  };

  return (
    <Subsection resource="activities.contractorResources" nested>
      <FormAndReviewList
        activityIndex={activityIndex}
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
  addContractor: PropTypes.func.isRequired,
  contractors: PropTypes.array.isRequired,
  removeContractor: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  contractors: selectContractorsByActivityIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  addContractor: addAction,
  removeContractor: removeAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorResources);
export { ContractorResources as plain, mapStateToProps, mapDispatchToProps };
