import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button, Dropdown, Tabs, TabPanel, Table, TableCaption, TableHead, TableRow, TableCell, TableBody } from '@cmsgov/design-system';

import Icon, {
  faCheckCircle,
} from '../../components/Icons';


class RequestList extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
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
              <Button onClick={this.props.handleEdit} size='small' className="ds-u-margin-right--2">Approve</Button>
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
              <Button onClick={this.props.handleEdit} size='small' className="ds-u-margin-right--2">Approve</Button>
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
              <Button onClick={this.props.handleEdit} size='small' className="ds-u-margin-right--2">Approve</Button>
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
              <Button onClick={this.props.handleEdit} size='small' className="ds-u-margin-right--2">Approve</Button>
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
              <Button onClick={this.props.handleEdit} size='small' className="ds-u-margin-right--2">Approve</Button>
              <Button size='small' variation='danger'>Deny</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
      </Table>
    );
  }
}

class ActiveList extends Component {
    constructor(props) {
      super(props)
    }
    
    render() {
      return (
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
                <Button size='small' className="ds-u-margin-right--2" onClick={this.props.handleEdit}>Edit Access</Button>
                <Button size='small' variation="danger" className="ds-u-margin-right--2" onClick={this.props.handleEdit}>Revoke Access</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Michael Scott</TableCell>
            <TableCell>michael@dunder.com</TableCell>
            <TableCell>555-867-5309</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <div className="ds-u-display--flex ds-u-align-items--center">
                <Button size='small' className="ds-u-margin-right--2" onClick={this.props.handleEdit}>Edit Access</Button>
                <Button size='small' variation="danger" className="ds-u-margin-right--2" onClick={this.props.handleEdit}>Revoke Access</Button>
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
                <Button size='small' className="ds-u-margin-right--2" onClick={this.props.handleEdit}>Edit Access</Button>
                <Button size='small' variation="danger" className="ds-u-margin-right--2" onClick={this.props.handleEdit}>Revoke Access</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );      
  }
}

class InactiveList extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
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
              <Button size='small' className="ds-u-margin-right--2" onClick={this.props.handleEdit}>Add Access</Button>
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
              <Button size='small' className="ds-u-margin-right--2" onClick={this.props.handleEdit}>Add Access</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
      </Table>
    )
  }
}


class IndividualRole extends Component {
  constructor(props) {
    super(props)
  }
  
  dropdownOptions = [
    { label: 'State Coordinator', value: 'State Coordinator' },
    { label: 'State Contractor', value: 'State Contractor' }
  ];
  
  render() {
    return (
      <div className="ds-u-measure--base">
        <h2 className="ds-u-margin-top--1">Bob Crachet</h2>
        <p><strong>Phone Number</strong> 4108765123</p>
        <p><strong>Email</strong> bob@crachet.com</p>
        <Dropdown
          options={this.dropdownOptions}
          className=""
          defaultValue="State Contractor"
          size="medium"
          label="Role"
          name="medium_dropdown_field"
        />
        <p>A <strong>State Coordinator</strong> is someone who works for a state. They can create, edit, and export APDs.</p>
        <p>A <strong>State Contractor</strong> is someone who works for a vendor on behalf of the state. They can create and edit APDs, but should not export an APD for submissions.</p>
        <Button className="ds-u-margin-right--3 ds-u-margin-top--2" onClick={this.props.handlePermissionUpdate}>Save</Button>
        <Button variation="danger" onClick={this.props.handlePermissionUpdate}>Cancel</Button>
      </div>      
    );    
  }
}

class StateAdmin extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      viewIndividualRole: false,
      approvalConfirm: false
    }
  }
  
  dropdownOptions = [
    { label: 'State Coordinator', value: 'State Coordinator' },
    { label: 'State Contractor', value: 'State Contractor' }
  ];
  
  handleEdit = e => {
    this.setState({ 
      viewIndividualRole: true 
    });
  };
  
  handlePermissionUpdate = e => {
    this.setState({ 
      viewIndividualRole: false
    });
  };
  
  handleApproval = e => {
    this.setState({
      viewIndividualRole: true 
    })
  }
  
  render() {
    return (
      <main id="start-main-content" class="ds-l-container ds-u-margin-bottom--5">
        <h1>Maryland eAPD State Administrator Portal</h1>
        <Tabs>
          <TabPanel id="requests" tab="Requests">
            {this.state.viewIndividualRole ? <IndividualRole handlePermissionUpdate={this.handlePermissionUpdate} /> : <RequestList handleEdit={this.handleEdit} /> }       
          </TabPanel>
          <TabPanel id="active" tab="Active">
            {this.state.viewIndividualRole ? <IndividualRole handlePermissionUpdate={this.handlePermissionUpdate} /> : <ActiveList handleEdit={this.handleEdit} /> }           
          </TabPanel>
          <TabPanel id="inactive" tab="Inactive" >
            {this.state.viewIndividualRole ? <IndividualRole handlePermissionUpdate={this.handlePermissionUpdate} /> : <InactiveList handleEdit={this.handleEdit} /> }    
          </TabPanel>
        </Tabs>
      </main>
    );
  }
}

export default StateAdmin;
