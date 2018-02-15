import PropTypes from 'prop-types';
import React from 'react';
import { Box, Heading } from 'rebass';
import { Field, reduxForm } from 'redux-form';

import NavButton from '../components/PageNavButtons';
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

const ExpensesStart = ({ goTo, next, prev }) => (
  <Box>
    <Heading mb={3}>Let&apos;s take a look at your other expenses</Heading>
    <Box py={4}>
      <SectionHeader>
        Here are some common expenses for the HITECH programs. Do any of these
        apply to your budget for <em>Administration</em>?
      </SectionHeader>
      <Field
        name="expenseCategories"
        component={CheckboxGroup}
        options={commonExpenses}
      />
    </Box>
    <NavButton goTo={goTo} next={next} prev={prev} />
  </Box>
);
ExpensesStart.propTypes = {
  goTo: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired
};


const formConfig = {
  form: 'expenses',
  initialValues: {
    expenseCategories: [
      'hardware-software-and-licensing',
      'consulting-services',
      'training-and-outreach'
    ]
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(ExpensesStart);
