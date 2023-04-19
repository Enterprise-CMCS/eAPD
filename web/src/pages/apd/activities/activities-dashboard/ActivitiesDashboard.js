import { Button, Alert } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import EntryDetails from './Activity';
import { addActivity as actualAddActivity } from '../../../../redux/actions/editActivity';
import { Section } from '../../../../components/Section';
import { selectAllActivities } from '../../../../redux/selectors/activities.selectors';
import {
  selectAdminCheckEnabled,
  selectApdType
} from '../../../../redux/selectors/apd.selectors';
import Waypoint from '../../../../components/ConnectedWaypoint';
import AlertMissingFFY from '../../../../components/AlertMissingFFY';

import { activitiesDashboard as schema } from '@cms-eapd/common';
import Instruction from '../../../../components/Instruction';

const All = ({ addActivity, activities, adminCheck, apdType }) => {
  const { apdId } = useParams();
  const [validation, setValidation] = useState(adminCheck);

  useEffect(() => {
    if (adminCheck) {
      setValidation(schema.validate(activities));
    } else {
      setValidation();
    }
  }, [adminCheck, activities]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Waypoint /> {/* Waypoint w/o id indicates top of page */}
      <AlertMissingFFY />
      <Section id="activities" resource="activities">
        <hr className="custom-hr" />
        {apdType === 'MMIS' && (
          <Instruction
            labelFor="dashboard-instructions"
            source="activities.dashboardInstructionsMMIS.instruction"
          />
        )}
        {activities.length == 0 && <p>Add at least one activity.</p>}
        {validation?.error && (
          <Fragment>
            <Alert variation="error">{validation?.error?.message}</Alert>
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
  adminCheck: PropTypes.bool.isRequired,
  apdType: PropTypes.string
};

const mapStateToProps = state => ({
  activities: selectAllActivities(state),
  adminCheck: selectAdminCheckEnabled(state),
  apdType: selectApdType(state)
});

const mapDispatchToProps = {
  addActivity: actualAddActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(All);

export { All as plain, mapStateToProps, mapDispatchToProps };
