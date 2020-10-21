import { TextField } from '@cmsgov/design-system';

import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  setOutcome as setOutcomeAction,
  setOutcomeMetric
} from '../../../actions/editActivity';

const OutcomeAndMetricForm = ({
  activityIndex,
  item: { metrics, outcome },
  index,
  setMetric,
  setOutcome
}) => {
  const changeOutcome = useMemo(
    () => ({ target: { value } }) => {
      setOutcome(activityIndex, index, value);
    },
    [index]
  );

  const changeMetric = i => ({ target: { value } }) => {
    setMetric(activityIndex, index, i, value);
  };

  return (
    <Fragment>
      <TextField
        autoFocus
        name="outcome"
        className="data-entry-box"
        label="Outcome"
        hint="Describe what you are trying to achieve"
        value={outcome}
        onChange={changeOutcome}
      />

      {metrics.map(({ key, metric }, i) => (
        <div
          key={key}
          className="ds-c-choice__checkedChild ds-u-margin-top--3 ds-u-padding-top--0"
        >
          <TextField
            name="metric"
            label="metric"
            hint="Describe how you will measure progress towards achieving your outcome."
            value={metric}
            onChange={changeMetric(i)}
          />
        </div>
      ))}
    </Fragment>
  );
};

OutcomeAndMetricForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    metrics: PropTypes.array,
    outcome: PropTypes.string
  }).isRequired,
  setOutcome: PropTypes.func.isRequired,
  setMetric: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setOutcome: setOutcomeAction,
  setMetric: setOutcomeMetric
};

export default connect(null, mapDispatchToProps)(OutcomeAndMetricForm);

export { OutcomeAndMetricForm as plain, mapDispatchToProps };
