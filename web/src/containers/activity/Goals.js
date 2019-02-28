import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addActivityGoal as addActivityGoalAction,
  removeActivityGoal as removeActivityGoalAction,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import CollapsibleList from '../../components/CollapsibleList';
import { RichText } from '../../components/Inputs';
import Instruction from '../../components/Instruction';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
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

    <Instruction source="activities.goals.goal.instruction" />
    <div className="mb3">
      {t('activities.goals.goal.title', { number: idx + 1 })}
      <RichText
        content={goal.description}
        onSync={handleChange(idx, 'description')}
      />
    </div>

    <Instruction source="activities.goals.objective.instruction" />
    <div className="mb3">
      {t('activities.goals.objective.title')}
      <RichText
        content={goal.objective}
        onSync={handleChange(idx, 'objective')}
      />
    </div>
  </div>
);

GoalForm.propTypes = {
  goal: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

class Goals extends Component {
  getDeleter = key => () => {
    const { activityKey, removeActivityGoal } = this.props;
    removeActivityGoal(activityKey, key);
  };

  handleAdd = () => {
    const { activityKey, addActivityGoal } = this.props;
    addActivityGoal(activityKey);
  };

  handleDelete = goal => this.getDeleter(goal.key)();

  handleSync = (index, field) => html => {
    const { activityKey, updateActivity } = this.props;
    const updates = { goals: { [index]: { [field]: html } } };
    updateActivity(activityKey, updates);
  };

  render() {
    const { goals } = this.props;

    return (
      <Subsection resource="activities.goals" nested>
        {goals.length === 0 ? (
          <NoDataMsg>{t('activities.expenses.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            <CollapsibleList
              items={goals}
              getKey={goal => goal.key}
              deleteItem={this.handleDelete}
              header={(goal, i) => (
                <Fragment>
                  <div className="col-1 truncate">
                    {i + 1}. <strong>Goal:</strong>
                  </div>
                  <div className="col-11 truncate">
                    {plaintext(goal.description)}
                  </div>
                </Fragment>
              )}
              content={(goal, i) => (
                <GoalForm
                  goal={goal}
                  idx={i}
                  handleChange={this.handleSync}
                  handleDelete={this.getDeleter(goal.key)}
                />
              )}
            />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Goals);
