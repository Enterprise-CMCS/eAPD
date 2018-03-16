import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { fetchApdDataIfNeeded, updateApdActivity } from '../actions/apd';
import FormActivityOverview from '../components/FormActivityOverview';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class ActivityOverview extends Component {
  componentDidMount() {
    this.props.fetchApdDataIfNeeded();
  }

  showResults = data => {
    this.props.updateApdActivity(this.props.activity.id, {
      description: data.description
    });
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
              Tell us more about your plans for <em>{activity.name}</em>
            </h1>
            <FormActivityOverview
              initialValues={activity}
              onSubmit={this.showResults}
            />
            <PageNavButtons
              goTo={goTo}
              prev="/activities-list"
              next={`/activity-goals/${activity.name}`}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

ActivityOverview.propTypes = {
  activity: PropTypes.object.isRequired,
  apd: PropTypes.object.isRequired,
  fetchApdDataIfNeeded: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  updateApdActivity: PropTypes.func.isRequired
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
  goTo: push,
  fetchApdDataIfNeeded,
  updateApdActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(ActivityOverview)
);
