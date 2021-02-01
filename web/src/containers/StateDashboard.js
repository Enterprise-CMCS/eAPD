import { Button } from '@cmsgov/design-system';
import PropType from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import TagManager from 'react-gtm-module';

import Icon, { File, faPlusCircle, faSpinner } from '../components/Icons';
import Instruction from '../components/Instruction';
import { createApd, deleteApd, selectApd } from '../actions/app';
import { t } from '../i18n';
import { selectApdDashboard, selectApds } from '../reducers/apd.selectors';
import { getUserStateOrTerritoryStatus } from '../reducers/user.selector';
import { STATE_AFFILIATION_STATUSES } from '../constants';
import UpgradeBrowser from '../components/UpgradeBrowser';
import SessionEndingAlert from './SessionEndingAlert';

const Loading = ({ children }) => (
  <div className="ds-h2 ds-u-margin-top--7 ds-u-padding--0 ds-u-padding-bottom--3 ds-u-text-align--center">
    <Icon icon={faSpinner} spin size="sm" className="ds-u-margin-right--1" />{' '}
    {children}
  </div>
);
Loading.propTypes = { children: PropType.node.isRequired };

const PendingApproval = () => (
  <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-justify-content--center ds-u-align-items--center ds-u-margin-y--4">
    <img alt="Puzzle Piece Icon" src="../static/icons/puzzle.svg" width="57" />
    <h3 className="ds-u-margin-bottom--1">
      Approval Pending From State Administrator
    </h3>
    <p className="ds-u-margin--0">
      Please contact State Administrator for more information.
    </p>
  </div>
);

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

const StateDashboard = (
  {
    apds,
    createApd: create,
    deleteApd: del,
    fetching,
    route,
    selectApd: select,
    state,
    role,
    stateStatus
  },
  { global = window } = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  TagManager.dataLayer({
    dataLayer: {
      stateId: state ? state.id : null,
      userRole: role
    }
  });

  const createNew = () => {
    setIsLoading(true);
    create();
  };

  const open = id => e => {
    setIsLoading(true);
    e.preventDefault();
    select(id, route);
  };

  const delApd = apd => () => {
    if (apd && global.confirm(`Delete ${apd.name}?`)) {
      del(apd.id);
    }
  };

  if (isLoading) {
    return (
      <div id="start-main-content">
        <Loading>Loading your APD</Loading>
      </div>
    );
  }

  return (
    <div className="site-body ds-l-container">
      <div className="ds-u-margin--0">
        <main id="start-main-content">
          <SessionEndingAlert />
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
                {stateStatus === STATE_AFFILIATION_STATUSES.APPROVED && (
                  <Instruction source="stateDashboard.instruction" />
                )}
                <div className="ds-u-margin-top--5 ds-u-padding-bottom--1 ds-u-border-bottom--2">
                  <h2 className="ds-h2 ds-u-display--inline-block">
                    {state ? state.name : ''} APDs
                  </h2>
                  {stateStatus === STATE_AFFILIATION_STATUSES.APPROVED && (
                    <Button
                      variation="primary"
                      className="ds-u-float--right"
                      onClick={createNew}
                    >
                      Create new{' '}
                      <span className="ds-u-visibility--screen-reader">
                        APD
                      </span>
                      &nbsp;&nbsp;
                      <Icon icon={faPlusCircle} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {stateStatus === STATE_AFFILIATION_STATUSES.REQUESTED ? (
              <PendingApproval />
            ) : null}
            {stateStatus === STATE_AFFILIATION_STATUSES.DENIED ? (
              <ApprovalDenied />
            ) : null}
            {stateStatus === STATE_AFFILIATION_STATUSES.REVOKED ? (
              <ApprovalRevoked />
            ) : null}
            {fetching ? <Loading>Loading APDs</Loading> : null}
            {!fetching &&
            stateStatus === STATE_AFFILIATION_STATUSES.APPROVED &&
            apds.length === 0 ? (
              <div className="ds-l-row">
                <div className="ds-l-col--8 ds-u-margin-x--auto ds-u-padding-top--2 ds-u-padding-bottom--5 ds-u-color--muted">
                  {t('stateDashboard.none')}
                </div>
              </div>
            ) : null}
            {stateStatus === STATE_AFFILIATION_STATUSES.APPROVED &&
              apds.map(apd => (
                <div key={apd.id} className="ds-l-row">
                  <div className="ds-l-col--8 ds-u-margin-x--auto ds-u-padding-top--2">
                    <div className="ds-u-border-bottom--2 ds-u-padding-bottom--3">
                      <div className="ds-u-display--inline-block ds-u-float--left ds-u-fill--primary-alt-lightest ds-u-padding--2 ds-u-margin-right--2">
                        <File size="lg" color="#046b99" />
                      </div>
                      <div className="ds-u-display--inline-block">
                        <h3 className="ds-u-margin-y--0">
                          <a href="#!" onClick={open(apd.id)}>
                            <span className="ds-u-visibility--screen-reader">
                              Edit APD:{' '}
                            </span>
                            {apd.name}
                          </a>
                        </h3>
                        <ul className="ds-c-list--bare">
                          <li>
                            <strong>Last edited:</strong> {apd.updated}
                          </li>
                          <li>
                            <strong>Created:</strong> {apd.created}
                          </li>
                        </ul>
                      </div>
                      <div className="ds-u-display--inline-block ds-u-float--right ds-u-text-align--right">
                        <Button
                          variation="transparent"
                          size="small"
                          onClick={delApd(apd)}
                        >
                          Delete{' '}
                          <span className="ds-u-visibility--screen-reader">
                            {' '}
                            this APD
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

StateDashboard.propTypes = {
  apds: PropType.array.isRequired,
  fetching: PropType.bool.isRequired,
  route: PropType.string,
  state: PropType.object.isRequired,
  role: PropType.string.isRequired,
  createApd: PropType.func.isRequired,
  deleteApd: PropType.func.isRequired,
  selectApd: PropType.func.isRequired,
  stateStatus: PropType.string.isRequired
};

StateDashboard.defaultProps = {
  route: '/apd'
};

const mapStateToProps = state => ({
  apds: selectApdDashboard(state),
  fetching: selectApds(state).fetching,
  state: state.user.data.state || null,
  role: state.user.data.role || 'Pending Role',
  stateStatus:
    getUserStateOrTerritoryStatus(state) || STATE_AFFILIATION_STATUSES.REQUESTED
});

const mapDispatchToProps = {
  createApd,
  deleteApd,
  selectApd
};

export default connect(mapStateToProps, mapDispatchToProps)(StateDashboard);
