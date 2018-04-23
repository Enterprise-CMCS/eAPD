import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityContractorResource,
  removeActivityContractorResource,
  updateActivity as updateActivityAction
} from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Input, Textarea } from '../components/Inputs2';

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
      contractorResources: { [index]: { years: { [year]: +value } } }
    };
    updateActivity(activity.id, updates);
  };

  render() {
    const {
      activity: { id: activityID, contractorResources },
      years,
      addContractor,
      removeContractor
    } = this.props;

    return (
      <Collapsible title="Contractor Resources" open>
        <div>
          <div className="overflow-auto">
            <table
              className="mb2 h5 table table-condensed table-fixed"
              style={{ minWidth: 700 }}
            >
              <thead>
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-4">Name</th>
                  <th className="col-5">Description of Services</th>
                  <th className="col-4">Term Period</th>
                  {years.map(year => (
                    <th key={year} className="col-2">
                      {year} Cost
                    </th>
                  ))}
                  <th className="col-1" />
                </tr>
              </thead>
              <tbody>
                {contractorResources.map((contractor, i) => (
                  <tr key={contractor.idx}>
                    <td className="mono">{i + 1}.</td>
                    <td>
                      <Input
                        name={`contractor-${i}-name`}
                        label="Contractor's name"
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
                        label="Describe the services the contractor will provide"
                        rows="3"
                        hideLabel
                        spellCheck="true"
                        value={contractor.desc}
                        onChange={this.handleChange(i, 'desc')}
                      />
                    </td>
                    <td>
                      <div className="mb1 flex items-baseline h6">
                        <span className="mr-tiny w-3 right-align">Start:</span>
                        <Input
                          name={`contractor-${i}-start`}
                          label="Contractor term start"
                          hideLabel
                          type="date"
                          value={contractor.start}
                          onChange={this.handleChange(i, 'start')}
                        />
                      </div>
                      <div className="mb1 flex items-baseline h6">
                        <span className="mr-tiny w-3 right-align">End:</span>
                        <Input
                          name={`contractor-${i}-end`}
                          label="Contractor term end"
                          hideLabel
                          type="date"
                          value={contractor.end}
                          onChange={this.handleChange(i, 'end')}
                        />
                      </div>
                    </td>
                    {years.map(year => (
                      <td key={year}>
                        <Input
                          name={`contractor-${i}-cost-${year}`}
                          label={`Contractor cost for ${year}`}
                          hideLabel
                          type="number"
                          value={contractor.years[year]}
                          onChange={this.handleYearChange(i, year)}
                        />
                      </td>
                    ))}
                    <td className="center align-middle">
                      <button
                        type="button"
                        className="btn btn-outline border-silver px1 py-tiny"
                        title="Remove Contractor"
                        onClick={() =>
                          removeContractor(activityID, contractor.idx)
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
          Add contractor resource
        </button>
      </Collapsible>
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

const mapStateToProps = ({ activities: { byId } }, { aId }) => {
  const { contractorResources } = byId[aId];
  const contractorYears = contractorResources
    .reduce((years, e) => {
      years.push(...Object.keys(e.years));
      return years;
    }, [])
    .filter((y, i, a) => a.lastIndexOf(y) === i)
    .sort();

  return {
    activity: byId[aId],
    years: contractorYears
  };
};

const mapDispatchToProps = {
  addContractor: addActivityContractorResource,
  removeContractor: removeActivityContractorResource,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailContractorExpenses
);
