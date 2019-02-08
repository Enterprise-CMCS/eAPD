import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import { STATES } from '../../util';

import { createUser as createUserDispatch } from '../../actions/admin';

import Btn from '../../components/Btn';
import { t } from '../../i18n';

class CreateUser extends Component {
  state = {
    fetching: false,
    name: '',
    email: '',
    password: '',
    passwordScore: 0,
    passwordQuality: 'Weak',
    showPassword: false,
    state: ''
  };

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const change = { [name]: value };

    if (name === 'password') {
      const score = zxcvbn(value, [this.state.email, this.state.name]);

      change.passwordScore = Math.min(
        1,
        Math.floor(score.guesses_log10 * 10000) / 85000
      );

      change.passwordQuality = score.score > 2 ? 'Good' : 'Weak';
    }

    this.setState(change);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, name, password, state } = this.state;
    if (!email || !password || !state) {
      alert('Email, password, and state are all required');
      return;
    }

    const score = zxcvbn(password, [email, name]);
    if (score.score < 3) {
      alert('Password is too weak');
      return;
    }

    const { createUser } = this.props;

    this.setState({ fetching: true });
    createUser({ email, name, password, state })
      .then(() => {
        this.setState({
          fetching: false,
          name: '',
          email: '',
          password: '',
          passwordScore: 0,
          passwordQuality: 'Weak',
          state: ''
        });
      })
      .catch(() => {
        this.setState({ fetching: false });
      });
  };

  render() {
    const {
      fetching,
      name,
      email,
      password,
      passwordScore,
      passwordQuality,
      showPassword,
      state
    } = this.state;

    const passwordPercent = 88 * passwordScore;
    let passwordColor = 'bg-red';
    if (passwordScore > 0.5) {
      passwordColor = 'bg-yellow';
    }
    if (passwordScore === 1) {
      passwordColor = 'bg-green';
    }

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
          <h1 className="mt0 h2">Create account</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="mb2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="input"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                name="email"
                className="input"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb2">
              <div className="right">
                <label htmlFor="showPassword">Show password</label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={this.toggleShowPassword}
                />
              </div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="input"
                value={password}
                onChange={this.handleChange}
              />
              <div className="right" style={{ width: '10%' }}>
                {passwordQuality}
              </div>
              <div
                className={`inline-block ${passwordColor} p1 rounded`}
                style={{ width: `${passwordPercent}%` }}
              />
              <div className="alert-info p2">
                A strong password is at least 9 characters, not a commonly-used
                word or phrase, and not too similar to the person’s name or
                email address.
              </div>
            </div>
            <div className="mb2">
              <label htmlFor="create_user_state">State</label>
              <select
                id="create_user_state"
                name="state"
                className="input"
                value={state}
                onChange={this.handleChange}
              >
                <option value="">Select...</option>
                {STATES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <Btn type="submit" disabled={fetching}>
              {fetching ? 'Working' : 'Create account'}
            </Btn>
          </form>
        </div>
      </Fragment>
    );
  }
}

CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createUser: createUserDispatch
};

export default connect(
  null,
  mapDispatchToProps
)(CreateUser);

export { CreateUser as plain };
