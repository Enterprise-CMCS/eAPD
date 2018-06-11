import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../actions/auth';
import Container from '../components/Container';

class Login extends Component {
  state = { username: '', password: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    const { authenticated, error, fetching, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { username, password } = this.state;

    if (authenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Container>
        <div className="mx-auto my3 p2 sm-col-6 md-col-4 bg-gray-lightest rounded">
          <h1 className="mt0 h2">Please log in.</h1>
          {error && (
            <div className="mb2 p1 h6 alert alert-error">
              <strong>Sorry!</strong> Something went wrong. Please try again.
            </div>
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="mb2">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                name="username"
                className="input"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={fetching}
            >
              {fetching ? 'Submitting' : 'Submit'}
            </button>
          </form>
        </div>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
