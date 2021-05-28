// import React, { Fragment, useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout as dispatchLogout } from '../actions/auth';

const Logout = ({ authenticated, failedLogout, logout, error }) => {
  const history = useHistory();
  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated]);

  // Since we are still removing cookies we don't have to show this 
  // message. Leaving this failedLogout condition just in case
  return (
    <div>
    {failedLogout && (
      <div className="site-body ds-l-container">
        <main id="start-main-content">
          <div className="ds-u-padding-top--2">
            <h1>Unable to successfully logout</h1>
            <p>There was an error attempting to logout. Please try again.</p>
            <p>{error}</p>
          </div>
        </main>
      </div>
    )}
    <span />
    </div>
  );
};

Logout.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  failedLogout: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  error: PropTypes.string
};

Logout.defaultProps = {
  error: ''
};

const mapStateToProps = ({
  auth: {
    authenticated,
    failedLogout,
    error
  }
}) => ({
  authenticated,
  failedLogout,
  error
});

const mapDispatchToProps = { logout: dispatchLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

export { Logout as plain, mapDispatchToProps };
