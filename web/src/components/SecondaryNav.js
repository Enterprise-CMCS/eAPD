import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useParams as actualUseParams } from 'react-router-dom';
import ContinuePreviousButtons from './ContinuePreviousButtons';
import {
  selectActivitiesSidebar,
  selectActivityCount
} from '../reducers/activities.selectors';
import { addActivity } from '../actions/editActivity';

const SecondaryNav = ({
  activityCount,
  addActivity,
  location,
  useParams = actualUseParams
}) => {
  const { activityIndex } = useParams();
  const showAddActivityLink = activityIndex + 1 === activityCount &&
    location.pathname.endsWith('ffp');

  return (
    <Fragment>
      {showAddActivityLink && (
        <div className="pre-button-section-break">
          <Link
            to="/apd/activities"
            onClick={addActivity}
            className="ds-c-button"
          >
            Add another activity
          </Link>
        </div>
      )}
      <div className="pre-button-section-break">
        <ContinuePreviousButtons />
      </div>
    </Fragment>
  );
};

SecondaryNav.propTypes = {
  activityCount: PropTypes.number.isRequired,
  addActivity: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state),
  activityCount: selectActivityCount(state),
  location: state.router.location
});

const mapDispatchToProps = {
  addActivity
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryNav);

export { SecondaryNav as plain, mapStateToProps, mapDispatchToProps };
