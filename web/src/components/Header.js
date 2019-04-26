/* eslint-disable no-return-assign */

import Button from '@cmsgov/design-system-core/dist/components/Button/Button';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import { getIsAdmin } from '../reducers/user';
import { t } from '../i18n';

import Icon, { faChevronDown, faChevronLeft, faEdit, faSignOutAlt } from './Icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { ariaExpanded: props.ariaExpanded };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.setState({ ariaExpanded: false })
  };

  handleLogout = e => {
    e.preventDefault();
    const { pushRoute } = this.props;
    pushRoute('/logout');
  };

  toggleDropdown = () => {
    this.setState(prev => ({ ariaExpanded: !prev.ariaExpanded }));
  };

  render() {
    const { authenticated, currentUser, isAdmin, location } = this.props;
    const { ariaExpanded } = this.state;
    const isTopLevel = location.pathname === '/';
    return (
      <header ref={node => this.node = node}>
        <div className="ds-l-container">
          <div className="ds-l-row">
            <div className="ds-l-col--12 ds-l-md-col--4 site-title">
              {isTopLevel &&
                <Link to="/">
                  {t('titleBasic')}
                </Link>
              }
              {!isTopLevel && !authenticated &&
                <Link to="/">
                  {t('titleBasic')}
                </Link>
              }
              {!isTopLevel && authenticated && (
                <Link to="/">
                  <Icon icon={faChevronLeft} size="sm" />
                  { isAdmin ? "Admin dashboard" : `${currentUser.state.id.toUpperCase()} APD home` }
                </Link>
              )}
            </div>
            {authenticated &&
              <div className="ds-l-col--12 ds-l-md-col--8">
                <ul className="nav--dropdown" aria-expanded={ariaExpanded}>
                  <li>
                    <Button
                      size="small"
                      variation="transparent"
                      className="nav--dropdown__trigger"
                      onClick={this.toggleDropdown}
                    >
                      { currentUser ? currentUser.username : 'Your account' }
                      <Icon icon={faChevronDown} style={{ width: '8px'}} />
                    </Button>
                    <ul className="nav--submenu" aria-hidden={!ariaExpanded}>
                      <li>
                        <Link
                          to="/me"
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
  location: PropTypes.object.isRequired
};

Header.defaultProps = {
  currentUser: null
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));
