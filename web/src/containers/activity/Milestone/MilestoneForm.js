import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useReducer, forwardRef } from 'react';
import { connect } from 'react-redux';

import DateField from '../../../components/DateField';

import {
  saveMilestone as actualSaveMilestone
} from '../../../actions/editActivity';

import { validateText } from '../../../helpers/textValidation';
import { validateSubForm } from '../../../helpers/subFormValidation';

const MilestoneForm = forwardRef(
  (
    {
      activityIndex,
      index,
      item,
      saveMilestone
    },
    ref
  ) => {
  MilestoneForm.displayName = 'MilestoneForm';

  function reducer(state, action) {
    switch (action.type) {
      case 'updateField':
        return {
          ...state,
          [action.field]: action.value
        }
      default:
        throw new Error(
          'Unrecognized action type provided to OutcomesAndMetricForm reducer'
        );
    }
  }  
  
  const [state, dispatch] = useReducer(reducer, item);
  
  const changeDate = (_, dateStr) => dispatch({ type: 'updateField', field: 'endDate', value: dateStr });
  
  const changeName = ({ target: { value } }) => dispatch({ type: 'updateField', field: 'milestone', value });
  
  const handleSubmit = e => {
    e.preventDefault();
    saveMilestone(activityIndex, index, state);
  };

  return (
    <form index={index} onSubmit={handleSubmit}>
      <h6 className="ds-h4">Milestone {index + 1}:</h6>
      <TextField
        data-cy={`milestone-${index}`}
        label="Name"
        name="name"
        value={state.milestone}
        className="remove-clearfix"
        onChange={changeName}
        onBlur={validateText}
        onKeyUp={validateText}
      />
      <DateField
        label="Target completion date"
        hint=""
        value={state.endDate}
        onChange={changeDate}
        onBlur={validateSubForm}
        onKeyUp={validateSubForm}
      />
      <input className="ds-u-visibility--hidden" type="submit" ref={ref} hidden />
    </form>
  );
}
);

MilestoneForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    endDate: PropTypes.string.isRequired,
    milestone: PropTypes.string.isRequired
  }).isRequired,
  saveMilestone: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveMilestone: actualSaveMilestone
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  MilestoneForm
);

export { MilestoneForm as plain, mapDispatchToProps };
