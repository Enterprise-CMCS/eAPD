import { Alert, Button, Spinner } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

const formSubmitNoop = e => e.preventDefault();

const AuthenticationForm = ({
  cancelable,
  canSubmit,
  children,
  error,
  footer,
  id,
  legend,
  onSave,
  primaryButtonText: [primaryButtonNormal, primaryButtonWorking],
  sectionName,
  success,
  title,
  working,
  hasEverLoggedOn
}) => (
  <div id={id}>
    <div className="ds-l-container" id="start-main-content">
      <div className="login-card">
        {!!success && (
          <Alert variation="success" role="alert">
            {success}
          </Alert>
        )}
        {!!error && (
          <Alert variation="error" role="alert">
            {error}
          </Alert>
        )}

        {hasEverLoggedOn && (
          <p className="ds-u-color--gray ds-u-margin-bottom--0">Welcome Back</p>
        )}
        <h1 className="ds-h1 ds-u-margin--0 ds-u-font-weight--bold">
          {sectionName.length > 0 && (
            <span className="ds-h6 ds-u-display--block">
              {sectionName.toUpperCase()}
            </span>
          )}
          {title}
        </h1>
        <form onSubmit={(canSubmit && onSave) || formSubmitNoop}>
          <fieldset className="ds-u-margin--0 ds-u-padding--0 ds-u-border--0 ds-u-measure--wide">
            {!!legend && (
              <legend className="ds-u-visibility--screen-reader">
                {legend}
              </legend>
            )}
            {children}
            <hr className="ds-u-color--gray-lighter" />
            <div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3">
              {onSave && (
                <Button
                  variation="primary"
                  type="submit"
                  disabled={!canSubmit || working}
                >
                  {working ? (
                    <Fragment>
                      <Spinner /> {primaryButtonWorking}
                    </Fragment>
                  ) : (
                    primaryButtonNormal
                  )}
                </Button>
              )}
              {cancelable && (
                <a href="/" className="ds-c-button ds-c-button--transparent">
                  Cancel
                </a>
              )}
            </div>
          </fieldset>
        </form>
        {footer && <div className="card--foter">{footer}</div>}
      </div>
    </div>
  </div>
);

AuthenticationForm.propTypes = {
  cancelable: PropTypes.bool,
  canSubmit: PropTypes.bool,
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  id: PropTypes.string,
  legend: PropTypes.string,
  onSave: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  primaryButtonText: PropTypes.arrayOf(PropTypes.string),
  sectionName: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  title: PropTypes.string.isRequired,
  working: PropTypes.bool,
  hasEverLoggedOn: PropTypes.bool
};

AuthenticationForm.defaultProps = {
  cancelable: true,
  canSubmit: true,
  error: false,
  footer: false,
  id: 'start-main-content',
  legend: '',
  onSave: false,
  primaryButtonText: ['Save changes', 'Working'],
  sectionName: '',
  success: false,
  working: false,
  hasEverLoggedOn: false
};

export default withRouter(AuthenticationForm);

export { AuthenticationForm as plain };
