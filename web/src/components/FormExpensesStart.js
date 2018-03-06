import React from 'react';
import { Field, reduxForm } from 'redux-form';

import CheckboxGroup from './CheckboxGroup';
import SectionHeader from './SectionHeader';
import { stringsToFormOptions } from '../util/helpers';

const commonExpenses = stringsToFormOptions(
  [
    'Hardware, Software, and Licensing',
    'Consulting Services',
    'Equipment and Supplies',
    'Facilities',
    'Indirect Costs',
    'State Travel',
    'Training and Outreach'
  ],
  true
);

const FormExpensesStart = () => (
  <form onSubmit={(e) => e.preventDefault()}>
    <SectionHeader>
      Here are some common expenses for the HITECH programs. Do any of these
      apply to your budget for <em>Administration</em>?
    </SectionHeader>
    <Field
      name="expenseCategories"
      component={CheckboxGroup}
      options={commonExpenses}
    />
  </form>
);

const formConfig = {
  form: 'expensesStart',
  initialValues: {
    expenseCategories: [
      'hardware-software-and-licensing',
      'consulting-services',
      'training-and-outreach'
    ]
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(FormExpensesStart);
