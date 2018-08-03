import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityExpense,
  removeActivityExpense,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import NoDataMsg from '../../components/NoDataMsg';
import { DollarInput, Textarea } from '../../components/Inputs';
import { Subsection } from '../../components/Section';
import Select from '../../components/Select';
import { t } from '../../i18n';

class Expenses extends Component {
  handleChange = (index, field) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { expenses: { [index]: { [field]: value } } };
    updateActivity(activity.key, updates);
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { expenses: { [index]: { years: { [year]: value } } } };
    updateActivity(activity.key, updates, true);
  };

  render() {
    const { activity, years, addExpense, removeExpense } = this.props;
    const { key: activityKey, expenses } = activity;

    return (
      <Subsection resource="activities.expenses" nested>
        {expenses.length === 0 ? (
          <NoDataMsg>{t('activities.expenses.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="overflow-auto">
            <table className="mb2 h5 table table-condensed table-fixed">
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
                  <tr key={expense.key}>
                    <td className="mono">{i + 1}.</td>
                    <td>
                      <Select
                        name={`expense-${expense.key}-category`}
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
                        name={`expense-${expense.key}-desc`}
                        label="Describe the expense"
                        hideLabel
                        rows="3"
                        value={expense.desc}
                        onChange={this.handleChange(i, 'desc')}
                      />
                    </td>
                    {years.map(year => (
                      <td key={year}>
                        <DollarInput
                          name={`expense-${expense.key}-${year}-cost`}
                          label={`Cost for ${year}`}
                          hideLabel
                          value={expense.years[year]}
                          onChange={this.handleYearChange(i, year)}
                        />
                      </td>
                    ))}
                    <td className="center">
                      <Btn
                        kind="outline"
                        extraCss="px1 py-tiny mt-tiny"
                        onClick={() => removeExpense(activityKey, expense.key)}
                      >
                        ✗
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Btn onClick={() => addExpense(activityKey)}>Add expense</Btn>
      </Subsection>
    );
  }
}

Expenses.propTypes = {
  activity: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  addExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byKey }, apd }, { aKey }) => ({
  activity: byKey[aKey],
  years: apd.data.years
});

const mapDispatchToProps = {
  addExpense: addActivityExpense,
  removeExpense: removeActivityExpense,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
