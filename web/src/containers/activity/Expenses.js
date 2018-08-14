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
import Label from '../../components/Label';
import { Subsection } from '../../components/Section';
import Select from '../../components/Select';
import { t } from '../../i18n';

const EXPENSE_CATEGORIES = [
  'Hardware, software, and licensing',
  'Equipment and supplies',
  'Training and outreach',
  'Travel',
  'Administrative operations',
  'Miscellaneous expenses for the project'
];

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
          <div className="mt3 pt3 border-top border-grey">
            {expenses.map((expense, i) => (
              <div
                key={expense.key}
                className="mb3 pb3 border-bottom border-grey relative"
              >
                <div className="mb3 md-flex">
                  <Label>Category</Label>
                  <Select
                    name={`expense-${expense.key}-category`}
                    options={EXPENSE_CATEGORIES}
                    label="Expense category"
                    hideLabel
                    value={expense.category}
                    onChange={this.handleChange(i, 'category')}
                    wrapperClass="md-col-6"
                  />
                </div>
                <div className="mb3 md-flex">
                  <Label>Description</Label>
                  <Textarea
                    name={`expense-${expense.key}-desc`}
                    label="Describe the expense"
                    hideLabel
                    rows="3"
                    value={expense.desc}
                    onChange={this.handleChange(i, 'desc')}
                    wrapperClass="md-col-6"
                  />
                </div>
                {years.map(year => (
                  <div key={year} className="mb3 md-flex">
                    <Label>{year} Cost</Label>
                    <DollarInput
                      name={`expense-${expense.key}-${year}-cost`}
                      label={`Cost for ${year}`}
                      hideLabel
                      value={expense.years[year]}
                      onChange={this.handleYearChange(i, year)}
                      wrapperClass="md-col-3"
                    />
                  </div>
                ))}
                <div>
                  <Btn
                    kind="outline"
                    extraCss="px1 py-tiny h5"
                    onClick={() => removeExpense(activityKey, expense.key)}
                  >
                    Remove expense
                  </Btn>
                </div>
              </div>
            ))}
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
