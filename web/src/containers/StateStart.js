import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import FormLogger from '../util/formLogger';

import FormStateStart from '../components/FormStateStart';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';

class StateStart extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <div>
        <FormLogger />
        <h1>Let’s start by setting up your state profile</h1>
        <FormStateStart onSubmit={this.showResults} />
        <PageNavButtons goTo={goTo} next="/state-contacts" />
      </div>
    );
  }
}

StateStart.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(withSidebar(StateStart));
