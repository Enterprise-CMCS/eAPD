import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';
import SelectInput from './SelectInput';
import { STATES } from '../util';

const FormStateStart = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>Your info:</SectionHeader>
    <Field name="name" type="text" component={Input} label="Name" />
    <Field name="position" type="text" component={Input} label="Position" />
    <Field name="email" type="email" component={Input} label="Email address" />
    <Field
      name="phone"
      type="tel"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      component={Input}
      label="Phone number"
    />

    <SectionHeader>State:</SectionHeader>
    <Field
      name="stateName"
      component={SelectInput}
      label="State"
      options={STATES}
    />

    {false && (
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    )}
  </form>
);

FormStateStart.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'stateStart',
  initialValues: {
    name: 'Denise Nagelschmidt',
    position: 'Health Reform Portfolio Director',
    email: 'denise.nagelschmidt@vermont.gov',
    phone: '802-879-5900',
    stateName: 'vt'
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormStateStart);
