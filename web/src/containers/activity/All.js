import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import EntryDetails from './EntryDetails';
import Waypoint from '../ConnectedWaypoint';
import { addActivity } from '../../actions/editActivity';
import { Section } from '../../components/Section';
import { selectAllActivities } from '../../reducers/activities.selectors';

const All = ({ add, activities }) => {
  const onAdd = () => add();

  return (
    <Waypoint id="activities-overview">
      <Section isNumbered id="activities" resource="activities">
        <h3 className="subsection--title ds-h3">
          {activities.length} program activities
        </h3>
        {activities.map(({ key }, index) => (
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
  activities: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({ activities: selectAllActivities(state) });

const mapDispatchToProps = {
  add: addActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(All);

export { All as plain, mapStateToProps, mapDispatchToProps };
