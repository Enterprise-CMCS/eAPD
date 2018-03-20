import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';

import withSidebar from '../components/withSidebar';
import { fetchApdDataIfNeeded } from '../actions/apd';

class ActivitiesList extends Component {
  componentDidMount() {
    this.props.fetchApdDataIfNeeded();
  }

  render() {
    const { apd, activities, goTo } = this.props;

    return (
      <div>
        <h1>Activities</h1>
        {!apd.loaded ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            Now we will fill out the details of each activity. You will be able
            to describe the activity, its goals and approaches, schedule,
            personnel, and expenses on the following screens.
            <div className="mb3">
              {activities.map(({ name, started }) => (
                <div
                  key={name}
                  className="py1 relative border-bottom border-silver"
                >
                  <div className="absolute right-0">
                    <Link to={`/activity-overview/${name}`}>
                      {started ? 'Continue' : 'Start'}
                    </Link>
                  </div>
                  {name}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-outline blue mr1"
              onClick={() => goTo('/activities-start')}
            >
              Back
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

ActivitiesList.propTypes = {
  activities: PropTypes.array.isRequired,
  apd: PropTypes.object.isRequired,
  fetchApdDataIfNeeded: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd }) => ({
  apd,
  activities: apd.data.activities.map(activity => ({
    id: activity.id,
    name: activity.name,
    started: !!(activity.goals && activity.goals.length > 0)
  }))
});

const mapDispatchToProps = {
  goTo: push,
  fetchApdDataIfNeeded
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(ActivitiesList)
);

export {
  ActivitiesList as RawActivitiesList,
  mapStateToProps,
  mapDispatchToProps
};
