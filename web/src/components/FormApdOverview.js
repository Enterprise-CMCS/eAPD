import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Textarea } from './Inputs';
import SectionHeader from './SectionHeader';

const FormApdOverview = ({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      Briefly describe the high-level vision of your program. What are you
      trying to accomplish by 2020?
    </SectionHeader>
    <Field name="program_vision" component={Textarea} label="Vision" />
    <SectionHeader>
      In 1–2 sentences, summarize the key benefits of the program:
    </SectionHeader>
    <Field name="program_benefits" component={Textarea} label="Benefits" />
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

FormApdOverview.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'apdOverview',
  destroyOnUnmount: false,
  enableReinitialize: true
};

export default reduxForm(formConfig)(FormApdOverview);
