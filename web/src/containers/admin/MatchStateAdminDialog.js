import React from 'react';

import { Dialog, Dropdown, Button } from '@cmsgov/design-system';

import { STATES } from '../../util/states';

const MatchStateAdminDialog = ({
  certification,
  hideModal
}) => {
  
  const handleDropdownUpdate = event => {
    console.log("handleDropdownUpdate, event:", event);
  };
  
  const stateName = STATES.find(state => state.id === certification.state.toLowerCase()).name;
  
  return (
    <Dialog
      onExit={hideModal}
      heading="Match State Admin Letter to User"
      className="ds-u-left-border-warning"
      size="full"
      actions={[
        <Button
          className="ds-u-margin-right--3 ds-u-margin-top--2"
          onClick={() => {}}
          key="action1"
          variation="primary"
        >
          Match and Approve Access
        </Button>,
        <Button variation="transparent" onClick={hideModal} key="action2">
          Cancel
        </Button>
      ]}
      >
      <h3>All {stateName} Users</h3>
      <hr />
      <Dropdown
        options={[]}
        size="medium"
        label={`Choose a ${stateName} user`}
        name="selectedPermission"
        value={"yep"}
        onChange={() => {}}
      />
      <div className="ds-l-row">
        <div className="ds-l-col">
          <h4>EUA User Account</h4>
          <div className="ds-u-border--2 ds-u-padding--2">
            <ul class="ds-c-list ds-c-list--bare" aria-labelledby="unstyled-list-id">
              <li><strong>Email:</strong></li>
              <li><strong>Phone:</strong></li>
              <li><strong>State:</strong></li>
            </ul>
          </div>
        </div>
        <div className="ds-l-col">
          <h4>State Admin Letter</h4>
          <div className="ds-u-border--2 ds-u-padding--2">
            <ul class="ds-c-list ds-c-list--bare" aria-labelledby="unstyled-list-id">
              <li><strong>{certification.name}</strong></li>
              <li><strong>Email:</strong> <span>{certification.email}</span></li>
              <li><strong>Phone:</strong> <span>{certification.phone}</span></li>
              <li><strong>State:</strong> <span>{certification.state}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default MatchStateAdminDialog
