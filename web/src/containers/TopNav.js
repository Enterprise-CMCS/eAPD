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
    const btnClass = 'btn btn-primary px1 py-tiny';

    return (
      <header className="clearfix py1 bg-white border-bottom border-silver">
        <div className="sm-col">
          <Link to="/" className="btn bold caps">
            {place
              ? t('title', { place: place.name, year: 2018 })
              : t('titleBasic')}
          </Link>
        </div>
        <div className="sm-col-right px2 py-tiny h5">
          {authenticated ? (
            <div>
              <button type="button" className={`${btnClass} mr1`}>
                {t('help')}
              </button>
              <button
                type="button"
                className={btnClass}
                onClick={this.handleLogout}
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <Link to="/login" className={btnClass}>
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
