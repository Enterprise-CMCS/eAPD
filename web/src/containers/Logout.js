// import React, { Fragment, useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout as dispatchLogout } from '../actions/auth';

const Logout = ({ authenticated, logout }) => {
  const history = useHistory();
  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated]);

  return <span />;
};

Logout.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth: { authenticated } }) => ({
  authenticated
});

const mapDispatchToProps = { logout: dispatchLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

export { Logout as plain, mapDispatchToProps };
