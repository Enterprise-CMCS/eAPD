import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { TextField } from '@cmsgov/design-system';

const formSubmitNoop = e => e.preventDefault();

class LoginMFAEnrollPhoneNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: ''
    };
  }

  changeUserPhone = e => {
    this.setState({ phone: e.target.value });
  };

  handlePhoneFormSubmit = e => {
    e.preventDefault();

    const { handlePhoneSubmit } = this.props;
    const { phone } = this.state;

    handlePhoneSubmit(phone);
  };

  render() {
    const { phone } = this.state;
    return (
      <div id="start-main-content">
        <div className="ds-l-container">
          <div className="login-card">
            <h1 className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center ds-u-margin--0">
              <span>Verify Your Identity</span>
            </h1>
            <form onSubmit={this.handlePhoneFormSubmit || formSubmitNoop}>
              <p className="ds-u-margin-top--2 ds-u-margin-bottom--0">
                Please enter your phone number to receive temporary verification
                codes.
              </p>
              <TextField
                id="mfaPhoneNumber"
                label="Phone number"
                aria-labelledby="mfaPhoneNumber"
                name="mfaPhoneNumber"
                size="medium"
                mask="phone"
                value={phone || ''}
                onChange={this.changeUserPhone}
                data-testid="mfaPhoneNumber"
              />
              <div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3 ds-u-padding-top--2 ds-u-border-top--2">
                <button
                  type="submit"
                  className="ds-c-button ds-c-button--primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginMFAEnrollPhoneNumber.propTypes = {
  handlePhoneSubmit: PropTypes.func.isRequired
};

LoginMFAEnrollPhoneNumber.defaultProps = {};

export default withRouter(LoginMFAEnrollPhoneNumber);

export { LoginMFAEnrollPhoneNumber as plain };
