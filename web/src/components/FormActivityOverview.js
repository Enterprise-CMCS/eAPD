import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Textarea } from './Inputs';
import SectionHeader from './SectionHeader';

const FormActivityOverview = ({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      In a few sentences, describe this activity and how it fits in with your
      Medicaid program.
    </SectionHeader>
    <Field name="description" component={Textarea} label="Description" />
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

FormActivityOverview.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'activityOverview',
  destroyOnUnmount: false,
  enableReinitialize: true
};

export default reduxForm(formConfig)(FormActivityOverview);
