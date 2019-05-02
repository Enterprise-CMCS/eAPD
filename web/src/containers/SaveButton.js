import { Alert, Button, Spinner } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import { saveApd } from '../actions/apd';
import { getIsDirty } from '../reducers/dirty';
import { getSaveApdError } from '../reducers/errors';
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

class SaveButton extends PureComponent {
  state = {
    hasFetched: false,
    success: false
  };

  static getDerivedStateFromProps({ error, working }, { hasFetched }) {
    // Success has to be derived.  It can't be stored in the app state because
    // if it was, then the next time this form was loaded, it would show the
    // success state even though it wouldn't be accurate anymore.
    if (hasFetched) {
      const success = !working && !error;
      return { success };
    }
    return null;
  }

  setSuccessTimer = (() => {
    let alertTimer = null;
    return () => {
      if (alertTimer) {
        // If there's already a save timer, clear it or else it'll close the
        // success dialog when it runs out rather than five seconds from now
        clearTimeout(alertTimer);
      }
      alertTimer = setTimeout(this.clearFetched, 5000);
    };
  })();

  clearFetched = () => {
    this.setState({ hasFetched: false });
  };

  save = () => {
    const { saveApd: action } = this.props;
    this.setState({ hasFetched: true });
    action();
  };

  render() {
    const { dirty, error, working } = this.props;
    const { hasFetched, success } = this.state;

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
        this.setSuccessTimer();
      }
    }

    const buttonVariant = dirty ? 'primary' : 'success';

    return (
        <div className="save-button--container ds-u-margin-bottom--3">
          <div className="save-button--alert">{alert}</div>
          <Button variation={buttonVariant} onClick={this.save}>
            {getButtonContent(dirty, working)}
          </Button>
        </div>
    );
  }
}

SaveButton.propTypes = {
  dirty: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  saveApd: PropTypes.func.isRequired,
  working: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  dirty: getIsDirty(state),
  error: getSaveApdError(state),
  working: getSaveApdWorking(state)
});

const mapDispatchToProps = { saveApd };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveButton);

export { SaveButton as plain, mapStateToProps, mapDispatchToProps };
