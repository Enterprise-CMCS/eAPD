import { ChoiceList, TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import {
  setActivityName,
  setActivityFundingSource
} from '../../../../actions/editActivity';

const NameAndFundingSourceForm = ({
  index,
  item: { fundingSource, name },
  setFundingSource,
  setName
}) => {
  const changeName = useCallback(
    ({ target: { value } }) => {
      setName(index, value);
    },
    [index, setName]
  );

  const changeFundingSource = useCallback(
    ({ target: { value } }) => {
      setFundingSource(index, value);
    },
    [index, setFundingSource]
  );

  const choices = ['HIT', 'HIE', 'MMIS'].map(choice => ({
    checked: fundingSource === choice,
    label: choice,
    value: choice
  }));

  return (
    <Fragment>
      <TextField
        label="Activity name"
        name="activity-name"
        value={name}
        onChange={changeName}
        className="remove-clearfix"
      />
      <ChoiceList
        choices={choices}
        label="Program type"
        labelClassName="ds-u-margin-bottom--1"
        name="program-type"
        onChange={changeFundingSource}
        type="radio"
      />
    </Fragment>
  );
};

NameAndFundingSourceForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    fundingSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  setFundingSource: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setFundingSource: setActivityFundingSource,
  setName: setActivityName
};

export default connect(null, mapDispatchToProps)(NameAndFundingSourceForm);

export { NameAndFundingSourceForm as plain, mapDispatchToProps };
