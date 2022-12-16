import { TextField, Button } from '@cmsgov/design-system';

import PropTypes from 'prop-types';
import React, { forwardRef, useReducer, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import Icon, { faPlusCircle } from '../../../../../components/Icons';
import Review from '../../../../../components/Review';

import { outcomeMetric as schema } from '@cms-eapd/common';
import { saveOutcome as actualSaveOutcome } from '../../../../../redux/actions/editActivity';

import { newOutcomeMetric } from '../../../../../redux/reducers/activities';

const OutcomeAndMetricForm = forwardRef(
  ({ activityIndex, item, index, saveOutcome, setFormValid }, ref) => {
    OutcomeAndMetricForm.displayName = 'OutcomeAndMetricForm';
    const { outcome, metrics } = JSON.parse(JSON.stringify({ ...item }));
    const {
      handleSubmit,
      control,
      formState: { errors, isValid }
    } = useForm({
      defaultValues: {
        outcome,
        metrics
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(schema)
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'metrics'
    });

    useEffect(() => {
      setFormValid(isValid);
    }, [isValid]); // eslint-disable-line react-hooks/exhaustive-deps

    const initialState = {
      outcome,
      metrics
    };

    function reducer(state, action) {
      switch (action.type) {
        case 'updateField':
          return {
            ...state,
            [action.field]: action.value
          };
        case 'addMetric': {
          return {
            ...state,
            metrics: [...state.metrics, action.metric]
          };
        }
        case 'removeMetric': {
          const metricsCopy = [...state.metrics];
          metricsCopy.splice(action.index, 1);
          return {
            ...state,
            metrics: metricsCopy
          };
        }
        case 'updateMetrics': {
          const metricsCopy = [...state.metrics];
          metricsCopy[action.metricIndex].metric = action.value;

          return {
            ...state,
            metrics: metricsCopy
          };
        }
        default:
          throw new Error(
            'Unrecognized action type provided to OutcomesAndMetricForm reducer'
          );
      }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleOutcomeChange = e => {
      dispatch({
        type: 'updateField',
        field: 'outcome',
        value: e.target.value
      });
    };

    const onSubmit = e => {
      e.preventDefault();
      saveOutcome(activityIndex, index, {
        ...item,
        ...state
      });
      handleSubmit(e);
    };

    const handleAddMetric = newMetric => {
      dispatch({ type: 'addMetric', metric: newMetric });
    };

    const handleDeleteMetric = (outcomeIndex, metricIndex) => {
      dispatch({ type: 'removeMetric', index: metricIndex });
    };

    const handleMetricChange = (e, i) => {
      dispatch({
        type: 'updateMetrics',
        metricIndex: i,
        value: e.target.value
      });
    };

    return (
      <form
        index={index}
        key={`activity${activityIndex}-index${index}-form`}
        onSubmit={onSubmit}
      >
        {/* Prevent implicit submission of the form. */}
        <button
          type="submit"
          disabled
          style={{ display: 'none' }}
          aria-hidden="true"
          aria-label="submitButton"
        />
        <Controller
          key={`activity${activityIndex}-index${index}`}
          data-cy={`outcome-${index}`}
          name="outcome"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <TextField
              {...props}
              data-cy={`outcome-${index}`}
              label="Outcome"
              className="remove-clearfix"
              hint="Describe a distinct and measurable improvement for this system."
              multiline
              rows="4"
              onChange={e => {
                handleOutcomeChange(e);
                onChange(e);
              }}
              errorMessage={errors?.outcome?.message}
              errorPlacement="bottom"
            />
          )}
        />
        {fields.map((metric, i) => {
          return (
            <Review
              key={metric.key}
              onDeleteClick={() => {
                remove(i);
                handleDeleteMetric(index, i);
              }}
              onDeleteLabel="Remove"
              skipConfirmation
              ariaLabel={`${i + 1}. ${metric.metric || 'Metric not specified'}`}
              objType="Metric"
            >
              <div
                key={metric.key}
                className="ds-c-choice__checkedChild ds-u-margin-top--3 ds-u-padding-top--0"
              >
                <Controller
                  name={`metrics[${i}].metric`}
                  control={control}
                  defaultValue={metric.metric}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      id={`${activityIndex}-metric${i}`}
                      name={`metrics[${i}]`}
                      data-cy={`metric-${index}-${i}`}
                      label="Metric"
                      className="remove-clearfix"
                      hint="Describe a measure that would demonstrate whether this system is meeting this outcome."
                      multiline
                      rows="4"
                      onChange={e => {
                        handleMetricChange(e, i);
                        onChange(e);
                      }}
                      errorMessage={
                        errors?.metrics && errors?.metrics[i]?.metric.message
                      }
                      errorPlacement="bottom"
                    />
                  )}
                />
              </div>
            </Review>
          );
        })}
        <div
          className="align-content-right ds-u-margin-y--0 ds-u-margin-top--2"
          style={{ width: 485 }}
        >
          <Button
            key={`activity${activityIndex}-index${index}-add-metric`}
            className="ds-c-button ds-c-button--transparent"
            onClick={() => {
              const newMetric = newOutcomeMetric();
              append(newMetric);
              handleAddMetric(newMetric);
            }}
          >
            <Icon icon={faPlusCircle} className="ds-u-margin-right--1" />
            Add Metric to Outcome
          </Button>
        </div>
        <input
          className="ds-u-visibility--hidden"
          type="submit"
          ref={ref}
          hidden
          aria-label="submitButton"
        />
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
  saveOutcome: PropTypes.func.isRequired,
  setFormValid: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveOutcome: actualSaveOutcome
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  OutcomeAndMetricForm
);

export { OutcomeAndMetricForm as plain, mapDispatchToProps };
