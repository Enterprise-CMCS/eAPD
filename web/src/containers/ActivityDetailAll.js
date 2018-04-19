import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ActivityDetailDescription from './ActivityDetailDescription';
import ActivityDetailGoals from './ActivityDetailGoals';
import Collapsible from '../components/Collapsible';

const activityTitle = (a, i) => {
  let title = `Activity ${i}`;
  if (a.name) title += `: ${a.name}`;
  if (a.types.length) title += ` (${a.types.join(', ')})`;
  return title;
};

const ActivityDetailAll = ({ aId, title }) => (
  <Collapsible title={title} bgColor="darken-1" open>
    <ActivityDetailDescription aId={aId} />
    <ActivityDetailGoals aId={aId} />
  </Collapsible>
);

ActivityDetailAll.propTypes = {
  aId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId, num }) => {
  const activity = byId[aId];
  const title = `Program Activities › ${activityTitle(activity, num)}`;

  return { title };
};

export default connect(mapStateToProps)(ActivityDetailAll);
