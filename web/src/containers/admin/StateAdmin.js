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
      <p><strong>Name</strong> {selectedAffiliation.id}</p>
      <p><strong>Phone Number</strong> {selectedAffiliation.state_id}</p>
      <p><strong>Email</strong> {selectedAffiliation.status}</p>
      
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

const RequestList = ({
  affiliations,
  updateAffiliation
}) => {
  const [manageModalDisplay, setManageModalDisplay] = useState(false);
  const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(false);
  const [selectedAffiliation, setselectedAffiliation] = useState();
  
  const showManageModal = event => {
    const currentAffiliation = affiliations.find(element => {
      return element.id == event.target.getAttribute("data-id")
    });
    setselectedAffiliation(currentAffiliation);
    setManageModalDisplay(true);
  }
  
  const handleAffiliationUpdate = (selectedAffiliation) => {
    // Connect this to a new action to post/patch to the API and update the affiliations list
    // How should I get these params?
    updateAffiliation("md", selectedAffiliation, 19, "approved");
    // How can I not trigger this until the above was run successfully or unsuccessfully?    
    setManageModalDisplay(false); 
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
    <Fragment>
      <Table borderless>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number(s)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {affiliations.map((affiliation, index) => (
            <TableRow key={index}>
              <TableCell>{affiliation.id}</TableCell>
              <TableCell>{affiliation.state_id}</TableCell>
              <TableCell>{affiliation.user_id}</TableCell>
              <TableCell>
                <div>
                  <Button onClick={showManageModal} size='small' className="ds-u-margin-right--2" data-id={affiliation.id}>Approve</Button>
                  <Button onClick={showConfirmationModal} size='small' variation='danger'>Reject</Button>
                </div>
              </TableCell>
            </TableRow>  
          ))}
        </TableBody>
      </Table>

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
    </Fragment>
  )
}

const ActiveList = (props) => {
  const [manageModalDisplay, setModalDisplay] = useState(false);
  const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(false);
  
  const showManageModal = () => {
    setModalDisplay(true);
  }
  
  const hideManageModal = () => {
    setModalDisplay(false);  
  }

  const showConfirmationModal = () => {
    setConfirmationModalDisplay(true);
  }
  
  const hideConfirmationModal = () => {
    setConfirmationModalDisplay(false);  
  }
  
  return (
    <Fragment>
      <Table borderless>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Bob Cratchet</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>State Coordinator</TableCell>
            <TableCell>
              <div className="ds-u-display--flex ds-u-align-items--center">
                <Button size='small' className="ds-u-margin-right--2" onClick={showManageModal}>Edit Access</Button>
                <Button size='small' variation="danger" className="ds-u-margin-right--2" onClick={showConfirmationModal}>Revoke Access</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {confirmationModalDisplay && (
        <ConfirmationDialog hideConfirmationModal={hideConfirmationModal} onClick={hideConfirmationModal} showConfirmationModal={showConfirmationModal} />
      )}

      {manageModalDisplay && (
        <ManageRoleDialog hideManageModal={hideManageModal} onClick={hideManageModal} showManageModal={showManageModal}/>
      )}
    </Fragment>
  )
}

const InactiveList = (props) => {
  const [manageModalDisplay, setModalDisplay] = useState(false);
  
  const showManageModal = () => {
    setModalDisplay(true);
  }
  
  const hideManageModal = () => {
    setModalDisplay(false);  
  }
  
  return (
    <Fragment>
      <Table borderless>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number(s)</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Bob Cratchet</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>Revoked</TableCell>
            <TableCell>
              <div>
                <Button size='small' className="ds-u-margin-right--2" onClick={showManageModal}>Restore Access</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {manageModalDisplay && (
        <ManageRoleDialog hideManageModal={hideManageModal} onClick={hideManageModal} showManageModal={showManageModal}/>
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

  useEffect(() => {
    stateAffiliations(currentState.id, activeTab);
  }, [activeTab]);
  
  const currentTab = (id, previousId) => {
    setActiveTab(id)
  }

  return (
    // Update the tabs to pass the affiliations by status once the backend is updated
    <main id="start-main-content" className="ds-l-container ds-u-margin-bottom--5">
      <h1>{`${currentState.name} eAPD State Administrator Portal`}</h1>
      <Tabs onChange={currentTab}>
        <TabPanel id="pending" tab="Requests" >
          <RequestList affiliations={affiliations} updateAffiliation={updateAffiliation} />
        </TabPanel>
        <TabPanel id="active" tab="Active">
          <ActiveList affiliations={affiliations} />
        </TabPanel>
        <TabPanel id="inactive" tab="Inactive">
          <InactiveList affiliations={affiliations} />
        </TabPanel>
      </Tabs>
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