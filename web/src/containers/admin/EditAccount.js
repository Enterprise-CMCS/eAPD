import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { STATES } from '../../util';

import { editAccount as editAccountDispatch } from '../../actions/admin';
import Btn from '../../components/Btn';
import { t } from '../../i18n';

class EditAccount extends Component {
  state = {
    userID: '',
    user: null
  };

  getForm = () => {
    const { currentUser, roles } = this.props;
    const { user } = this.state;

    if (user) {
      const { email, name, phone, position, state, role } = user;
      const fetching = false;

      return (
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
            <div className="mb2">
              <label htmlFor="edit_account_state">State</label>
              <select
                id="edit_account_state"
                name="state"
                className="input"
                value={state || ''}
                onChange={this.handleEditAccount}
              >
                <option value="">None</option>
                {STATES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb2">
              <label htmlFor="edit_account_role">Authorization role</label>
              <select
                id="edit_account_role"
                name="role"
                className="input"
                value={role || ''}
                disabled={currentUser.id === user.id}
                onChange={this.handleEditAccount}
              >
                <option value="">None</option>
                {roles.map(r => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <Btn type="submit" disabled={fetching}>
              {fetching ? 'Working' : 'Edit account'}
            </Btn>
          </form>
        </div>
      );
    }
    return null;
  };

  handlePickAccount = e => {
    const { users } = this.props;
    const { value } = e.target;

    const user = users.filter(u => u.id === +value).reduce((_, u) => u, null);

    this.setState({ userID: +value, user });
  };

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

  render() {
    const { users } = this.props;
    const { userID } = this.state;

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
          <h1 className="mt0 h2">Edit accounts</h1>
          <div className="mb2">
            <label htmlFor="edit_user_selected">Pick an account to edit</label>
            <select
              id="edit_user_selected"
              name="userID"
              className="input"
              value={userID}
              onChange={this.handlePickAccount}
            >
              <option value="">Select...</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {`${u.name ? `${u.name} - ` : ''}${u.email}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {this.getForm()}
      </Fragment>
    );
  }
}

EditAccount.propTypes = {
  currentUser: PropTypes.object.isRequired,
  editAccount: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = ({
  admin: { roles, users },
  auth: { user: currentUser }
}) => ({
  currentUser,
  roles,
  users
});

const mapDispatchToProps = { editAccount: editAccountDispatch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAccount);

export { EditAccount as plain, mapStateToProps, mapDispatchToProps };
