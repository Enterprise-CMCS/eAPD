import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addActivityExpense,
  removeActivityExpense,
  updateActivity as updateActivityAction
} from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Input, Textarea } from '../components/Inputs2';

class ActivityDetailStatePersonnel extends Component {
  handleChange = (index, key) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { statePersonnel: { [index]: { [key]: value } } };
    updateActivity(activity.id, updates);
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = {
      statePersonnel: { [index]: { years: { [year]: +value } } }
    };
    updateActivity(activity.id, updates);
  };

  render() {
    const {
      activity: { id: activityID, statePersonnel },
      addExpense,
      removeExpense
    } = this.props;

    const years = ['2018', '2019'];

    return (
      <Collapsible title="State Personnel" open>
        <p>Tell us about your state personnel.</p>
        <div className="overflow-auto">
          <table
            className="mb2 h5 table table-condensed table-fixed"
            style={{ minWidth: 700 }}
          >
            <thead>
              <tr>
                <th className="col-1" />
                <th className="col-4" />
                <th className="col-5" />
                {years.map(year => (
                  <th key={year} className="col-4" colSpan="2">
                    {year} Cost
                  </th>
                ))}
                <th className="col-1" />
              </tr>
              <tr>
                <th className="col-1">#</th>
                <th className="col-4">Title</th>
                <th className="col-5">Description</th>
                {years.map(year => (
                  <Fragment key={year}>
                    <th>Amount</th>
                    <th>% FTE</th>
                  </Fragment>
                ))}
                <th className="col-1" />
              </tr>
            </thead>
            <tbody>
              {statePersonnel.map((d, i) => (
                <tr key={i}>
                  <td className="mono">{i + 1}.</td>
                  <td>
                    <Input
                      name={`state-person-${d.id}-title`}
                      label="Title"
                      hideLabel
                      value={d.title}
                      onChange={this.handleChange(i, 'title')}
                    />
                  </td>
                  <td>
                    <Textarea
                      name={`state-person-${d.id}-desc`}
                      label="Description"
                      hideLabel
                      rows="3"
                      value={d.desc}
                      onChange={this.handleChange(i, 'desc')}
                    />
                  </td>
                  {years.map(year => (
                    <Fragment key={year}>
                      <td>
                        <input type="text" className="m0 input" />
                      </td>
                      <td>
                        <input type="text" className="m0 input" />
                      </td>
                    </Fragment>
                  ))}
                  <td className="center">
                    <button
                      type="button"
                      className="btn btn-outline border-silver px1 py-tiny mt-tiny"
                      title="Remove personnel"
                      onClick={() => {}}
                    >
                      ✗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="btn btn-primary bg-black"
          onClick={() => addExpense(activityID)}
        >
          Add personnel
        </button>
      </Collapsible>
    );
  }
}

ActivityDetailStatePersonnel.propTypes = {
  activity: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  addExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => {
  const { expenses } = byId[aId];
  const expenseYears = expenses
    .reduce((years, e) => {
      years.push(...Object.keys(e.years));
      return years;
    }, [])
    .filter((y, i, a) => a.lastIndexOf(y) === i)
    .sort();

  return {
    activity: byId[aId],
    years: expenseYears
  };
};

const mapDispatchToProps = {
  addExpense: addActivityExpense,
  removeExpense: removeActivityExpense,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailStatePersonnel
);
