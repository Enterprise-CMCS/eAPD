import React from 'react';
import { connect } from 'react-redux';

import Collapsible from '../components/Collapsible';

// <ActivityDescription activity={a} />

const ActivityDetailDescription = () => (
  <Collapsible title="Needs and Objectives">
    <div>...</div>
  </Collapsible>
);

const mapStateToProps = ({ activities }) => ({
  activityIds: activities.allIds
});

export default connect(mapStateToProps)(ActivityDetailDescription);
