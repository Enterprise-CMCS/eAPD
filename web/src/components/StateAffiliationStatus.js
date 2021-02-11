import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import PuzzlePieceIcon from '../components/PuzzlePieceIcon';
import AlertIcon from '../components/AlertIcon';
import { getUserStateOrTerritoryStatus } from '../reducers/user.selector';
import { STATE_AFFILIATION_STATUSES } from '../constants';
import axios from '../util/api';

const PendingApproval = ({ mailTo }) => (
  <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
    <PuzzlePieceIcon />
    <h3 className="ds-u-margin-bottom--1">
      Approval Pending From State Administrator
    </h3>

    <p className="ds-u-margin--0">
      Please contact&nbsp;
      {mailTo && (<a href={`mailto:${mailTo}`}>State Administrator</a>)}
      {!mailTo && ("State Administrator")}
      &nbsp;for more information.
    </p>
  </div>
);
PendingApproval.defaultProps = { mailTo: "" };
PendingApproval.propTypes = { mailTo: PropType.string };

const ApprovalDenied = () => (
  <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
    <AlertIcon />
    <h3 className="ds-u-margin-bottom--1">Approval Has Been Denied</h3>
    <p className="ds-u-margin--0">
      Please contact State Administrator for more information.
    </p>
  </div>
);

const ApprovalRevoked = () => (
  <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
    <AlertIcon />
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

const StateAffiliationStatus = ({ state, stateStatus }) => {
  const [mailTo, setMailTo] = useState("");

  useEffect(() => {
    axios.get(`/states/${state.id}`)
      .then(res => res.data)
      .then(usState => usState.stateAdmins.map(user => user.email).join(','))
      .then(email => setMailTo(email))
  }, [state]);

  return (
    <>
      {stateStatus === STATE_AFFILIATION_STATUSES.REQUESTED ? (
        <PendingApproval mailTo={mailTo} />
      ) : null}
      {stateStatus === STATE_AFFILIATION_STATUSES.DENIED ? (
        <ApprovalDenied />
      ) : null}
      {stateStatus === STATE_AFFILIATION_STATUSES.REVOKED ? (
        <ApprovalRevoked />
      ) : null}
    </>
  );
};

StateAffiliationStatus.propTypes = {
  state: PropType.object.isRequired,
  stateStatus: PropType.string.isRequired
};

const mapStateToProps = state => ({
  state: { id: 'ak' },
  stateStatus: STATE_AFFILIATION_STATUSES.REQUESTED
});

export default connect(mapStateToProps)(StateAffiliationStatus);
