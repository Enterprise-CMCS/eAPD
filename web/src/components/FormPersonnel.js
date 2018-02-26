import PropTypes from 'prop-types';
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Input } from './Inputs';

const PersonnelList = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    <div>{submitFailed && error && <span>{error}</span>}</div>
    <div className="overflow-auto">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job title</th>
            <th>Job description</th>
            <th>2019 compensation</th>
            <th>2019 percentage of time</th>
            <th>2019 cost to activity</th>
            <th>2020 percentage of time</th>
            <th>2020 cost to activity</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {fields.map((person, idx) => (
            <tr key={person}>
              <td>
                <Field
                  hideLabel
                  label="personnel name"
                  name={`${person}.name`}
                  component={Input}
                />
              </td>
              <td>
                <Field
                  hideLabel
                  label="job title"
                  name={`${person}.jobTitle`}
                  component={Input}
                />
              </td>
              <td>
                <Field
                  hideLabel
                  label="job description"
                  name={`${person}.jobDescription`}
                  component={Input}
                />
              </td>
              <td>
                <Field
                  hideLabel
                  label="2019 compensation"
                  name={`${person}.nextCompensation`}
                  component={Input}
                  parse={value => +value}
                  format={value => `${value}`}
                  type="number"
                />
              </td>
              <td>
                <Field
                  hideLabel
                  label="2019 percentage time"
                  name={`${person}.nextTime`}
                  component={Input}
                  parse={value => +value}
                  format={value => `${value}`}
                  type="number"
                />
              </td>
              <td>0</td>
              <td>
                <Field
                  hideLabel
                  label="2020 percentage time"
                  name={`${person}.nextNextTime`}
                  component={Input}
                  parse={value => +value}
                  format={value => `${value}`}
                  type="number"
                />
              </td>
              <td>0</td>
              <td>
                <button
                  type="button"
                  title="Remove Contact"
                  onClick={() => fields.remove(idx)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button
      type="button"
      className="btn btn-primary bg-black"
      onClick={() =>
        fields.push({ nextCompensation: 0, nextTime: 0, nextNextTime: 0 })
      }
    >
      Add Contact
    </button>
  </div>
);

PersonnelList.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const PersonnelForm = ({ personnelType }) => (
  <form onSubmit={e => e.preventDefault()}>
    <FieldArray name={`${personnelType}`} component={PersonnelList} />
  </form>
);

PersonnelForm.propTypes = {
  personnelType: PropTypes.string.isRequired
};

const formConfig = {
  form: 'personnel',
  initialValues: {
    state: [
      {
        name: 'Alicia Axelrod',
        jobTitle: 'big cheese',
        nextCompensation: 78400,
        nextTime: 50,
        nextNextTime: 30
      }
    ],
    contracting: [
      {
        name: 'Barbara Bigelow',
        jobTitle: 'software engineer',
        nextCompensation: 89324,
        nextTime: 80,
        nextNextTime: 80
      },
      {
        name: 'Chandra Cogsworth',
        jobTitle: 'content designer',
        nextCompensation: 91535,
        nextTime: 70,
        nextNextTime: 80
      }
    ]
  }
};

export default reduxForm(formConfig)(PersonnelForm);
