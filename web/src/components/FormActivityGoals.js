import PropTypes from 'prop-types';
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Input, Textarea } from './Inputs';
import SectionHeader from './SectionHeader';

const entryShell = { description: '', objectives: ['', ''] };

const Objectives = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    <SectionHeader>
      Tell us how you’ll know when you’ve achieved this goal:
    </SectionHeader>
    <div className="pl3">
      {fields.map((objective, idx) => (
        <Field
          key={objective}
          name={objective}
          component={Input}
          label={`Objective ${idx + 1}`}
        />
      ))}
      <div>
        <button
          type="button"
          className="btn btn-outline black"
          onClick={() => fields.push('')}
        >
          Add another objective
        </button>
        {submitFailed && error && <div>{error}</div>}
      </div>
    </div>
  </div>
);

Objectives.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const Goals = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    {fields.map((goal, idx) => (
      <div key={goal} className="mb3">
        <div className="relative">
          <button
            type="button"
            className="absolute right-0"
            title="Remove Goal"
            onClick={() => fields.remove(idx)}
          >
            Remove goal
          </button>
          <SectionHeader>Goal #{idx + 1}:</SectionHeader>
        </div>
        <Field
          name={`${goal}.description`}
          component={Textarea}
          label="Description"
        />
        <FieldArray name={`${goal}.objectives`} component={Objectives} />
      </div>
    ))}
    <div>
      <button
        type="button"
        className="btn btn-primary bg-black"
        onClick={() => fields.push({ ...entryShell })}
      >
        Add another goal
      </button>
      {submitFailed && error && <div>{error}</div>}
    </div>
  </div>
);

Goals.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const FormActivityGoals = ({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      List the goals you’re hoping to accomplish as part of this activity:
    </SectionHeader>
    <FieldArray name="goals" component={Goals} />

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

FormActivityGoals.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'activityGoals',
  initialValues: { goals: [{ ...entryShell }] },
  destroyOnUnmount: false,
  enableReinitialize: true
};

export default reduxForm(formConfig)(FormActivityGoals);
