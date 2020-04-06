import { Alert, Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Spinner } from '../components/Icons';

import { saveApd } from '../actions/app';
import { selectHasError, selectIsSaving } from '../reducers/saving';

const UnexpectedError = ({ hasError, isSaving, save }) => {
  const className = hasError ? 'alert--unexpected-error__active' : '';

  return (
    <div
      aria-hidden={!hasError}
      aria-live="polite"
      className={`alert--unexpected-error ${className}`}
    >
      <Alert
        heading="There's been an unexpected error."
        role="alertdialog"
        variation="warn"
      >
        We weren&lsquo;t able to save your latest changes. Try saving in a few
        minutes. If you continue to see this message, refresh your browser.
        Before this issue is resolved, new changes may be lost if you continue
        to make edits or if you refresh your browser.
        <p className="ds-u-text-align--right ds-u-margin-bottom--0">
          <Button variation="primary" onClick={save}>
            {isSaving && <Spinner />}
            {isSaving ? ' Saving' : 'Save'}
          </Button>
        </p>
      </Alert>
    </div>
  );
};

UnexpectedError.propTypes = {
  hasError: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  hasError: selectHasError(state),
  isSaving: selectIsSaving(state)
});

const mapDispatchToProps = { save: saveApd };

export default connect(mapStateToProps, mapDispatchToProps)(UnexpectedError);

export { UnexpectedError as plain, mapStateToProps, mapDispatchToProps };
