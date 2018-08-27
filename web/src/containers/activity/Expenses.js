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
import { arrToObj } from '../../util';
import { formatMoney } from '../../util/formats';

const EXPENSE_CATEGORIES = [
  'Hardware, software, and licensing',
  'Equipment and supplies',
  'Training and outreach',
  'Travel',
  'Administrative operations',
  'Miscellaneous expenses for the project'
];

const ExpenseEntry = ({ expense, idx, years, handleDelete, toggleForm }) => (
  <div className="mb1 h5 flex justify-between">
    <button
      type="button"
      onClick={toggleForm}
      className="btn btn-no-focus p1 col-12 left-align bg-blue-light rounded-left"
    >
      <div className="flex items-center justify-between">
        <div className="col-5 truncate">
          {idx + 1}. <strong>{expense.category}</strong>
        </div>
        {years.map(year => (
          <div key={year} className="col-2 truncate">
            {year}:{' '}
            <span className="bold mono">
              {formatMoney(expense.years[year])}
            </span>
          </div>
        ))}
      </div>
    </button>
    <button
      type="button"
      onClick={handleDelete}
      className="btn btn-no-focus p1 bg-blue-light rounded-right"
    >
      ✗
    </button>
  </div>
);

ExpenseEntry.propTypes = {
  expense: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired
};

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
        rows="3"
        value={expense.desc}
        onChange={handleChange(idx, 'desc')}
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
  static getDerivedStateFromProps(props, state) {
    const { expenses: data } = props;
    const lastKey = data.length ? data[data.length - 1].key : null;

    if (lastKey && !(lastKey in state.showForm)) {
      return {
        showForm: {
          ...arrToObj(Object.keys(state.showForm), false),
          [lastKey]: true
        }
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    const expenseKeys = props.expenses.map(e => e.key);

    const showForm = expenseKeys.reduce(
      (obj, key, i) => ({ ...obj, [key]: i === 0 }),
      {}
    );

    this.state = { showForm };
  }

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

  handleDelete = expenseKey => () => {
    const { activityKey, removeExpense } = this.props;
    removeExpense(activityKey, expenseKey);
  };

  toggleForm = expenseKey => () => {
    this.setState(prev => ({
      showForm: {
        ...prev.showForm,
        [expenseKey]: !prev.showForm[expenseKey]
      }
    }));
  };

  render() {
    const { expenses, years } = this.props;
    const { showForm } = this.state;

    return (
      <Subsection resource="activities.expenses" nested>
        {expenses.length === 0 ? (
          <NoDataMsg>{t('activities.expenses.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            {expenses.map((expense, i) => (
              <div key={expense.key}>
                <ExpenseEntry
                  expense={expense}
                  idx={i}
                  years={years}
                  handleDelete={this.handleDelete(expense.key)}
                  toggleForm={this.toggleForm(expense.key)}
                />
                {showForm[expense.key] && (
                  <ExpenseForm
                    expense={expense}
                    idx={i}
                    years={years}
                    handleChange={this.handleChange}
                    handleYearChange={this.handleYearChange}
                    handleDelete={this.handleDelete(expense.key)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <Btn onClick={this.handleAdd}>Add expense</Btn>
      </Subsection>
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

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
