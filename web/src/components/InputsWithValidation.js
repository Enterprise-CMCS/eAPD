/* eslint-disable import/prefer-default-export */

import { Formik, Field as FormikField } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Yup from 'yup';

const InputRaw = props => <input className="m0 input" {...props} />;

const FieldFeedback = ({ children }) => (
  <div className="mt-tiny h6 red">{children}</div>
);

FieldFeedback.propTypes = {
  children: PropTypes.node.isRequired
};

const makeValidatedField = InputEl => {
  class Field extends Component {
    handleChange = (formikOnChange, otherOnChange) => e => {
      formikOnChange(e);
      if (otherOnChange) otherOnChange(e);
    };

    render() {
      const {
        field: { name, onChange: formikOnChange, ...field },
        form: { touched, errors },
        label,
        type,
        hideLabel,
        wrapperClass,
        onChange,
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
            onChange={this.handleChange(formikOnChange, onChange)}
            {...field}
            {...rest}
          />
          {touch && error && <FieldFeedback>{error}</FieldFeedback>}
        </div>
      );
    }
  }

  Field.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    hideLabel: PropTypes.bool,
    wrapperClass: PropTypes.string,
    onChange: PropTypes.func
  };

  Field.defaultProps = {
    type: 'text',
    hideLabel: false,
    wrapperClass: '',
    onChange: null
  };

  return Field;
};

const makeValidated = InputEl => {
  const MyField = makeValidatedField(InputEl);

  const Wrapper = ({ name, value, validation, ...rest }) => {
    const props = { name, ...rest };
    const validationSchema = validation
      ? Yup.object().shape({ [name]: validation })
      : null;

    return (
      <Formik
        initialValues={{ [name]: value || '' }}
        validationSchema={validationSchema}
        render={() => <FormikField component={MyField} {...props} />}
      />
    );
  };

  Wrapper.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validation: PropTypes.object
  };

  Wrapper.defaultProps = {
    value: null,
    validation: null
  };

  return Wrapper;
};

export const Input = makeValidated(InputRaw);
