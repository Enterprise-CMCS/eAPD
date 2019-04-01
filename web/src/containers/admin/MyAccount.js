import { TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { editSelf } from '../../actions/admin';
import CardForm from '../../components/CardForm';
import Header from '../../components/Header';
import Password from '../../components/PasswordWithMeter';
import { getEditOwnAccountError } from '../../reducers/errors';
import { getEditOwnAccountWorking } from '../../reducers/working';

class MyAccount extends Component {
  state = {
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
    if (!hasFetched) {
      return { hasFetched: working };
    }

    return {
      success: !working && !error
    };
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
    const { error, working } = this.props;
    const {
      hasFetched,
      success,
      user: { name, password, phone, position }
    } = this.state;

    return (
      <Fragment>
        <Header />

        <CardForm
          title="Manage account"
          legend="manage account details"
          sectionName="administrator"
          error={hasFetched && error}
          success={success && 'Changes saved'}
          working={working}
          onCancel={this.goBack}
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
            ariaLabel="please enter your position or role ???"
            value={position || ''}
            onChange={this.handleEditAccount}
          />
          <Password
            className="mb2"
            title="Change password"
            value={password}
            onChange={this.handleEditAccount}
          />
        </CardForm>
      </Fragment>
    );
  }
}

MyAccount.propTypes = {
  editAccount: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  history: PropTypes.object.isRequired,
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
