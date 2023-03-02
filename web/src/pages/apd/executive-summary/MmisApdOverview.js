import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getAPDName,
  getMedicaidBusinessAreas,
  getUpdateStatus
} from '../../../redux/reducers/apd';
import {
  updateStatusChoices,
  businessAreaChoices,
  arrayOfObjectsToStringList
} from '../../../util/apd';

import { Subsection } from '../../../components/Section';
import Waypoint from '../../../components/ConnectedWaypoint';

const MmisApdOverview = ({ apdName, medicaidBusinessAreas, updateStatus }) => {
  const statusList = updateStatusChoices(updateStatus);
  const businessAreasList = businessAreaChoices(medicaidBusinessAreas);

  return (
    <Fragment>
      <Waypoint id="executive-overview-summary" />
      <Subsection
        id="executive-overview-summary"
        resource="executiveSummary.overviewSummary"
      >
        <ul className="ds-c-list--bare">
          <li className="ds-u-margin-top--1">
            <strong>APD Name :</strong> {apdName}
          </li>
          <li className="ds-u-margin-top--1">
            <strong>Update Type :</strong>{' '}
            {updateStatus.isUpdateAPD
              ? arrayOfObjectsToStringList(statusList)
              : 'No update type was specified.'}
          </li>
          <li className="ds-u-margin-top--1">
            <strong>Medicaid Business Area(s) :</strong>{' '}
            {arrayOfObjectsToStringList(businessAreasList)}
          </li>
        </ul>
      </Subsection>
    </Fragment>
  );
};

MmisApdOverview.propTypes = {
  apdName: PropTypes.string,
  medicaidBusinessAreas: PropTypes.object,
  updateStatus: PropTypes.object
};

const mapStateToProps = state => ({
  apdName: getAPDName(state),
  medicaidBusinessAreas: getMedicaidBusinessAreas(state),
  updateStatus: getUpdateStatus(state)
});

export default connect(mapStateToProps, null)(MmisApdOverview);

export { MmisApdOverview as plain, mapStateToProps };
