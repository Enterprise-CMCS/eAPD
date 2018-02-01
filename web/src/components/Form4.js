import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'rebass';
import { Field, reduxForm } from 'redux-form';

import CheckboxGroup from './CheckboxGroup';

const activityOptions = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
  { value: 'baz', label: 'Baz' }
];

const Form4 = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <p>
      Here are some common activities for HITECH programs. Do any of these apply
      in 2018–2020?
    </p>
    <Field
      name="activities"
      component={CheckboxGroup}
      options={activityOptions}
    />
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

Form4.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'form3',
  initialValues: { activities: ['bar'] }
};

export default reduxForm(formConfig)(Form4);
