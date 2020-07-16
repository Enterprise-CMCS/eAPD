import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NextPreviousButtons from './NextPreviousButtons';
import { jumpTo } from '../actions/app';
import {
  selectActivitiesSidebar,
  selectActivityCount
} from '../reducers/activities.selectors';
import { addActivity } from '../actions/editActivity';
import { selectActiveSection } from '../reducers/navigation';

const SecondaryNav = ({
  activeSection,
  activities,
  activityCount,
  jumpTo: jumpAction,
  add
}) => {
  const onAdd = () => {
    add();
    jumpAction(`activities-list`);
    window.scrollTo(0, 0);
  };

  const activityIndex = activities.findIndex(a =>
    activeSection.includes(a.anchor)
  );

  return (
    <Fragment>
      {activityIndex + 1 === activityCount &&
        activeSection.includes('ffp') && (
          <div className="pre-button-section-break">
            <Link
              to="/apd/activities"
              onClick={onAdd}
              className="ds-c-button"
            >
              Add another activity
            </Link>
          </div>
        )}
      <div className="pre-button-section-break">
        <NextPreviousButtons />
      </div>
    </Fragment>
  );
};

SecondaryNav.propTypes = {
  activities: PropTypes.array.isRequired,
  activeSection: PropTypes.string.isRequired,
  activityCount: PropTypes.number.isRequired,
  jumpTo: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state),
  activeSection: selectActiveSection(state),
  activityCount: selectActivityCount(state)
});

const mapDispatchToProps = {
  jumpTo,
  add: addActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryNav);

export { SecondaryNav as plain, mapStateToProps, mapDispatchToProps };
