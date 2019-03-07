import { Button, Spinner } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { editSelf } from '../../actions/admin';
import Password from '../../components/PasswordWithMeter';
import { t } from '../../i18n';

class MyAccount extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    phone: '',
    position: ''
  };

  constructor(props) {
    super(props);

    const {
      user: { email, name, phone, position }
    } = props;

    this.state = { email, name, phone, position };
  }

  handleEditAccount = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  editAccount = e => {
    e.preventDefault();
    const { editAccount } = this.props;
    editAccount(this.state);
  };

  goBack = () => {
    const {
      history: { goBack }
    } = this.props;
    goBack();
  };

  render() {
    const { fetching } = this.props;
    const { email, name, password, phone, position } = this.state;

    return (
      <Fragment>
        <header className="clearfix px2 py1 bg-white">
          <div className="left">
            <Link to="/" className="btn px0 bold caps">
              {t('titleBasic')}
            </Link>
          </div>
        </header>

        <div className="mx-auto my3 p2 sm-col-6 md-col-4 bg-white rounded">
          <h1 className="mt0 h2">My account</h1>
        </div>

        <div className="mx-auto mb3 p2 sm-col-6 md-col-4 bg-white rounded">
          {' '}
          <form onSubmit={this.editAccount}>
            <div className="mb2">
              <label htmlFor="edit_account_name">Name</label>
              <input
                id="edit_account_name"
                type="text"
                name="name"
                className="input"
                value={name || ''}
                onChange={this.handleEditAccount}
              />
            </div>
            <div className="mb2">
              <label htmlFor="edit_account_email">Email</label>
              <input
                id="edit_account_email"
                type="text"
                name="email"
                className="input"
                value={email}
                onChange={this.handleEditAccount}
              />
            </div>
            <div className="mb2">
              <label htmlFor="edit_account_phone">Phone number</label>
              <input
                id="edit_account_phone"
                type="text"
                name="phone"
                className="input"
                value={phone || ''}
                onChange={this.handleEditAccount}
              />
            </div>
            <div className="mb2">
              <label htmlFor="edit_account_position">Position</label>
              <input
                id="edit_account_position"
                type="text"
                name="position"
                className="input"
                value={position || ''}
                onChange={this.handleEditAccount}
              />
            </div>
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
                'Edit account'
              )}
            </Button>
            <Button className="right" onClick={this.goBack}>
              Back
            </Button>
          </form>
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
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    position: PropTypes.string
  }).isRequired
};

const mapStateToProps = ({
  user: {
    fetching,
    data: { name, phone, position, username }
  }
}) => ({
  fetching,
  user: {
    email: username,
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
