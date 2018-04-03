import PropTypes from 'prop-types';
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';

const AddButton = ({ fields, meta: { error, submitFailed } }) => (
  <div className="mt2">
    <button
      type="button"
      className="btn btn-primary bg-black"
      onClick={() => fields.push({})}
    >
      Add milestone
    </button>
    {submitFailed && error && <div>{error}</div>}
  </div>
);

AddButton.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const Milestones = ({ fields }) =>
  fields.map((milestone, idx) => (
    <tr key={milestone} className="h5">
      <td>
        <Field
          name={`${milestone}.name`}
          component={Input}
          label="name"
          className="m0"
          hideLabel
        />
      </td>
      <td>
        <Field
          name={`${milestone}.status`}
          component={Input}
          label="status"
          className="m0"
          hideLabel
        />
      </td>
      <td>
        <Field
          name={`${milestone}.plannedStart`}
          component={Input}
          label="planned start date"
          type="date"
          className="m0"
          hideLabel
        />
      </td>
      <td>
        <Field
          name={`${milestone}.plannedEnd`}
          component={Input}
          label="planned end date"
          type="date"
          className="m0"
          hideLabel
        />
      </td>
      <td>
        <button
          type="button"
          title="Remove Goal"
          onClick={() => fields.remove(idx)}
        >
          ✕
        </button>
      </td>
    </tr>
  ));

Milestones.propTypes = {
  fields: PropTypes.object.isRequired
};

const FormActivitySchedule = ({
  handleSubmit,
  pristine,
  reset,
  submitting
}) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      List the major milestones you’re working towards as part of this activity
    </SectionHeader>

    <div className="overflow-auto">
      <table className="table table-fixed">
        <thead>
          <tr>
            <th className="col-3">Milestone</th>
            <th className="col-2">Status</th>
            <th className="col-3">Planned start</th>
            <th className="col-3">Planned end</th>
            <th className="col-1" />
          </tr>
        </thead>
        <tbody>
          <FieldArray name="milestones" component={Milestones} />
        </tbody>
      </table>
    </div>

    <FieldArray name="milestones" component={AddButton} />

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

FormActivitySchedule.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const formConfig = {
  form: 'activitySchedule',
  initialValues: {
    milestones: [
      {
        name: 'Kickoff meeting',
        status: 'Complete'
      },
      {
        name: 'Design studio',
        status: 'In progress'
      },
      {
        name: 'MVP development',
        status: 'In progress'
      },
      {
        name: 'Usability testing',
        status: 'Not started'
      },
      {
        name: 'Beta launch',
        status: 'Not started'
      },
      {
        name: 'Educate providers about progress',
        status: 'On hold'
      }
    ]
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormActivitySchedule);
