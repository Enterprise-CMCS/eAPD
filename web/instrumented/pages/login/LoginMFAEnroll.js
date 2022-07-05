import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const formSubmitNoop = e => e.preventDefault();

const LoginMFAEnroll = ({
  handleSelection,
  factors,
  selectedOption: propSelectedOption
}) => {
  const [selectedOption, setSelectedOption] = useState(propSelectedOption);

  const handleOnChange = e => {
    setSelectedOption(e.target.value);
  };

  const handleFactorSelection = e => {
    e.preventDefault();
    handleSelection(selectedOption);
  };

  const choiceItem = (choice, index) => {
    const factorTypeId = `${choice.factorType}-${choice.provider}`;
    return (
      <Fragment key={index}>
        <input
          className="ds-c-choice"
          id={factorTypeId}
          checked={selectedOption === factorTypeId}
          type="radio"
          name="mfa-choices"
          value={factorTypeId}
          onChange={handleOnChange}
        />
        <label htmlFor={factorTypeId}>
          <span>{choice.displayName}</span>
        </label>
      </Fragment>
    );
  };

  return (
    <div id="start-main-content">
      <div className="ds-l-container">
        <div className="login-card">
          <h1 className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center ds-u-margin--0">
            <span>Verify Your Identity</span>
          </h1>
          <form onSubmit={handleFactorSelection || formSubmitNoop}>
            <fieldset className="ds-c-fieldset ds-u-margin-top--1">
              <legend className="ds-u-margin-y--1">
                Choose a Multi-Factor Authentication route.
              </legend>
              {factors.map((choice, index) =>
                choice.active ? choiceItem(choice, index) : null
              )}
            </fieldset>
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
};

LoginMFAEnroll.propTypes = {
  handleSelection: PropTypes.func.isRequired,
  factors: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedOption: PropTypes.string
};

LoginMFAEnroll.defaultProps = {
  selectedOption: 'sms'
};

export default withRouter(LoginMFAEnroll);

export { LoginMFAEnroll as plain };
