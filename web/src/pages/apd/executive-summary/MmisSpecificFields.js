import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { t } from '../../../i18n';

import {
  getAPDName,
  getMedicaidBusinessAreas,
  getPrioritiesAndScope,
  getUpdateStatus
} from '../../../redux/reducers/apd';
import {
  updateStatusChoices,
  businessAreaChoices,
  arrayOfObjectsToStringList
} from '../../../util/apd';

import { Subsection } from '../../../components/Section';
import Waypoint from '../../../components/ConnectedWaypoint';

const MmisSpecificFields = ({
  apdName,
  medicaidBusinessAreas,
  statePrioritiesAndScope,
  updateStatus
}) => {
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
      <Subsection
        id="executive-overview-summary"
        resource="executiveSummary.statePrioritiesAndScope"
      >
        <h3 className="ds-u-margin-bottom--1">
          {t(
            'executiveSummary.statePrioritiesAndScope.medicaidProgramAndPriorities'
          )}
        </h3>
        <div className="ds-u-margin-y--1">
          {statePrioritiesAndScope.medicaidProgramAndPriorities}
        </div>
        <h3 className="ds-u-margin-bottom--1">
          {t('executiveSummary.statePrioritiesAndScope.mesIntroduction')}
        </h3>
        <div className="ds-u-margin-y--1">
          {statePrioritiesAndScope.mesIntroduction}
        </div>
        <h3 className="ds-u-margin-bottom--1">
          {t('executiveSummary.statePrioritiesAndScope.scopeOfAPD')}
        </h3>
        <div className="ds-u-margin-y--1">
          {statePrioritiesAndScope.scopeOfAPD}
        </div>
      </Subsection>
    </Fragment>
  );
};

MmisSpecificFields.propTypes = {
  apdName: PropTypes.string.isRequired,
  medicaidBusinessAreas: PropTypes.object.isRequired,
  statePrioritiesAndScope: PropTypes.object.isRequired,
  updateStatus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apdName: getAPDName(state),
  medicaidBusinessAreas: getMedicaidBusinessAreas(state),
  statePrioritiesAndScope: getPrioritiesAndScope(state),
  updateStatus: getUpdateStatus(state)
});

export default connect(mapStateToProps, null)(MmisSpecificFields);

export { MmisSpecificFields as plain, mapStateToProps };
