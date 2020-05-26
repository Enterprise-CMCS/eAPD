import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { selectIsSaving, selectLastSaved } from '../reducers/saving';

import SaveMessage from './SaveMessage';

import { Check, Spinner } from './Icons';

const HeaderSaveMessage = ({ isSaving, lastSaved }) => {
  const [active, setActive] = useState(isSaving);
  const [delayTimer, setDelayTimer] = useState();

  if (isSaving !== active) {
    if (isSaving) {
      // If we have switched from not saving to saving, make the UI change
      // immediately.
      setActive(true);

      // If there's already a save delay timer, clear it.
      console.log(`clearing timer ${delayTimer}`);
      clearTimeout(delayTimer);

      // Wait 750ms after the last save began before changing the UI back to
      // "saved" from the spinner.
      setDelayTimer(
        setTimeout(() => {
          console.log('okay save delay is done');
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

  return active ? (
    <span>
      <Spinner spin /> Saving...
    </span>
  ) : (
    <span>
      <Check /> <SaveMessage lastSaved={lastSaved} />
    </span>
  );
};

HeaderSaveMessage.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  lastSaved: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isSaving: selectIsSaving(state),
  lastSaved: selectLastSaved(state)
});

export default connect(mapStateToProps)(HeaderSaveMessage);

export { HeaderSaveMessage as plain, mapStateToProps };
