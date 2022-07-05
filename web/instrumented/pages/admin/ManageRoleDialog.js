import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Dialog, Dropdown, Button } from '@cmsgov/design-system';

const ManageRoleDialog = ({
  roleTypes,
  roleDescription,
  selectedAffiliation,
  hideManageModal,
  handleAffiliationUpdate
}) => {
  const findRoleByName = name => {
    return roleTypes.find(element => {
      return element.name === name;
    });
  };

  const getRole = selectedRoleName => {
    if (selectedRoleName) {
      return findRoleByName(selectedRoleName) || roleTypes[0];
    }
    return roleTypes[0];
  };

  const getRoleName = selectedRoleName => {
    const role = getRole(selectedRoleName);
    return role ? role.name : '';
  };

  const getRoleId = selectedRoleName => {
    const role = getRole(selectedRoleName);
    return role ? role.id : 0;
  };

  const [roleSelectedName, setRoleSelectedName] = useState(
    getRoleName(selectedAffiliation.role)
  );
  const [roleSelectedId, setRoleSelectedId] = useState(
    getRoleId(selectedAffiliation.role)
  );

  const handleDropdownUpdate = event => {
    setRoleSelectedName(event.target.value);
    const role = findRoleByName(event.target.value);
    setRoleSelectedId(role.id);
  };

  const handleUpdate = () => {
    // Dialog gets the selected affiliation
    // then on save it will send the role by id
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

  dropdownOptions.unshift({
    label: 'Select an option',
    value: '',
    key: 'selectAnOption'
  });

  return (
    <Dialog
      onExit={hideManageModal}
      heading="Edit Role"
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
        hint={roleDescription}
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
  roleDescription: PropTypes.string,
  selectedAffiliation: PropTypes.object.isRequired,
  hideManageModal: PropTypes.func.isRequired,
  handleAffiliationUpdate: PropTypes.func.isRequired
};

ManageRoleDialog.defaultProps = {
  roleDescription: ''
};

export default ManageRoleDialog;
