import { ChoiceList, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  setActivityName,
  setActivityFundingSource
} from '../../../actions/editActivity';

const NameAndFundingSourceForm = ({ index, item: { fundingSource, name } }) => {
  const dispatch = useDispatch();

  const changeName = useCallback(({ target: { value } }) => {
    // These forms are built from the list of editable activities, which is
    // all activities except the first one. So the local list index starts at
    // 0, but it corresponds to index 1 in the full list. To handle that, just
    // increment the local index by one when updating the activity.
    dispatch(setActivityName(index + 1, value));
  });

  const changeFundingSource = useCallback(({ target: { value } }) => {
    // Same thing here.
    dispatch(setActivityFundingSource(index + 1, value));
  });

  return (
    <Fragment>
      <TextField
        autoFocus="true"
        label="Activity name"
        name="activity-name"
        value={name}
        onChange={changeName}
      />
      <ChoiceList
        label="Program type"
        name="program-type"
        choices={[
          { checked: fundingSource === 'HIT', label: 'HIT', value: 'HIT' },
          { checked: fundingSource === 'HIE', label: 'HIE', value: 'HIE' },
          { checked: fundingSource === 'MMIS', label: 'MMIS', value: 'MMIS' }
        ]}
        onChange={changeFundingSource}
      />
    </Fragment>
  );
};

NameAndFundingSourceForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    fundingSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default NameAndFundingSourceForm;
