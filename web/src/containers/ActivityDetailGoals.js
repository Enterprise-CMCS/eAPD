import React from 'react';
import { connect } from 'react-redux';

import Collapsible from '../components/Collapsible';

const ActivityDetailDescription = () => (
  <Collapsible title="Needs and Objectives">
    <div>...</div>
  </Collapsible>
);

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

export default connect(mapStateToProps)(ActivityDetailDescription);
