import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchApdDataIfNeeded, updateApdActivityGoals } from '../actions/apd';

import FormActivityGoals from '../components/FormActivityGoals';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class ActivityGoals extends Component {
  componentDidMount() {
    this.props.fetchApdDataIfNeeded();
  }

  showResults = data => {
    this.props.updateApdActivityGoals(this.props.activity.id, data.goals);
  };

  render() {
    const { apd, activity, goTo } = this.props;

    return (
      <div>
        <FormLogger />
        {!apd.loaded ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <h1>
              Add goals and objectives for <em>{activity.name}</em>
            </h1>
            <FormActivityGoals
              initialValues={activity}
              onSubmit={this.showResults}
            />
            <PageNavButtons
              goTo={goTo}
              prev={`/activity-overview/${activity.name}`}
              next={`/activity-approach/${activity.name}`}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

ActivityGoals.propTypes = {
  apd: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  fetchApdDataIfNeeded: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  updateApdActivityGoals: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd }, props) => {
  const activity =
    apd.data.activities.filter(
      a => a.name === props.match.params.activityName
    )[0] || {};

  return {
    apd,
    activity
  };
};

const mapDispatchToProps = {
  fetchApdDataIfNeeded,
  goTo: push,
  updateApdActivityGoals
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(ActivityGoals)
);
