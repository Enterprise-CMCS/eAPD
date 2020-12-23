import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Button, Tabs, TabPanel } from '@cmsgov/design-system';

import {
  getStateAffiliations,
  updateStateAffiliation,
  getRoleTypes
} from '../../actions/admin';

import { getUserStateOrTerritory } from '../../reducers/user.selector';

import ManageRoleDialog from './ManageRoleDialog';
import ConfirmationDialog from './ConfirmationDialog';
import ManageUserTable from './ManageUserTable';

const StateAdmin = ({
  currentState,
  currentUser,
  affiliations,
  roleTypes,
  getRoleTypes: fetchTypes,
  getStateAffiliations: stateAffiliations,
  updateStateAffiliation: updateAffiliation
}) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [isFetching, setIsFetching] = useState(true);
  const [isDenied, setIsDenied] = useState(true);

  const [selectedAffiliation, setSelectedAffiliation] = useState();

  const [manageModalDisplay, setManageModalDisplay] = useState(false);
  const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(
    false
  );

  useEffect(() => {
    setIsFetching(true);
    async function fetchAffiliations() {
      await stateAffiliations(currentState.id, activeTab);
    }
    fetchAffiliations().then(() => setIsFetching(false));
  }, [activeTab]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const currentTab = id => {
    setActiveTab(id);
  };

  const showManageModal = event => {
    const currentAffiliation = affiliations.find(element => {
      return (
        element.id === Number(event.target.parentNode.getAttribute('data-id'))
      );
    });
    setSelectedAffiliation(currentAffiliation);
    setManageModalDisplay(true);
  };

  const hideManageModal = () => {
    setManageModalDisplay(false);
  };

  const handleAffiliationUpdate = roleId => {
    async function saveAffiliation() {
      await updateAffiliation(
        currentState.id,
        selectedAffiliation.id,
        roleId,
        'approved'
      );
    }
    saveAffiliation().then(() => {
      stateAffiliations(currentState.id, activeTab);
      setManageModalDisplay(false);
    });
  };

  const showConfirmationModal = event => {
    const checkIsDenied =
      event.target.getAttribute('data-deny-or-revoke') === 'deny';
    setIsDenied(checkIsDenied);

    const currentAffiliation = affiliations.find(element => {
      return (
        element.id === Number(event.target.parentNode.getAttribute('data-id'))
      );
    });
    setSelectedAffiliation(currentAffiliation);
    setConfirmationModalDisplay(true);
  };

  const hideConfirmationModal = () => {
    setConfirmationModalDisplay(false);
  };

  const handleDenyOrRevoke = () => {
    const permissionChangeType = isDenied ? 'denied' : 'revoked';

    async function saveAffiliation() {
      await updateAffiliation(
        currentState.id,
        selectedAffiliation.id,
        -1,
        permissionChangeType
      );
    }
    saveAffiliation().then(() => {
      stateAffiliations(currentState.id, activeTab);
      setConfirmationModalDisplay(false);
    });
  };

  return (
    <main
      id="start-main-content"
      className="ds-l-container ds-u-margin-bottom--5"
    >
      <h1>{`${currentState.name} eAPD State Administrator Portal`}</h1>
      <Tabs onChange={currentTab}>
        <TabPanel id="pending" tab="Requests">
          <ManageUserTable
            tab="pending"
            affiliations={affiliations}
            updateAffiliation={updateAffiliation}
            isFetching={isFetching}
            actions={[
              <Button
                onClick={showManageModal}
                size="small"
                className="ds-u-margin-right--2"
                key="action1"
              >
                Approve
              </Button>,
              <Button
                onClick={showConfirmationModal}
                size="small"
                variation="danger"
                data-deny-or-revoke="deny"
                key="action2"
              >
                Deny
              </Button>
            ]}
          />
        </TabPanel>
        <TabPanel id="active" tab="Active">
          <ManageUserTable
            tab="active"
            affiliations={affiliations}
            currentUser={currentUser}
            updateAffiliation={updateAffiliation}
            isFetching={isFetching}
            actions={[
              <Button
                onClick={showManageModal}
                size="small"
                className="ds-u-margin-right--2"
                key="action1"
              >
                Edit Role
              </Button>,
              <Button
                onClick={showConfirmationModal}
                size="small"
                variation="danger"
                className="ds-u-margin-right--2"
                data-deny-or-revoke="revoke"
                key="action2"
              >
                Revoke
              </Button>
            ]}
          />
        </TabPanel>
        <TabPanel id="inactive" tab="Inactive">
          <ManageUserTable
            tab="inactive"
            affiliations={affiliations}
            currentUser={currentUser}
            updateAffiliation={updateAffiliation}
            isFetching={isFetching}
            actions={[
              <Button
                onClick={showManageModal}
                size="small"
                className="ds-u-margin-right--2"
                key="action1"
              >
                Restore Access
              </Button>
            ]}
          />
        </TabPanel>
      </Tabs>

      {confirmationModalDisplay && (
        <ConfirmationDialog
          hideConfirmationModal={hideConfirmationModal}
          showConfirmationModal={showConfirmationModal}
          isDenied={isDenied}
          handleDenyOrRevoke={handleDenyOrRevoke}
          selectedAffiliation={selectedAffiliation}
        />
      )}

      {manageModalDisplay && (
        <ManageRoleDialog
          roleTypes={roleTypes}
          hideManageModal={hideManageModal}
          showManageModal={showManageModal}
          handleAffiliationUpdate={handleAffiliationUpdate}
          selectedAffiliation={selectedAffiliation}
        />
      )}
    </main>
  );
};

StateAdmin.propTypes = {
  getStateAffiliations: PropTypes.func.isRequired,
  updateStateAffiliation: PropTypes.func.isRequired,
  getRoleTypes: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  affiliations: PropTypes.array.isRequired,
  roleTypes: PropTypes.array.isRequired
};

StateAdmin.defaultProps = {
  currentUser: null
};

const mapDispatchToProps = {
  getStateAffiliations,
  updateStateAffiliation,
  getRoleTypes
};

const mapStateToProps = state => ({
  affiliations: state.admin.affiliations,
  roleTypes: state.admin.roleTypes,
  currentState: getUserStateOrTerritory(state),
  currentUser: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(StateAdmin);

export { StateAdmin as plain, mapStateToProps, mapDispatchToProps };
