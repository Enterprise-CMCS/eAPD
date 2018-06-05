import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '@fortawesome/react-fontawesome';

import { t } from '../i18n';
import { faHelp, faSignOut } from '../components/Icons';
import { logout } from '../actions/auth';

class TopNav extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { authenticated, place } = this.props;

    return (
      <header className="clearfix py1 bg-white border-bottom border-silver">
        <div className="sm-col">
          <Link to="/" className="btn caps">
            {place
              ? t('title', { place: place.name, year: 2018 })
              : t('titleBasic')}
          </Link>
        </div>
        <div className="sm-col-right h5">
          {authenticated ? (
            <div>
              <button type="button" className="btn h5 regular">
                <span className="mr-tiny">{t('help')}</span>
                <Icon icon={faHelp} />
              </button>
              <button
                type="button"
                className="btn h5 regular"
                onClick={this.handleLogout}
              >
                <span className="mr-tiny">{t('logout')}</span>
                <Icon icon={faSignOut} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn h5 regular">
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
