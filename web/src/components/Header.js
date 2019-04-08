import Button from '@cmsgov/design-system-core/dist/components/Button/Button';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';


import { t } from '../i18n';

class Header extends Component {
  handleLogout = e => {
    e.preventDefault();
    const { pushRoute } = this.props;
    pushRoute('/logout');
  };

  render() {
    const { authenticated } = this.props;
    return (
      <header className="header__slim">
        <div className="ds-l-container">
          <div className="ds-l-row">
            <div className="ds-l-col--12 ds-l-md-col--4">
              <Link to="/" className="site-title">
                {t('titleBasic')}
              </Link>
            </div>
            {authenticated &&
              <div className="ds-l-col--12 ds-l-md-col--4 ds-u-margin-left--auto">
                <Button
                  size="small"
                  className="action--logout"
                  variation="transparent"
                  onClick={this.handleLogout}
                >
                  {t('logout')}
                </Button>
              </div>
            }
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => ({
  authenticated
});

const mapDispatchToProps = { pushRoute: push };

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  pushRoute: PropTypes.func.isRequired
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
