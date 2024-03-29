import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
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

import { selectAdminCheckEnabled } from '../../../../redux/selectors/apd.selectors';

import { activityScheduleSchema as schema } from '@cms-eapd/common';

const Schedule = ({
  activity,
  activityIndex,
  setEndDate,
  setStartDate,
  adminCheck
}) => {
  Schedule.displayName = 'Schedule';

  const { activitySchedule: { plannedStartDate, plannedEndDate } = {} } =
    activity;

  const {
    control,
    formState: { errors },
    trigger
  } = useForm({
    defaultValues: {
      plannedStartDate,
      plannedEndDate
    },
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    trigger();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Subsection resource="activities.schedule">
      <Fragment>
        <div className="ds-u-padding-y--0 visibility--screen">
          <Controller
            name="plannedStartDate"
            control={control}
            render={({
              field: { onChange, ...props },
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
                errorMessage={errors?.plannedStartDate?.message}
                errorPlacement="bottom"
              />
            )}
          />
          <Controller
            name="plannedEndDate"
            control={control}
            render={({ field: { onChange, ...props } }) => {
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
                  errorMessage={adminCheck && errors?.plannedEndDate?.message}
                  errorPlacement="bottom"
                />
              );
            }}
          />
        </div>
        <div className="visibility--print">
          <p>
            <strong>Start date:</strong>{' '}
            {stateDateToDisplay(activity?.activitySchedule?.plannedStartDate)}
          </p>
          <p>
            <strong>End date:</strong>{' '}
            {stateDateToDisplay(activity?.activitySchedule?.plannedEndDate)}
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
  setStartDate: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  activity: selectActivityByIndex(state, { activityIndex }),
  adminCheck: selectAdminCheckEnabled(state)
});

const mapDispatchToProps = {
  setEndDate: setActivityEndDate,
  setStartDate: setActivityStartDate
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

export { Schedule as plain, mapStateToProps, mapDispatchToProps };
