import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Tabs, TabPanel } from '@cmsgov/design-system';

import {
  getRoleTypes,
  getAffiliations,
  updateAffiliation
} from '../../actions/admin';

import { getUserStateOrTerritory } from '../../reducers/user.selector';

import ManageRoleDialog from './ManageRoleDialog';
import ConfirmationDialog from './ConfirmationDialog';
import ManageAllUsersTable from './ManageAllUsersTable';


const FederalAdmin = ({
  currentState,
  currentUser,
  currentAffiliations,
  roleTypes,
  getRoleTypes: fetchTypes,
  getAffiliations: affiliations,
  updateAffiliation: actualUpdateAffiliation
}) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [isFetching, setIsFetching] = useState(true);
  const [isDenied, setIsDenied] = useState(true);

  const [selectedAffiliation, setSelectedAffiliation] = useState();
  const [selectedAffiliationId, setSelectedAffiliationId] = useState();
  const [selectedAffiliationState, setSelectedAffiliationState] = useState();

  const [manageModalDisplay, setManageModalDisplay] = useState(false);
  const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(
    false
  );

  useEffect(() => {
    setIsFetching(true);
    async function fetchAffiliations() {
      await affiliations(currentState.id, activeTab);
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
    console.log("event passed to modal", event.target.parentNode)
    // Need 3 things to suppor the modal:
    // 1. The "primary" affiliation id that contains name / email / phone
    // 2. The specific affiliation id
    // 3. The specific state 
    console.log("currentAffiliations", currentAffiliations);
    const currentAffiliation = currentAffiliations.find(element => {
      return (
        element.id === Number(event.target.parentNode.getAttribute('data-primary-affiliation-id'))
      );
    });

    const currentAffiliationId = event.target.parentNode.getAttribute('data-id');
    const currentAffiliationState = event.target.parentNode.getAttribute('data-state');

    setSelectedAffiliation(currentAffiliation);
    setSelectedAffiliationId(currentAffiliationId);
    setSelectedAffiliationState(currentAffiliationState);
    setManageModalDisplay(true);
  };

  const hideManageModal = () => {
    setManageModalDisplay(false);
  };

  const handleAffiliationUpdate = roleId => {
    async function saveAffiliation() {
      await actualUpdateAffiliation(
        selectedAffiliationState,
        selectedAffiliationId,
        roleId,
        'approved'
      );
    }
    saveAffiliation().then(() => {
      affiliations(currentState.id, activeTab);
      setManageModalDisplay(false);
    });
  };

  const showConfirmationModal = event => {
    const checkIsDenied =
      event.target.getAttribute('data-deny-or-revoke') === 'deny';
    setIsDenied(checkIsDenied);

    const currentAffiliation = currentAffiliations.find(element => {
      return (
        element.id === Number(event.target.parentNode.getAttribute('data-primary-affiliation-id'))
      );
    });

    const currentAffiliationId = event.target.parentNode.getAttribute('data-id');
    const currentAffiliationState = event.target.parentNode.getAttribute('data-state');

    setSelectedAffiliation(currentAffiliation);
    setSelectedAffiliationId(currentAffiliationId);
    setSelectedAffiliationState(currentAffiliationState);

    setConfirmationModalDisplay(true);
  };

  const hideConfirmationModal = () => {
    setConfirmationModalDisplay(false);
  };

  const handleDenyOrRevoke = () => {
    const permissionChangeType = isDenied ? 'denied' : 'revoked';

    async function saveAffiliation() {
      await actualUpdateAffiliation(
        selectedAffiliationState,
        selectedAffiliationId,
        -1,
        permissionChangeType
      );
    }
    saveAffiliation().then(() => {
      affiliations(currentState.id, activeTab);
      setConfirmationModalDisplay(false);
    });
  };
  
  return (
    <main>
      <Tabs onChange={currentTab}>
        <TabPanel id="pending" tab="Requests">
          <ManageAllUsersTable
            tab="pending"
            affiliations={currentAffiliations}
            currentUser={currentUser}
            updateAffiliation={actualUpdateAffiliation}
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
          <ManageAllUsersTable
            tab="active"
            affiliations={currentAffiliations}
            currentUser={currentUser}
            updateAffiliation={actualUpdateAffiliation}
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
          <ManageAllUsersTable
            tab="inactive"
            affiliations={currentAffiliations}
            currentUser={currentUser}
            updateAffiliation={actualUpdateAffiliation}
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

FederalAdmin.propTypes = {
  getAffiliations: PropTypes.func.isRequired,
  getRoleTypes: PropTypes.func.isRequired,
  updateAffiliation: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  currentAffiliations: PropTypes.array.isRequired,
  roleTypes: PropTypes.array.isRequired
};

FederalAdmin.defaultProps = {
  currentUser: null
};

const mapDispatchToProps = {
  getAffiliations,
  updateAffiliation,
  getRoleTypes
};

const mapStateToProps = state => ({
  roleTypes: state.admin.roleTypes,
  currentState: getUserStateOrTerritory(state),
  currentAffiliations: state.admin.affiliations,
  currentUser: state.user.data
});

export default connect(mapStateToProps, mapDispatchToProps)(FederalAdmin);

export { FederalAdmin as plain, mapStateToProps, mapDispatchToProps };