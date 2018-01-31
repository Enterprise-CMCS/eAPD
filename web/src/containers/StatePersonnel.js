import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button, Divider, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import PersonnelForm from '../components/FormPersonnel';

class StatePersonnel extends Component {
  showResults = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;
    const { statePersonnel, contractingPersonnel } = this.props;

    const stateNextTotal = statePersonnel.reduce(
      (total, personnel) =>
        total + ((personnel.nextCompensation * personnel.nextTime) / 100),
      0
    );
    const stateNextNextTotal = statePersonnel.reduce(
      (total, personnel) =>
        total +
        ((personnel.nextCompensation * personnel.nextNextTime * 1.03) / 100),
      0
    );
    const contractingNextTotal = contractingPersonnel.reduce(
      (total, personnel) =>
        total + ((personnel.nextCompensation * personnel.nextTime) / 100),
      0
    );
    const contractingNextNextTotal = contractingPersonnel.reduce(
      (total, personnel) =>
        total +
        ((personnel.nextCompensation * personnel.nextNextTime * 1.03) / 100),
      0
    );

    return (
      <Box py={4}>
        <Heading>Personnel costs for Administration</Heading>
        Most activities include costs for state and contracting personnel. You
        may also want to hire consultants for legal services or outreach, for
        example. We’ll go over other miscellaneous expenses like software
        licenses and supplies in the next section.
        <table>
          <tbody>
            <tr>
              <td>
                <li />
              </td>
              <td>State personnel</td>
              <td>2019</td>
              <td>{stateNextTotal}</td>
              <td>2020</td>
              <td>{stateNextNextTotal}</td>
            </tr>
            <tr>
              <td>
                <li />
              </td>
              <td>Contracting personnel</td>
              <td>2019</td>
              <td>{contractingNextTotal}</td>
              <td>2020</td>
              <td>{contractingNextNextTotal}</td>
            </tr>
          </tbody>
        </table>
        {/* <Form onSubmit={this.showResults} /> */}
        <Heading>State personnel</Heading>
        <PersonnelForm personnelType="state" />
        <Divider my={4} color="gray2" />
        <Heading>Contracting personnel</Heading>
        <PersonnelForm personnelType="contracting" />
        <Divider my={4} color="gray2" />
        <Button onClick={() => goTo('/state-start')}>Continue</Button>
      </Box>
    );
  }
}

StatePersonnel.propTypes = {
  goTo: PropTypes.func.isRequired,
  statePersonnel: PropTypes.array.isRequired,
  contractingPersonnel: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

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

export default connect(mapStateToProps, mapDispatchToProps)(StatePersonnel);
