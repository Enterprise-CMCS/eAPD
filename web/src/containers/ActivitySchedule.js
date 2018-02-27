import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import FormActivitySchedule from '../components/FormActivitySchedule';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class ActivitySchedule extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <div>
        <FormLogger />
        <h1>Tell us about the schedule for Administration</h1>
        <FormActivitySchedule onSubmit={this.showResults} />
        <PageNavButtons
          goTo={goTo}
          prev="/activity-approach"
          next="/state-personnel"
        />
      </div>
    );
  }
}

ActivitySchedule.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(withSidebar(ActivitySchedule));
