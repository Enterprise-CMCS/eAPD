import { TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { editSelf } from '../../actions/admin';
import CardForm from '../../components/CardForm';
import Header from '../../components/Header';
import Password from '../../components/PasswordWithMeter';

class MyAccount extends Component {
  state = {
    error: false,
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

  handleEditAccount = e => {
    const { name, value } = e.target;
    this.setState(prev => ({ user: { ...prev.user, [name]: value } }));
  };

  editAccount = e => {
    e.preventDefault();
    const { editAccount } = this.props;
    const { user } = this.state;

    this.setState({ fetching: true });
    return editAccount(user)
      .then(() => {
        this.setState({ error: false, fetching: false, success: true });
      })
      .catch(error => {
        this.setState({ error, fetching: false, success: false });
      });
  };

  goBack = () => {
    const {
      history: { goBack }
    } = this.props;
    goBack();
  };

  render() {
    const {
      error,
      fetching,
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
          error={error}
          success={success && 'Changes saved'}
          working={fetching}
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
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    position: PropTypes.string
  }).isRequired
};

const mapStateToProps = ({
  user: {
    data: { name, phone, position }
  }
}) => ({
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
