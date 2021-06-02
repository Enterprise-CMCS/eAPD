import { Button } from '@cmsgov/design-system';
import PropType from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Icon, { File, faPlusCircle, faSpinner } from './Icons';
import Instruction from './Instruction';
import DeleteModal from './DeleteModal';
import { createApd, deleteApd, selectApd } from '../actions/app';
import { t } from '../i18n';
import { selectApdDashboard, selectApds } from '../reducers/apd.selectors';
import UpgradeBrowser from './UpgradeBrowser';
import {
  getUserStateOrTerritoryStatus,
  getIsFedAdmin,
  getIsSysAdmin
} from '../reducers/user.selector';
import { AFFILIATION_STATUSES } from '../constants';

const Loading = ({ children }) => (
  <div className="ds-h2 ds-u-margin-top--7 ds-u-padding--0 ds-u-padding-bottom--3 ds-u-text-align--center">
    <Icon icon={faSpinner} spin size="sm" className="ds-u-margin-right--1" />{' '}
    {children}
  </div>
);
Loading.propTypes = { children: PropType.node.isRequired };

const ApdList = ({
  apds,
  createApd: create,
  deleteApd: del,
  fetching,
  route,
  selectApd: select,
  state,
  approvalStatus,
  isFedAdmin,
  isSysAdmin
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const createNew = () => {
    setIsLoading(true);
    create();
  };

  const open = id => e => {
    setIsLoading(true);
    e.preventDefault();
    select(id, route);
  };

  const canCreateApd =
    !isFedAdmin &&
    !isSysAdmin &&
    approvalStatus === AFFILIATION_STATUSES.APPROVED;

  const canDeleteApd =
    !isFedAdmin &&
    !isSysAdmin &&
    approvalStatus === AFFILIATION_STATUSES.APPROVED;

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
                  {canCreateApd && (
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
            {fetching ? <Loading>Loading APDs</Loading> : null}
            {!fetching && apds.length === 0 ? (
              <div className="ds-l-row">
                <div className="ds-l-col--8 ds-u-margin-x--auto ds-u-padding-top--2 ds-u-padding-bottom--5 ds-u-color--muted">
                  {t('stateDashboard.none')}
                </div>
              </div>
            ) : null}
            {apds.map(apd => (
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
                      {canDeleteApd && (
                        <Button
                          variation="transparent"
                          size="small"
                          onClick={() => setShowDeleteModal(apd.id)}
                        >
                          Delete{' '}
                          <span className="ds-u-visibility--screen-reader">
                            {' '}
                            this APD
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {showDeleteModal === apd.id && (
                  <DeleteModal
                    objType="APD"
                    onCancel={() => setShowDeleteModal(false)}
                    onDelete={() => del(apd.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

ApdList.propTypes = {
  apds: PropType.array.isRequired,
  fetching: PropType.bool.isRequired,
  route: PropType.string,
  state: PropType.object.isRequired,
  createApd: PropType.func.isRequired,
  deleteApd: PropType.func.isRequired,
  selectApd: PropType.func.isRequired,
  approvalStatus: PropType.string.isRequired,
  isFedAdmin: PropType.func.isRequired,
  isSysAdmin: PropType.func.isRequired
};

ApdList.defaultProps = {
  route: '/apd'
};

const mapStateToProps = state => ({
  apds: selectApdDashboard(state),
  fetching: selectApds(state).fetching,
  state: state.user.data.state || null,
  isFedAdmin: getIsFedAdmin(state),
  isSysAdmin: getIsSysAdmin(state),
  approvalStatus:
    getUserStateOrTerritoryStatus(state) || AFFILIATION_STATUSES.REQUESTED
});

const mapDispatchToProps = {
  createApd,
  deleteApd,
  selectApd
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdList);
