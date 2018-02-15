import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, NavLink, Toolbar } from 'rebass';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

class TopNav extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { authenticated } = this.props;

    return (
      <Toolbar bg="black">
        <NavLink to="/" is={Link}>
          CMS HITECH APD
        </NavLink>
        {authenticated ? (
          <Box ml="auto">
            <NavLink to="/state-start" is={Link}>
              Get started
            </NavLink>
            <NavLink href="#!" onClick={this.handleLogout}>
              Log out
            </NavLink>
          </Box>
        ) : (
          <NavLink to="/login" is={Link} ml="auto">
            Log in
          </NavLink>
        )}
      </Toolbar>
    );
  }
}

TopNav.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });
const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
