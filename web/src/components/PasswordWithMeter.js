import { Alert } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';

class Password extends Component {
  state = { showPassword: false, strength: 0 };

  componentWillMount() {
    const { value } = this.props;
    if (value) {
      this.changePassword({ target: { value } });
    }
  }

  changePassword = e => {
    const { compareTo, onChange } = this.props;
    this.setState({ strength: zxcvbn(e.target.value, compareTo).score });

    if (onChange) {
      onChange(e);
    }
  };

  toggleShowPassword = () => {
    this.setState(prev => ({ showPassword: !prev.showPassword }));
  };

  render() {
    const { title, value, ...rest } = this.props;
    const { showPassword, strength } = this.state;

    let passwordQuality = 'Password is great';
    if (strength < 3) {
      passwordQuality = 'Password is weak';
    } else if (strength === 3) {
      passwordQuality = 'Password is good';
    }

    const strengthClass = [
      'strength-meter',
      value.length > 0 ? 'visible' : 'hidden'
    ]
      .join(' ')
      .trim();

    const qualityClass = [
      'strength-meter-quality',
      value.length > 0 ? 'visible' : 'hidden'
    ]
      .join(' ')
      .trim();

    return (
      <div {...rest}>
        <div className="right">
          <label htmlFor="showPassword">Show password</label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={this.toggleShowPassword}
          />
        </div>
        <label htmlFor="password">{title || 'Password'}</label>
        <Alert className="my2">
          A strong password is at least 9 characters, not a commonly-used word
          or phrase, and not too similar to the person’s name or email address.
        </Alert>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          className="input"
          value={value}
          onChange={this.changePassword}
        />
        <div className={strengthClass}>
          <div className="strength-meter-fill" data-strength={strength} />
        </div>
        <div className={qualityClass}>{passwordQuality}</div>
      </div>
    );
  }
}

Password.propTypes = {
  compareTo: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string
};

Password.defaultProps = {
  compareTo: [],
  onChange: () => {},
  title: 'Password',
  value: ''
};

export default Password;
