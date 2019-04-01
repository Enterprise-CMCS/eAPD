import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Alert, Button, TextField } from '@cmsgov/design-system-core';

import { login } from '../actions/auth';
import Password from '../components/PasswordWithMeter';
import Header from '../components/Header';

class Login extends Component {
  state = { username: '', password: '' };

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

  render() {
    const { authenticated, error, fetching, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { username, password } = this.state;

    if (authenticated) {
      if (from.pathname !== '/logout') {
        return <Redirect to={from} />;
      }
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Header />
        <div className="card--container">
          <div className="ds-l-container card">
            <div className="ds-l-row">
              <div className="ds-l-col--1 ds-u-margin-left--auto" />
              <div className="ds-l-col--12 ds-l-sm-col--10 ds-l-lg-col--6">
                <h1 className="ds-h1">Log in</h1>
                {error && error==="Unauthorized" && (
                  <Alert variation='error' role='alert'>
                    The email or password you&apos;ve entered is incorrect.
                  </Alert>
                )}
                {error && error!=="Unauthorized" && (
                  <Alert variation='error' role='alert'>
                    <strong>Sorry!</strong> Something went wrong. Please try again.
                  </Alert>
                )}
                <form onSubmit={this.handleSubmit}>
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
                  <Button
                    type="submit"
                    disabled={fetching || username.length === 0 || password.length === 0}
                    variation="primary"
                    className="ds-u-margin-y--4"
                  >
                  {fetching ? 'Logging in' : 'Log in'}
                </Button>
              </form>
            </div>
            <div className="ds-l-col--1 ds-u-margin-right--auto" />
          </div>
        </div>
      </div>
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
