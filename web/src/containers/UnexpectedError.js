import { Button, Dialog } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Spinner } from '../components/Icons';

import { saveApd } from '../actions/app';
import { selectHasError, selectIsSaving } from '../reducers/saving';

const UnexpectedError = ({ hasError, isSaving, save }) => {
  const closeErrorAlert = () => {
    save();
  };

  return (
    <div aria-live="polite">
      {hasError && (
        <Dialog
          heading="Unable to save changes!"
          onExit={closeErrorAlert}
        >
          <p>
            Your changes aren&apos;t being saved. Try saving your changes again
            in a few minutes by clicking on the save button. If you refresh your
            browser without saving backing up your changes, changes made after
            this message appeared will be lost.
          </p>
          <p className="ds-u-text-align--right ds-u-margin-bottom--0">
            <Button variation="primary" onClick={save}>
              {isSaving && <Spinner />}
              {isSaving ? ' Saving' : 'Save'}
            </Button>
          </p>
        </Dialog>
      )}
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
