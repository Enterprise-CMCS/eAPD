import PropType from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import FederalAdmin from "./admin/FederalAdmin";
import { ApprovalStatus } from '../components/AffiliationStatus';
import Card from '../components/Card';

import { getUserStateOrTerritoryStatus } from '../reducers/user.selector';
import { AFFILIATION_STATUSES } from '../constants';

const FederalDashboard = ({ approvalStatus }) => {
  const history = useHistory();
  
  const isApproved = approvalStatus === AFFILIATION_STATUSES.APPROVED;
  
  const handleAddStateButton = () => {
    history.push("/delegate-state-admin");
  }
  
  return (
    <main
      id="start-main-content"
      className="ds-l-container ds-u-margin-bottom--5"
    >
      <h1>Federal Administrator Portal</h1>
      {isApproved && <FederalAdmin /> }
      {!isApproved && <ApprovalStatus 
                        status={approvalStatus}
                        mailTo='CMS-EAPD@cms.hhs.gov'
                        administratorType='Federal' />}
    </main>
  );
};

FederalDashboard.propTypes = {
  approvalStatus: PropType.string.isRequired
};

const mapStateToProps = state => ({
  approvalStatus:
    getUserStateOrTerritoryStatus(state) || AFFILIATION_STATUSES.REQUESTED
});

export default connect(mapStateToProps)(FederalDashboard);

export { FederalDashboard as plain, mapStateToProps };
