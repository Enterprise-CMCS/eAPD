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
import {
  addActivity,
  removeActivity,
  updateActivity
} from '../../actions/activities';
import { Section, Subsection } from '../../components/Section';
import { t } from '../../i18n';
import {
  selectActivityKeys,
  selectAllActivities
} from '../../reducers/activities.selectors';

const All = ({ activityKeys, activities, add, update, remove }) => (
  <Waypoint id="activities-overview">
    <Section isNumbered id="activities" resource="activities">
      <Waypoint id="activities-list" />
      <Subsection id="activities-list" resource="activities.list" open>
        <FormAndReviewList
          addButtonText="Add another activity"
          list={activities}
          collapsed={NameAndFundingSourceReview}
          expanded={NameAndFundingSourceForm}
          noDataMessage={t('activities.noActivityMessage')}
          onAddClick={add}
          handleChange={update}
          onDeleteClick={remove}
        />
      </Subsection>
      {activityKeys.map((key, idx) => (
        <Waypoint id={key} key={key}>
          <EntryDetails aKey={key} num={idx + 1} />
        </Waypoint>
      ))}
    </Section>
  </Waypoint>
);

All.propTypes = {
  activityKeys: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  activityKeys: selectActivityKeys(state),
  activities: selectAllActivities(state)
});

export const mapDispatchToProps = {
  add: addActivity,
  remove: removeActivity,
  update: updateActivity
};

export { All as AllRaw };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(All);
