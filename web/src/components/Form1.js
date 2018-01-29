import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

const Form1 = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstName">First Name</label>
      <div>
        <Field
          id="firstName"
          name="firstName"
          component="input"
          type="text"
          placeholder="First Name"
        />
      </div>
    </div>
    <div>
      <label htmlFor="lastName">Last Name</label>
      <div>
        <Field
          id="lastName"
          name="lastName"
          component="input"
          type="text"
          placeholder="Last Name"
        />
      </div>
    </div>
    <div>
      <label htmlFor="favoriteColor">Favorite Color</label>
      <div>
        <Field id="favoriteColor" name="favoriteColor" component="select">
          <option />
          <option value="ff0000">Red</option>
          <option value="00ff00">Green</option>
          <option value="0000ff">Blue</option>
        </Field>
      </div>
    </div>
    <div>
      <label htmlFor="notes">Notes</label>
      <div>
        <Field id="notes" name="notes" component="textarea" />
      </div>
    </div>
    <div>
      <button type="submit" disabled={pristine || submitting}>
        Submit
      </button>
      <button type="button" disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </button>
    </div>
  </form>
);

Form1.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({ form: 'form1' })(Form1);
