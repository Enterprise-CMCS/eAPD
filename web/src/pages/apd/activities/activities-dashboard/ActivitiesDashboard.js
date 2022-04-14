import { Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import EntryDetails from './Activity';
import { addActivity as actualAddActivity } from '../../../../actions/editActivity';
import { Section } from '../../../../components/Section';
import { selectAllActivities } from '../../../../reducers/activities.selectors';
import Waypoint from '../../../../containers/ConnectedWaypoint';
import AlertMissingFFY from '../../../../components/AlertMissingFFY';

const All = ({ addActivity, activities }) => {
  const { apdId } = useParams();
  return (
    <React.Fragment>
      <Waypoint /> {/* Waypoint w/o id indicates top of page */}
      <AlertMissingFFY />
      <Section id="activities" resource="activities">
        <hr className="custom-hr" />
        {activities.map((activity, index) => (
          <EntryDetails
            apdId={apdId}
            activityIndex={index}
            key={activity.key}
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
  activities: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  activities: selectAllActivities(state)
});

const mapDispatchToProps = {
  addActivity: actualAddActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(All);

export { All as plain, mapStateToProps, mapDispatchToProps };
