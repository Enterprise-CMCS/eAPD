import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import FormActivityApproach from '../components/FormActivityApproach';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class ActivityApproach extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { activity, goTo } = this.props;

    return (
      <div>
        <FormLogger />
        <h1>
          Help us understand your approach to <em>{activity.name}</em>
        </h1>
        <FormActivityApproach onSubmit={this.showResults} />
        <PageNavButtons
          goTo={goTo}
          prev="/activity-goals"
          next="/activity-schedule"
        />
      </div>
    );
  }
}

ActivityApproach.propTypes = {
  activity: PropTypes.object.isRequired,
  goTo: PropTypes.func.isRequired
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(ActivityApproach)
);
