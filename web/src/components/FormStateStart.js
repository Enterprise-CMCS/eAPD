import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';
import SelectInput from './SelectInput';
import { STATES } from '../util';

const FormStateStart = ({ handleSubmit, submitting }) => (
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

    <SectionHeader>Your state:</SectionHeader>
    <Field
      name="state"
      component={SelectInput}
      label="State"
      options={[{ id: '', name: '--' }, ...STATES]}
    />

    <div className="mt3">
      <button
        type="submit"
        className="btn btn-primary bg-green"
        disabled={submitting}
      >
        {submitting ? 'Saving' : 'Submit'}
      </button>
    </div>
  </form>
);

FormStateStart.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'stateStart',
  initialValues: {
    name: '',
    position: 'Director',
    email: 'first.last@state.gov',
    phone: '555-123-4567',
    state: 'vt'
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormStateStart);
