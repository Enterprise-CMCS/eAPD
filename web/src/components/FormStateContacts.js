import PropTypes from 'prop-types';
import React from 'react';
import { Field, FieldArray, FormSection, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';

const Contacts = ({ fields, meta: { error, submitFailed } }) => (
  <div className="mt2">
    {fields.map((contact, idx) => (
      <div key={idx} className="mb2">
        <SectionHeader>Contact #{idx + 1}:</SectionHeader>
        <div className="clearfix mxn1">
          <div className="col col-12 sm-col-4 px1">
            <Field name={`${contact}.name`} component={Input} label="Name" />
          </div>
          <div className="col col-12 sm-col-4 px1">
            <Field name={`${contact}.title`} component={Input} label="Title" />
          </div>
          <div className="col col-12 sm-col-4 px1">
            <Field
              name={`${contact}.email`}
              type="email"
              component={Input}
              label="Email address"
            />
          </div>
        </div>
        <button
          type="button"
          title="Remove Contact"
          onClick={() => fields.remove(idx)}
        >
          Remove
        </button>
      </div>
    ))}
    <div>
      <button
        type="button"
        className="btn btn-primary bg-blue"
        onClick={() => fields.push({})}
      >
        Add another contact
      </button>
      {submitFailed && error && <div>{error}</div>}
    </div>
  </div>
);

Contacts.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const FormStateContacts = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      We already have some information about Vermont from our records.
    </SectionHeader>

    <SectionHeader>Medicaid office:</SectionHeader>
    <FormSection name="medicaidOffice">
      <Field name="address1" component={Input} label="Address" />
      <Field name="address2" component={Input} label="Address (continued)" />
      <div className="clearfix mxn1">
        <div className="col col-12 sm-col-6 px1">
          <Field name="city" component={Input} label="City" />
        </div>
        <div className="col col-6 sm-col-3 px1">
          <Field name="state" component={Input} label="State" />
        </div>
        <div className="col col-6 sm-col-3 px1">
          <Field name="zip" component={Input} label="Zip" />
        </div>
      </div>
    </FormSection>

    <SectionHeader>Medicaid Director:</SectionHeader>
    <FormSection name="medicaidDirector">
      <Field name="name" component={Input} label="Name" />
      <Field name="email" component={Input} label="Email address" />
      <Field
        name="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        component={Input}
        label="Phone number"
      />
    </FormSection>

    <FieldArray name="contacts" component={Contacts} />

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

FormStateContacts.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'stateContacts',
  initialValues: {
    medicaidOffice: {
      address1: 'Department of Vermont Health Access',
      address2: '280 State Drive',
      city: 'Waterbury',
      state: 'Vermont',
      zip: '05671-1010'
    },
    medicaidDirector: {
      name: 'First Last',
      email: 'first.last@state.gov',
      phone: '555-123-4567'
    }
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormStateContacts);
