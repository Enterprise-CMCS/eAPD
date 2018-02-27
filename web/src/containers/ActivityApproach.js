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
    const { goTo } = this.props;

    return (
      <div>
        <FormLogger />
        <h1>
          Help us understand your approach to <em>Administration</em>
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
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(withSidebar(ActivityApproach));
