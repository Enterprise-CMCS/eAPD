import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useParams as actualUseParams } from 'react-router-dom';
import ContinuePreviousButtons from '../../components/ContinuePreviousButtons';

import {
  selectActivitiesSidebar,
  selectActivityCount
} from '../../reducers/activities.selectors';
import { addActivity as actualAddActivity } from '../../actions/editActivity';

const SecondaryNav = ({ activityCount, addActivity, location, useParams }) => {
  const { activityIndex } = useParams();
  const { apdId } = useParams();

  const showAddActivityLink =
    Number(activityIndex) + 1 === activityCount &&
    location.pathname.endsWith('ffp');

  return (
    <Fragment>
      {showAddActivityLink && (
        <div className="pre-button-section-break">
          <Link
            to={`/apd/${apdId}/activities`}
            onClick={addActivity}
            className="ds-c-button"
          >
            Add Activity
          </Link>
        </div>
      )}
      <div className="pre-button-section-break">
        <ContinuePreviousButtons />
      </div>
    </Fragment>
  );
};

SecondaryNav.defaultProps = {
  useParams: actualUseParams
};

SecondaryNav.propTypes = {
  activityCount: PropTypes.number.isRequired,
  addActivity: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  useParams: PropTypes.func
};

const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state),
  activityCount: selectActivityCount(state),
  location: state.router.location
});

const mapDispatchToProps = {
  addActivity: actualAddActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryNav);

export { SecondaryNav as plain, mapStateToProps, mapDispatchToProps };
