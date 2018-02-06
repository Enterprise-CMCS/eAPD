import PropTypes from 'prop-types';
import React from 'react';
import { Box, Button, Flex } from 'rebass';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';

const AddButton = ({ fields, meta: { error, submitFailed } }) => (
  <Box>
    <Button bg="black" onClick={() => fields.push({})}>
      Add another milestone
    </Button>
    {submitFailed && error && <div>{error}</div>}
  </Box>
);

AddButton.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const Milestones = ({ fields }) =>
  fields.map((milestone, idx) => (
    <tr>
      <td>{idx + 1}</td>
      <td>
        <Field
          name={`${milestone}.name`}
          component={Input}
          label="name"
          hideLabel
        />
      </td>
      <td>
        <Field
          name={`${milestone}.status`}
          component={Input}
          label="status"
          hideLabel
        />
      </td>
      <td>
        <Field
          name={`${milestone}.plannedStart`}
          component={Input}
          label="planned start date"
          hideLabel
        />
      </td>
      <td>
        <Field
          name={`${milestone}.actualStart`}
          component={Input}
          label="actual start date"
          hideLabel
        />
      </td>
      <td>
        <Field
          name={`${milestone}.plannedEnd`}
          component={Input}
          label="planned end date"
          hideLabel
        />
      </td>
      <td>
        <Field
          name={`${milestone}.actualEnd`}
          component={Input}
          label="actual end date"
          hideLabel
        />
      </td>
      <td>
        <button
          type="button"
          title="Remove Goal"
          onClick={() => fields.remove(idx)}
        >
          Remove milestone
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
      List the major milestones you&apos;re working towards as part of this
      activity
    </SectionHeader>

    <table>
      <thead>
        <tr>
          <th />
          <th>Milestone</th>
          <th>Status</th>
          <th>Planned start date</th>
          <th>Actual start date</th>
          <th>Planned end date</th>
          <th>Actual end date</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <FieldArray name="milestones" component={Milestones} />
      </tbody>
    </table>

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
