import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import withSidebar from '../components/withSidebar';

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
  <div className="mb3">
    <h1>Here’s a quick summary of the numbers</h1>
    <p className="mb3">
      This table outlines the total requested amount for 2019–2020 with the cost
      broken down by funding stream.
    </p>
    <div className="mb2">
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
    </div>
    <div className="mb2">
      <button type="button" className="btn btn-outline blue mr1">
        Download PDF
      </button>
      <button type="button" className="btn btn-outline blue">
        Print
      </button>
    </div>
    <p>
      By clicking Submit, you agree that your funding request fulfills our{' '}
      <a href="#!">standards and requirements</a>.
    </p>
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => goTo('/submission-success')}
    >
      Submit
    </button>
  </div>
);

ReviewAndSubmit.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ goTo: (path) => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(withSidebar(ReviewAndSubmit));
