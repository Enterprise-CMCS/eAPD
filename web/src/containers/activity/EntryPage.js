import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AlertMissingFFY from '../../components/AlertMissingFFY';
import ActivityRoutes from '../../pages/apd/activities/ActivityRoutes';

const EntryPage = ({ activityNames }) => {
  const activityIndex = +useParams().activityIndex;

  return (
    <div className="remove-clearfix" id="activity-entry-page">
      <h2>
        Activity {activityIndex + 1}:{' '}
        {activityNames[activityIndex] || 'Untitled'}
      </h2>
      <AlertMissingFFY />
      <ActivityRoutes activityIndex={activityIndex} />
    </div>
  );
};

EntryPage.propTypes = {
  activityNames: PropTypes.array.isRequired
};

const mapStateToProps = ({
  apd: {
    data: { activities }
  }
}) => ({ activityNames: activities.map(({ name }) => name) });

export default connect(mapStateToProps)(EntryPage);

export { EntryPage as plain, mapStateToProps };
