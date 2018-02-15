import PropTypes from 'prop-types';
import React from 'react';
import { Box, Button, Heading } from 'rebass';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { Input } from './Inputs';
import SectionHeader from './SectionHeader';
import NavButton from './PageNavButtons';

const ExpenseDetails = ({ goTo, next }) => (
  <Box>
    <Heading mb={3}>
      Equipment and supplies for <em>Administration</em>
    </Heading>
    <Box py={4}>
      <SectionHeader>
        Supplies include items you use regularly that last for less than one year.
        Some examples include:
      </SectionHeader>
      <ul>
        <li>Equipment accessories</li>
        <li>Pens, papers, staplers, toner, or trash cans</li>
        <li>Protective gear</li>
        <li>Shipping and postage</li>
      </ul>

      <FieldArray
        name="expenses"
        component={({ fields }) => (
          <Box>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>2018 estimate</th>
                  <th>2019 estimate</th>
                  <th>2020 estimate</th>
                </tr>
              </thead>
              <tbody>
                {fields.map(expense => (
                  <tr key={expense}>
                    <td>
                      <Field
                        name={`${expense}.name`}
                        component={Input}
                        label="description"
                        hideLabel
                      />
                    </td>
                    <td>
                      <Field
                        name={`${expense}.est2018`}
                        component={Input}
                        label="2018 estimate"
                        hideLabel
                      />
                    </td>
                    <td>
                      <Field
                        name={`${expense}.est2019`}
                        component={Input}
                        label="2019 estimate"
                        hideLabel
                      />
                    </td>
                    <td>
                      <Field
                        name={`${expense}.est2020`}
                        component={Input}
                        label="2020 estimate"
                        hideLabel
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Box>
              <Button bg="black" onClick={() => fields.push({})}>
                Add another row
              </Button>
            </Box>
          </Box>
        )}
      />
    </Box>
    <NavButton goTo={goTo} next={next} />
  </Box>
);
ExpenseDetails.propTypes = {
  goTo: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired
};

const formConfig = {
  form: 'expenses',
  initialValues: {
    expenses: [
      { name: 'Office supplies', est2018: 3100, est2019: 3240, est2020: 3290 },
      {
        name: 'Shipping and postage',
        est2018: 2900,
        est2019: 3000,
        est2020: 3200
      }
    ]
  },
  destroyOnUnmount: false
};

export default reduxForm(formConfig)(ExpenseDetails);
