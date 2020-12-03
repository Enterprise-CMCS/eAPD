import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getStateAffiliations } from '../../actions/admin';

import { 
  Button, 
  Dialog,
  Dropdown,   
  Tabs, 
  TabPanel, 
  Table, 
  TableCaption, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody 
} from '@cmsgov/design-system';
 
const ManageRoleDialog = (props) => {
  const dropdownOptions = [
    { label: 'State Coordinator', value: 'State Coordinator' },
    { label: 'State Contractor', value: 'State Contractor' }
  ];
  
  console.log("props in dialog", props.selectedUser);
  return (
    <Dialog
      onExit={props.hideManageModal}
      heading="Bob Crachet"
      actions={[
        <Button className="ds-u-margin-right--3 ds-u-margin-top--2" onClick={props.hideManageModal}>Save</Button>,
        <Button variation="danger" onClick={props.hideManageModal}>Cancel</Button>
      ]}
    >
      <p><strong>Phone Number</strong> 4108765123</p>
      <p><strong>Email</strong> bob@crachet.com</p>
      <Dropdown
        options={dropdownOptions}
        className=""
        defaultValue="State Contractor"
        size="medium"
        label="Role"
        name="medium_dropdown_field"
      />
      <p>A <strong>State Coordinator</strong> is someone who works for a state.</p>
      <p>A <strong>State Contractor</strong> is someone who works for a vendor on behalf of the state.</p>
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
  affiliations
}) => {
  const [manageModalDisplay, setManageModalDisplay] = useState(false);
  const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(false);
  const [selectedUser, setSelectedUser] = useState("blah");
  
  const showManageModal = e => {
    console.log("event", e.target);
    setManageModalDisplay(true);
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
              <TableCell>{affiliation.user_id}</TableCell>
              <TableCell>bob@humbug.com</TableCell>
              <TableCell>555-867-5309</TableCell>
              <TableCell>
                <div>
                  <Button onClick={showManageModal} size='small' className="ds-u-margin-right--2">Approve</Button>
                  <Button onClick={showConfirmationModal} size='small' variation='danger'>Reject</Button>
                </div>
              </TableCell>
            </TableRow>  
          ))}
        </TableBody>
      </Table>

      {confirmationModalDisplay && (
        <ConfirmationDialog hideConfirmationModal={hideConfirmationModal} onClick={hideConfirmationModal} showConfirmationModal={showConfirmationModal} />
      )}
      
      {manageModalDisplay && (
        <ManageRoleDialog hideManageModal={hideManageModal} onClick={hideManageModal} showManageModal={showManageModal} selectedUser={selectedUser}/>
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
                <Button size='small' className="ds-u-margin-right--2" onClick={showManageModal}>Add Access</Button>
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
  getStateAffiliations: stateAffiliations,
  affiliations
}) => {  

  useEffect(() => {
    stateAffiliations("md");
  }, []);
  return (
    <main id="start-main-content" className="ds-l-container ds-u-margin-bottom--5">
      <h1>Maryland eAPD State Administrator Portal</h1>
      <Tabs>
        <TabPanel id="requests" tab="Requests">
          <RequestList affiliations={affiliations} />
        </TabPanel>
        <TabPanel id="active" tab="Active">
          <ActiveList />
        </TabPanel>
        <TabPanel id="inactive" tab="Inactive" >
          <InactiveList />
        </TabPanel>
      </Tabs>
    </main>
  )
}

StateAdmin.propTypes = {
  getStateAffiliations: PropTypes.func.isRequired
}

const mapDispatchToProps = { 
  getStateAffiliations
};

const mapStateToProps = state => ({
  affiliations: state.admin.affiliations,
});

export default connect(mapStateToProps, mapDispatchToProps)(StateAdmin);

export { StateAdmin as plain, mapStateToProps, mapDispatchToProps };