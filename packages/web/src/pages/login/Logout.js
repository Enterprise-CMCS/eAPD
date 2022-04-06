// import React, { Fragment, useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout as dispatchLogout } from '../../actions/auth';

const Logout = ({ authenticated, logout }) => {
  const history = useHistory();
  useEffect(
    () => {
      logout();
    },
    // we want this to run on load so we don't need any thing
    // in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

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
