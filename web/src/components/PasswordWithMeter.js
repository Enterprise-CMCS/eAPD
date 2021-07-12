import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import zxcvbn from '../lazy/zxcvbn';
import Choice from './Choice';

class Password extends Component {
  constructor() {
    super();
    this.state = { showPassword: false, strength: 0 };
  }

  componentDidMount() {
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
    const {
      className,
      title,
      value,
      showMeter,
      errorMessage,
      customErrorMessage,
      disabled
    } = this.props;
    const { showPassword, strength } = this.state;

    let passwordQuality = 'Password strength: Weak';
    if (value.length === 0) {
      passwordQuality = <span>&nbsp;</span>;
    } else if (strength === 3) {
      passwordQuality = 'Password strength: Good';
    } else if (strength > 3) {
      passwordQuality = 'Password strength: Great';
    }

    return (
      <div className={className || undefined}>
        <div className="password-input">
          <Choice
            checked={showPassword}
            className="password-input--show-password ds-u-float--right"
            label="Show password"
            name="show-password"
            onChange={this.toggleShowPassword}
            size="small"
            type="checkbox"
            value="on"
            disabled={disabled}
          />

          <TextField
            hint={
              showMeter &&
              'A strong password is at least 9 characters, not a commonly-used word or phrase, and not too similar to the person’s name or email address.'
            }
            label={title || 'Password'}
            id="password"
            name="password"
            ariaLabel="password"
            className="no-clearfix"
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={this.changePassword}
            errorMessage={errorMessage == null ? null : ''}
            disabled={disabled}
          />
          {customErrorMessage && (
            <label htmlFor="password" className="ds-u-color--error">
              <strong>{customErrorMessage}</strong>
            </label>
          )}
          {showMeter && (
            <Fragment>
              <div className="strength-meter">
                <div
                  className="strength-meter-fill"
                  data-strength={value.length ? strength : 'empty'}
                />
              </div>
              <p
                role="alert"
                aria-live="polite"
                className="strength-meter-quality"
              >
                {passwordQuality}
              </p>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

Password.propTypes = {
  className: PropTypes.string,
  compareTo: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
  showMeter: PropTypes.bool,
  errorMessage: PropTypes.string,
  customErrorMessage: PropTypes.string,
  disabled: PropTypes.bool
};

Password.defaultProps = {
  className: '',
  compareTo: [],
  onChange: () => {},
  title: 'Password',
  value: '',
  showMeter: false,
  errorMessage: '',
  customErrorMessage: '',
  disabled: false
};

export default Password;
