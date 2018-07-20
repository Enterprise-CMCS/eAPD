import { Formik, Field, Form } from 'formik';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { updateApd as updateApdAction } from '../actions/apd';

const InputFeedback = ({ children }) => (
  <span className="block red">{children}</span>
);

const Label = ({ error, children, ...props }) => {
  return <label {...props}>{children}</label>;
};

class TextInput extends Component {
  handleChange = e => {
    this.props.field.onChange(e);

    if (this.props.onChange) this.props.onChange(e);
  };

  render() {
    const {
      field: { name, ...field },
      form: { touched, errors },
      className,
      label,
      ...rest
    } = this.props;

    const error = errors[name];
    const touch = touched[name];

    return (
      <div className="mb2">
        <Label htmlFor={name} error={error}>
          {label}
        </Label>
        <input
          id={name}
          className="m0 input"
          type="text"
          {...field}
          {...rest}
          onChange={this.handleChange}
        />
        {touch && error && <InputFeedback>{error}</InputFeedback>}
      </div>
    );
  }
}

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
    <Formik
      initialValues={{ email: '', name: apd.overview }}
      validationSchema={validationSchema}
      render={() => (
        <Fragment>
          <Field name="email" label="Email" component={TextInput} />
          <Field
            name="name"
            label="Name"
            component={TextInput}
            onChange={e => {
              updateApd({ overview: e.target.value });
            }}
          />
        </Fragment>
      )}
    />
  </div>
);

const mapStateToProps = ({ apd: { data } }) => ({ apd: data });
const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(mapStateToProps, mapDispatchToProps)(FormikExample);
