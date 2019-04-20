import { Alert, Button, Spinner } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

const formSubmitNoop = e => e.preventDefault();

const CardForm = ({
  cancelable,
  canSubmit,
  children,
  error,
  footer,
  history,
  legend,
  onSave,
  primaryButtonText: [primaryButtonNormal, primaryButtonWorking],
  sectionName,
  success,
  title,
  working
}) => (
  <div className="card--container">
    <div className="ds-l-container">
      <div className="ds-l-row card">
        <div className="ds-l-col--1 ds-u-margin-left--auto" />
        <div className="ds-l-col--12 ds-l-sm-col--10 ds-l-lg-col--6">
          {!!success && <Alert variation="success">{success}</Alert>}
          {!!error && <Alert variation="error">{error}</Alert>}

          <h1 className="ds-h1">
            {sectionName.length > 0 && (
              <span className="ds-h6 ds-u-display--block">
                {sectionName.toUpperCase()}
              </span>
            )}
            {title}
          </h1>
          <form onSubmit={(canSubmit && onSave) || formSubmitNoop}>
            <fieldset className="ds-u-margin--0 ds-u-padding--0 ds-u-border--0">
              {!!legend && <legend className="sr-only">{legend}</legend>}

              {children}

              <div className="ds-u-margin-top--5">
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
                  <Button variation="transparent" onClick={history.goBack}>
                    Cancel
                  </Button>
                )}
              </div>
            </fieldset>
          </form>
          {footer && <div className="card--foter">{footer}</div>}
        </div>
        <div className="ds-l-col--1 ds-u-margin-right--auto" />
      </div>
    </div>
  </div>
);

CardForm.propTypes = {
  cancelable: PropTypes.bool,
  canSubmit: PropTypes.bool,
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  history: PropTypes.object.isRequired,
  legend: PropTypes.string,
  onSave: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  primaryButtonText: PropTypes.arrayOf(PropTypes.string),
  sectionName: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  title: PropTypes.string.isRequired,
  working: PropTypes.bool
};

CardForm.defaultProps = {
  cancelable: true,
  canSubmit: true,
  error: false,
  footer: false,
  legend: '',
  onSave: false,
  primaryButtonText: ['Save changes', 'Working'],
  sectionName: '',
  success: false,
  working: false
};

export default withRouter(CardForm);

export { CardForm as plain };
