import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import EntryDetails from './EntryDetails';
import { addActivity } from '../../actions/editActivity';
import { Section } from '../../components/Section';
import { selectAllActivities } from '../../reducers/activities.selectors';

const All = ({ add, activities }) => {
  const onAdd = () => add();

  return (
    <Section id="activities" resource="activities">
      <h3 className="ds-h3 ds-u-padding-bottom--1">
        {activities.length} Program Activities
      </h3>
      {activities.map((_, index) => (
        <EntryDetails activityIndex={index} />
      ))}
      <Button className="ds-u-margin-top--4" onClick={onAdd}>
        Add another activity
      </Button>
    </Section>
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
