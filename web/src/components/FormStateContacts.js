import PropTypes from 'prop-types';
import React from 'react';
import { Field, FieldArray, FormSection, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';

const Contacts = ({ fields, meta: { error, submitFailed } }) => (
  <div className="mt2">
    {fields.map((contact, idx) => (
      <div key={contact} className="mb2">
        <SectionHeader>Contact #{idx + 1}:</SectionHeader>
        <div className="clearfix mxn1">
          <div className="col col-12 sm-col-4 px1">
            <Field name={`${contact}.name`} component={Input} label="Name" />
          </div>
          <div className="col col-12 sm-col-4 px1">
            <Field
              name={`${contact}.position`}
              component={Input}
              label="Title"
            />
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

const FormStateContacts = ({ handleSubmit, submitting, stateName }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      We already have some information about {stateName} from our records.
    </SectionHeader>

    <SectionHeader>Medicaid office:</SectionHeader>
    <FormSection name="medicaid_office">
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
    <FormSection name="medicaid_office.director">
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

    <FieldArray name="state_pocs" component={Contacts} />

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

FormStateContacts.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  stateName: PropTypes.string.isRequired
};

const formConfig = {
  form: 'stateContacts',
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormStateContacts);

export { Contacts as RawContacts, FormStateContacts as RawFormStateContacts };
