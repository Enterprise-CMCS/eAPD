import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ authenticated, children, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Fragment>{children}</Fragment>
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
  children: PropTypes.elementType.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });

export default connect(mapStateToProps)(PrivateRoute);

export { PrivateRoute as plain, mapStateToProps };
