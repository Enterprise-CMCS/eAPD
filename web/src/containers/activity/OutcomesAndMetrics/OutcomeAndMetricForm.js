import { TextField } from '@cmsgov/design-system';

import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  setOutcome as setOutcomeAction,
  setOutcomeMetric
} from '../../../actions/editActivity';
import Review from '../../../components/Review';
import { validateText } from '../../../helpers/textValidation';

const OutcomeAndMetricForm = ({
  activityIndex,
  item: { metrics, outcome },
  index,
  setMetric,
  setOutcome,
  removeMetric
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
    
    <Fragment key={`activity${activityIndex}-index${index}-form`}>
      <TextField
        key={`activity${activityIndex}-index${index}`}
        autoFocus
        data-cy={`outcome-${index}`}
        name="outcome"
        label="Outcome"
        hint="Describe a distinct and measurable improvement for this system."
        value={outcome}
        multiline
        rows="4"
        onChange={changeOutcome}
        onBlur={(e) => {
          validateText(e, 'name');
        }}
        onKeyUp={(e) => {
          validateText(e, 'name');
        }}
        />

      {metrics.map(({ key, metric }, i) => (
        <Review
        key={key}
        onDeleteClick={() => removeMetric(index, i)}
        ariaLabel={`${i + 1}. ${metric || 'Metric not specified'}`}
        objType="Metric"
        >
          <div
            key={key}
            className="ds-c-choice__checkedChild ds-u-margin-top--3 ds-u-padding-top--0"
            >
            <TextField
              id={`${activityIndex}-metric${i}`}
              name="metric"
              data-cy={`metric-${index}-${i}`}
              label="Metric"
              hint="Describe a measure that would demonstrate whether this system is meeting this outcome."
              value={metric}
              multiline
              rows="4"
              onChange={changeMetric(i)}
              onBlur={(e) => {
                validateText(e, 'matric');
              }}
              onKeyUp={(e) => {
                validateText(e, 'matric');
              }}
              />
          </div>
        </Review>
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
  setMetric: PropTypes.func.isRequired,
  removeMetric: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setOutcome: setOutcomeAction,
  setMetric: setOutcomeMetric
};

export default connect(null, mapDispatchToProps)(OutcomeAndMetricForm);

export { OutcomeAndMetricForm as plain, mapDispatchToProps };
