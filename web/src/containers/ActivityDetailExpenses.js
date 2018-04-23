import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityExpense,
  updateActivity as updateActivityAction
} from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Textarea } from '../components/Inputs2';

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
    const { activity: { expenses }, years } = this.props;

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
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, i) => (
                <tr key={`expense-${i}`}>
                  <td className="mono">{i + 1}.</td>
                  <td>
                    <select
                      className="m0 select"
                      value={expense.category}
                      onChange={this.handleChange(i, 'category')}
                    >
                      <option>Expense A</option>
                      <option>Expense B</option>
                      <option>Expense C</option>
                      <option>Other</option>
                    </select>
                  </td>
                  <td>
                    <Textarea
                      id={`expense-${i}-desc`}
                      name={`expense-${i}-desc`}
                      label="Describe the expense"
                      rows="3"
                      spellCheck="true"
                      value={expense.desc}
                      onChange={this.handleChange(i, 'desc')}
                    />
                  </td>
                  {years.map(year => (
                    <td key={year}>
                      <input
                        type="number"
                        className="m0 input"
                        value={expense.years[year]}
                        onChange={this.handleYearChange(i, year)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Collapsible>
    );
  }
}

ActivityDetailExpenses.propTypes = {
  activity: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  addActivityExpense: PropTypes.object.isRequired,
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
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailExpenses
);
