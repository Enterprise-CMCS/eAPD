import { TextField } from '@cmsgov/design-system-core';

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { t } from '../../../i18n';
import TextArea from '../../../components/TextArea';

const GoalForm = ({
  item: { description, objective },
  index,
  handleChange
}) => (
  <Fragment>
    <TextField
      autoFocus="true"
      name="name"
      className="data-entry-box"
      label={t('activities.goals.description.input.label', {
        defaultValue: ''
      })}
      hint={t('activities.goals.description.input.hint', {
        defaultValue: ''
      })}
      value={description}
      onChange={handleChange(index, 'description')}
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
      onChange={handleChange(index, 'objective')}
    />
  </Fragment>
);

GoalForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string,
    objective: PropTypes.string
  }).isRequired
};

export default GoalForm;
