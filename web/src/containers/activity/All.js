import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import EntryDetails from './EntryDetails';
import Waypoint from '../ConnectedWaypoint';
import { addActivity } from '../../actions/editActivity';
import { Section } from '../../components/Section';
import { selectAllActivities } from '../../reducers/activities.selectors';

const All = ({ add, first, other }) => {
  const onAdd = () => add();

  return (
    <Waypoint id="activities-overview">
      <Section isNumbered id="activities" resource="activities">
        <h3 className="subsection--title ds-h3">
          {other.length + 1} program activities
        </h3>
        {[first, ...other].map(({ key }, index) => (
          <Waypoint id={key} key={key}>
            <EntryDetails activityIndex={index} />
          </Waypoint>
        ))}
        <Button className="ds-u-margin-top--4" onClick={onAdd}>
          Add another activity
        </Button>
      </Section>
    </Waypoint>
  );
};

All.propTypes = {
  add: PropTypes.func.isRequired,
  first: PropTypes.object.isRequired,
  other: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => {
  const activities = selectAllActivities(state);
  return {
    first: activities[0],
    other: activities.slice(1)
  };
};

const mapDispatchToProps = {
  add: addActivity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(All);

export { All as plain, mapStateToProps, mapDispatchToProps };
