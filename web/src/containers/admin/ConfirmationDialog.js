import React from 'react';

import { Dialog, Button } from '@cmsgov/design-system';

const ConfirmationDialog = ({
  denyOrRevoke,
  hideConfirmationModal,
  handleDenyOrRevoke
}) => {
  return (
    <Dialog      
      onExit={hideConfirmationModal}
      heading={`Confirm ${denyOrRevoke.charAt(0).toUpperCase() + denyOrRevoke.slice(1)}`}
      actions={[
        <Button className="ds-c-button ds-c-button--danger" onClick={handleDenyOrRevoke} key="action1">Confirm</Button>,
        <Button className="ds-c-button ds-c-button--transparent" onClick={hideConfirmationModal} key="action2">Cancel</Button>
      ]}
    >
      <p>Are you sure you want to {`${denyOrRevoke}`} access? You will be able to restore access later from the inactive tab.</p>
    </Dialog>
  )
}

export default ConfirmationDialog;