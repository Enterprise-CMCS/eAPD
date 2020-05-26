import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { selectIsSaving, selectLastSaved } from '../reducers/saving';

import SaveMessage from './SaveMessage';

import { Check, Spinner } from './Icons';

const HeaderSaveMessage = ({ isSaving, lastSaved }) => {
  return isSaving ? (
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
