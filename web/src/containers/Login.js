import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Button, Code, Heading, Input, Label, Message } from 'rebass';
import { attemptLogin } from '../actions/auth';

class Login extends Component {
  state = { username: '', password: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.attemptLogin(username, password);
  };

  render() {
    const { fetching, error, authenticated } = this.props;
    const { username, password } = this.state;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Box py={4}>
        <Heading mb={3}>Please log in.</Heading>
        <Box mb={3} w={[1, 1 / 2, 1 / 3]}>
          {error && (
            <Message mb={2} bg="gray">
              {error}
            </Message>
          )}
          <form onSubmit={this.handleSubmit}>
            <Box mb={3}>
              <Label>Username</Label>
              <Input
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </Box>
            <Box mb={3}>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </Box>
            <Button type="submit" disabled={fetching}>
              {fetching ? 'Submitting' : 'Submit'}
            </Button>
          </form>
        </Box>
        <Code>{JSON.stringify({ fetching, error, authenticated })}</Code>
      </Box>
    );
  }
}

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  attemptLogin: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ ...auth });
const mapDispatchToProps = { attemptLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
