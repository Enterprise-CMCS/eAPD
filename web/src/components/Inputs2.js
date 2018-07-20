import { Formik, Field as FormikField } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const Input = props => <input className="m0 input" {...props} />;

const Textarea = props => (
  <textarea className="m0 textarea" spellCheck="true" {...props} />
);

const FieldFeedback = ({ children }) => (
  <span className="block red">{children}</span>
);

const Label = ({ error, children, ...props }) => {
  return <label {...props}>{children}</label>;
};

const makeValidatedField = InputEl => {
  class Field extends Component {
    handleChange = e => {
      this.props.field.onChange(e);
      if (this.props.onChange) this.props.onChange(e);
    };

    render() {
      const {
        field: { name, ...field },
        form: { touched, errors },
        label,
        type,
        hideLabel,
        wrapperClass,
        ...rest
      } = this.props;

      const error = errors[name];
      const touch = touched[name];

      return (
        <div className="mb2">
          <label
            htmlFor={name}
            className={hideLabel ? 'sr-only' : 'block mb-tiny'}
          >
            {label}
          </label>
          <InputEl
            id={name}
            type={type}
            {...field}
            {...rest}
            onChange={this.handleChange}
          />
          {touch && error && <FieldFeedback>{error}</FieldFeedback>}
        </div>
      );
    }
  }

  return Field;
};

const makeValidated = InputEl => {
  const MyField = makeValidatedField(InputEl);

  class Wrapper extends Component {
    render() {
      const { name, value, validationSchema, ...rest } = this.props;
      const props = { name, ...rest };

      return (
        <Formik
          initialValues={{ [name]: value || '' }}
          validationSchema={validationSchema}
          render={() => <FormikField component={MyField} {...props} />}
        />
      );
    }
  }

  return Wrapper;
};

const InputHolder = makeValidated(Input);
const TextareaHolder = makeValidated(Textarea);

export { InputHolder as Input, TextareaHolder as Textarea };
