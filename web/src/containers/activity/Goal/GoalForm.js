import { TextField } from '@cmsgov/design-system-core';

import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import { connect } from 'react-redux';
import { t } from '../../../i18n';
import TextArea from '../../../components/TextArea';
import {
  setGoalDescription,
  setGoalObjective
} from '../../../actions/editActivity';

const GoalForm = ({
  activityIndex,
  item: { description, objective },
  index,
  setDescription,
  setObjective
}) => {
  const changeDescription = useMemo(
    () => ({ target: { value } }) => {
      setDescription(activityIndex, index, value);
    },
    [index]
  );

  const changeObjective = useMemo(
    () => ({ target: { value } }) => {
      setObjective(activityIndex, index, value);
    },
    [index]
  );

  return (
    <Fragment>
      <TextField
        autoFocus
        name="name"
        className="data-entry-box"
        label={t('activities.goals.description.input.label', {
          defaultValue: ''
        })}
        hint={t('activities.goals.description.input.hint', {
          defaultValue: ''
        })}
        value={description}
        onChange={changeDescription}
      />

      <TextArea
        name="milestones"
        className="data-entry-box"
        label={t('activities.goals.objective.input.label', {
          defaultValue: 'Benchmarks'
        })}
        rows={6}
        hint={t('activities.goals.objective.input.hint', {
          defaultValue: ''
        })}
        value={objective}
        onChange={changeObjective}
      />
    </Fragment>
  );
};

GoalForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string,
    objective: PropTypes.string
  }).isRequired,
  setDescription: PropTypes.func.isRequired,
  setObjective: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setDescription: setGoalDescription,
  setObjective: setGoalObjective
};

export default connect(
  null,
  mapDispatchToProps
)(GoalForm);

export { GoalForm as plain, mapDispatchToProps };
