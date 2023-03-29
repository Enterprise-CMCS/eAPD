import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  APD_TYPE,
  MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING
} from '@cms-eapd/common';

import { getAPDYearRange } from '../../../redux/reducers/apd.js';
import {
  selectSummary,
  selectStatus,
  selectApdType,
  selectMedicaidBusinessAreas
} from '../../../redux/selectors/apd.selectors';

const ApdSummary = ({
  programOverview,
  narrativeHIT,
  narrativeHIE,
  narrativeMMIS,
  name,
  apdType,
  apdYears,
  isUpdateAPD,
  annualUpdate,
  asNeededUpdate,
  medicaidBusinessAreas
}) => {
  const businessAreas = Object.keys(medicaidBusinessAreas).filter(
    businessArea => medicaidBusinessAreas[businessArea] === true
  );

  const getUpdateType = ({ isUpdateAPD, annualUpdate, asNeededUpdate }) => {
    if (isUpdateAPD) {
      if (!annualUpdate && !asNeededUpdate) {
        return 'No update type selected';
      }
      if (annualUpdate && !asNeededUpdate) {
        return 'Annual update';
      }
      if (!annualUpdate && asNeededUpdate) {
        return 'As-needed update';
      }
      if (annualUpdate && asNeededUpdate) {
        return 'Annual and As-needed update';
      }
    }
    return 'New project';
  };

  /* eslint-disable react/no-danger */
  if (apdType === APD_TYPE.HITECH) {
    return (
      <div>
        <h2>APD Overview</h2>
        <h3>Program introduction</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: programOverview || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>HIT overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeHIT || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>HIE overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeHIE || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>MMIS overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeMMIS || 'No response was provided'
          }}
        />
      </div>
    );
  }
  if (apdType === APD_TYPE.MMIS) {
    return (
      <div>
        <h2>APD Overview</h2>
        <ul className="ds-c-list--bare">
          <li className="ds-u-margin-top--2">
            <strong>APD Name:</strong> {name}
          </li>
          <li className="ds-u-margin-top--2">
            <strong>Program Funding Source: </strong>MMIS (Medicaid Management
            Information System)
          </li>
          <li className="ds-u-margin-top--2">
            <strong>APD Type:</strong> Implementation
          </li>
          <li className="ds-u-margin-top--2">
            <strong>Federal Fiscal Year (FFY): </strong>
            {apdYears || 'No Federal Fiscal Year(s) selected'}
          </li>
          <li className="ds-u-margin-top--2">
            <strong>Update Type: </strong>
            {getUpdateType({ isUpdateAPD, annualUpdate, asNeededUpdate })}
            <strong></strong>
          </li>
          <li className="ds-u-margin-top--2">
            <strong>Medicaid Business Areas: </strong>
            {businessAreas.length === 0 && (
              <Fragment>No Medicaid Business Areas selected</Fragment>
            )}
            <ol>
              {businessAreas.map(businessArea => (
                <Fragment key={businessArea}>
                  {businessArea !== 'other' && (
                    <li className="ds-u-margin-top--1">
                      {
                        MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING[
                          businessArea
                        ]
                      }
                    </li>
                  )}
                  {businessArea === 'other' && (
                    <li className="ds-u-margin-top--1">
                      {
                        MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING[
                          businessArea
                        ]
                      }
                      {medicaidBusinessAreas.otherMedicaidBusinessAreas && (
                        <span className="border-left--primary ds-u-padding-left--2 ds-u-padding-y--1 ds-u-margin-left--2 position-absolute">
                          {/* eslint-disable react/prop-types */}
                          {medicaidBusinessAreas.otherMedicaidBusinessAreas}
                        </span>
                      )}
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </li>
        </ul>
      </div>
    );
  }
};

ApdSummary.propTypes = {
  programOverview: PropTypes.string,
  narrativeHIT: PropTypes.string,
  narrativeHIE: PropTypes.string,
  narrativeMMIS: PropTypes.string,
  name: PropTypes.string,
  apdType: PropTypes.string,
  apdYears: PropTypes.string,
  isUpdateAPD: PropTypes.bool,
  annualUpdate: PropTypes.bool,
  asNeededUpdate: PropTypes.bool,
  medicaidBusinessAreas: PropTypes.object
};

ApdSummary.defaultProps = {
  programOverview: '',
  narrativeHIT: '',
  narrativeHIE: '',
  narrativeMMIS: '',
  name: '',
  apdType: APD_TYPE.HITECH,
  apdYears: '',
  isUpdateAPD: false,
  annualUpdate: false,
  asNeededUpdate: false,
  medicaidBusinessAreas: {}
};

const mapStateToProps = state => ({
  apdType: selectApdType(state),
  apdYears: getAPDYearRange(state),
  ...selectStatus(state),
  ...selectSummary(state),
  ...selectMedicaidBusinessAreas(state)
});

export default connect(mapStateToProps)(ApdSummary);
