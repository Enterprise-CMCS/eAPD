import { TextField, Button } from '@cmsgov/design-system';

import PropTypes from 'prop-types';
import React, { forwardRef, useReducer } from 'react';
import { connect } from 'react-redux';

import Icon, { faPlusCircle } from '../../../components/Icons';
import Review from '../../../components/Review';

import {
  saveOutcome as actualSaveOutcome
} from '../../../actions/editActivity';

import { validateText } from '../../../helpers/textValidation';

import { newOutcomeMetric } from '../../../reducers/activities';

const OutcomeAndMetricForm = forwardRef(
  (
    {
      activityIndex,
      item,
      index,
      saveOutcome
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
      case 'addMetric': {
        const newMetric = newOutcomeMetric();
        return {
          ...state,
          metrics: [
            ...state.metrics,
            newMetric
          ]
        }
      }
      case 'removeMetric': {
        const metricsCopy = [...state.metrics];
        metricsCopy.splice(action.index, 1);
        return {
          ...state,
          metrics: metricsCopy
        }        
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
  
  const [state, dispatch] = useReducer(reducer, item);
  
  const handleSubmit = e => {
    e.preventDefault();
    saveOutcome(activityIndex, index, state);
  };
  
  const handleAddMetric = () => {
    dispatch({ type: 'addMetric' });
  }
  
  const handleDeleteMetric = (outcomeIndex, metricIndex) => {
    dispatch({ type: 'removeMetric', index: metricIndex });
  };
  
  const changeMetric = i => ({ target: { value } }) => {
    dispatch({ type: 'updateMetrics', metricIndex: i, value })
  };

  return (
    <form index={index} ref={ref} onSubmit={handleSubmit} key={`activity${activityIndex}-index${index}-form`}>
      <TextField
        key={`activity${activityIndex}-index${index}`}
        autoFocus
        data-cy={`outcome-${index}`}
        name="outcome"
        label="Outcome"
        hint="Describe a distinct and measurable improvement for this system."
        value={state.outcome}
        multiline
        rows="4"
        onChange={e => 
          dispatch({ type: 'updateField', field: 'outcome', value: e.target.value })
        }
        onBlur={validateText}
        onKeyUp={validateText}
      />
      {state.metrics.map(({ key, metric }, i) => (
        <Review
          key={key}
          onDeleteClick={
            state.metrics.length === 1 && metric === ''
              ? null
              : () => handleDeleteMetric(index, i)
          }
          onDeleteLabel="Remove"
          skipConfirmation
          ariaLabel={`${i + 1}. ${metric || 'Metric not specified'}`}
          objType="Metric"
          onBlur={validateText}
          onKeyUp={validateText}
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
              onBlur={validateText}
              onKeyUp={validateText}
              />
          </div>
        </Review>
      ))}
      <div className="align-content-right ds-u-margin-y--0 ds-u-margin-top--2" style={{width: 485}}>
        <Button
          key={`activity${activityIndex}-index${index}-add-metric`}
          className="ds-c-button ds-c-button--transparent"
          onClick={handleAddMetric}
        >
          <Icon icon={faPlusCircle} className='ds-u-margin-right--1' />
          Add Metric to Outcome
        </Button>
      </div>
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
  saveOutcome: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveOutcome: actualSaveOutcome
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  OutcomeAndMetricForm
);

export { OutcomeAndMetricForm as plain, mapDispatchToProps };
