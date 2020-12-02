import React, { Component, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
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

import Icon, {
  faCheckCircle,
} from '../../components/Icons';

{/* Tif notes
use the admin action/reducer, call the /states/:stateId/affiliations endpoint to get all affiliations and add to redux
once added to redux, connect to the view  
 */}
 
const ManageRoleDialog = (props) => {
  const dropdownOptions = [
    { label: 'State Coordinator', value: 'State Coordinator' },
    { label: 'State Contractor', value: 'State Contractor' }
  ];
  
  return (
    <Dialog
      onExit={props.hideModal}
      heading="Bob Crachet"
      actions={[
        <Button className="ds-u-margin-right--3 ds-u-margin-top--2" onClick={props.hideModal}>Save</Button>,
        <Button variation="danger" onClick={props.hideModal}>Cancel</Button>
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
      onExit={props.hideModal}
      heading="Bob Crachet"
      actions={[
        <Button className="ds-u-margin-right--3 ds-u-margin-top--2" onClick={props.hideModal}>Save</Button>,
        <Button variation="danger" onClick={props.hideModal}>Cancel</Button>
      ]}
    >
      <p>Are you sure?</p>
    </Dialog>
  )
}

const RequestList = (props) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  
  const showModal = () => {
    setModalDisplay(true);
  }
  
  const hideModal = () => {
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Bob Cratchet</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>
              <div>
                <Button onClick={showModal} size='small' className="ds-u-margin-right--2">Approve</Button>
                <Button size='small' variation='danger'>Deny</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Cratchet</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>
              <div>
                <Button onClick={showModal} size='small' className="ds-u-margin-right--2">Approve</Button>
                <Button size='small' variation='danger'>Deny</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Cratchet</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>
              <div>
                <Button onClick={showModal} size='small' className="ds-u-margin-right--2">Approve</Button>
                <Button size='small' variation='danger'>Deny</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Cratchet</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>
              <div>
                <Button onClick={showModal} size='small' className="ds-u-margin-right--2">Approve</Button>
                <Button size='small' variation='danger'>Deny</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Cratchet</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>
              <p className="ds-u-margin--0"><strong>Cell</strong> 555-867-5309</p>
              <p className="ds-u-margin--0"><strong>Office</strong> 555-877-9090</p>
            </TableCell>
            <TableCell>
              <div>
                <Button onClick={showModal} size='small' className="ds-u-margin-right--2">Approve</Button>
                <Button size='small' variation='danger'>Deny</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      {modalDisplay && (
        <ManageRoleDialog hideModal={hideModal} onClick={hideModal} showModal={showModal}/>
      )}
    </Fragment>
  )
}

const ActiveList = (props) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  
  const showModal = () => {
    setModalDisplay(true);
  }
  
  const hideModal = () => {
    setModalDisplay(false);  
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
                <Button size='small' className="ds-u-margin-right--2" onClick={showModal}>Edit Access</Button>
                <Button size='small' variation="danger" className="ds-u-margin-right--2" onClick={showModal}>Revoke Access</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Michael Scott</TableCell>
            <TableCell>michael@dunder.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>State Contractor</TableCell>
            <TableCell>
              <div className="ds-u-display--flex ds-u-align-items--center">
                <Button size='small' className="ds-u-margin-right--2" onClick={showModal}>Edit Access</Button>
                <Button size='small' variation="danger" className="ds-u-margin-right--2" onClick={showModal}>Revoke Access</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Taylor Baylor</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>State Contractor</TableCell>
            <TableCell>
              <div className="ds-u-display--flex ds-u-align-items--center">
                <Button size='small' className="ds-u-margin-right--2" onClick={showModal}>Edit Access</Button>
                <Button size='small' variation="danger" className="ds-u-margin-right--2" onClick={showModal}>Revoke Access</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      {modalDisplay && (
        <ManageRoleDialog hideModal={hideModal} onClick={hideModal} showModal={showModal}/>
      )}
    </Fragment>
  )
}

const InactiveList = (props) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  
  const showModal = () => {
    setModalDisplay(true);
  }
  
  const hideModal = () => {
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
                <Button size='small' className="ds-u-margin-right--2" onClick={showModal}>Add Access</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Cratchet</TableCell>
            <TableCell>bob@humbug.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell>Denied</TableCell>
            <TableCell>
              <div>
                <Button size='small' className="ds-u-margin-right--2" onClick={showModal}>Add Access</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {modalDisplay && (
        <ManageRoleDialog hideModal={hideModal} onClick={hideModal} showModal={showModal}/>
      )}
    </Fragment>
  )
}

const StateAdmin = ({ 
  getStateAffiliations: stateAffiliations   
}) => {  
  console.log("state affiliations:", stateAffiliations("md"));
  return (
    <main id="start-main-content" className="ds-l-container ds-u-margin-bottom--5">
      <h1>Maryland eAPD State Administrator Portal</h1>
      <Tabs>
        <TabPanel id="requests" tab="Requests">
          <RequestList />
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
  
});

export default connect(mapStateToProps, mapDispatchToProps)(StateAdmin);
