import PropTypes from 'prop-types';
import React from 'react';

import { Dialog, Button } from '@cmsgov/design-system';

const ConfirmationDialog = ({
  isDenied,
  hideConfirmationModal,
  handleDenyOrRevoke
}) => {
  const denyOrRevoke = isDenied ? 'deny' : 'revoke';
  return (
    <Dialog
      onExit={hideConfirmationModal}
      heading={isDenied ? 'Deny' : 'Revoke'}
      actions={[
        <Button
          className="ds-c-button ds-c-button--danger"
          onClick={handleDenyOrRevoke}
          key="action1"
          data-deny-or-revoke={denyOrRevoke}
        >
          Confirm
        </Button>,
        <Button
          className="ds-c-button ds-c-button--transparent"
          onClick={hideConfirmationModal}
          key="action2"
        >
          Cancel
        </Button>
      ]}
    >
      <p>
        Are you sure you want to {`${denyOrRevoke}`} access? You will be able to
        restore access later from the inactive tab.
      </p>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  isDenied: PropTypes.bool.isRequired,
  hideConfirmationModal: PropTypes.func.isRequired,
  handleDenyOrRevoke: PropTypes.func.isRequired
};

export default ConfirmationDialog;
