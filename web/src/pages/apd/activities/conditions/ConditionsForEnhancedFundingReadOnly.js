import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const ConditionsForEnhancedFundingReadOnly = ({ activity, activityIndex }) => {
  const getEnhancedFundingQualification = qualification => {
    if (qualification === true) {
      return 'Yes, this activity is qualified for enhanced funding.';
    }
    if (qualification === false) {
      return 'No, not applicable for enhanced funding, this activity has a 50/50 federal state split.';
    }
    return 'No response was provided.';
  };
  return (
    <Fragment>
      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1}: {activity?.name || 'Untitled'}
        </small>
        <br />
        Conditions for Enhanced Funding
      </h3>
      <span>
        <strong>Enhanced Funding Qualification</strong>
        <p>
          Does this activity qualify for enhanced funding based on the selected
          match rate?
        </p>
        <strong>
          {getEnhancedFundingQualification(
            activity?.conditionsForEnhancedFunding?.enhancedFundingQualification
          )}
        </strong>
      </span>
      <span>
        <strong>Enhanced Funding Justification</strong>
        <p>
          Describe how this activity will or WILL NOT support the Medicaid
          Standards and Conditions{' '}
          <a href="https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-433/subpart-C/section-433.112">
            42 CFR 433.112
          </a>
          .
        </p>
        <div
          className="ds-u-margin-bottom--4"
          dangerouslySetInnerHTML={{
            __html:
              activity?.conditionsForEnhancedFunding
                ?.enhancedFundingJustification ||
              '<p>No response was provided.</p>'
          }}
        />
      </span>
    </Fragment>
  );
};

ConditionsForEnhancedFundingReadOnly.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    conditionsForEnhancedFunding: PropTypes.shape({
      enhancedFundingQualification: PropTypes.bool.isRequired,
      enhancedFundingJustification: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ConditionsForEnhancedFundingReadOnly;
