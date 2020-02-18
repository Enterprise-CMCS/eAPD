import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import FormAndReviewList from '../../components/FormAndReviewList';
import EntryDetails from './EntryDetails';
import {
  NameAndFundingSourceForm,
  NameAndFundingSourceReview
} from './NameAndFundingSource';
import Waypoint from '../ConnectedWaypoint';
import { addActivity, removeActivity } from '../../actions/editActivity';
import { Section, Subsection } from '../../components/Section';
import { selectAllActivities } from '../../reducers/activities.selectors';

const All = ({ add, first, other, remove }) => {
  const onAdd = () => add();

  const onRemove = index => {
    remove(index);
  };

  return (
    <Waypoint id="activities-overview">
      <Section isNumbered id="activities" resource="activities">
        <Waypoint id="activities-list" />
        <Subsection id="activities-list" resource="activities.list" open>
          <NameAndFundingSourceReview item={first} index={-1} disableExpand />
          <FormAndReviewList
            addButtonText="Add another activity"
            allowDeleteAll
            list={other}
            className="ds-u-border-bottom--0"
            collapsed={NameAndFundingSourceReview}
            expanded={NameAndFundingSourceForm}
            noDataMessage={false}
            onAddClick={onAdd}
            onDeleteClick={onRemove}
          />
        </Subsection>
        {[first, ...other].map(({ key }, index) => (
          <Waypoint id={key} key={key}>
            <EntryDetails activityIndex={index} />
          </Waypoint>
        ))}
      </Section>
    </Waypoint>
  );
};

All.propTypes = {
  add: PropTypes.func.isRequired,
  first: PropTypes.object.isRequired,
  other: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const activities = selectAllActivities(state);
  return {
    first: activities[0],
    other: activities.slice(1)
  };
};

const mapDispatchToProps = {
  add: addActivity,
  remove: removeActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(All);

export { All as plain, mapStateToProps, mapDispatchToProps };
