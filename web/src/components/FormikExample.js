import { Formik, Field, Form } from 'formik';
import React, { Component } from 'react';
import * as Yup from 'yup';

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

const FormikExample = () => (
  <div className="app">
    <h3>Form Validation (with Formik) Demo</h3>
    <Formik
      initialValues={{ email: '', name: 'Bren' }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required!')
      })}
      onSubmit={(values, actions) => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting }) => (
        <Form>
          <Field
            name="email"
            label="Email"
            component={TextInput}
            onChange={e => {
              console.log('boom!');
              console.log(e.target.value);
            }}
          />
          <Field name="name" label="Name" component={TextInput} />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    />
  </div>
);

export default FormikExample;
