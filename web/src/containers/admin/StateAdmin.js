import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getStateAffiliations, updateStateAffiliation } from '../../actions/admin';

import { getUserStateOrTerritory } from '../../reducers/user.selector';

import { 
  Button, 
  Dialog,
  Dropdown,   
  Tabs, 
  TabPanel, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody 
} from '@cmsgov/design-system';
 
const ManageRoleDialog = ({
  selectedAffiliation,
  hideManageModal,
  handleAffiliationUpdate
 }) => {

  const dropdownOptions = [
    { label: 'State Coordinator', value: 'State Coordinator' },
    { label: 'State Contractor', value: 'State Contractor' }
  ];

  return (
    <Dialog
      onExit={hideManageModal}
      heading="Edit Permissions"
      actions={[
        <Button className="ds-u-margin-right--3 ds-u-margin-top--2" onClick={handleAffiliationUpdate}>Save</Button>,
        <Button variation="danger" onClick={hideManageModal}>Cancel</Button>
      ]}
    >
      <p><strong>Name</strong> {selectedAffiliation.displayName}</p>
      <p><strong>Phone Number</strong> {selectedAffiliation.primaryPhone}</p>
      <p><strong>Email</strong> {selectedAffiliation.email}</p>
      
      <Dropdown
        options={dropdownOptions}
        className=""
        defaultValue="State Contractor"
        hint="A State Coordinator is someone who works for a state. A State Contractor is someone who works for a vendor on behalf of the state."
        size="medium"
        label="Role"
        name="medium_dropdown_field"
      />
    </Dialog>
  )
}

const ConfirmationDialog = (props) => {
  return (
    <Dialog
      onExit={props.hideConfirmationModal}
      heading="Confirm Rejection"
      actions={[
        <Button className="ds-c-button ds-c-button--danger" onClick={props.hideConfirmationModal}>Confirm</Button>,
        <Button className="ds-c-button ds-c-button--transparent" onClick={props.hideConfirmationModal}>Cancel</Button>
      ]}
    >
      <p>Are you sure you want to?</p>
    </Dialog>
  )
}

// Todo: Need to handle empty state when there is no requests/active/inactive

const ManageUserTable = ({
  type,
  affiliations,
  isFetching,
  actions
}) => {
  return (
    <Fragment>
      {isFetching && (
        <p>Loading...</p>
      )}
      {!isFetching && affiliations.length > 0 && (
      <Table borderless>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            {type === 'active' ? <TableCell>Role</TableCell> : null}
            {type === 'inactive' ? <TableCell>Status</TableCell> : null}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {affiliations.map((affiliation, index) => (
            <TableRow key={index}>
              <TableCell>{affiliation.displayName}</TableCell>
              <TableCell>{affiliation.email}</TableCell>
              <TableCell>{affiliation.primaryPhone}</TableCell>
              {type === 'active' ? <TableCell>{affiliation.role}</TableCell> : null}
              {type === 'inactive' ? <TableCell>{affiliation.status.charAt(0).toUpperCase() + affiliation.status.slice(1)}</TableCell> : null}
              <TableCell>
                <div className="ds-u-display--flex" data-id={affiliation.id}>
                  {actions && (
                    actions
                  )}
                </div>
              </TableCell>
            </TableRow>  
          ))}
        </TableBody>
      </Table>
      )}
    </Fragment>
  )
}

const StateAdmin = ({ 
  currentState,
  affiliations,
  getStateAffiliations: stateAffiliations,
  updateStateAffiliation: updateAffiliation
}) => {  

  const [activeTab, setActiveTab] = useState("pending");
  const [isFetching, setIsFetching] = useState(true);

  const [manageModalDisplay, setManageModalDisplay] = useState(false);
  const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] = useState();

  // ask Tif about this method...
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
    setSelectedAffiliation(event.target.parentNode.getAttribute("data-id"));
    console.log("selected aff", selectedAffiliation)
    setManageModalDisplay(true);
  }

  const handleAffiliationUpdate = () => {
    // Connect this to a new action to post/patch to the API and update the affiliations list
    // How should I get these params?
    async function saveAffiliation() {
      await updateAffiliation(currentState.id, selectedAffiliation, 19, "approved");
    }
    saveAffiliation().then(() => {
      // Todo: im forcing a re-fetch of the affiliations, is this OK?
      stateAffiliations(currentState.id, activeTab);
      setManageModalDisplay(false); 
    }).catch(error => {
      // Todo: update this logging to be better
      console.log("error", error);
    })
  }

  const hideManageModal = () => {
    setManageModalDisplay(false);  
  }

  const showConfirmationModal = () => {
    setConfirmationModalDisplay(true);
  }
  
  const hideConfirmationModal = () => {
    setConfirmationModalDisplay(false);  
  }

  return (
    // Update the tabs to pass the affiliations by status once the backend is updated
    <main id="start-main-content" className="ds-l-container ds-u-margin-bottom--5">
      <h1>{`${currentState.name} eAPD State Administrator Portal`}</h1>
      <Tabs onChange={currentTab}>
        <TabPanel id="pending" tab="Requests" >
          <ManageUserTable 
            type={"pending"}
            affiliations={affiliations} 
            updateAffiliation={updateAffiliation} 
            isFetching={isFetching} 
            actions={[
              <Button onClick={showManageModal} size='small' className="ds-u-margin-right--2" key="action1">Approve</Button>,
              <Button onClick={showConfirmationModal} size='small' variation='danger' key="action2">Reject</Button>
            ]}
          />
        </TabPanel>
        <TabPanel id="active" tab="Active">
          <ManageUserTable 
            type={"active"}
            affiliations={affiliations} 
            updateAffiliation={updateAffiliation} 
            isFetching={isFetching} 
            actions={[
              <Button onClick={showManageModal} size='small' className="ds-u-margin-right--2" key="action1">Edit Access</Button>,
              <Button onClick={showConfirmationModal} size='small' variation="danger" className="ds-u-margin-right--2" onClick={showConfirmationModal} key="action2">Revoke Access</Button>
            ]}
          />
        </TabPanel>
        <TabPanel id="inactive" tab="Inactive">
          <ManageUserTable 
            type={"inactive"}
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
          onClick={hideConfirmationModal} 
          showConfirmationModal={showConfirmationModal}
        />
      )}
      
      {manageModalDisplay && (
        <ManageRoleDialog 
          hideManageModal={hideManageModal} 
          onClick={hideManageModal} 
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