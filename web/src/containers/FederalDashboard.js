import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import FederalAdmin from "./admin/FederalAdmin";

import { getUserStateOrTerritoryStatus } from '../reducers/user.selector';
import { AFFILIATION_STATUSES } from '../constants';

import UpgradeBrowser from '../components/UpgradeBrowser';

// This component is a placeholder until we implement this with the federal admin dashboard
const FederalDashboard = ({ stateStatus }) => {
  const isApproved = stateStatus === AFFILIATION_STATUSES.APPROVED;

  return (
    <div className="site-body ds-l-container">
      <div className="ds-u-margin--0">
        <main id="start-main-content">
          <div className="ds-u-padding-top--4">
            <UpgradeBrowser />
            <div
              className="ds-u-display--flex ds-u-justify-content--center"
              data-testid="eAPDlogo"
            >
              <img
                src="/static/img/eAPDLogoSVG:ICO/SVG/eAPDColVarSVG.svg"
                alt="eAPD Logo"
              />
            </div>
            {isApproved && <FederalAdmin />}
            {!isApproved && (
              <div className="ds-u-padding-top--6 ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
                <img alt="Puzzle Piece Icon" src="../static/icons/puzzle.svg" width="57" />
                <h3 className="ds-u-margin-bottom--1">Approval Pending From System Administrator</h3>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>

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
