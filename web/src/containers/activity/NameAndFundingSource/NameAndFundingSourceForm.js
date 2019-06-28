import { ChoiceList, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

const NameAndFundingSourceForm = ({
  item: { fundingSource, key, name },
  handleChange
}) => {
  const changeName = useCallback(({ target: { value } }) => {
    handleChange(key, { name: value });
  });

  const changeFundingSource = useCallback(({ target: { value } }) => {
    handleChange(key, { fundingSource: value }, true);
  });

  return (
    <Fragment>
      <TextField
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
  handleChange: PropTypes.func.isRequired,
  item: PropTypes.shape({
    fundingSource: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default NameAndFundingSourceForm;
