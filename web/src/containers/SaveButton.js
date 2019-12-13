import { Alert, Button, Spinner } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
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

  componentDidMount() {
    stickybits('#apd-save-button', { verticalPosition: 'bottom' });
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
    const { error, needsSave, working } = this.props;
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

    const buttonVariant = needsSave ? 'primary' : 'success';

    return (
      <div
        id="apd-save-button"
        className="save-button--container ds-u-margin-bottom--3 visibility--screen"
      >
        <div className="save-button--alert">{alert}</div>
        <Button variation={buttonVariant} onClick={this.save}>
          {getButtonContent(needsSave, working)}
        </Button>
      </div>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveButton);

export { SaveButton as plain, mapStateToProps, mapDispatchToProps };
