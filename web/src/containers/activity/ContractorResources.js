import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityContractor,
  removeActivityContractor,
  toggleActivityContractorHourly,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import Form from './ContractorResourcesForm';

class ContractorResources extends Component {
  state = {
    initialContractorKeys: []
  };

  constructor(props) {
    super(props);

    this.state.initialContractorKeys = props.contractors.map(c => c.key);
  }

  getDeleter = entryKey => () => {
    const { activityKey, removeContractor } = this.props;
    removeContractor(activityKey, entryKey);
  };

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

  handleDelete = contractor => this.getDeleter(contractor.key)();

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
    const { contractors, years } = this.props;
    const { initialContractorKeys } = this.state;

    if (!contractors) return null;

    return (
      <Subsection resource="activities.contractorResources" nested>
        {contractors.length === 0 ? (
          <NoDataMsg>
            {t('activities.contractorResources.noDataNotice')}
          </NoDataMsg>
        ) : (
          contractors.map((contractor, i) => (
            <div key={contractor.key} className="ds-u-border-y--1">
              <Form
                idx={i}
                contractor={contractor}
                years={years}
                handleChange={this.handleChange}
                handleDelete={this.getDeleter(contractor.key)}
                handleHourlyChange={this.handleHourlyChange}
                handleTermChange={this.handleTermChange}
                handleUseHourly={this.handleUseHourly}
                handleYearChange={this.handleYearChange}
                initialCollapsed={
                  initialContractorKeys.indexOf(contractor.key) >= 0
                }
              />
            </div>
          ))
        )}
        <Button
          className="ds-u-margin-top--2 visibility--screen"
          onClick={this.handleAdd}
        >
          Add another contractor
        </Button>
      </Subsection>
    );
  }
}

ContractorResources.propTypes = {
  activityKey: PropTypes.string.isRequired,
  contractors: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  addContractor: PropTypes.func.isRequired,
  removeContractor: PropTypes.func.isRequired,
  toggleContractorHourly: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byKey }, apd }, { aKey }) => ({
  activityKey: aKey,
  contractors: byKey[aKey].contractorResources,
  years: apd.data.years
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
