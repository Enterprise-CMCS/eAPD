import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { selectSummary } from '../../../redux/selectors/apd.selectors';
import {
  getUpdateStatus,
  getAPDYearRange,
  getMedicaidBusinessAreas
} from '../../../redux/reducers/apd';

import {
  arrayOfObjectsToStringList,
  businessAreaChoices,
  updateStatusChoices
} from '../../../util/apd';
import {
  APD_TYPE,
  MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING
} from '@cms-eapd/common';

const MmisSummary = ({ name, medicaidBusinessAreas, updateStatus, year }) => {
  const businessAreasList = businessAreaChoices(medicaidBusinessAreas);
  const statusList = updateStatusChoices(updateStatus);

  function otherDetails() {
    return (
      <li>
        <div className="other-summary">
          <div>{MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.other}: </div>
          <div className="ds-c-choice__checkedChild">
            {medicaidBusinessAreas.otherMedicaidBusinessAreas}
          </div>
        </div>
      </li>
    );
  }

  function renderMedicaidAreasNumberList() {
    if (!businessAreasList.length) {
      return 'Provide at least one Medicaid Business Area.';
    }
    return (
      <ol>
        {businessAreasList.map((obj, index) => {
          if (obj.checked) {
            return <li key={index}>{obj.label}</li>;
          }
        })}

        {medicaidBusinessAreas.other && otherDetails()}
      </ol>
    );
  }

  return (
    <Fragment>
      <ul className="ds-c-list--bare read-only-summary-list">
        <li>
          <strong>APD Name:</strong> {name}
        </li>
        <li>
          <strong>Program Funding Source:</strong> {APD_TYPE.MMIS} (Medicaid
          Management Information System)
        </li>
        <li>
          <strong>APD Type:</strong>
        </li>
        <li>
          <strong>Federal Fiscal Year (FFY):</strong> {year}
        </li>
        <li>
          <strong>Update Type:</strong>{' '}
          {updateStatus.isUpdateAPD
            ? arrayOfObjectsToStringList(statusList)
            : 'No update type was specified.'}
        </li>
        <li>
          <strong>Medicaid Business Areas:</strong>{' '}
          {renderMedicaidAreasNumberList()}
        </li>
      </ul>
    </Fragment>
  );
};

MmisSummary.propTypes = {
  name: PropTypes.string.isRequired,
  medicaidBusinessAreas: PropTypes.object,
  updateStatus: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  updateStatus: getUpdateStatus(state),
  medicaidBusinessAreas: getMedicaidBusinessAreas(state),
  year: getAPDYearRange(state),
  ...selectSummary(state)
});

export default connect(mapStateToProps)(MmisSummary);
