import PropType from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Instruction from "./Instruction";
import { getUserStateOrTerritoryStatus } from '../reducers/user.selector';
import { STATE_AFFILIATION_STATUSES } from '../constants';
import UpgradeBrowser from "./UpgradeBrowser";
import axios from '../util/api';

const PendingApproval = ({ mailTo }) => (
  <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
    <img alt="Puzzle Piece Icon" src="../static/icons/puzzle.svg" width="57" />
    <h3 className="ds-u-margin-bottom--1">
      Approval Pending From State Administrator
    </h3>
    <p className="ds-u-margin--0">
      Contact the {' '}
      {mailTo && (<a href={`mailto:${mailTo}`}>State Administrator</a>)}
      {' '}for more information.
    </p>
  </div>
);
PendingApproval.propTypes = { mailTo: PropType.string.isRequired };

const ApprovalDenied = () => (
  <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
    <img alt="Puzzle Piece Icon" src="../static/icons/alert.svg" height="51" />
    <h3 className="ds-u-margin-bottom--1">Approval Has Been Denied</h3>
    <p className="ds-u-margin--0">
      Please contact State Administrator for more information.
    </p>
  </div>
);

const ApprovalRevoked = () => (
  <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
    <img alt="Puzzle Piece Icon" src="../static/icons/alert.svg" height="51" />
    <h3 className="ds-u-margin-bottom--1">Approval Permissions Revoked</h3>
    <p className="ds-u-margin--0">
      Please contact State Administrator for more information.
    </p>
  </div>
);

// TODO: We'll have to figure out a way to only show this the first time they go into an approved state?
// const Approved = () => (
//   <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
//     <img
//       alt="Puzzle Piece Icon"
//       src="../static/icons/thumbs-up.svg"
//       width="57"
//     />
//     <h3 className="ds-u-margin-bottom--1">Approved</h3>
//     <p className="ds-u-margin--0">
//       Congratulations! You may now create an APD.
//     </p>
//   </div>
// );

const StateAffiliationStatus = (
  {
    state,
    stateStatus
  }
) => {
  const [mailTo, setMailTo] = useState("");

  React.useEffect(() => {
    axios.get(`/states/${state.id}`)
      .then(res => res.data)
      .then(usState => usState.stateAdmins.map(user => user.email).join(','))
      .then(email => setMailTo(email))
  }, [state]);

  return (
    <div className="site-body ds-l-container">
      <div className="ds-u-margin--0">
        <main id="start-main-content">
          <div className="ds-u-padding-top--2">
            <UpgradeBrowser />
            <div className="ds-l-row ds-u-margin-top--7">
              <div className="ds-l-col--8 ds-u-margin-x--auto">
                <div
                  className="ds-u-display--flex ds-u-justify-content--center"
                  data-testid="eAPDlogo"
                >
                  <img
                    src="/static/img/eAPDLogoSVG:ICO/SVG/eAPDColVarSVG.svg"
                    alt="eAPD Logo"
                  />
                </div>
                <Instruction source="stateDashboard.introduction" />
                <div className="ds-u-margin-top--5 ds-u-padding-bottom--1 ds-u-border-bottom--2">
                  <h2 className="ds-h2 ds-u-display--inline-block">
                    {state ? state.name : ''} APDs
                  </h2>
                </div>
              </div>
            </div>
            {stateStatus === STATE_AFFILIATION_STATUSES.REQUESTED ? (
              <PendingApproval mailTo={mailTo || 'CMS-EAPD@cms.hhs.gov'} />
            ) : null}
            {stateStatus === STATE_AFFILIATION_STATUSES.DENIED ? (
              <ApprovalDenied />
            ) : null}
            {stateStatus === STATE_AFFILIATION_STATUSES.REVOKED ? (
              <ApprovalRevoked />
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

StateAffiliationStatus.propTypes = {
  state: PropType.object.isRequired,
  stateStatus: PropType.string.isRequired
};

const mapStateToProps = state => ({
  state: state.user.data.state || null,
  stateStatus:
    getUserStateOrTerritoryStatus(state) || STATE_AFFILIATION_STATUSES.REQUESTED
});

export default connect(mapStateToProps)(StateAffiliationStatus);

export { StateAffiliationStatus as plain, PendingApproval, mapStateToProps };
