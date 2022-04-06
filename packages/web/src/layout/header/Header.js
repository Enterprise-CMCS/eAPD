import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getIsFedAdmin,
  getUserStateOrTerritory,
  getCanUserViewStateAdmin
} from '../../reducers/user.selector';
import { t } from '../../i18n';

import DashboardButton from './DashboardButton';
import HeaderSaveMessage from './HeaderSaveMessage';

import Icon, {
  faChevronDown,
  faChevronLeft,
  faSignOutAlt,
  faPeopleArrows,
  faEdit,
  faUserShield
} from '../../components/Icons';

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
    const {
      authenticated,
      currentUser,
      isFedAdmin,
      currentState,
      canViewStateAdmin,
      pathname,
      showSiteTitle
    } = this.props;
    const { ariaExpanded } = this.state;

    const withinApd = pathname.startsWith('/apd');

    const title = () => {
      if (!showSiteTitle && !authenticated) {
        return <span />;
      }
      if (showSiteTitle && !authenticated) {
        return <div>{t('titleBasic')}</div>;
      }
      if (showSiteTitle && authenticated) {
        return <DashboardButton>{t('titleBasic')}</DashboardButton>;
      }
      return (
        <DashboardButton>
          <Icon icon={faChevronLeft} size="sm" />
          {isFedAdmin
            ? 'Admin Dashboard'
            : `${
                currentUser.state && currentUser.state.id
                  ? `${currentUser.state.id.toUpperCase()} `
                  : ''
              }APD Home`}
        </DashboardButton>
      );
    };

    return (
      <header ref={this.node}>
        <a href="#start-main-content" className="skip-nav ds-c-dialog__header">
          Skip to main content
        </a>
        <div className="ds-l-container">
          <div className="ds-l-row">
            <div className="ds-l-col--12 ds-l-md-col--3 site-title">
              {title()}
            </div>
            {authenticated && (
              <Fragment>
                <div className="ds-l-col--12 ds-l-md-col--5">
                  {!showSiteTitle && withinApd && <HeaderSaveMessage />}
                </div>
                <div className="ds-l-col--12 ds-l-md-col--4">
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
                        {canViewStateAdmin && !isFedAdmin && (
                          <li>
                            <Link
                              to="/state-admin"
                              onClick={this.toggleDropdown}
                              className="nav--dropdown__action"
                            >
                              <Icon
                                icon={faUserShield}
                                style={{ width: '14px' }}
                              />
                              {currentState &&
                                currentState.id &&
                                `${currentState.id.toUpperCase()} State admin`}
                            </Link>
                          </li>
                        )}
                        {!isFedAdmin && (
                          <Fragment>
                            <li>
                              <Link
                                to="/manage-account"
                                onClick={this.toggleDropdown}
                                className="nav--dropdown__action"
                              >
                                <Icon icon={faEdit} style={{ width: '14px' }} />
                                Manage Account
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/select-affiliation"
                                onClick={this.toggleDropdown}
                                className="nav--dropdown__action"
                              >
                                <Icon
                                  icon={faPeopleArrows}
                                  style={{ width: '14px' }}
                                />
                                Switch State Affiliation
                              </Link>
                            </li>
                          </Fragment>
                        )}
                        <li>
                          <Link
                            to="/logout"
                            onClick={this.toggleDropdown}
                            className="nav--dropdown__action"
                          >
                            <Icon
                              icon={faSignOutAlt}
                              style={{ width: '14px' }}
                            />
                            {t('logout')}
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  ariaExpanded: PropTypes.bool,
  authenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  currentState: PropTypes.object,
  isFedAdmin: PropTypes.bool.isRequired,
  canViewStateAdmin: PropTypes.bool,
  showSiteTitle: PropTypes.bool.isRequired,
  pathname: PropTypes.string
};

Header.defaultProps = {
  ariaExpanded: false,
  currentUser: null,
  currentState: null,
  canViewStateAdmin: false,
  pathname: ''
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  currentUser: state.user.data,
  isFedAdmin: getIsFedAdmin(state),
  currentState: getUserStateOrTerritory(state),
  canViewStateAdmin: getCanUserViewStateAdmin(state),
  pathname: state.router.location.pathname
});

const mapDispatchToProps = {
  getUserStateOrTerritory,
  getCanUserViewStateAdmin
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

export { Header as plain, mapStateToProps, mapDispatchToProps };
