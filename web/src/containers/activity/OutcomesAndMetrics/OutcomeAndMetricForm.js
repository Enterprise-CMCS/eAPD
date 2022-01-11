import { TextField } from '@cmsgov/design-system';

import PropTypes from 'prop-types';
import React, { Fragment, useMemo, forwardRef } from 'react';
import { connect } from 'react-redux';
import {
  setOutcome as setOutcomeAction,
  setOutcomeMetric
} from '../../../actions/editActivity';
import Review from '../../../components/Review';

import {
  saveOutcome
} from '../../../actions/editActivity';

const OutcomeAndMetricForm = forwardRef(
  (
    {
      activityIndex,
      item: { metrics, outcome },
      index,
      setMetric,
      setOutcome,
      removeMetric
    },
    ref
) => {
  const changeOutcome = useMemo(
    () => ({ target: { value } }) => {
      setOutcome(activityIndex, index, value);
    },
    [index]
  );

  const changeMetric = i => ({ target: { value } }) => {
    setMetric(activityIndex, index, i, value);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    saveOutcome(activityIndex, index, state);
  };

  return (
    <Fragment key={`activity${activityIndex}-index${index}-form`}>
      <TextField
        key={`activity${activityIndex}-index${index}`}
        autoFocus
        name="outcome"
        className="data-entry-box"
        label="Outcome"
        hint="Describe a distinct and measurable improvement for this system."
        value={outcome}
        multiline
        rows="4"
        onChange={changeOutcome}
      />

      {metrics.map(({ key, metric }, i) => (
        <Review
          key={key}
          onDeleteClick={
            metrics.length === 1 && metric === ''
              ? null
              : () => removeMetric(index, i)
          }
          ariaLabel={`${i + 1}. ${metric || 'Metric not specified'}`}
          objType="Metric"
        >
          <div
            key={key}
            className="ds-c-choice__checkedChild ds-u-margin-top--3 ds-u-padding-top--0"
          >
            <TextField
              name="metric"
              label="Metric"
              hint="Describe a measure that would demonstrate whether this system is meeting this outcome."
              value={metric}
              multiline
              rows="4"
              onChange={changeMetric(i)}
            />
          </div>
        </Review>
      ))}
    </Fragment>
  );
}
);

OutcomeAndMetricForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    metrics: PropTypes.array,
    outcome: PropTypes.string
  }).isRequired,
  setOutcome: PropTypes.func.isRequired,
  setMetric: PropTypes.func.isRequired,
  removeMetric: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setOutcome: setOutcomeAction,
  setMetric: setOutcomeMetric,
  saveOutcome: saveOutcome
};

export default connect(null, mapDispatchToProps)(OutcomeAndMetricForm);

export { OutcomeAndMetricForm as plain, mapDispatchToProps };
