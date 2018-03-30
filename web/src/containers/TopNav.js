import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// to optimize bundle, explicitly importing only the icons used
// TODO: once we're using icons more, move these to a central location
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHelp from '@fortawesome/fontawesome-free-regular/faQuestionCircle';
import faBell from '@fortawesome/fontawesome-free-solid/faBell';
import faSignOut from '@fortawesome/fontawesome-free-solid/faSignOutAlt';

import { logout } from '../actions/auth';

class TopNav extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { authenticated } = this.props;

    return (
      <header className="clearfix py1 border-bottom border-silver">
        <div className="sm-col">
          <Link to="/" className="btn">
            2018 HITECH APD
          </Link>
        </div>
        <div className="sm-col-right h5">
          {authenticated ? (
            <div>
              <button type="button" className="btn h5 regular">
                <span className="mr-tiny">Notifications</span>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button type="button" className="btn h5 regular">
                <span className="mr-tiny">Help</span>
                <FontAwesomeIcon icon={faHelp} />
              </button>
              <button
                type="button"
                className="btn h5 regular"
                onClick={this.handleLogout}
              >
                <span className="mr-tiny">Log out</span>
                <FontAwesomeIcon icon={faSignOut} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn h5 regular">
              Log in
            </Link>
          )}
        </div>
      </header>
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
