import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getIsAdmin } from '../reducers/user.selector';
import { t } from '../i18n';

import DashboardButton from './DashboardButton';

import Icon, {
  faChevronDown,
  faChevronLeft,
  faEdit,
  faSignOutAlt
} from './Icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ariaExpanded: props.ariaExpanded
    };
    this.node = React.createRef();
  }

  handleOutsideClick = e => {
    if (this.node.current.contains(e.target)) {
      return;
    }
    this.setState({ ariaExpanded: false });
    // remove the global click handler when the dropdown is collapsed
    document.removeEventListener('click', this.handleOutsideClick);
  };

  toggleDropdown = () => {
    this.setState(prev => {
      if (!prev.ariaExpanded) {
        // add global click handler when the dropdown is expanded
        document.addEventListener('click', this.handleOutsideClick);
      } else {
        // remove the global click handler when the dropdown is collapsed
        document.removeEventListener('click', this.handleOutsideClick);
      }
      return { ariaExpanded: !prev.ariaExpanded };
    });
  };

  render() {
    const { authenticated, currentUser, isAdmin, showSiteTitle } = this.props;
    const { ariaExpanded } = this.state;
    return (
      <header ref={this.node}>
        <div className="ds-l-container">
          <div className="ds-l-row">
            <div className="ds-l-col--12 ds-l-md-col--4 site-title">
              {showSiteTitle || !authenticated ? (
                <DashboardButton>{t('titleBasic')}</DashboardButton>
              ) : (
                <DashboardButton>
                  <Icon icon={faChevronLeft} size="sm" />
                  {isAdmin
                    ? 'Admin Dashboard'
                    : `${currentUser.state.id.toUpperCase()} APD Home`}
                </DashboardButton>
              )}
            </div>
            {authenticated && (
              <div className="ds-l-col--12 ds-l-md-col--8">
                <ul className="nav--dropdown">
                  <li>
                    <button
                      type="button"
                      className="nav--dropdown__trigger ds-c-button ds-c-button--small ds-c-button--transparent"
                      onClick={this.toggleDropdown}
                      aria-expanded={ariaExpanded ? 'true' : 'false'}
                      aria-haspopup="true"
                      aria-label={`Logged in as ${currentUser.username}. Click to manage your account.`}
                    >
                      {currentUser ? currentUser.username : 'Your account'}
                      <Icon icon={faChevronDown} style={{ width: '8px' }} />
                    </button>
                    <ul className="nav--submenu" aria-hidden={!ariaExpanded}>
                      <li>
                        <Link
                          to="/me"
                          onClick={this.toggleDropdown}
                          className="nav--dropdown__action"
                        >
                          <Icon icon={faEdit} style={{ width: '14px' }} />
                          Manage account
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/logout"
                          onClick={this.toggleDropdown}
                          className="nav--dropdown__action"
                        >
                          <Icon icon={faSignOutAlt} style={{ width: '14px' }} />
                          {t('logout')}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  currentUser: state.auth.user,
  isAdmin: getIsAdmin(state)
});

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
  ariaExpanded: PropTypes.bool,
  showSiteTitle: PropTypes.bool.isRequired
};

Header.defaultProps = {
  ariaExpanded: false,
  currentUser: null
};

export default connect(mapStateToProps)(Header);

export { Header as plain, mapStateToProps };
