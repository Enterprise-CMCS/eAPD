import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthTry extends Component {
  componentDidMount() {
    console.log('auth try mount');
  }

  render() {
    const { from } = this.props;
    return <Redirect to={from} />;
  }
}

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });

export default connect(mapStateToProps)(PrivateRoute);
