import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { Field, FieldArray, reduxForm } from 'redux-form';
import SectionHeader from './SectionHeader';
import { Input } from '../components/Inputs';

const FormActivitiesStart = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      List the activities for your HITECH program for 2018–2020:
    </SectionHeader>
    <FieldArray
      name="activities"
      component={({ fields, meta: { submitting } }) => (
        <Fragment>
          {fields.map(activity => (
            <Field
              key={activity}
              hideLabel
              label="Activity name"
              name={`${activity}.name`}
              component={Input}
            />
          ))}
          <button
            type="button"
            className="btn btn-primary bg-blue"
            onClick={() => fields.push({ name: '' })}
          >
            Add another activity
          </button>

          <div className="mt3">
            <button
              type="submit"
              className="btn btn-primary bg-green"
              disabled={submitting}
            >
              {submitting ? 'Saving' : 'Submit'}
            </button>
          </div>
        </Fragment>
      )}
    />
  </form>
);

FormActivitiesStart.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const formConfig = { form: 'activitiesStart', destroyOnUnmount: false };

export default reduxForm(formConfig)(FormActivitiesStart);
