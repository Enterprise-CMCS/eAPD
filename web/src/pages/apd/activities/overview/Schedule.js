import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import {
  setActivityEndDate,
  setActivityStartDate
} from '../../../../redux/actions/editActivity';
import { Subsection } from '../../../../components/Section';
import DateField from '../../../../components/DateField';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';
import { stateDateToDisplay } from '../../../../util';

import scheduleSchema from '../../../../static/schemas/plannedActivityShedule';

const Schedule = ({ activity, activityIndex, setEndDate, setStartDate }) => {
  Schedule.displayName = 'Schedule';

  const { plannedStartDate, plannedEndDate } = activity;

  const {
    control,
    formState: { errors },
    getFieldState,
    trigger
  } = useForm({
    defaultValues: {
      start: plannedStartDate || '',
      end: plannedEndDate || ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(scheduleSchema)
  });

  return (
    <Subsection resource="activities.schedule">
      <Fragment>
        <div className="ds-u-padding-y--0 visibility--screen">
          <Controller
            name="start"
            control={control}
            render={({
              field: { onChange, onBlur, ...props },
              formState: { isTouched }
            }) => (
              <DateField
                {...props}
                isTouched={isTouched}
                label="Start date"
                onChange={(_, dateStr) => {
                  setStartDate(activityIndex, dateStr);
                  onChange(dateStr);
                  trigger();
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
            render={({ field: { onChange, onBlur, ...props } }) => {
              return (
                <DateField
                  {...props}
                  label="End date"
                  onChange={(_, dateStr) => {
                    setEndDate(activityIndex, dateStr);
                    onChange(dateStr);

                    if (adminCheck) {
                      trigger();
                    }
                  }}
                  onComponentBlur={() => {
                    onBlur();
                    if (getFieldState('start').isTouched) {
                      trigger('start');
                    }
                  }}
                  errorMessage={errors?.end?.message}
                />
              );
            }}
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
};

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
