import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getStateAffiliations, updateStateAffiliation } from '../../actions/admin';

import { getUserStateOrTerritory } from '../../reducers/user.selector';

// Todo: Test these components
import ManageRoleDialog from './ManageRoleDialog';
import ConfirmationDialog from './ConfirmationDialog';
import ManageUserTable from './ManageUserTable';

import { 
  Button, 
  Tabs, 
  TabPanel
} from '@cmsgov/design-system';

const StateAdmin = ({ 
  currentState,
  affiliations,
  getStateAffiliations: stateAffiliations,
  updateStateAffiliation: updateAffiliation
}) => {  
  const [activeTab, setActiveTab] = useState("pending");
  const [isFetching, setIsFetching] = useState(true);
  const [isDenied, setIsDenied] = useState(true);

  const [selectedAffiliation, setSelectedAffiliation] = useState();

  const [manageModalDisplay, setManageModalDisplay] = useState(false);
  const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchAffiliations() {
      await stateAffiliations(currentState.id, activeTab);
    }
    fetchAffiliations().then(() => setIsFetching(false))
  }, [activeTab]);
  
  const currentTab = (id, previousId) => {
    setActiveTab(id)
  }

  const showManageModal = event => {
    const currentAffiliation = affiliations.find(element => {
      return element.id == event.target.parentNode.getAttribute("data-id")
    });
    setSelectedAffiliation(currentAffiliation);
    setManageModalDisplay(true);
  }
  
  const hideManageModal = () => {
    setManageModalDisplay(false);  
  }

  const handleAffiliationUpdate = () => {
    async function saveAffiliation() {
      // Todo: Update this to get the appropriate role_id
      await updateAffiliation(currentState.id, selectedAffiliation.id, 56, "approved");
    }
    saveAffiliation().then(() => {
      stateAffiliations(currentState.id, activeTab);
      setManageModalDisplay(false); 
    }).catch(error => {
      console.log("Error saving the affiliation:", error);
    })
  }

  const showConfirmationModal = (event) => {
    const denyOrRevoke = event.target.getAttribute("data-deny-or-revoke");
    setIsDenied(denyOrRevoke);

    const currentAffiliation = affiliations.find(element => {
      return element.id == event.target.parentNode.getAttribute("data-id")
    });
    setSelectedAffiliation(currentAffiliation);
    setConfirmationModalDisplay(true);
  }

  const hideConfirmationModal = () => {
    setConfirmationModalDisplay(false);  
  }

  // Todo: consider refactoring this to reduce redundancy between handleAffiliationUpdate
  const handleDenyOrRevoke = () => {
    const permissionChangeType = isDenied ? "denied" : "revoked";
    
    // Todo: Figure out how what role_id should be set to when revoking
    async function saveAffiliation() {
      await updateAffiliation(currentState.id, selectedAffiliation.id, 56, permissionChangeType);
    }
    saveAffiliation().then(() => {
      stateAffiliations(currentState.id, activeTab);
      setConfirmationModalDisplay(false); 
    }).catch(error => {
      console.log("Error saving the affiliation: ", error);
    })
  }  

  return (
    <main id="start-main-content" className="ds-l-container ds-u-margin-bottom--5">
      <h1>{`${currentState.name} eAPD State Administrator Portal`}</h1>
      <Tabs onChange={currentTab}>
        <TabPanel id="pending" tab="Requests" >
          <ManageUserTable 
            tab={"pending"}
            affiliations={affiliations} 
            updateAffiliation={updateAffiliation} 
            isFetching={isFetching} 
            actions={[
              <Button onClick={showManageModal} size='small' className="ds-u-margin-right--2" key="action1">Approve</Button>,
              <Button onClick={showConfirmationModal} size='small' variation='danger' data-deny-or-revoke="deny" key="action2">Deny</Button>
            ]}
          />
        </TabPanel>
        <TabPanel id="active" tab="Active">
          <ManageUserTable 
            tab={"active"}
            affiliations={affiliations} 
            updateAffiliation={updateAffiliation} 
            isFetching={isFetching} 
            actions={[
              <Button onClick={showManageModal} size='small' className="ds-u-margin-right--2" key="action1">Edit Access</Button>,
              <Button onClick={showConfirmationModal} size='small' variation="danger" className="ds-u-margin-right--2" data-deny-or-revoke="revoke" key="action2">Revoke</Button>
            ]}
          />
        </TabPanel>
        <TabPanel id="inactive" tab="Inactive">
          <ManageUserTable 
            tab={"inactive"}
            affiliations={affiliations} 
            updateAffiliation={updateAffiliation} 
            isFetching={isFetching} 
            actions={[
              <Button onClick={showManageModal} size='small' className="ds-u-margin-right--2" key="action1">Restore Access</Button>
            ]}
          />
        </TabPanel>
      </Tabs>
      
      {confirmationModalDisplay && (
        <ConfirmationDialog 
          hideConfirmationModal={hideConfirmationModal} 
          showConfirmationModal={showConfirmationModal}
          denyOrRevoke={denyOrRevoke}
          handleDenyOrRevoke={handleDenyOrRevoke}
          selectedAffiliation={selectedAffiliation}
        />
      )}
      
      {manageModalDisplay && (
        <ManageRoleDialog 
          hideManageModal={hideManageModal} 
          showManageModal={showManageModal} 
          handleAffiliationUpdate={handleAffiliationUpdate}
          selectedAffiliation={selectedAffiliation}
        />
      )}
    </main>
  )
}

StateAdmin.propTypes = {
  getStateAffiliations: PropTypes.func.isRequired,
  updateStateAffiliation: PropTypes.func.isRequired
}

const mapDispatchToProps = { 
  getStateAffiliations,
  updateStateAffiliation
};

const mapStateToProps = state => ({
  affiliations: state.admin.affiliations,
  currentState: getUserStateOrTerritory(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(StateAdmin);

export { StateAdmin as plain, mapStateToProps, mapDispatchToProps };