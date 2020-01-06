import { Alert, Button, Spinner } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import stickybits from 'stickybits';

import { saveApd } from '../actions/app';
import { getSaveApdError } from '../reducers/errors';
import { selectHasChanges } from '../reducers/patch.selectors';
import { getSaveApdWorking } from '../reducers/working';

const getButtonContent = (dirty, working) => {
  if (!dirty) {
    return 'Saved';
  }

  if (working) {
    return (
      <Fragment>
        <Spinner /> Saving
      </Fragment>
    );
  }

  return 'Save';
};

const SaveButton = ({ error, needsSave, saveApd: action, working }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const [success, setSuccess] = useState(false);

  // Success has to be derived.  It can't be stored in the app state because
  // if it was, then the next time this form was loaded, it would show the
  // success state even though it wouldn't be accurate anymore.
  if (hasFetched) {
    const newSuccess = !working && !error;
    if (newSuccess !== success) {
      setSuccess(newSuccess);
    }
  }

  useEffect(() => {
    stickybits('#apd-save-button', { verticalPosition: 'bottom' });
  }, []);

  const clearFetched = () => {
    setHasFetched(false);
  };

  const setSuccessTimer = (() => {
    let alertTimer = null;
    return () => {
      if (alertTimer) {
        // If there's already a save timer, clear it or else it'll close the
        // success dialog when it runs out rather than five seconds from now
        clearTimeout(alertTimer);
      }
      alertTimer = setTimeout(clearFetched, 5000);
    };
  })();

  const save = () => {
    setHasFetched(true);
    action();
  };

  let alert = null;
  if (hasFetched) {
    if (error) {
      alert = (
        <Alert variation="error" className="ds-u-margin-bottom--2">
          {error}
        </Alert>
      );
    }
    if (success) {
      alert = (
        <Alert variation="success" className="ds-u-margin-bottom--2">
          Save successful!
        </Alert>
      );
      setSuccessTimer();
    }
  }

  const buttonVariant = needsSave ? 'primary' : 'success';

  return (
    <div
      id="apd-save-button"
      className="save-button--container ds-u-margin-bottom--3 visibility--screen"
    >
      <div className="save-button--alert">{alert}</div>
      <Button variation={buttonVariant} onClick={save}>
        {getButtonContent(needsSave, working)}
      </Button>
    </div>
  );
};

SaveButton.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  needsSave: PropTypes.bool.isRequired,
  saveApd: PropTypes.func.isRequired,
  working: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  error: getSaveApdError(state),
  needsSave: selectHasChanges(state),
  working: getSaveApdWorking(state)
});

const mapDispatchToProps = { saveApd };

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);

export { SaveButton as plain, mapStateToProps, mapDispatchToProps };
