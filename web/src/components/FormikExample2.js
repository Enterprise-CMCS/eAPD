import { Formik, Field, Form } from 'formik';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { Input } from './Inputs2';
import { updateApd as updateApdAction } from '../actions/apd';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  name: Yup.string()
    .min(2, "C'mon, your name is longer than that")
    .required('Name is required.')
});

const FormikExample = ({ apd, updateApd }) => (
  <div className="app">
    <h3>Form Validation (with Formik) Demo</h3>
    <Input name="email" label="Email" type="email" />
    <Input
      name="name"
      label="Name"
      value="Foo"
      onChange={e => {
        updateApd({ overview: e.target.value });
      }}
      validationSchema={validationSchema}
    />
  </div>
);

const mapStateToProps = ({ apd: { data } }) => ({ apd: data });
const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(mapStateToProps, mapDispatchToProps)(FormikExample);
