import { Alert, Button, Spinner } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const AuthenticationForm = ({
  cancelable,
  canSubmit,
  children,
  error,
  footer,
  id,
  legend,
  onSave,
  onCancel,
  primaryButtonText: [primaryButtonNormal, primaryButtonWorking],
  secondaryButtonText,
  sectionName,
  success,
  title,
  working,
  hasEverLoggedOn
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    if (canSubmit && onSave) onSave(e);
  };

  const handleCancel = e => {
    e.preventDefault();
    if (cancelable && onCancel) onCancel(e);
  };

  return (
    <div id={id} className="card--container">
      <div className="ds-l-container">
        <div className="ds-l-row card">
          <div className="ds-l-col--1 ds-u-margin-left--auto" />
          <div className="ds-l-col--12 ds-l-sm-col--10 ds-l-lg-col--6">
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
              <p className="ds-u-color--gray ds-u-margin-bottom--0">
                Welcome Back
              </p>
            )}
            <h1 className="ds-h1 ds-u-margin--0 ds-u-font-weight--bold">
              {sectionName.length > 0 && (
                <span className="ds-h6 ds-u-display--block">
                  {sectionName.toUpperCase()}
                </span>
              )}
              {title}
            </h1>
            <form onSubmit={handleSubmit}>
              <fieldset className="ds-u-margin--0 ds-u-padding--0 ds-u-border--0 ds-u-measure--wide">
                {!!legend && (
                  <legend className="ds-u-visibility--screen-reader">
                    {legend}
                  </legend>
                )}
                {children}
                <hr className="ds-u-color--gray-lighter" />
                <div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3">
                  {cancelable && onCancel ? (
                    <Button variation="transparent" onClick={handleCancel}>
                      {secondaryButtonText}
                    </Button>
                  ) : (
                    <a
                      href="/"
                      className="ds-c-button ds-c-button--transparent"
                    >
                      {secondaryButtonText}
                    </a>
                  )}
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
                </div>
              </fieldset>
            </form>
            {footer && <div className="card--footer">{footer}</div>}
          </div>
          <div className="ds-l-col--1 ds-u-margin-right--auto" />
        </div>
      </div>
    </div>
  );
};

AuthenticationForm.propTypes = {
  cancelable: PropTypes.bool,
  canSubmit: PropTypes.bool,
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  id: PropTypes.string,
  legend: PropTypes.string,
  onSave: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onCancel: PropTypes.func,
  primaryButtonText: PropTypes.arrayOf(PropTypes.string),
  secondaryButtonText: PropTypes.string,
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
  id: null,
  legend: '',
  onSave: false,
  onCancel: null,
  primaryButtonText: ['Save changes', 'Working'],
  secondaryButtonText: 'Cancel',
  sectionName: '',
  success: false,
  working: false,
  hasEverLoggedOn: false
};

export default AuthenticationForm;
