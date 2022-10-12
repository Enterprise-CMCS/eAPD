import { Button, Alert } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import EntryDetails from './Activity';
import { addActivity as actualAddActivity } from '../../../../redux/actions/editActivity';
import { Section } from '../../../../components/Section';
import { selectAllActivities } from '../../../../redux/selectors/activities.selectors';
import Waypoint from '../../../../components/ConnectedWaypoint';
import AlertMissingFFY from '../../../../components/AlertMissingFFY';

import activitiesDashboardSchema from '@cms-eapd/common/schemas/activitiesDashboard';

const All = ({ addActivity, activities, adminCheck }) => {
  const { apdId } = useParams();

  const validate = activitiesDashboardSchema.validate(activities);

  return (
    <React.Fragment>
      <Waypoint /> {/* Waypoint w/o id indicates top of page */}
      <AlertMissingFFY />
      <Section id="activities" resource="activities">
        <hr className="custom-hr" />
        {activities.length == 0 && <p>Add at least one activity.</p>}
        {adminCheck && validate.error && (
          <Fragment>
            <Alert variation="error">{validate.error?.message}</Alert>
          </Fragment>
        )}
        {activities.map((activity, index) => (
          <EntryDetails
            apdId={apdId}
            activityIndex={index}
            key={activity.activityId}
          />
        ))}
        <Button className="ds-u-margin-top--4" onClick={addActivity}>
          Add Activity
        </Button>
      </Section>
    </React.Fragment>
  );
};

All.propTypes = {
  addActivity: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  adminCheck: PropTypes.bool
};

All.defaultProps = {
  adminCheck: false
};

const mapStateToProps = state => ({
  activities: selectAllActivities(state),
  adminCheck: state.apd.adminCheck.enabled
});

const mapDispatchToProps = {
  addActivity: actualAddActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(All);

export { All as plain, mapStateToProps, mapDispatchToProps };
