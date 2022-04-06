import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  selectError,
  selectIsSaving,
  selectLastSaved
} from '../../reducers/saving';

import SaveMessage from '../../components/SaveMessage';

import { Check, Xmark, Spinner } from '../../components/Icons';

const HeaderSaveMessage = ({ isSaving, lastSaved, error }) => {
  const [active, setActive] = useState(isSaving);
  const [delayTimer, setDelayTimer] = useState();

  if (isSaving !== active) {
    if (isSaving) {
      // If we have switched from not saving to saving, make the UI change
      // immediately.
      setActive(true);

      // If there's already a save delay timer, clear it.
      clearTimeout(delayTimer);

      // Wait 750ms after the last save began before changing the UI back to
      // "saved" from the spinner.
      setDelayTimer(
        setTimeout(() => {
          // This prompts a re-render. If the isSaving prop is still true, then
          // the conditional at the start will pass, and we'll end up back in
          // the block that creates the delay timer. This ensures that we don't
          // switch to the "last saved" UI state if the saving action is not
          // yet completed.
          setActive(false);
        }, 750)
      );
    }
  }

  if (active) {
    return (
      <span>
        <Spinner spin /> Saving...
      </span>
    );
  }

  if (typeof error === 'string') {
    return (
      <span>
        <Xmark /> {error}
      </span>
    );
  }

  return (
    <span>
      <Check /> <SaveMessage lastSaved={lastSaved} error={error} />
    </span>
  );
};

HeaderSaveMessage.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  lastSaved: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isSaving: selectIsSaving(state),
  lastSaved: selectLastSaved(state),
  error: selectError(state)
});

export default connect(mapStateToProps)(HeaderSaveMessage);

export { HeaderSaveMessage as plain, mapStateToProps };
