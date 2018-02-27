import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { updateUser } from '../actions/user';
import FormStateStart from '../components/FormStateStart';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class StateStart extends Component {
  showResults = data => {
    console.log(data);
    this.props.updateUser(data);
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
  goTo: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  goTo: path => push(path),
  updateUser
};

export default connect(null, mapDispatchToProps)(withSidebar(StateStart));
