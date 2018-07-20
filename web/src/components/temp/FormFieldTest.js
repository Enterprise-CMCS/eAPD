import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { Input } from '../InputsWithValidation';
import { updateApd as updateApdAction } from '../../actions/apd';

const FormFieldTest = ({ overview, updateApd }) => (
  <div className="app">
    <h3>Form Fields w/ validation</h3>
    <Input
      name="email"
      label="Email"
      type="email"
      validation={Yup.string()
        .email('Not a valid email')
        .required('Email is required.')}
    />
    <Input
      name="name"
      label="Name"
      value={overview}
      onChange={e => {
        updateApd({ overview: e.target.value });
      }}
      validation={Yup.string()
        .min(2, "C'mon, your name is longer than that")
        .required('Name is required.')}
    />
  </div>
);

FormFieldTest.propTypes = {
  overview: PropTypes.string.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data: { overview } } }) => ({ overview });
const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(mapStateToProps, mapDispatchToProps)(FormFieldTest);
