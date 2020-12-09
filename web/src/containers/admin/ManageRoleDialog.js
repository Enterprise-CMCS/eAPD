import React from 'react';

import { Dialog, Dropdown, Button } from '@cmsgov/design-system';

const ManageRoleDialog = ({
  roleTypes,
  selectedAffiliation,
  hideManageModal,
  handleAffiliationUpdate
  }) => {
 
   // Should these come from the API? 
  const dropdownOptions = roleTypes.map(role => {
    const updatedRole = {
      ...role
    };
    updatedRole["value"] = role.name;
    updatedRole["label"] = role.name;
    return updatedRole;
  });

  return (
    <Dialog
      onExit={hideManageModal}
      heading="Edit Permissions"
      actions={[
        <Button className="ds-u-margin-right--3 ds-u-margin-top--2" onClick={handleAffiliationUpdate} key="action1">Save</Button>,
        <Button variation="danger" onClick={hideManageModal} key="action2">Cancel</Button>
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

export default ManageRoleDialog;