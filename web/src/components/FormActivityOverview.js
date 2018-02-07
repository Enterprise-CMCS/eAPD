import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import CheckboxGroup from './CheckboxGroup';
import { Textarea } from './Inputs';
import SectionHeader from './SectionHeader';
import { stringsToFormOptions } from '../util/helpers';

const options = stringsToFormOptions([
  'Health Information Technology for Economic and Clinical Health (HITECH)',
  'Maintenance Management Information System (MMIS)',
  'Health Information Exchange (HIE)'
]);

const FormActivityOverview = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      In a few sentences, describe this activity and how it fits in with your
      Medicaid program.
    </SectionHeader>
    <Field name="description" component={Textarea} label="Description" />
    <SectionHeader>
      What kind of funding do you need for this activity? Select any that apply:
    </SectionHeader>
    <Field name="funding" component={CheckboxGroup} options={options} />
  </form>
);

FormActivityOverview.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const formConfig = {
  form: 'activityOverview',
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormActivityOverview);
