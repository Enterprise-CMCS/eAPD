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

const Approaches = ({ fields, meta: { error, submitFailed } }) => (
  <Box mt={4}>
    {fields.map((approach, idx) => (
      <Box mb={4} key={approach}>
        <Flex wrap mx={-2}>
          <Box p={2} w={[1, 1 / 3]}>
            <Field
              name={`${approach}.approach`}
              component={Input}
              label={`Approach ${idx + 1}`}
            />
            <Box ml={4}>
              <Field
                name={`${approach}.alternatives`}
                component={Input}
                label="Describe the alternatives"
              />
              <Field
                name={`${approach}.explanation`}
                component={Input}
                label="Tell us why you chose this approach"
              />
            </Box>
          </Box>
        </Flex>
        <button
          type="button"
          title="Remove approach"
          onClick={() => fields.remove(idx)}
        >
          Remove approach
        </button>
      </Box>
    ))}
    <Box>
      <Button bg="black" onClick={() => fields.push({})}>
        Add another approach
      </Button>
      {submitFailed && error && <div>{error}</div>}
    </Box>
  </Box>
);

Approaches.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const FormApproach = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      Describe any alternative approaches that you considered when planning this
      activity. Which options did you decide against, and why?
    </SectionHeader>

    <FieldArray name="approaches" component={Approaches} />

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

FormApproach.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'approach',
  initialValues: {
    approaches: [{ approach: '', alternatives: '', explanation: '' }]
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormApproach);
