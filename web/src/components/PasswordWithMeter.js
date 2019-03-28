import { Choice, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
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
    const { title, value, showMeter, ...rest } = this.props;
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
      <div {...rest}>
        <div className="password-input">
          <Choice
            className="password-input--show-password ds-u-float--right"
            checked={showPassword}
            name="show password"
            value="Show password"
            onChange={this.toggleShowPassword}
            size="small"
          >
            Show password
          </Choice>

          <TextField
            hint={showMeter && 'paste whatever was supposed to be here back'}
            label={title || 'Password'}
            name="password"
            className="no-clearfix"
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={this.changePassword}
          />
          {showMeter &&
            <Fragment>
              <div className="strength-meter">
                <div
                  className="strength-meter-fill"
                  data-strength={value.length ? strength : 'empty'}
                />
              </div>
              <p role="alert" aria-live="polite" className="strength-meter-quality">
                {passwordQuality}
              </p>
            </Fragment>
          }
        </div>
      </div>
    );
  }
}

Password.propTypes = {
  compareTo: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
  showMeter: PropTypes.bool
};

Password.defaultProps = {
  compareTo: [],
  onChange: () => {},
  title: 'Password',
  value: '',
  showMeter: false
};

export default Password;
