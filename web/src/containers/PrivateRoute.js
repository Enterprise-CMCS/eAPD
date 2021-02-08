import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getAccessToken } from '../util/auth';

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'gov.cms.eapd.api-token'
  ]);

  useEffect(() => {
    if (process.env.API_URL) {
      const apiToken = cookies['gov.cms.eapd.api-token'];
      if (authenticated) {
        if (!apiToken) {
          const jwt = getAccessToken();
          setCookie(
            'gov.cms.eapd.api-token',
            `{${escape(`accessToken=${jwt}`)}`,
            {
              path: '/',
              maxAge: 900,
              domain: '.cms.gov',
              secure: true,
              // httpOnly: true,
              sameSite: 'lax'
            }
          );
        }
      } else {
        removeCookie('gov.cms.eapd.api-token');
      }
    }
  }, [authenticated]);

  return (
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
};

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });

export default connect(mapStateToProps)(PrivateRoute);

export { PrivateRoute as plain, mapStateToProps };
