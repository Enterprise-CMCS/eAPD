import { TextField } from '@cmsgov/design-system';

import PropTypes from 'prop-types';
import React, { Fragment, useMemo, forwardRef, useReducer, useEffect } from 'react';
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
      item,
      index,
      saveOutcome,
      removeMetric
    },
    ref
) => {
  const initialState = item;
  
  function reducer(state, action) {
    switch (action.type) {
      case 'updateField':
        return {
          ...state,
          [action.field]: action.value
        }
      case 'updateMetrics': {
        const metricsCopy = [...state.metrics];
        metricsCopy[action.metricIndex].metric = action.value;
        
        return {
          ...state,
          metrics: metricsCopy
        }        
      }
      default:
        throw new Error(
          'Unrecognized action type provided to OutcomesAndMetricForm reducer'
        );
    }
  }
  
  useEffect(() => {
    console.log("state changed", state);
    console.log("item changed", item);
  }, [state, item])
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleSubmit = e => {
    e.preventDefault();
    saveOutcome(activityIndex, index, state);
  };
  
  const changeMetric = i => ({ target: { value } }) => {
    dispatch({ type: 'updateMetrics', metricIndex: i, value: value })
  };

  return (
    <form index={index} ref={ref} onSubmit={handleSubmit}>
      <Fragment key={`activity${activityIndex}-index${index}-form`}>
        <TextField
          key={`activity${activityIndex}-index${index}`}
          autoFocus
          name="outcome"
          className="data-entry-box"
          label="Outcome"
          hint="Describe a distinct and measurable improvement for this system."
          value={state.outcome}
          multiline
          rows="4"
          onChange={e => 
            dispatch({ type: 'updateField', field: 'outcome', value: e.target.value })
          }
        />
        {state.metrics.map(({ key, metric }, i) => (
          <Review
            key={key}
            onDeleteClick={
              state.metrics.length === 1 && metric === ''
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
    </form>
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
  removeMetric: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveOutcome: saveOutcome
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  OutcomeAndMetricForm
);

export { OutcomeAndMetricForm as plain, mapDispatchToProps };
