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
  const outcomeContainer = `activite${activityIndex}-outcome${index}`;

  const disableButton = () => {
    const container = document.getElementById(outcomeContainer).parentElement;
    const doneBtn = container.querySelector('#form-and-review-list--done-btn');

    if (document
          .getElementById(outcomeContainer)
          .querySelectorAll('.missing-text-alert')
          .length > 0) {
          doneBtn.disabled = true;
        } else {
          doneBtn.disabled = false;
        }
  }

  const addMissingTextAlert = (e, p, n) => {
    const lastDiv = p.lastChild;
    const missTextError = 'missing-text-error';
    const div = document.createElement('div');
    const vowels = ("aeiouAEIOU");

    if (vowels.indexOf(n[0]) !== -1) {
      div.innerHTML = `Provide an ${n}`;
    } else {
      div.innerHTML = `Provide a ${n}`;
    }
    
    if (!lastDiv.classList.contains(missTextError)) {
      div.classList.add('missing-text-error')
      e.classList.add('missing-text-alert')
      p.appendChild(div)
    }

    disableButton();
  }

  const removeMissingTextAlert = (e, p) => {
    const lastDiv = p.lastChild;
    const missTextError = 'missing-text-error';
    e.classList.remove('missing-text-alert')
    
    if (lastDiv.classList.contains(missTextError)) {
      p.removeChild(lastDiv);
    }

    disableButton();
  }

  const changeOutcome = useMemo(
    () =>
      ({ target: { value } }) => {
        setOutcome(activityIndex, index, value);
      },
    [activityIndex, index, setOutcome]
  );

  const changeMetric =
    i =>
    ({ target: { value } }) => {
      setMetric(activityIndex, index, i, value);
    };

  const checkForText = e => {
    const element = e.currentTarget;
    const text = element.innerHTML.trim();
    const parent = element.parentNode;
    const elName = element.name;
    
    return text === '' ? addMissingTextAlert(element, parent, elName) : removeMissingTextAlert(element, parent);
  }

  return (
    <Fragment key={`activity${activityIndex}-index${index}-form`}>
      <TextField
        key={`activity${activityIndex}-index${index}`}
        data-cy={`outcome-${index}`}
        name="outcome"
        label="Outcome"
        className="remove-clearfix"
        hint="Describe a distinct and measurable improvement for this system."
        value={outcome}
        multiline
        rows="4"
        onChange={changeOutcome}
        onBlur={validateText}
        onKeyUp={validateText}
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
              className="remove-clearfix"
              hint="Describe a measure that would demonstrate whether this system is meeting this outcome."
              value={metric}
              multiline
              rows="4"
              onChange={changeMetric(i)}
              onBlur={validateText}
              onKeyUp={validateText}
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
