import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { logout } from '../actions/auth';

class TopNav extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { authenticated, place } = this.props;

    return (
      <header className="clearfix px2 py1 bg-white">
        <div className="left">
          <Link to="/" className="btn px0 bold caps">
            {place
              ? t('title', { place: place.name, year: 2018 })
              : t('titleBasic')}
          </Link>
        </div>
        <div className="right py-tiny h5">
          {authenticated ? (
            <button
              type="button"
              className="btn btn-primary px1 py-tiny"
              onClick={this.handleLogout}
            >
              {t('logout')}
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary px1 py-tiny">
              {t('login')}
            </Link>
          )}
        </div>
      </header>
    );
  }
}

TopNav.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  place: PropTypes.object,
  logout: PropTypes.func.isRequired
};

TopNav.defaultProps = {
  place: null
};

const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });
const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
