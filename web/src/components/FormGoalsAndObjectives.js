import PropTypes from 'prop-types';
import React from 'react';
import { Box, Button, Flex } from 'rebass';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';

const Objectives = ({ fields, meta: { error, submitFailed } }) => (
  <Box mt={4} ml={4}>
    <span>
      Tell us how you&apos;ll know when you&apos;ve achieved this goal:
    </span>

    {fields.map((objective, idx) => (
      <Field
        key={objective}
        name={objective}
        component={Input}
        label={`Objective ${idx + 1}`}
      />
    ))}
    <Box>
      <Button bg="black" onClick={() => fields.push({})}>
        Add another objective
      </Button>
      {submitFailed && error && <div>{error}</div>}
    </Box>
  </Box>
);

Objectives.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const Goals = ({ fields, meta: { error, submitFailed } }) => (
  <Box mt={4}>
    {fields.map((goal, idx) => (
      <Box mb={4} key={goal}>
        <SectionHeader>Goal #{idx + 1}:</SectionHeader>
        <Flex wrap mx={-2}>
          <Box p={2} w={[1, 1 / 3]}>
            <Field
              name={`${goal}.description`}
              component={Input}
              label="Description"
            />

            <FieldArray name={`${goal}.objectives`} component={Objectives} />
          </Box>
        </Flex>
        <button
          type="button"
          title="Remove Goal"
          onClick={() => fields.remove(idx)}
        >
          Remove goal
        </button>
      </Box>
    ))}
    <Box>
      <Button bg="black" onClick={() => fields.push({})}>
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

const FormGoalsAndObjectives = ({
  handleSubmit,
  pristine,
  reset,
  submitting
}) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      List the goals you&apos;re hoping to accomplish as part of this activity:
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

FormGoalsAndObjectives.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'goalsAndObjectives',
  initialValues: { goals: [{ description: '', objectives: ['', ''] }] },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormGoalsAndObjectives);
