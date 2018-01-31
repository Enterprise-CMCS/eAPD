import PropTypes from 'prop-types';
import React from 'react';
import { Box, Button, Divider, Subhead } from 'rebass';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Input } from './Inputs';

const Contacts = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    <div>
      <Button bg="green" onClick={() => fields.push({})}>
        Add Contact
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </div>
    {fields.map((contact, idx) => (
      <Box mb={4} key={idx}>
        <Subhead my={2}>Contact #{idx + 1}</Subhead>
        <Field
          name={`${contact}.firstName`}
          component={Input}
          label="First Name"
        />
        <Field
          name={`${contact}.lastName`}
          component={Input}
          label="Last Name"
        />
        <button
          type="button"
          title="Remove Contact"
          onClick={() => fields.remove(idx)}
        >
          Remove
        </button>
      </Box>
    ))}
  </div>
);

Contacts.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const Form2 = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name="medicaidDirectorName" component={Input} label="Director" />
    <FieldArray name="contacts" component={Contacts} />
    <Divider my={4} color="gray2" />
    <div>
      <button type="submit" disabled={submitting}>
        Submit
      </button>
      <button type="button" disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </button>
    </div>
  </form>
);

Form2.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'form2',
  initialValues: { medicaidDirectorName: 'Bob' }
};

export default reduxForm(formConfig)(Form2);
