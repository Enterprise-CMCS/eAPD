import PropTypes from 'prop-types';
import React, { forwardRef, Fragment, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import {
  setActivityEndDate,
  setActivityStartDate
} from '../../../../actions/editActivity';
import { Subsection } from '../../../../components/Section';
import DateField from '../../../../components/DateField';
import { selectActivityByIndex } from '../../../../reducers/activities.selectors';
import { stateDateToDisplay } from '../../../../util';

const Joi = require('joi').extend(require('@joi/date'));

const scheduleSchema = Joi.object({
  start: Joi.date()
            .format('YYYY-MM-DD')
            .iso()
            .required()
            .messages({
              'date.base': 'Provide a start date.',
              'date.empty': 'Provide a start date.',
              'date.format': 'Provide a start date.'
            }),
  end: Joi.date()
          .format('YYYY-MM-DD')
          .iso()
          .min(Joi.ref('start'))
          .required()
          .messages({
            'date.base': 'Provide an end date.',
            'date.empty': 'Provide an end date.',
            'date.format': 'Provide an end date.',
            'date.min': 'Provide an end date that is after the start date.',
            'any.ref': 'Provide an end date that is after the start date.'
          })
});

const Schedule = forwardRef(({ activity, activityIndex, setEndDate, setStartDate }, ref) => {
  const { start, end } = activity;

  const {
    control,
    formState: {errors},
    getFieldState,
    trigger,
    resetField: resetFieldErrors,
    getValues
  } = useForm({
    defaultValues: {
      start: start,
      end: end
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(scheduleSchema)
  });

  const handleActivityStartChange = useCallback(
    (_, dateStr) => {
      setStartDate(activityIndex, dateStr);
    },
    [activityIndex, setStartDate]
  );

  const handleActivityEndChange = useCallback(
    (_, dateStr) => {
      setEndDate(activityIndex, dateStr);
    },
    [activityIndex, setEndDate]
  );

  return (
    <Subsection resource="activities.schedule">
      <Fragment>
        <div className="ds-u-padding-y--0 visibility--screen">
          <Controller
            name="start"
            control={control}
            render={({ 
              field: { onChange, onBlur, ...props },
              formState: { isTouched } }) => (
              <DateField
                {...props}
                label="Start date"
                value={activity.plannedStartDate}
                onChange={(e, dateStr) => {
                  handleActivityStartChange(e, dateStr);
                  onChange(dateStr);
                }}
                onComponentBlur={() => {
                  onBlur();
                  if (getFieldState('end').isTouched) {
                    trigger('end');
                  }
                }}
                errorMessage={errors?.start?.message}
              />
            )}
          />
          <Controller
            name="end"
            control={control}
            render={({ field: { onChange, onBlur, ...props } }) => (
              <DateField
                {...props}
                label="End date"
                onChange={(e, dateStr) => {
                  handleActivityEndChange(e, dateStr);
                  onChange(e);
                }}
                onComponentBlur={() => {
                  onBlur();
                  if (getFieldState('start').isTouched) {
                    trigger('start');
                  }
                }}
                errorMessage={errors?.end?.message}
              />
            )}
          />
        </div>
        <div className="visibility--print">
          <p>
            <strong>Start date:</strong>{' '}
            {stateDateToDisplay(activity.plannedStartDate)}
          </p>
          <p>
            <strong>End date:</strong>{' '}
            {stateDateToDisplay(activity.plannedEndDate)}
          </p>
          <hr />
        </div>
      </Fragment>
    </Subsection>
  );
});

Schedule.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  activity: selectActivityByIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  setEndDate: setActivityEndDate,
  setStartDate: setActivityStartDate
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

export { Schedule as plain, mapStateToProps, mapDispatchToProps };
