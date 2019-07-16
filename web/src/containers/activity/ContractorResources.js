import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  ContractorResourceForm,
  ContractorResourceReview
} from './ContractorResource';
import FormAndReviewList from '../../components/FormAndReviewList';

import {
  addActivityContractor,
  removeActivityContractor,
  toggleActivityContractorHourly,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

class ContractorResources extends Component {
  handleAdd = () => {
    const { activityKey, addContractor } = this.props;
    addContractor(activityKey);
  };

  handleChange = (index, field) => e => {
    const { value } = e.target;
    const { activityKey, updateActivity } = this.props;

    const updates = { contractorResources: { [index]: { [field]: value } } };
    updateActivity(activityKey, updates);
  };

  handleDelete = key => {
    const { activityKey, removeContractor } = this.props;
    removeContractor(activityKey, key);
  };

  handleHourlyChange = (index, year, field) => e => {
    const value = +e.target.value;

    const { activityKey, contractors, updateActivity } = this.props;
    const { data: hourlyData } = contractors[index].hourly;

    const otherField = field === 'hours' ? 'rate' : 'hours';
    const otherVal = hourlyData[year][otherField];
    const totalCost = (value || 0) * (otherVal || 0);

    const newData = {
      years: { [year]: totalCost },
      hourly: { data: { [year]: { [field]: value } } }
    };

    const updates = { contractorResources: { [index]: newData } };
    updateActivity(activityKey, updates, true);
  };

  handleTermChange = index => ({ start, end }) => {
    const { activityKey, updateActivity } = this.props;
    const dates = { start, end };

    const updates = { contractorResources: { [index]: dates } };
    updateActivity(activityKey, updates);
  };

  handleUseHourly = (contractorKey, useHourly) => () => {
    const { activityKey, toggleContractorHourly } = this.props;
    toggleContractorHourly(activityKey, contractorKey, useHourly);
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { activityKey, updateActivity } = this.props;

    const updates = {
      contractorResources: { [index]: { years: { [year]: value } } }
    };
    updateActivity(activityKey, updates, true);
  };

  render() {
    const { contractors } = this.props;

    return (
      <Subsection resource="activities.contractorResources" nested>
        <FormAndReviewList
          addButtonText="Add another contractor"
          list={contractors}
          collapsed={ContractorResourceReview}
          expanded={ContractorResourceForm}
          noDataMessage={t('activities.contractorResources.noDataNotice')}
          onAddClick={this.handleAdd}
          onDeleteClick={this.handleDelete}
          handleChange={this.handleChange}
          handleHourlyChange={this.handleHourlyChange}
          handleTermChange={this.handleTermChange}
          handleUseHourly={this.handleUseHourly}
          handleYearChange={this.handleYearChange}
          headingLevel={6}
        />
      </Subsection>
    );
  }
}

ContractorResources.propTypes = {
  activityKey: PropTypes.string.isRequired,
  contractors: PropTypes.array.isRequired,
  addContractor: PropTypes.func.isRequired,
  removeContractor: PropTypes.func.isRequired,
  toggleContractorHourly: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byKey } }, { aKey }) => ({
  activityKey: aKey,
  contractors: byKey[aKey].contractorResources
});

export const mapDispatchToProps = {
  addContractor: addActivityContractor,
  removeContractor: removeActivityContractor,
  toggleContractorHourly: toggleActivityContractorHourly,
  updateActivity: updateActivityAction
};

export { ContractorResources as plain };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorResources);
