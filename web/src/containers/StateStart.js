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
    // TODO: don't hardcode user id
    this.props.fetchUserDataIfNeeded(57);
  }

  showResults = (data) => {
    // TODO: don't hardcode user id
    this.props.updateUser(57, data);
  };

  render() {
    const { goTo, user } = this.props;
    console.log(user);

    return (
      <div>
        <FormLogger />
        <h1>Let’s start by setting up your state profile</h1>
        {!user.loaded ? (
          <p>Loading...</p>
        ) : (
          <div>
            <FormStateStart
              initialValues={user.data}
              onSubmit={this.showResults}
            />
            <PageNavButtons goTo={goTo} next="/state-contacts" />
          </div>
        )}
      </div>
    );
  }
}

StateStart.propTypes = {
  goTo: PropTypes.func.isRequired,
  fetchUserDataIfNeeded: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  goTo: (path) => push(path),
  fetchUserDataIfNeeded,
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(StateStart)
);
