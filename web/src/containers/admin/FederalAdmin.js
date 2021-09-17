import PropTypes from 'prop-types';
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Tabs, TabPanel } from '@cmsgov/design-system';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@cmsgov/design-system';

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

  const [manageModalDisplay, setManageModalDisplay] = useState(false);
  const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(
    false
  );

  const [limitedRoleTypes, setLimitedRoleTypes] = useState(roleTypes);
  
  const { id: currentUserId, role: currentUserRole } = currentUser;
  
  const showActions = affiliation => {
    return (
      currentUserId !== affiliation.userId &&
      currentUserRole !== 'eAPD System Admin' &&
      affiliation.role !== 'eAPD System Admin'
    );
  };
  
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
  
  const limitDisplayedRoleTypes = currentAffiliationState => {
    let limitedRoles;
    if(currentAffiliationState === 'fd') {
      limitedRoles = roleTypes.filter(item => item.name === 'eAPD Federal Admin')
    }    
    if(currentAffiliationState !== 'fd') {
      limitedRoles = roleTypes.filter(item => item.name === 'eAPD State Admin')
    }
    setLimitedRoleTypes(limitedRoles);
  }

  const setCurrentAffiliation = event => {
    const currentAffiliation = currentAffiliations.find(element => element.id === Number(event.target.parentNode.getAttribute('data-primary-affiliation-id')) );
    const currentAffiliationId = event.target.parentNode.getAttribute('data-id');
    const currentAffiliationState = event.target.parentNode.getAttribute('data-state');
    
    setSelectedAffiliation({
      currentAffiliation, 
      currentAffiliationId, 
      currentAffiliationState
    });

    limitDisplayedRoleTypes(currentAffiliationState);
  };
  
  const showManageModal = event => {
    setCurrentAffiliation(event);
    setManageModalDisplay(true);
  };

  const hideManageModal = () => {
    setManageModalDisplay(false);
  };

  const showConfirmationModal = event => {
    const checkIsDenied = event.target.getAttribute('data-deny-or-revoke') === 'deny';
    setIsDenied(checkIsDenied);
    setCurrentAffiliation(event);
    setConfirmationModalDisplay(true);
  };

  const hideConfirmationModal = () => setConfirmationModalDisplay(false);
  
  const saveAffiliation = async (roleId, deniedOrRevoked) => {
    const role = roleId || -1;
    const changeType = deniedOrRevoked || 'approved';
    await actualUpdateAffiliation(
      selectedAffiliation.currentAffiliationState,
      selectedAffiliation.currentAffiliationId,
      role,
      changeType
    );
  };
  
  const handleAffiliationUpdate = roleId => {
    saveAffiliation(roleId, null).then(() => {
      affiliations(currentState.id, activeTab);
      setManageModalDisplay(false);
    });
  };
  
  const handleDenyOrRevoke = () => {
    const deniedOrRevoked = isDenied ? 'denied' : 'revoked';
    saveAffiliation(null, deniedOrRevoked).then(() => {
      affiliations(currentState.id, activeTab);
      setConfirmationModalDisplay(false);
    });
  };
  
  return (
    <main>
      <Tabs onChange={currentTab}>
        <TabPanel id="pending" tab="Requests">
          {activeTab === 'pending' && (
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
          )}
        </TabPanel>
        <TabPanel id="active" tab="Active">
          {activeTab === 'active' && (
            // <ManageAllUsersTable
            //   tab="active"
            //   affiliations={currentAffiliations}
            //   currentUser={currentUser}
            //   updateAffiliation={actualUpdateAffiliation}
            //   isFetching={isFetching}
            //   actions={[
            //     <Button
            //       onClick={showManageModal}
            //       size="small"
            //       className="ds-u-margin-right--2"
            //       key="action1"
            //     >
            //       Edit Role
            //     </Button>,
            //     <Button
            //       onClick={showConfirmationModal}
            //       size="small"
            //       variation="danger"
            //       className="ds-u-margin-right--2"
            //       data-deny-or-revoke="revoke"
            //       key="action2"
            //     >
            //       Revoke
            //     </Button>
            //   ]}
            // />
            <Fragment>
            {isFetching && <p>Loading...</p>}
            {!isFetching && currentAffiliations.length === 0 && (
              <p>No users on this tab at this time</p>
            )}
            {!isFetching && currentAffiliations.length > 0 && (
              <Table borderless>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    {activeTab === 'active' ? <TableCell>Role</TableCell> : null}
                    {activeTab === 'inactive' ? <TableCell>Status</TableCell> : null}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentAffiliations.map(affiliation => (
                    <TableRow key={affiliation.id}>
                      <TableCell>{affiliation.displayName}</TableCell>
                      <TableCell>{affiliation.email}</TableCell>
                      <TableCell>{affiliation.primaryPhone}</TableCell>
                      {activeTab === 'active' ? (
                        <TableCell>{affiliation.role}</TableCell>
                      ) : null}
                      {activeTab === 'inactive' ? (
                        <TableCell>
                          {affiliation.status.charAt(0).toUpperCase() +
                            affiliation.status.slice(1)}
                        </TableCell>
                      ) : null}
                      <TableCell>
                        <div className="ds-u-display--flex" data-id={affiliation.id}>
                          {showActions(affiliation) && (
                            <Fragment>
                              <Button
                                onClick={showManageModal}
                                size="small"
                                className="ds-u-margin-right--2"
                                key="action1"
                              >
                                Edit Role
                              </Button>
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
                            </Fragment>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            </Fragment>
            
            
            
          )}
        </TabPanel>
        <TabPanel id="inactive" tab="Inactive">
          {activeTab === 'inactive' && (
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
          )}
        </TabPanel>
      </Tabs>

      {confirmationModalDisplay && (
        <ConfirmationDialog
          hideConfirmationModal={hideConfirmationModal}
          showConfirmationModal={showConfirmationModal}
          isDenied={isDenied}
          handleDenyOrRevoke={handleDenyOrRevoke}
          selectedAffiliation={selectedAffiliation.currentAffiliation}
        />
      )}

      {manageModalDisplay && (
        <ManageRoleDialog
          roleTypes={limitedRoleTypes}
          hideManageModal={hideManageModal}
          showManageModal={showManageModal}
          handleAffiliationUpdate={handleAffiliationUpdate}
          selectedAffiliation={selectedAffiliation.currentAffiliation}
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