import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { Field, FieldArray, reduxForm } from 'redux-form';
import { Input } from '../components/Inputs';

const FormActivitiesList = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <FieldArray
      name="activities"
      component={({ fields }) => (
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
        </Fragment>
      )}
    />
  </form>
);

FormActivitiesList.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const formConfig = { form: 'activitiesListABC' };

export default reduxForm(formConfig)(FormActivitiesList);
