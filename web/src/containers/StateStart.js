import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { fetchUserDataIfNeeded, updateUser } from '../actions/user';
import FormStateStart from '../components/FormStateStart';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

// const sample = {
//   name: '',
//   position: 'Director',
//   email: 'first.last@state.gov',
//   phone: '555-123-4567',
//   state: 'vt'
// };

class StateStart extends Component {
  componentDidMount() {
    console.log('state start!');
    this.props.fetchUserDataIfNeeded();
  }

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
        <FormStateStart initialValues={{}} onSubmit={this.showResults} />
        <PageNavButtons goTo={goTo} next="/state-contacts" />
      </div>
    );
  }
}

StateStart.propTypes = {
  goTo: PropTypes.func.isRequired,
  fetchUserDataIfNeeded: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  goTo: path => push(path),
  fetchUserDataIfNeeded,
  updateUser
};

export default connect(null, mapDispatchToProps)(withSidebar(StateStart));
