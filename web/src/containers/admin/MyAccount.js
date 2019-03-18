import { Alert, Button, Spinner, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { editSelf } from '../../actions/admin';
import Password from '../../components/PasswordWithMeter';
import { t } from '../../i18n';

class MyAccount extends Component {
  state = {
    success: false,
    user: {
      name: '',
      password: '',
      phone: '',
      position: ''
    }
  };

  constructor(props) {
    super(props);

    const {
      user: { name, phone, position }
    } = props;

    this.state.user = { name, phone, position };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.fetching) {
      return { success: 0 };
    }
    if (prevState.success === 0) {
      return { success: !newProps.error };
    }
    return null;
  }

  handleEditAccount = e => {
    const { name, value } = e.target;
    this.setState(prev => ({ user: { ...prev.user, [name]: value } }));
  };

  editAccount = e => {
    e.preventDefault();
    const { editAccount } = this.props;
    const { user } = this.state;
    editAccount(user);
  };

  goBack = () => {
    const {
      history: { goBack }
    } = this.props;
    goBack();
  };

  render() {
    const { fetching } = this.props;
    const {
      success,
      user: { name, password, phone, position }
    } = this.state;

    return (
      <Fragment>
        <header className="clearfix mb2 px2 py1 bg-white">
          <div className="left">
            <Link to="/" className="btn px0 bold caps">
              {t('titleBasic')}
            </Link>
          </div>
        </header>

        <div className="ds-l-container card">
          <div className="ds-l-row ds-u-radius ds-u-padding-y--5">
            <div className="ds-l-col--1 ds-u-fill--white ds-u-margin-left--auto" />
            <div className="ds-l-col--6 ds-u-fill--white ds-u-padding-y--5">
              {!!success && <Alert variation="success">Changes saved</Alert>}

              <h1 className="ds-h1">Manage account</h1>

              <form onSubmit={this.editAccount}>
                <TextField
                  label="Name"
                  name="name"
                  value={name || ''}
                  onChange={this.handleEditAccount}
                />
                <TextField
                  label="Phone number"
                  mask="phone"
                  name="phone"
                  size="medium"
                  value={phone || ''}
                  onChange={this.handleEditAccount}
                />
                <TextField
                  label="Position"
                  name="position"
                  value={position || ''}
                  onChange={this.handleEditAccount}
                />
                <Password
                  className="mb2"
                  title="Change password"
                  value={password}
                  onChange={this.handleEditAccount}
                />
                <Button variation="primary" type="submit" disabled={fetching}>
                  {fetching ? (
                    <Fragment>
                      <Spinner /> Working
                    </Fragment>
                  ) : (
                    'Save changes'
                  )}
                </Button>
                <Button variation="transparent" onClick={this.goBack}>
                  Cancel
                </Button>
              </form>
            </div>
            <div className="ds-l-col--1 ds-u-fill--white ds-u-margin-right--auto" />
          </div>
        </div>
      </Fragment>
    );
  }
}

MyAccount.propTypes = {
  editAccount: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    position: PropTypes.string
  }).isRequired
};

const mapStateToProps = ({
  user: {
    error,
    fetching,
    data: { name, phone, position }
  }
}) => ({
  error,
  fetching,
  user: {
    name,
    phone,
    position
  }
});

const mapDispatchToProps = { editAccount: editSelf };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);

export { MyAccount as plain, mapStateToProps, mapDispatchToProps };
