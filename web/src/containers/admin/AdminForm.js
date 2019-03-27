import { Alert, Button, Spinner } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const AdminForm = ({
  children,
  error,
  legend,
  onCancel,
  onSave,
  success,
  title,
  working
}) => (
  <div className="ds-l-container card">
    <div className="ds-l-row ds-u-radius ds-u-padding-y--5">
      <div className="ds-l-col--1 ds-u-fill--white ds-u-margin-left--auto" />
      <div className="ds-l-col--6 ds-u-fill--white ds-u-padding-y--5">
        {!!success && <Alert variation="success">{success}</Alert>}
        {!!error && <Alert variation="error">{error}</Alert>}

        <h1 className="ds-h1">
          <h6 className="ds-h6">ADMINISTRATOR</h6>
          {title}
        </h1>
        <form onSubmit={onSave || (() => {})}>
          <fieldset className="ds-u-margin--0 ds-u-padding--0 ds-u-border--0">
            {!!legend && <legend className="sr-only">{legend}</legend>}

            {children}

            <div className="ds-u-margin-top--5">
              {onSave && (
                <Button variation="primary" type="submit" disabled={working}>
                  {working ? (
                    <Fragment>
                      <Spinner /> Working
                    </Fragment>
                  ) : (
                    'Save changes'
                  )}
                </Button>
              )}
              <Button variation="transparent" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="ds-l-col--1 ds-u-fill--white ds-u-margin-right--auto" />
    </div>
  </div>
);

AdminForm.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  legend: PropTypes.string,
  onCancel: PropTypes.func,
  onSave: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  title: PropTypes.string.isRequired,
  working: PropTypes.bool
};

AdminForm.defaultProps = {
  error: false,
  legend: '',
  onCancel: () => {},
  onSave: false,
  success: false,
  working: false
};

export default AdminForm;
