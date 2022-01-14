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
      case 'removeMetric': {
        const metricsCopy = [...state.metrics];
        metricsCopy.splice(action.index, 1);
        console.log("metrics copy", metricsCopy);
        return {
          ...state,
          metrics: metricsCopy
        }        
      }
      case 'syncMetrics':
        const updatedMetrics = [...item.metrics];
        return {
          ...state,
          metrics: updatedMetrics
        }
      default:
        throw new Error(
          'Unrecognized action type provided to OutcomesAndMetricForm reducer'
        );
    }
  }  
  
  const [state, dispatch] = useReducer(reducer, item);
  
  useEffect(() => {
    console.log("item.metrics updated in OutcomesAndMetricsForm");
    dispatch({ type: 'syncMetrics', value: item.metrics })
  }, [item.metrics]);
  
  useEffect(() => {
    console.log("item changed in OutcomesAndMetricsForm", item);
  }, [item]);
  
  const handleSubmit = e => {
    e.preventDefault();
    saveOutcome(activityIndex, index, state);
  };
  
  const handleDeleteMetric = (outcomeIndex, metricIndex) => {
    console.log('metricIndex', metricIndex);
    // dispatch({ type: 'removeMetric', index: metricIndex });
    removeMetric(outcomeIndex, metricIndex);
  };
  
  const changeMetric = i => ({ target: { value } }) => {
    dispatch({ type: 'updateMetrics', metricIndex: i, value: value })
  };

  return (
    <form index={index} ref={ref} onSubmit={handleSubmit} key={`activity${activityIndex}-index${index}-form`}>
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
              : () => handleDeleteMetric(index, i)
          }
          // onDeleteClick={() => handleDeleteMetric(index, i)}
          onDeleteLabel="Remove"
          skipConfirmation
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
