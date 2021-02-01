import { Alert, Button } from '@cmsgov/design-system';
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
        heading="Unable to save changes!"
        role="alertdialog"
        variation="warn"
      >
        <p>
          Your changes aren't being saved. Try saving your changes again in a
          few minutes by clicking on the save button.
        </p>
        <p>
          If that doesn't clear this message, back up the changes you made on
          this page (for instance, if you just wrote a long narrative, save it
          into a text file or word doc) and refresh your browser. If you refresh
          your browser without saving backing up your changes, changes made
          after this message appeared will be lost.
        </p>
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
