import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addActivityExpense,
  removeActivityExpense,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import CollapsibleList from '../../components/CollapsibleList';
import NoDataMsg from '../../components/NoDataMsg';
import { DollarInput, Textarea } from '../../components/Inputs';
import Instruction from '../../components/Instruction';
import Label from '../../components/Label';
import Select from '../../components/Select';
import { t } from '../../i18n';
import { formatMoney } from '../../util/formats';

const EXPENSE_CATEGORIES = [
  'Hardware, software, and licensing',
  'Equipment and supplies',
  'Training and outreach',
  'Travel',
  'Administrative operations',
  'Miscellaneous expenses for the project'
];

const ExpenseForm = ({
  expense,
  idx,
  years,
  handleChange,
  handleYearChange,
  handleDelete
}) => (
  <div className="mt2 mb3">
    <Btn
      kind="outline"
      extraCss="right px-tiny py0 h5 xs-hide"
      onClick={handleDelete}
    >
      ✗
    </Btn>
    <div className="mb3 md-flex">
      <Label>Category</Label>
      <Select
        name={`expense-${expense.key}-category`}
        options={EXPENSE_CATEGORIES}
        label="Expense category"
        hideLabel
        value={expense.category}
        onChange={handleChange(idx, 'category')}
        wrapperClass="md-col-6"
      />
    </div>
    <div className="mb3 md-flex">
      <Label>Description</Label>
      <Textarea
        name={`expense-${expense.key}-desc`}
        label="Describe the expense"
        hideLabel
        rows="7"
        value={expense.desc}
        onChange={handleChange(idx, 'desc')}
        wrapperClass="md-col-6"
        className="m0 textarea textarea-m"
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
          onChange={handleYearChange(idx, year)}
          wrapperClass="md-col-3"
        />
      </div>
    ))}
  </div>
);

ExpenseForm.propTypes = {
  expense: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleYearChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

class Expenses extends Component {
  getDeleter = expenseKey => () => {
    const { activityKey, removeExpense } = this.props;
    removeExpense(activityKey, expenseKey);
  };

  handleChange = (index, field) => e => {
    const { value } = e.target;
    const { activityKey, updateActivity } = this.props;

    const updates = { expenses: { [index]: { [field]: value } } };
    updateActivity(activityKey, updates);
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { activityKey, updateActivity } = this.props;

    const updates = { expenses: { [index]: { years: { [year]: value } } } };
    updateActivity(activityKey, updates, true);
  };

  handleAdd = () => {
    const { activityKey, addExpense } = this.props;
    addExpense(activityKey);
  };

  handleDelete = expense => this.getDeleter(expense.key)();

  render() {
    const { expenses, years } = this.props;

    return (
      <Fragment>
        <Instruction source="activities.expenses.instruction" />
        {expenses.length === 0 ? (
          <NoDataMsg>{t('activities.expenses.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            <CollapsibleList
              items={expenses}
              getKey={expense => expense.key}
              deleteItem={this.handleDelete}
              header={(expense, i) => (
                <Fragment>
                  <div className="col-3 truncate">
                    {i + 1}. <strong>{expense.category || 'Category'}</strong>
                  </div>
                  {years.map(year => (
                    <div key={year} className="col-2 truncate">
                      {year}:{' '}
                      <span className="bold mono">
                        {formatMoney(expense.years[year])}
                      </span>
                    </div>
                  ))}
                </Fragment>
              )}
              content={(expense, i) => (
                <ExpenseForm
                  expense={expense}
                  idx={i}
                  years={years}
                  handleChange={this.handleChange}
                  handleYearChange={this.handleYearChange}
                  handleDelete={this.getDeleter(expense.key)}
                />
              )}
            />
          </div>
        )}
        <Btn onClick={this.handleAdd}>Add expense</Btn>
      </Fragment>
    );
  }
}

Expenses.propTypes = {
  activityKey: PropTypes.string.isRequired,
  expenses: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  addExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byKey }, apd }, { aKey }) => ({
  activityKey: aKey,
  expenses: byKey[aKey].expenses,
  years: apd.data.years
});

const mapDispatchToProps = {
  addExpense: addActivityExpense,
  removeExpense: removeActivityExpense,
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expenses);
