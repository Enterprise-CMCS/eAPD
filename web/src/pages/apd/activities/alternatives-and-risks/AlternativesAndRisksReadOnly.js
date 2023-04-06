import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const AlternativesAndRisksReadOnly = ({ activity, activityIndex }) => (
  <Fragment>
    <h3 className="viewonly-activity-header">
      <small>
        Activity {activityIndex + 1}: {activity?.name || 'Untitled'}
      </small>
      <br />
      Analysis of Alternatives and Risks
    </h3>
    <span>
      <strong>Alternative analysis</strong>
      <div
        className="ds-u-margin-bottom--4"
        dangerouslySetInnerHTML={{
          __html:
            activity?.analysisOfAlternativesAndRisks?.alternativeAnalysis ||
            '<p>No response was provided.</p>'
        }}
      />
    </span>
    <span>
      <strong>Cost benefit analysis</strong>
      <div
        className="ds-u-margin-bottom--4"
        dangerouslySetInnerHTML={{
          __html:
            activity?.analysisOfAlternativesAndRisks?.costBenefitAnalysis ||
            '<p>No response was provided.</p>'
        }}
      />
    </span>
    <span>
      <strong>Feasibility study</strong>
      <div
        className="ds-u-margin-bottom--4"
        dangerouslySetInnerHTML={{
          __html:
            activity?.analysisOfAlternativesAndRisks?.feasibilityStudy ||
            '<p>No response was provided.</p>'
        }}
      />
    </span>
    <span>
      <strong>Requirements analysis</strong>
      <div
        className="ds-u-margin-bottom--4"
        dangerouslySetInnerHTML={{
          __html:
            activity?.analysisOfAlternativesAndRisks?.requirementsAnalysis ||
            '<p>No response was provided.</p>'
        }}
      />
    </span>
    <span>
      <strong>Foreseeable risks</strong>
      <div
        className="ds-u-margin-bottom--4"
        dangerouslySetInnerHTML={{
          __html:
            activity?.analysisOfAlternativesAndRisks?.forseeableRisks ||
            '<p>No response was provided.</p>'
        }}
      />
    </span>
  </Fragment>
);

AlternativesAndRisksReadOnly.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    analysisOfAlternativesAndRisks: PropTypes.shape({
      alternativeAnalysis: PropTypes.string.isRequired,
      costBenefitAnalysis: PropTypes.string.isRequired,
      feasibilityStudy: PropTypes.string.isRequired,
      requirementsAnalysis: PropTypes.string.isRequired,
      forseeableRisks: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default AlternativesAndRisksReadOnly;
