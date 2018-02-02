import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Textarea } from './Inputs';
import SectionHeader from './SectionHeader';

const FormApdOverview = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      Briefly describe the high-level vision of your program. What are you
      trying to accomplish by 2020?
    </SectionHeader>
    <Field name="vision" component={Textarea} label="Vision" />
    <SectionHeader>
      In 1–2 sentences, summarize the key benefits of the program:
    </SectionHeader>
    <Field name="benefits" component={Textarea} label="Benefits" />
  </form>
);

FormApdOverview.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const formConfig = {
  form: 'apdOverview'
};

export default reduxForm(formConfig)(FormApdOverview);
