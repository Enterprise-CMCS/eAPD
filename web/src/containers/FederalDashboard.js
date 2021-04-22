import PropType from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import FederalAdmin from "./admin/FederalAdmin";
import  { ApprovalStatus } from '../components/AffiliationStatus';

import { getUserStateOrTerritoryStatus } from '../reducers/user.selector';
import { AFFILIATION_STATUSES } from '../constants';

const FederalDashboard = ({ stateStatus }) => {
  const isApproved = stateStatus === AFFILIATION_STATUSES.APPROVED;

  const ApprovalOptions = {
    [AFFILIATION_STATUSES.REQUESTED]: {
      status: 'Approval Pending From Federal Administrator',
      src: '../static/icons/puzzle.svg',
      alt: 'Puzzle Piece Icon',
      width: 57
    },
    [AFFILIATION_STATUSES.DENIED]: {
      status: 'Approval Has Been Denied',
      src: '../static/icons/alert.svg',
      alt: 'Alert Icon',
      width: 51
    },
    [AFFILIATION_STATUSES.REVOKED]: {
      status: 'Approval Permissions Revoked',
      src: '../static/icons/alert.svg',
      alt: 'Alert Icon',
      width: 51
    }
  };

  return (
    <Fragment>
      {isApproved && <FederalAdmin />}
      {!isApproved && <ApprovalStatus 
                        mailTo='CMS-EAPD@cms.hhs.gov'
                        mailToLabel='Federal Administrator'
                        options={ApprovalOptions[stateStatus]}/>}
    </Fragment>
  );
};

FederalDashboard.propTypes = {
  stateStatus: PropType.string.isRequired
};

const mapStateToProps = state => ({
  stateStatus:
    getUserStateOrTerritoryStatus(state) || AFFILIATION_STATUSES.REQUESTED
});

export default connect(mapStateToProps)(FederalDashboard);

export { FederalDashboard as plain, mapStateToProps };
