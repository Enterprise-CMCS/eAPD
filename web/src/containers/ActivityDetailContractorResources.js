import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import {
  addActivityContractor,
  removeActivityContractor,
  updateActivity as updateActivityAction
} from '../actions/activities';
import { Subsection } from '../components/Section';
import { Input, DollarInput, Textarea } from '../components/Inputs';
import { isProgamAdmin } from '../util';

class ActivityDetailContractorExpenses extends Component {
  handleChange = (index, key) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { contractorResources: { [index]: { [key]: value } } };
    updateActivity(activity.id, updates);
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = {
      contractorResources: { [index]: { years: { [year]: value } } }
    };
    updateActivity(activity.id, updates, true);
  };

  render() {
    const { activity, years, addContractor, removeContractor } = this.props;
    const { id: activityID, contractorResources } = activity;

    return (
      <Subsection
        resource="activities.contractorResources"
        isKey={isProgamAdmin(activity)}
      >
        <div>
          <div className="overflow-auto">
            <table
              className="mb2 h5 table table-condensed table-fixed"
              style={{ minWidth: 700 }}
            >
              <thead>
                <tr>
                  <th className="col-1">
                    {t('activities.contractorResources.labels.entryNumber')}
                  </th>
                  <th className="col-4">
                    {t('activities.contractorResources.labels.contractorName')}
                  </th>
                  <th className="col-5">
                    {t('activities.contractorResources.labels.description')}
                  </th>
                  <th className="col-4">
                    {t('activities.contractorResources.labels.term')}
                  </th>
                  {years.map(year => (
                    <th key={year} className="col-2">
                      {t('activities.contractorResources.labels.yearCost', {
                        year
                      })}
                    </th>
                  ))}
                  <th className="col-1" />
                </tr>
              </thead>
              <tbody>
                {contractorResources.map((contractor, i) => (
                  <tr key={contractor.id}>
                    <td className="mono">{i + 1}.</td>
                    <td>
                      <Input
                        name={`contractor-${i}-name`}
                        label={t(
                          'activities.contractorResources.srLabels.name'
                        )}
                        hideLabel
                        type="text"
                        value={contractor.name}
                        onChange={this.handleChange(i, 'name')}
                      />
                    </td>
                    <td>
                      <Textarea
                        id={`contractor-${i}-desc`}
                        name={`contractor-${i}-desc`}
                        label={t(
                          'activities.contractorResources.srLabels.description'
                        )}
                        rows="3"
                        hideLabel
                        spellCheck="true"
                        value={contractor.desc}
                        onChange={this.handleChange(i, 'desc')}
                      />
                    </td>
                    <td>
                      <div className="mb1 flex items-baseline h6">
                        <span className="mr-tiny w-3 right-align">
                          {t('activities.contractorResources.labels.start')}
                        </span>
                        <Input
                          type="date"
                          name={`contractor-${i}-start`}
                          label={t(
                            'activities.contractorResources.srLabels.start'
                          )}
                          hideLabel
                          wrapperClass="mb1 flex-auto"
                          value={contractor.start}
                          onChange={this.handleChange(i, 'start')}
                        />
                      </div>
                      <div className="mb1 flex items-baseline h6">
                        <span className="mr-tiny w-3 right-align">
                          {t('activities.contractorResources.labels.end')}
                        </span>
                        <Input
                          type="date"
                          name={`contractor-${i}-end`}
                          label={t(
                            'activities.contractorResources.srLabels.end'
                          )}
                          hideLabel
                          wrapperClass="mb1 flex-auto"
                          value={contractor.end}
                          onChange={this.handleChange(i, 'end')}
                        />
                      </div>
                    </td>
                    {years.map(year => (
                      <td key={year}>
                        <DollarInput
                          name={`contractor-${i}-cost-${year}`}
                          label={t(
                            'activities.contractorResources.srLabels.cost',
                            { year }
                          )}
                          hideLabel
                          value={contractor.years[year]}
                          onChange={this.handleYearChange(i, year)}
                        />
                      </td>
                    ))}
                    <td className="center">
                      <button
                        type="button"
                        className="btn btn-outline border-silver px1 py-tiny mt-tiny"
                        title={t('activities.contractorResources.removeLabel')}
                        onClick={() =>
                          removeContractor(activityID, contractor.id)
                        }
                      >
                        ✗
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary bg-black"
          onClick={() => addContractor(activityID)}
        >
          {t('activities.contractorResources.addContractorButtonText')}
        </button>
      </Subsection>
    );
  }
}

ActivityDetailContractorExpenses.propTypes = {
  activity: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  addContractor: PropTypes.func.isRequired,
  removeContractor: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byId }, apd }, { aId }) => ({
  activity: byId[aId],
  years: apd.data.years
});

export const mapDispatchToProps = {
  addContractor: addActivityContractor,
  removeContractor: removeActivityContractor,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailContractorExpenses
);

export const raw = ActivityDetailContractorExpenses;
