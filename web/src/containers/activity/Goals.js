import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityGoal as addActivityGoalAction,
  removeActivityGoal as removeActivityGoalAction,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import { RichText } from '../../components/Inputs';
import MiniHeader from '../../components/MiniHeader';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection, SubsectionChunk } from '../../components/Section';
import { arrToObj } from '../../util';
import { t } from '../../i18n';

const plaintext = txt => {
  const e = document.createElement('div');
  e.innerHTML = txt;
  return e.innerText;
};

const GoalForm = ({ goal, idx, handleChange, handleDelete }) => (
  <div className="mt2 mb3">
    <Btn
      kind="outline"
      extraCss="right px-tiny py0 h5 xs-hide"
      onClick={handleDelete}
    >
      ✗
    </Btn>

    <SubsectionChunk resource="activities.goals.goal">
      <div className="mb3">
        {t('activities.goals.goal.title', { number: idx + 1 })}
        <RichText
          content={goal.description}
          onSync={handleChange(idx, 'description')}
        />
      </div>
    </SubsectionChunk>

    <SubsectionChunk resource="activities.goals.objective">
      <div className="mb3">
        {t('activities.goals.objective.title')}
        <RichText
          content={goal.objective}
          onSync={handleChange(idx, 'objective')}
        />
      </div>
    </SubsectionChunk>
  </div>
);

GoalForm.propTypes = {
  goal: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

class Goals extends Component {
  static getDerivedStateFromProps(props, state) {
    const { goals: data } = props;
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

    const goalKeys = props.goals.map(e => e.key);

    const showForm = goalKeys.reduce(
      (obj, key, i) => ({ ...obj, [key]: i === 0 }),
      {}
    );

    this.state = { showForm };
  }

  handleSync = (index, field) => html => {
    const { activityKey, updateActivity } = this.props;
    const updates = { goals: { [index]: { [field]: html } } };
    updateActivity(activityKey, updates);
  };

  handleDelete = key => () => {
    const { activityKey, removeActivityGoal } = this.props;
    removeActivityGoal(activityKey, key);
  };

  handleAdd = () => {
    const { activityKey, addActivityGoal } = this.props;
    addActivityGoal(activityKey);
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
    const { goals } = this.props;
    const { showForm } = this.state;

    return (
      <Subsection resource="activities.goals" nested>
        {goals.length === 0 ? (
          <NoDataMsg>{t('activities.expenses.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            {goals.map((goal, i) => (
              <div key={goal.key}>
                <MiniHeader
                  content={
                    <div className="col-11 truncate">
                      {plaintext(goal.description)}
                    </div>
                  }
                  handleDelete={this.handleDelete(goal.key)}
                  number={i + 1}
                  title="Goal:"
                  titleColumns={1}
                  toggleForm={this.toggleForm(goal.key)}
                />
                {showForm[goal.key] && (
                  <GoalForm
                    goal={goal}
                    idx={i}
                    handleChange={this.handleSync}
                    handleDelete={this.handleDelete(goal.key)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <Btn onClick={this.handleAdd}>
          {t('activities.goals.addGoalButtonText')}
        </Btn>
      </Subsection>
    );
  }
}

Goals.propTypes = {
  activityKey: PropTypes.string.isRequired,
  goals: PropTypes.array.isRequired,
  addActivityGoal: PropTypes.func.isRequired,
  removeActivityGoal: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byKey } }, { aKey }) => ({
  activityKey: aKey,
  goals: byKey[aKey].goals
});

const mapDispatchToProps = {
  addActivityGoal: addActivityGoalAction,
  removeActivityGoal: removeActivityGoalAction,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);
