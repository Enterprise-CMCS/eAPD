import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityExpense,
  removeActivityExpense,
  updateActivity as updateActivityAction
} from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Input, Textarea } from '../components/Inputs';
import Select from '../components/Select';

class ActivityDetailExpenses extends Component {
  handleChange = (index, key) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { expenses: { [index]: { [key]: value } } };
    updateActivity(activity.id, updates);
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { expenses: { [index]: { years: { [year]: +value } } } };
    updateActivity(activity.id, updates);
  };

  render() {
    const {
      activity: { id: activityID, expenses },
      years,
      addExpense,
      removeExpense
    } = this.props;

    return (
      <Collapsible title="Expenses">
        <p>Tell us about your expenses.</p>
        <div className="overflow-auto">
          <table
            className="mb2 h5 table table-condensed table-fixed"
            style={{ minWidth: 700 }}
          >
            <thead>
              <tr>
                <th className="col-1">#</th>
                <th className="col-3">Category</th>
                <th className="col-4">Description</th>
                {years.map(year => (
                  <th key={year} className="col-2">
                    {year} Cost
                  </th>
                ))}
                <th className="col-1" />
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, i) => (
                <tr key={expense.id}>
                  <td className="mono">{i + 1}.</td>
                  <td>
                    <Select
                      name={`expense-${i}-desc`}
                      options={[
                        'Hardware, software, and licensing',
                        'Equipment and supplies',
                        'Training and outreach',
                        'Travel',
                        'Administrative operations',
                        'Miscellaneous expenses for the project'
                      ]}
                      label="Expense category"
                      hideLabel
                      value={expense.category}
                      onChange={this.handleChange(i, 'category')}
                    />
                  </td>
                  <td>
                    <Textarea
                      name={`expense-${i}-desc`}
                      label="Describe the expense"
                      hideLabel
                      rows="3"
                      value={expense.desc}
                      onChange={this.handleChange(i, 'desc')}
                    />
                  </td>
                  {years.map(year => (
                    <td key={year}>
                      <Input
                        name={`expense-${i}-${year}-cost`}
                        label={`Cost for ${year}`}
                        hideLabel
                        type="number"
                        value={expense.years[year]}
                        onChange={this.handleYearChange(i, year)}
                      />
                    </td>
                  ))}
                  <td className="center">
                    <button
                      type="button"
                      className="btn btn-outline border-silver px1 py-tiny mt-tiny"
                      title="Remove Expense"
                      onClick={() => removeExpense(activityID, expense.id)}
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
          Add expense
        </button>
      </Collapsible>
    );
  }
}

ActivityDetailExpenses.propTypes = {
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
  ActivityDetailExpenses
);
