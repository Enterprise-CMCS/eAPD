import PropTypes from 'prop-types';
import React from 'react';
import { Absolute, Box, Button, ButtonOutline, Relative } from 'rebass';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Input, Textarea } from './Inputs';
import SectionHeader from './SectionHeader';

const entryShell = { description: '', objectives: ['', ''] };

const Objectives = ({ fields, meta: { error, submitFailed } }) => (
  <Box mb={4}>
    <SectionHeader>
      Tell us how you’ll know when you’ve achieved this goal:
    </SectionHeader>
    <Box pl={4}>
      {fields.map((objective, idx) => (
        <Field
          key={objective}
          name={objective}
          component={Input}
          label={`Objective ${idx + 1}`}
        />
      ))}
      <Box>
        <ButtonOutline color="black" onClick={() => fields.push('')}>
          Add another objective
        </ButtonOutline>
        {submitFailed && error && <div>{error}</div>}
      </Box>
    </Box>
  </Box>
);

Objectives.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const Goals = ({ fields, meta: { error, submitFailed } }) => (
  <Box>
    {fields.map((goal, idx) => (
      <Box mb={5} key={goal}>
        <Relative>
          <Absolute right>
            <button
              type="button"
              title="Remove Goal"
              onClick={() => fields.remove(idx)}
            >
              Remove goal
            </button>
          </Absolute>
          <SectionHeader>Goal #{idx + 1}:</SectionHeader>
        </Relative>
        <Field
          name={`${goal}.description`}
          component={Textarea}
          label="Description"
        />
        <FieldArray name={`${goal}.objectives`} component={Objectives} />
      </Box>
    ))}
    <Box>
      <Button bg="black" onClick={() => fields.push({ ...entryShell })}>
        Add another goal
      </Button>
      {submitFailed && error && <div>{error}</div>}
    </Box>
  </Box>
);

Goals.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const FormActivityGoals = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      List the goals you’re hoping to accomplish as part of this activity:
    </SectionHeader>
    <FieldArray name="goals" component={Goals} />
    {false && (
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    )}
  </form>
);

FormActivityGoals.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'activityGoals',
  initialValues: { goals: [{ ...entryShell }] },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormActivityGoals);
