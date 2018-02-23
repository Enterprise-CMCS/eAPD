import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Divider, Heading, Text } from 'rebass';
import { bindActionCreators } from 'redux';

import Dollars from '../components/Dollars';
import PageNavButtons from '../components/PageNavButtons';
import FormPersonnel from '../components/FormPersonnel';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

const nextTot = (a, b) => a + b.nextCompensation * b.nextTime / 100;
const nextNextTot = (a, b) =>
  a + b.nextCompensation * b.nextNextTime * 1.03 / 100;

const StatePersonnel = ({ goTo, statePersonnel, contractingPersonnel }) => {
  const stateNextTotal = statePersonnel.reduce(nextTot, 0);
  const stateNextNextTotal = statePersonnel.reduce(nextNextTot, 0);
  const contractingNextTotal = contractingPersonnel.reduce(nextTot, 0);
  const contractingNextNextTotal = contractingPersonnel.reduce(nextNextTot, 0);

  return (
    <Box py={4}>
      <FormLogger />
      <Heading>Personnel costs for Administration</Heading>
      <Text mb={4}>
        Most activities include costs for state and contracting personnel. You
        may also want to hire consultants for legal services or outreach, for
        example. We’ll go over other miscellaneous expenses like software
        licenses and supplies in the next section.
      </Text>
      <Box mb={4}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>State personnel</td>
              <td>2019</td>
              <td>
                <Dollars value={stateNextTotal} hideCents />
              </td>
              <td>2020</td>
              <td>
                <Dollars value={stateNextNextTotal} hideCents />
              </td>
            </tr>
            <tr>
              <td>Contracting personnel</td>
              <td>2019</td>
              <td>
                <Dollars value={contractingNextTotal} hideCents />
              </td>
              <td>2020</td>
              <td>
                <Dollars value={contractingNextNextTotal} hideCents />
              </td>
            </tr>
          </tbody>
        </table>
      </Box>

      <Heading>State personnel</Heading>
      <FormPersonnel personnelType="state" />

      <Divider my={4} color="gray2" />

      <Heading>Contracting personnel</Heading>
      <FormPersonnel personnelType="contracting" />

      <PageNavButtons
        goTo={goTo}
        prev="/activity-schedule"
        next="/expenses-start"
      />
    </Box>
  );
};

StatePersonnel.propTypes = {
  goTo: PropTypes.func.isRequired,
  statePersonnel: PropTypes.array.isRequired,
  contractingPersonnel: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  let contractingArray;
  let stateArray;

  if (state.form.personnel) {
    contractingArray = state.form.personnel.values.contracting;
    stateArray = state.form.personnel.values.state;
  }

  return {
    contractingPersonnel: contractingArray || [],
    statePersonnel: stateArray || []
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(StatePersonnel)
);
