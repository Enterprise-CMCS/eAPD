import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

const All = () => {
  const dispatch = useDispatch();

  const { activities } = useSelector(state => ({
    activities: selectAllActivities(state)
  }));

  const add = () => dispatch(addActivity());

  const update = () => {};

  const remove = key => {
    activities.forEach(({ key: activityKey }, i) => {
      if (activityKey === key) {
        dispatch(removeActivity(i));
      }
    });
  };

  return (
    <Waypoint id="activities-overview">
      <Section isNumbered id="activities" resource="activities">
        <Waypoint id="activities-list" />
        <Subsection id="activities-list" resource="activities.list" open>
          <NameAndFundingSourceReview
            item={activities[0]}
            index={-1}
            disableExpand
          />
          <FormAndReviewList
            addButtonText="Add another activity"
            allowDeleteAll
            list={activities.slice(1)}
            className="ds-u-border-bottom--0"
            collapsed={NameAndFundingSourceReview}
            expanded={NameAndFundingSourceForm}
            noDataMessage={false}
            onAddClick={add}
            handleChange={update}
            onDeleteClick={remove}
          />
        </Subsection>
        {activities.map((activity, index) => (
          <Waypoint id={activity.key} key={activity.key}>
            <EntryDetails activity={activity} index={index} />
          </Waypoint>
        ))}
      </Section>
    </Waypoint>
  );
};
export default All;
