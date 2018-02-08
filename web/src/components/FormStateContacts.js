import PropTypes from 'prop-types';
import React from 'react';
import { Box, Button, Flex } from 'rebass';
import { Field, FieldArray, FormSection, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';

const Contacts = ({ fields, meta: { error, submitFailed } }) => (
  <Box mt={4}>
    {fields.map((contact, idx) => (
      <Box mb={4} key={idx}>
        <SectionHeader>Contact #{idx + 1}:</SectionHeader>
        <Flex wrap mx={-2}>
          <Box px={2} w={[1, 1 / 3]}>
            <Field name={`${contact}.name`} component={Input} label="Name" />
          </Box>
          <Box px={2} w={[1, 1 / 3]}>
            <Field name={`${contact}.title`} component={Input} label="Title" />
          </Box>
          <Box px={2} w={[1, 1 / 3]}>
            <Field
              name={`${contact}.email`}
              type="email"
              component={Input}
              label="Email address"
            />
          </Box>
        </Flex>
        <button
          type="button"
          title="Remove Contact"
          onClick={() => fields.remove(idx)}
        >
          Remove
        </button>
      </Box>
    ))}
    <Box>
      <Button bg="black" onClick={() => fields.push({})}>
        Add another contact
      </Button>
      {submitFailed && error && <div>{error}</div>}
    </Box>
  </Box>
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
      <Flex wrap mx={-2}>
        <Box px={2} w={[1, 1 / 2]}>
          <Field name="city" component={Input} label="City" />
        </Box>
        <Box px={2} w={[1 / 2, 1 / 4]}>
          <Field name="state" component={Input} label="State" />
        </Box>
        <Box px={2} w={[1 / 2, 1 / 4]}>
          <Field name="zip" component={Input} label="Zip" />
        </Box>
      </Flex>
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
      email: 'first.last@vermont.gov',
      phone: '555-123-4567'
    }
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormStateContacts);
