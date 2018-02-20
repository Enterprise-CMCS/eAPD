import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button, ButtonOutline, Heading, Text } from 'rebass';
import { bindActionCreators } from 'redux';

const Section = ({ title }) => (
  <tbody>
    <tr>
      <td colSpan="4">{title}</td>
    </tr>
    <tr>
      <td>2019</td>
      <td />
      <td />
      <td />
    </tr>
    <tr>
      <td>2020</td>
      <td />
      <td />
      <td />
    </tr>
  </tbody>
);

Section.propTypes = {
  title: PropTypes.string.isRequired
};

const ReviewAndSubmit = ({ goTo }) => (
  <Box py={4}>
    <Heading mb={1}>Here’s a quick summary of the numbers</Heading>
    <Text mb={4}>
      This table outlines the total requested amount for 2019–2020 with the cost
      broken down by funding stream.
    </Text>
    <Box mb={3}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Activities</th>
            <th>Federal Share</th>
            <th>State Share</th>
            <th>Total</th>
          </tr>
        </thead>
        <Section title="Health Information Technology for Economic and Clinical Health (HITECH)" />
        <Section title="Maintenance Management Information System (MMIS)" />
        <Section title="Health Information Exchange (HIE)" />
        <tbody>
          <tr>
            <td>Grand Total</td>
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </Box>
    <Box mb={4}>
      <ButtonOutline mr={2}>Download PDF</ButtonOutline>
      <ButtonOutline>Print</ButtonOutline>
    </Box>
    <Text mb={3}>
      By clicking Submit, you agree that your funding request fulfills our{' '}
      <a href="#!">standards and requirements</a>.
    </Text>
    <Button onClick={() => goTo('/submission-success')}>Submit</Button>
  </Box>
);

ReviewAndSubmit.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ReviewAndSubmit);
