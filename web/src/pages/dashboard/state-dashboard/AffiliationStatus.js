import PropType from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Instruction from '../../../components/Instruction';
import {
  getUserStateOrTerritory,
  getUserStateOrTerritoryStatus
} from '../../../reducers/user.selector';
import { AFFILIATION_STATUSES } from '../../../constants';
import UpgradeBrowser from '../../../components/UpgradeBrowser';
import axios from '../../../util/api';

const ApprovalStatus = ({ status, mailTo, administratorType }) => {
  const options = {
    [AFFILIATION_STATUSES.REQUESTED]: {
      status: `Approval Pending From ${administratorType} Administrator`,
      src: '../static/icons/puzzle.svg',
      alt: 'Puzzle Piece Icon',
      width: 57
    },
    [AFFILIATION_STATUSES.DENIED]: {
      status: 'Approval Has Been Denied',
      src: '../static/icons/alert.svg',
      alt: 'Alert Icon',
      width: 18
    },
    [AFFILIATION_STATUSES.REVOKED]: {
      status: 'Approval Permissions Revoked',
      src: '../static/icons/alert.svg',
      alt: 'Alert Icon',
      width: 18
    }
  };

  return (
    <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
      <img
        alt={options[status].alt}
        src={options[status].src}
        width={options[status].width}
      />
      <h3 className="ds-u-margin-bottom--1">{options[status].status}</h3>
      <p className="ds-u-margin--0">
        Contact the{' '}
        {mailTo && (
          <a href={`mailto:${mailTo}`}>{administratorType} Administrator</a>
        )}{' '}
        for more information.
      </p>
    </div>
  );
};
ApprovalStatus.propTypes = {
  status: PropType.string.isRequired,
  mailTo: PropType.string.isRequired,
  administratorType: PropType.string.isRequired
};

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

const AffiliationStatus = ({ state, approvalStatus }) => {
  const [mailTo, setMailTo] = useState('');

  React.useEffect(() => {
    axios
      .get(`/states/${state.id}`)
      .then(res => res.data)
      .then(usState => usState.stateAdmins.map(user => user.email).join(','))
      .then(email => setMailTo(email));
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
                    src="static/img/eAPDLogoSVG_ICO/SVG/eAPDColVarSVG.svg"
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
            <ApprovalStatus
              status={approvalStatus}
              mailTo={mailTo || 'CMS-EAPD@cms.hhs.gov'}
              administratorType="State"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

AffiliationStatus.propTypes = {
  state: PropType.object.isRequired,
  approvalStatus: PropType.string.isRequired
};

const mapStateToProps = state => ({
  state: getUserStateOrTerritory(state) || {},
  approvalStatus:
    getUserStateOrTerritoryStatus(state) || AFFILIATION_STATUSES.REQUESTED
});

export default connect(mapStateToProps)(AffiliationStatus);

export { AffiliationStatus as plain, ApprovalStatus, mapStateToProps };
