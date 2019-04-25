import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TextField } from '@cmsgov/design-system-core';

import ConsentBanner from '../components/ConsentBanner';
import { login } from '../actions/auth';
import CardForm from '../components/CardForm';
import Password from '../components/PasswordWithMeter';

class Login extends Component {
  state = { showConsent: true, username: '', password: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { login: action } = this.props;
    const { username, password } = this.state;
    action(username, password);
  };

  hideConsent = () => {
    this.setState({ showConsent: false });
  };

  render() {
    const { authenticated, error, fetching, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { showConsent, username, password } = this.state;

    if (authenticated) {
      if (from.pathname !== '/logout') {
        return <Redirect to={from} />;
      }
      return <Redirect to="/" />;
    }

    if (showConsent) {
      return (
        <Fragment>
          <ConsentBanner onAgree={this.hideConsent} />
        </Fragment>
      );
    }

    let errorMessage = false;
    if (error === 'Unauthorized') {
      errorMessage = 'The email or password you’ve entered is incorrect.';
    } else if (error === 'Unauthorized') {
      errorMessage = 'Sorry! Something went wrong. Please try again.';
    }

    return (
      <Fragment>
        <CardForm
          title="Log in"
          cancelable={false}
          canSubmit={username.length && password.length}
          error={errorMessage}
          working={fetching}
          primaryButtonText={['Log in', 'Logging in']}
          onSave={this.handleSubmit}
          footer={
            <p>
              Forgot your password? Contact{' '}
              <a href="mailto:CMS-EAPD@cms.hhs.gov?subject=Password%20Recovery%20Request%20for%20eAPD">
                CMS-EAPD@cms.hhs.gov
              </a>
            </p>
          }
        >
          <TextField
            id="username"
            label="Email"
            name="username"
            ariaLabel="Enter the email associated with this account."
            value={username}
            onChange={this.handleChange}
          />
          <Password
            title="Password"
            value={password}
            onChange={this.handleChange}
          />
        </CardForm>
      </Fragment>
    );
  }
}

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth: { authenticated, error, fetching } }) => ({
  authenticated,
  error,
  fetching
});

const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export { Login as plain, mapStateToProps, mapDispatchToProps };
