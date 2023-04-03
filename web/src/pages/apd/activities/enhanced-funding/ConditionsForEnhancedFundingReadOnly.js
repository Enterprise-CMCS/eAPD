import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const ConditionsForEnhancedFundingReadOnly = ({ activity, activityIndex }) => {
  const getEnhancedFundingQualification = qualification => {
    if (qualification === true) {
      return (
        <strong>Yes, this activity is qualified for enhanced funding.</strong>
      );
    }
    if (qualification === false) {
      return (
        <strong>
          No, not applicable for enhanced funding, this activity has a 50/50
          federal state split.
        </strong>
      );
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
      <div>
        <h4 className="ds-u-margin-bottom--0">
          Enhanced Funding Qualification
        </h4>
        <p>
          Does this activity qualify for enhanced funding based on the selected
          match rate?
        </p>
        <p>
          {getEnhancedFundingQualification(
            activity?.conditionsForEnhancedFunding?.enhancedFundingQualification
          )}
        </p>
      </div>
      {activity?.conditionsForEnhancedFunding?.enhancedFundingQualification !==
        false && (
        <div className="ds-u-margin-top--5">
          <h4 className="ds-u-margin-bottom--1">
            Enhanced Funding Justification
          </h4>
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
        </div>
      )}
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
