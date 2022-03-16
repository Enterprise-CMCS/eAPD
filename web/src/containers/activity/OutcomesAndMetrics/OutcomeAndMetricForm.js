import { TextField, Button } from '@cmsgov/design-system';

import PropTypes from 'prop-types';
import Joi from 'joi';
import React, { forwardRef, useReducer, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import Icon, { faPlusCircle } from '../../../components/Icons';
import Review from '../../../components/Review';

import { saveOutcome as actualSaveOutcome } from '../../../actions/editActivity';

import { newOutcomeMetric } from '../../../reducers/activities';

const outcomeMetricSchema = Joi.object({
  outcome: Joi.string().required().messages({
    'string.base': 'Outcome is required',
    'string.empty': 'Outcome is required'
  }),
  metrics: Joi.array().items(
    Joi.string().messages({
      'string.empty': 'Metric is required'
    })
  )
});

const OutcomeAndMetricForm = forwardRef(
  ({ activityIndex, item, index, saveOutcome, setFormValid }, ref) => {
    OutcomeAndMetricForm.displayName = 'OutcomeAndMetricForm';
    const {
      handleSubmit,
      control,
      formState: { errors, isValid, isValidating },
      getValues
    } = useForm({
      defaultValues: {
        outcome: item.outcome,
        metrics: item.metrics
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(outcomeMetricSchema)
    });

    useEffect(() => {
      console.log('isValid changed');
      console.log({ errors, isValid, isValidating });
      setFormValid(isValid);
    }, [isValid]);

    useEffect(() => {
      console.log('errors changed');
      console.log({ errors, isValid, isValidating });
    }, [errors]);

    useEffect(() => {
      console.log('isValidating changed');
      const { error, value } = outcomeMetricSchema.validate(getValues());
      console.log({ error, value, errors, isValid, isValidating });
    }, [isValidating]);

    const initialState = item;

    function reducer(state, action) {
      switch (action.type) {
        case 'updateField':
          return {
            ...state,
            [action.field]: action.value
          };
        case 'addMetric': {
          const newMetric = newOutcomeMetric();
          return {
            ...state,
            metrics: [...state.metrics, newMetric]
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
      saveOutcome(activityIndex, index, state);
      handleSubmit(e);
    };

    const handleAddMetric = () => {
      dispatch({ type: 'addMetric' });
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
        <Controller
          key={`activity${activityIndex}-index${index}`}
          data-cy={`outcome-${index}`}
          name="outcome"
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <TextField
              {...props}
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
          >
            <div
              key={key}
              className="ds-c-choice__checkedChild ds-u-margin-top--3 ds-u-padding-top--0"
            >
              <Controller
                name={`metrics.${i}`}
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <TextField
                    {...props}
                    id={`${activityIndex}-metric${i}`}
                    name={`metrics.${i}`}
                    data-cy={`metric-${index}-${i}`}
                    label="Metric"
                    className="remove-clearfix"
                    hint="Describe a measure that would demonstrate whether this system is meeting this outcome."
                    value={metric}
                    multiline
                    rows="4"
                    onChange={e => {
                      handleMetricChange(e, i);
                      onChange(e);
                    }}
                    errorMessage={errors?.metrics && errors.metrics[i]?.message}
                    errorPlacement="bottom"
                  />
                )}
              />
            </div>
          </Review>
        ))}
        <div
          className="align-content-right ds-u-margin-y--0 ds-u-margin-top--2"
          style={{ width: 485 }}
        >
          <Button
            key={`activity${activityIndex}-index${index}-add-metric`}
            className="ds-c-button ds-c-button--transparent"
            onClick={handleAddMetric}
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
