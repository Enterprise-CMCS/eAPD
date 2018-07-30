import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { logout } from '../actions/auth';
import Btn from '../components/Btn';

class TopBtns extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { authenticated } = this.props;

    return (
      <header className="clearfix mb2">
        <div className="right h5">
          {authenticated ? (
            <Fragment>
              <Btn size="small">{t('dashboard')}</Btn>{' '}
              <Btn size="small" onClick={this.handleLogout}>
                {t('logout')}
              </Btn>
            </Fragment>
          ) : (
            <Link to="/login" className="btn btn-primary btn-small">
              {t('login')}
            </Link>
          )}
        </div>
      </header>
    );
  }
}

TopBtns.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });
const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(TopBtns);
