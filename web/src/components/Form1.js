import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Select } from 'rebass';
import { Field, reduxForm } from 'redux-form';

import Input from './Input';

const Form1 = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name="firstName" type="text" component={Input} label="First Name" />
    <Field name="lastName" type="text" component={Input} label="Last Name" />

    <div>
      <label htmlFor="favoriteColor">Favorite Color</label>
      <div>
        <Field id="favoriteColor" name="favoriteColor" component={Select}>
          <option>--</option>
          <option value="ff0000">Red</option>
          <option value="00ff00">Green</option>
          <option value="0000ff">Blue</option>
        </Field>
      </div>
    </div>

    <Divider my={4} color="gray2" />

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
