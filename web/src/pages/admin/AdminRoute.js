import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsFedAdmin } from '../../redux/selectors/user.selector';
import NoMatch from '../../components/NoMatch';

const AdminRoute = ({ authenticated, children, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated) {
          if (isAdmin) {
            return <Fragment>{children}</Fragment>;
          }

          // If they're logged in but not an admin, display the equivalent of
          // a 404 page rather than reveal this page exists.
          return <NoMatch />;
        }
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

AdminRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType(PropTypes.func, PropTypes.object),
  isAdmin: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  isAdmin: getIsFedAdmin(state)
});

export default connect(mapStateToProps)(AdminRoute);

export { AdminRoute as plain, mapStateToProps };
