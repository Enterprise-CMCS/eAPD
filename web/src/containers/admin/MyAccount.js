import { Button, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { editSelf } from '../../actions/admin';
import CardForm from '../../components/CardForm';
import Password from '../../components/PasswordWithMeter';
import { LockIcon, UnlockIcon } from '../../components/Icons';
import { getEditOwnAccountError } from '../../reducers/errors';
import { getEditOwnAccountWorking } from '../../reducers/working';

class MyAccount extends Component {
  state = {
    changePassword: false,
    hasFetched: false,
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

  static getDerivedStateFromProps({ error, working }, { hasFetched }) {
    // Success has to be derived.  It can't be stored in the app state because
    // if it was, then the next time this form was loaded, it would show the
    // success state even though it wouldn't be accurate anymore.

    if (hasFetched) {
      return {
        success: !working && !error
      };
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
    const { changePassword, user } = this.state;

    // Once we've attempted to save these changes, it's valid to show success
    // or error messages.  Since error messages are persisted in app state,
    // it's possible there's an error sitting there from a previous instance
    // of this form.  This flag makes sure we don't show any error messages
    // until this instance of the form has tried to save.
    this.setState({ hasFetched: true });
    editAccount(user, changePassword);
  };

  toggleChangePassword = () => {
    this.setState(prev => ({ changePassword: !prev.changePassword }));
  };

  render() {
    const { error, working } = this.props;
    const {
      changePassword,
      hasFetched,
      success,
      user: { name, password, phone, position }
    } = this.state;

    return (
      <Fragment>
        <CardForm
          title="Manage account"
          legend="manage account details"
          sectionName="administrator"
          error={hasFetched && error}
          success={success && 'Changes saved'}
          working={working}
          onSave={this.editAccount}
        >
          <TextField
            label="Name"
            name="name"
            ariaLabel="please enter your full name"
            value={name || ''}
            onChange={this.handleEditAccount}
          />
          <TextField
            label="Phone number"
            ariaLabel="please enter your 10-digit phone number"
            mask="phone"
            name="phone"
            size="medium"
            value={phone || ''}
            onChange={this.handleEditAccount}
          />
          <TextField
            label="Role"
            name="position"
            ariaLabel="please enter your position or role"
            value={position || ''}
            onChange={this.handleEditAccount}
          />
          <div className="ds-l-row ds-u-padding-x--2">
            <TextField
              label="Password"
              ariaLabel="Current password"
              name="current password"
              value="********"
              disabled
              size="medium"
            />
            <div className="ds-u-clearfix">
              <div className="ds-c-label">&nbsp;</div>
              <div className="ds-c-field ds-u-border--0">
                <Button
                  aria-label={
                    changePassword
                      ? 'keep previous password'
                      : 'change password'
                  }
                  variation="transparent"
                  className="ds-u-padding-y--0"
                  onClick={this.toggleChangePassword}
                  purpose="change password"
                >
                  {changePassword ? <UnlockIcon /> : <LockIcon />} Change
                  password
                </Button>
              </div>
            </div>
          </div>
          {changePassword && (
            <Password
              showMeter
              title="New password"
              value={password}
              onChange={this.handleEditAccount}
            />
          )}
        </CardForm>
      </Fragment>
    );
  }
}

MyAccount.propTypes = {
  editAccount: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    position: PropTypes.string
  }).isRequired,
  working: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  error: getEditOwnAccountError(state),
  user: {
    name: state.user.data.name,
    phone: state.user.data.phone,
    position: state.user.data.position
  },
  working: getEditOwnAccountWorking(state)
});

const mapDispatchToProps = { editAccount: editSelf };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);

export { MyAccount as plain, mapStateToProps, mapDispatchToProps };
