import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Dialog, Dropdown, Button } from '@cmsgov/design-system';

const ManageRoleDialog = ({
  roleTypes,
  selectedAffiliation,
  hideManageModal,
  handleAffiliationUpdate
}) => {
  const findRoleByName = name => {
    return roleTypes.find(element => {
      return element.name === name;
    });
  };

  const [roleSelectedName, setRoleSelectedName] = useState(
    selectedAffiliation.role ? selectedAffiliation.role : roleTypes[0].value
  );
  const [roleSelectedId, setRoleSelectedId] = useState(
    selectedAffiliation.role
      ? findRoleByName(selectedAffiliation.role).id
      : roleTypes[0].id
  );

  const handleDropdownUpdate = event => {
    setRoleSelectedName(event.target.value);
    const role = findRoleByName(event.target.value);
    setRoleSelectedId(role.id);
  };

  const handleUpdate = () => {
    handleAffiliationUpdate(roleSelectedId);
  };

  const dropdownOptions = roleTypes.map(role => {
    const updatedRole = {
      ...role
    };
    updatedRole.key = role.name;
    updatedRole.value = role.name;
    updatedRole.label = role.name;
    return updatedRole;
  });

  return (
    <Dialog
      onExit={hideManageModal}
      heading="Edit Permissions"
      actions={[
        <Button
          className="ds-u-margin-right--3 ds-u-margin-top--2"
          onClick={handleUpdate}
          key="action1"
        >
          Save
        </Button>,
        <Button variation="danger" onClick={hideManageModal} key="action2">
          Cancel
        </Button>
      ]}
    >
      <p>
        <strong>Name</strong> {selectedAffiliation.displayName}
      </p>
      <p>
        <strong>Phone Number</strong> {selectedAffiliation.primaryPhone}
      </p>
      <p>
        <strong>Email</strong> {selectedAffiliation.email}
      </p>
      <Dropdown
        options={dropdownOptions}
        hint="A State Coordinator is someone who works for a state. A State Contractor is someone who works for a vendor on behalf of the state."
        size="medium"
        label="Role"
        name="selectedPermission"
        value={roleSelectedName}
        onChange={handleDropdownUpdate}
      />
    </Dialog>
  );
};

ManageRoleDialog.propTypes = {
  roleTypes: PropTypes.array.isRequired,
  selectedAffiliation: PropTypes.object.isRequired,
  hideManageModal: PropTypes.func.isRequired,
  handleAffiliationUpdate: PropTypes.func.isRequired
};

export default ManageRoleDialog;
