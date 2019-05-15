import { Choice, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo } from 'react';
import zxcvbn from '../lazy/zxcvbn';

import { useBoolState } from '../containers/admin/hooks';

const Password = ({
  compareTo,
  onChange,
  title,
  value,
  showMeter,
  ...rest
}) => {
  const [showPassword, toggleShowPassword] = useBoolState(false);
  const strength = useMemo(() => zxcvbn(value, compareTo).score, [value]);

  const changePassword = useCallback(
    e => {
      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

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
          onChange={toggleShowPassword}
          size="small"
        >
          Show password
        </Choice>

        <TextField
          hint={
            showMeter &&
            'A strong password is at least 9 characters, not a commonly-used word or phrase, and not too similar to the person’s name or email address.'
          }
          label={title || 'Password'}
          name="password"
          className="no-clearfix"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={changePassword}
        />
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
};

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
