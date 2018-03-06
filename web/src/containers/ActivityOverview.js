import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import FormActivityOverview from '../components/FormActivityOverview';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class ActivityOverview extends Component {
  showResults = (data) => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <div>
        <FormLogger />
        <h1>
          Tell us more about your plans for <em>Administration</em>
        </h1>
        <FormActivityOverview onSubmit={this.showResults} />
        <PageNavButtons
          goTo={goTo}
          prev="/activities-list"
          next="/activity-goals"
        />
      </div>
    );
  }
}

ActivityOverview.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ goTo: (path) => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(withSidebar(ActivityOverview));
