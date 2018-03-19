import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import PageNavButtons from '../components/PageNavButtons';
import FormActivitiesList from '../components/FormActivitiesList';
import withSidebar from '../components/withSidebar';
import { fetchApdDataIfNeeded, addApdActivity } from '../actions/apd';

class ActivitiesList extends Component {
  componentDidMount() {
    this.props.fetchApdDataIfNeeded();
  }

  submit = data =>
    this.props
      .addApdActivity(this.props.apdID, data.activities.filter(a => a.name))
      .then(() => {
        // finish nav?
        console.log('all done with adding activities');
      })
      .catch(e => {
        console.log('oh snaps something broke');
        console.log(e);
      });

  render() {
    const { apd, activities, goTo } = this.props;

    return (
      <div>
        <h1>Now let’s go over your program activities</h1>
        {!apd.loaded ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <FormActivitiesList
              onSubmit={this.submit}
              initialValues={{ activities }}
            />

            <PageNavButtons
              goTo={goTo}
              prev="/apd-overview/"
              next="/activities-list"
            />
          </Fragment>
        )}
      </div>
    );
  }
}

ActivitiesList.propTypes = {
  activities: PropTypes.array.isRequired,
  addApdActivity: PropTypes.func.isRequired,
  apd: PropTypes.object.isRequired,
  apdID: PropTypes.number.isRequired,
  fetchApdDataIfNeeded: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd }) => ({
  apd,
  apdID: apd.data.id,
  activities: apd.data.activities.map(activity => ({
    id: activity.id,
    name: activity.name,
    started: activity.goals.length > 0
  }))
});

const mapDispatchToProps = {
  goTo: push,
  fetchApdDataIfNeeded,
  addApdActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(ActivitiesList)
);

export {
  ActivitiesList as RawActivitiesList,
  mapStateToProps,
  mapDispatchToProps
};
