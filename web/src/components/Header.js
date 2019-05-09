import Button from '@cmsgov/design-system-core/dist/components/Button/Button';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import { getIsAdmin } from '../reducers/user';
import { t } from '../i18n';

import Icon, { faChevronDown, faChevronLeft, faEdit, faSignOutAlt } from './Icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ariaExpanded: props.ariaExpanded,
    };
    this.node = React.createRef();
  }

  handleOutsideClick = e => {
    if (this.node.current.contains(e.target)) {
      return;
    }
    this.setState({ ariaExpanded: false })
    // remove the global click handler when the dropdown is collapsed
    document.removeEventListener('click', this.handleOutsideClick);
  };

  handleLogout = e => {
    e.preventDefault();
    const { pushRoute } = this.props;
    this.toggleDropdown();
    pushRoute('/logout');
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
              {showSiteTitle &&
                <Link to="/">
                  {t('titleBasic')}
                </Link>
              }
              {!showSiteTitle && !authenticated &&
                <Link to="/">
                  {t('titleBasic')}
                </Link>
              }
              {!showSiteTitle && authenticated && (
                <Link to="/">
                  <Icon icon={faChevronLeft} size="sm" />
                  { isAdmin ? "Admin Dashboard" : `${currentUser.state.id.toUpperCase()} APD Home` }
                </Link>
              )}
            </div>
            {authenticated &&
              <div className="ds-l-col--12 ds-l-md-col--8">
                <ul className="nav--dropdown" aria-expanded={ariaExpanded}>
                  <li>
                    <button
                      type="button"
                      className="nav--dropdown__trigger ds-c-button ds-c-button--small ds-c-button--transparent"
                      onClick={this.toggleDropdown}
                    >
                      { currentUser ? currentUser.username : 'Your account' }
                      <Icon icon={faChevronDown} style={{ width: '8px'}} />
                    </button>
                    <ul className="nav--submenu" aria-hidden={!ariaExpanded}>
                      <li>
                        <Link
                          to="/me"
                          onClick={this.toggleDropdown}
                          className="nav--dropdown__action"
                        >
                          <Icon icon={faEdit} style={{ width: '14px'}}/>
                          Manage account
                        </Link>
                      </li>
                      <li>
                        <Button
                          size="small"
                          className="nav--dropdown__action"
                          variation="transparent"
                          onClick={this.handleLogout}
                        >
                          <Icon icon={faSignOutAlt} style={{ width: '14px'}} />
                          {t('logout')}
                        </Button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            }
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

const mapDispatchToProps = { pushRoute: push };

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
  pushRoute: PropTypes.func.isRequired,
  ariaExpanded: PropTypes.bool.isRequired,
  showSiteTitle: PropTypes.bool.isRequired
};

Header.defaultProps = {
  currentUser: null
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export { Header as plain, mapStateToProps, mapDispatchToProps };
