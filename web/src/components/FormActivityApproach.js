import PropTypes from 'prop-types';
import React from 'react';
import { Absolute, Box, Button, Relative } from 'rebass';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Textarea } from './Inputs';
import SectionHeader from './SectionHeader';

const entryShell = { approach: '', alternatives: '', explanation: '' };

const Approaches = ({ fields, meta: { error, submitFailed } }) => (
  <Box>
    {fields.map((approach, idx) => (
      <Box mb={4} key={approach}>
        <Relative>
          <Absolute right>
            <button
              type="button"
              title="Remove Goal"
              onClick={() => fields.remove(idx)}
            >
              Remove approach
            </button>
          </Absolute>
          <SectionHeader>Approach #{idx + 1}:</SectionHeader>
        </Relative>

        <Field
          name={`${approach}.approach`}
          component={Textarea}
          label="Approach"
        />
        <Field
          name={`${approach}.alternatives`}
          component={Textarea}
          label="Describe the alternatives"
        />
        <Field
          name={`${approach}.explanation`}
          component={Textarea}
          label="Tell us why you chose this approach"
        />
      </Box>
    ))}
    <Box>
      <Button bg="black" onClick={() => fields.push({ ...entryShell })}>
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

const FormActivityApproach = ({
  handleSubmit,
  pristine,
  reset,
  submitting
}) => (
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

FormActivityApproach.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'activityApproach',
  initialValues: {
    approaches: [{ ...entryShell }]
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormActivityApproach);
