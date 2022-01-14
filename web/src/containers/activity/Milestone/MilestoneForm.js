import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import {
  setMilestoneEndDate,
  setMilestoneName
} from '../../../actions/editActivity';
import DateField from '../../../components/DateField';
import { validateText } from '../../../helpers/textValidation';

const MilestoneForm = ({
  activityIndex,
  index,
  item: { endDate, milestone },
  setEndDate,
  setName
}) => {
  const changeDate = useCallback(
    (_, dateStr) => setEndDate(activityIndex, index, dateStr),
    []
  );
  const changeName = useCallback(
    ({ target: { value } }) => setName(activityIndex, index, value),
    []
  );

  return (
    <Fragment>
      <h6 className="ds-h4">Milestone {index + 1}:</h6>
      <TextField
        autoFocus
        label="Name"
        name="name"
        value={milestone}
        onChange={changeName}
        onBlur={validateText}
        onKeyUp={validateText}
      />
      <DateField
        label="Target completion date"
        hint=""
        value={endDate}
        onChange={changeDate}
      />
    </Fragment>
  );
};

MilestoneForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    endDate: PropTypes.string.isRequired,
    milestone: PropTypes.string.isRequired
  }).isRequired,
  setEndDate: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setEndDate: setMilestoneEndDate,
  setName: setMilestoneName
};

export default connect(null, mapDispatchToProps)(MilestoneForm);

export { MilestoneForm as plain, mapDispatchToProps };
