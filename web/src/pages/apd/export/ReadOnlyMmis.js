import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { selectSummary } from '../../../redux/selectors/apd.selectors';
import { getUpdateStatus, getAPDYearRange } from '../../../redux/reducers/apd';

import { arrayOfObjectsToStringList } from '../../../util/apd';
import { APD_TYPE } from '@cms-eapd/common';

const MmisSummary = ({ name, medicaidBusinessAreas, updateStatus, year }) => {
  return (
    <Fragment>
      <h2>APD Overview</h2>
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
