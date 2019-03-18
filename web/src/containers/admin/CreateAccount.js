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
    this.setState(prev => ({ showPassword: !prev.showPassword }));
  };

  handleChange = e => {
    const { name: key, value } = e.target;
    const change = { [key]: value };
    const { email, name } = this.state;

    if (key === 'password') {
      const score = zxcvbn(value, [email, name]);

      // guesses_log10 is the log10 of the number of guesses zxcvbn estimates
      // would be necessary to find the password.  10^8 is considered a score
      // of 3, which is what we're using.  But guesses_log10 is a decimal
      // number, which means it can have weird junk in it due to rounding
      // issues.  The math here is basically rounding to 4 decimal places and
      // then dividing by 8.5 to get a percentage of how "acceptable" the
      // password is.  Since a log10 of 8.5 would meet our criteria, that
      // corresponds with 100%.  I then cap it with Math.min to make sure we
      // don't end up with more than 100%.
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
    if (!email || !password) {
      alert('Email and password are required');
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

    // The password percent bar thing is 88% width, so scale
    // the password score thing accordingly.  That's all.
    const passwordPercent = 88 * passwordScore;

    // Really the whole password meter should be replaced.

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
              <p className="alert-info p2">
                A strong password is at least 9 characters, not a commonly-used
                word or phrase, and not too similar to the person’s name or
                email address.
              </p>
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
                <option value="">None</option>
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
