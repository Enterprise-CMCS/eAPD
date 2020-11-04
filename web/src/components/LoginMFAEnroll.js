import React from 'react';

const LoginMFAEnroll = () => {

  return (
    <div id="start-main-content">
      <div className="ds-l-container">
        <div className="">					
          <h1 className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center ds-u-margin--0">
            <span>Verify Your Identity</span>
          </h1>
          <p>Please choose Multi-Factor Authentication route.</p>
          <fieldset class="ds-c-fieldset">
            <legend class="ds-c-label"><span>Please choose Multi-Factor Authentication route.</span></legend>
            <input
              class="ds-c-choice ds-c-choice--error"
              id="radio-1"
              type="radio"
              name="radio-choices"
              value="radio-1"
            />
            <label for="radio-1"><span>SMS Text</span></label>
            <input
              class="ds-c-choice ds-c-choice--error"
              id="radio-2"
              type="radio"
              name="radio-choices"
              value="radio-2"
            />
            <label for="radio-2"><span>Authenticator App</span></label>
            <input
              class="ds-c-choice ds-c-choice--error"
              id="radio-3"
              type="radio"
              name="radio-choices"
              value="radio-3"
            />
            <label for="radio-3"><span>Email</span></label>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default LoginMFAEnroll;
