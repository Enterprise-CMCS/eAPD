import { Button, Dialog } from '@cmsgov/design-system';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { faExclamationTriangle } from './Icons';
import getDeleteModalOptions from './DeleteModalOptions';

const DeleteModal = ({ onDelete, onCancel, objType }) => {
  const bodyOptions = getDeleteModalOptions(objType);

  return (
    <Dialog
      key={uuidv4()}
      heading={
        <div>
          <Icon icon={faExclamationTriangle} /> Delete {objType}?
        </div>
      }
      alert
      className="ds-u-left-border-warning"
      actionsClassName="ds-u-text-align--right ds-u-margin-bottom--0"
      actions={[
        <Button
          variation="danger"
          onClick={onDelete}
          key={uuidv4()}
          id="dialog-delete"
        >
          {bodyOptions?.buttonText || 'Delete'}
        </Button>,
        <Button
          variation="transparent"
          onClick={onCancel}
          key={uuidv4()}
          id="dialog-cancel"
        >
          Cancel
        </Button>
      ]}
      onExit={onCancel}
      size="wide"
    >
      {bodyOptions?.body() || 'MISSING BODY TEXT'}
    </Dialog>
  );
};

DeleteModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  objType: PropTypes.string
};

DeleteModal.defaultProps = {
  objType: ''
};

export default DeleteModal;
