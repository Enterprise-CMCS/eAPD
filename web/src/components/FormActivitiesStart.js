import kebabCase from 'lodash.kebabcase';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import CheckboxGroup from './CheckboxGroup';
import SectionHeader from './SectionHeader';

// TODO(bren): activities (and activityOptions) should probably
// live somewhere else, just not sure where yet...
const activities = [
  'Administration',
  'Strategic Planning',
  'Auditing',
  'Technical Assistance',
  'Outreach',
  'Design and Development',
  'Statewide Training',
  'Medicaid Information Technology Architecture State Self Assessment (MITA SS-A)'
];

const activityOptions = activities.map(activity => ({
  value: kebabCase(activity),
  label: activity
}));

const FormActivitiesStart = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <SectionHeader>
      Here are some common activities for HITECH programs. Do any of these apply
      in 2018–2020?
    </SectionHeader>
    <Field
      name="activities"
      component={CheckboxGroup}
      options={activityOptions}
    />
  </form>
);

FormActivitiesStart.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const formConfig = {
  form: 'form3',
  initialValues: {
    activities: [
      'administration',
      'strategic-planning',
      'outreach',
      'design-and-development'
    ]
  }
};

export default reduxForm(formConfig)(FormActivitiesStart);
