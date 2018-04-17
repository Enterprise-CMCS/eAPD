import PropTypes from 'prop-types';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { FieldArray, reduxForm } from 'redux-form';

import { EDITOR_CONFIG } from '../util';

const entryShell = { approach: '', alternatives: '', explanation: '' };

const Approaches = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    {fields.map((approach, idx) => (
      <div key={approach} className="mb3 sm-col-8">
        <div className="relative">
          {fields.length > 1 && (
            <button
              type="button"
              className="absolute right-0"
              title="Remove Goal"
              onClick={() => fields.remove(idx)}
            >
              Remove
            </button>
          )}
          <div className="mb-tiny">Alternative #{idx + 1}:</div>
        </div>
        <Editor toolbar={EDITOR_CONFIG} />
      </div>
    ))}
    <div>
      <button
        type="button"
        className="btn btn-primary bg-black"
        onClick={() => fields.push({ ...entryShell })}
      >
        Add another consideration
      </button>
      {submitFailed && error && <div>{error}</div>}
    </div>
  </div>
);

Approaches.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const FormActivityApproach = ({
  handleSubmit,
  pristine,
  reset,
  submitting
}) => (
  <form onSubmit={handleSubmit}>
    <div className="mb3 bold">
      Statement of alternative considerations and supporting justification
    </div>

    <FieldArray name="approaches" component={Approaches} />

    {false && (
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    )}
  </form>
);

FormActivityApproach.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'activityApproach',
  initialValues: {
    approaches: [{ ...entryShell }]
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormActivityApproach);
