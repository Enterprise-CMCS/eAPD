import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <nav className="clearfix py1 white bg-black">
        <div className="sm-col">
          <Link to="/" className="btn">
            CMS HITECH APD
          </Link>
        </div>
        <div className="sm-col-right h5">
          {authenticated ? (
            <div>
              <Link to="/state-start" className="btn">
                Get started
              </Link>
              <button type="button" className="btn" onClick={this.handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Log in
            </Link>
          )}
        </div>
      </nav>
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
