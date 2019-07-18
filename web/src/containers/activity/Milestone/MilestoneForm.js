import { TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import DateField from '../../../components/DateField';

const MilestoneForm = ({
  index,
  item: { endDate, milestone },
  onChangeDate,
  onChangeName
}) => {
  const changeDate = useCallback(
    (_, dateStr) => onChangeDate(index, dateStr),
    []
  );
  const changeName = useCallback(
    ({ target: { value } }) => onChangeName(index, value),
    []
  );

  return (
    <Fragment>
      <h6 className="ds-h4">Milestone {index + 1}:</h6>
      <TextField
        autoFocus="true"
        label="Name"
        name="name"
        value={milestone}
        onChange={changeName}
      />
      <DateField
        label="Planned end date"
        hint=""
        value={endDate}
        onChange={changeDate}
      />
    </Fragment>
  );
};

MilestoneForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    endDate: PropTypes.string.isRequired,
    milestone: PropTypes.string.isRequired
  }).isRequired,
  onChangeDate: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired
};

export default MilestoneForm;
