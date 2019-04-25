import Button from '@cmsgov/design-system-core/dist/components/Button/Button';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import { getIsAdmin } from '../reducers/user';
import { t } from '../i18n';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { ariaExpanded: props.ariaExpanded };
  }

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
    const username = currentUser ? currentUser.username : 'Your account';
    const isTopLevel = location.pathname == '/';
    return (
      <header>
        <div className="ds-l-container">
          <div className="ds-l-row">
            <div className="ds-l-col--12 ds-l-md-col--4">
              {isTopLevel ? (
                <Link to="/">
                  {t('titleBasic')}
                </Link>
              ) : (
                 <Link to="/">
                  {t('dashboard')}
                </Link>
              )}
            </div>
            {authenticated &&
              <div className="ds-l-col--12 ds-l-md-col--4 ds-u-margin-left--auto">
                <ul className="nav--dropdown" aria-expanded={ariaExpanded}>
                  <li>
                    <Button
                      size="small"
                      variation="transparent"
                      className="nav--dropdown__trigger"
                      onClick={this.toggleDropdown}
                    >
                      {username}
                    </Button>
                    <ul className="nav--submenu" aria-hidden={!ariaExpanded}>
                      <li>
                        <Link to="/me">
                          Manage account
                        </Link>
                      </li>
                      <li>
                        <Button
                          size="small"
                          className="nav--action__logout"
                          variation="transparent"
                          onClick={this.handleLogout}
                        >
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
  ariaExpanded: PropTypes.bool.isRequired
};

Header.defaultProps = {
  currentUser: null,
  ariaExpanded: false
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));
