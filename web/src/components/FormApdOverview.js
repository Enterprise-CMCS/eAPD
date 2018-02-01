import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'rebass';
import { Field, reduxForm } from 'redux-form';

import { Textarea } from './Inputs';

const FormApdOverview = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name="vision" component={Textarea} label="Vision" />
    <Field name="benefits" component={Textarea} label="Benefits" />
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

FormApdOverview.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'apdOverview'
};

export default reduxForm(formConfig)(FormApdOverview);
