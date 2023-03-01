import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { getAPDName, getUpdateStatus } from '../../../redux/reducers/apd';

import { updateStatusChoices } from '../../../components/ApdUpdate';
import { Subsection } from '../../../components/Section';
import Waypoint from '../../../components/ConnectedWaypoint';

const MmisApdOverview = ({ apdName, updateStatus }) => {
  const statusList = updateStatusChoices(updateStatus);

  const updateTypes = statusList.map(obj => {
    if (obj.checked) {
      return obj.label;
    }
  });

  const updateTypesString = updateTypes => {};

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
            {updateStatus.isUpdateAPD && (
              <div>
                <strong>Update Type :</strong> {updateTypes}
              </div>
            )}
          </li>
          <li className="ds-u-margin-top--1">
            <strong>Medicaid Business Area(s) :</strong>
          </li>
        </ul>
      </Subsection>
    </Fragment>
  );
};

MmisApdOverview.propTypes = {
  apdName: PropTypes.string,
  updateStatus: PropTypes.object
};

const mapStateToProps = state => ({
  apdName: getAPDName(state),
  updateStatus: getUpdateStatus(state)
});

export default connect(mapStateToProps, null)(MmisApdOverview);

export { MmisApdOverview as plain, mapStateToProps };
