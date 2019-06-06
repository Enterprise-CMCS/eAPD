import { Button, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import DateField from '../../components/DateField';

const MilestoneForm = ({
  idx,
  endDate,
  onChangeDate,
  onChangeName,
  name,
  collapse
}) => {
  const changeDate = useCallback(
    (_, dateStr) => onChangeDate(idx, dateStr),
    []
  );
  const changeName = useCallback(
    ({ target: { value } }) => onChangeName(idx, value),
    []
  );

  return (
    <div className="ds-u-border-bottom--2 ds-u-padding-y--2">
      <h6 className="ds-h4">Milestone {idx + 1}:</h6>
      <TextField label="Name" name="name" value={name} onChange={changeName} />
      <DateField
        label="Planned end date"
        hint=""
        value={endDate}
        onChange={changeDate}
      />
      <Button
        variation="primary"
        className="ds-u-margin-top--2"
        onClick={collapse}
      >
        Done
      </Button>
    </div>
  );
};

MilestoneForm.propTypes = {
  idx: PropTypes.number.isRequired,
  endDate: PropTypes.string.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  collapse: PropTypes.func.isRequired
};

export default MilestoneForm;
