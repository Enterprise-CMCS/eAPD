import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { t } from '../i18n';
import { confirmAlert } from '../components/ConfirmAlert';

const DeleteConfirm = ({ onClose, onConfirm, resource }) => (
  <div className="p2 sm-p3 bg-white rounded confirm-body">
    <h2 className="mt0">{t(`${resource}.confirm.header`)}</h2>
    <p>{t(`${resource}.confirm.body`)}</p>
    <button
      className="btn btn-small btn-primary bg-black h6"
      onClick={() => {
        onConfirm();
        onClose();
      }}
    >
      {t(`${resource}.confirm._yes`)}
    </button>{' '}
    <button className="btn btn-small btn-outline h6" onClick={onClose}>
      {t(`${resource}.confirm._no`)}
    </button>
  </div>
);

DeleteConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired
};

class DeleteButton extends Component {
  handleClick = () => {
    const { resource } = this.props;
    confirmAlert({
      customUI: ({ onClose }) => (
        <DeleteConfirm
          onClose={onClose}
          onConfirm={this.handleConfirm}
          resource={resource}
        />
      )
    });
  };

  handleConfirm = () => {
    const { remove } = this.props;
    remove();
  };

  render() {
    const { className, resource } = this.props;
    return (
      <div>
        <button
          type="button"
          className={className || 'btn btn-small btn-primary bg-black h6'}
          onClick={this.handleClick}
        >
          {t(`${resource}.text`)}
        </button>
      </div>
    );
  }
}

DeleteButton.propTypes = {
  className: PropTypes.string,
  resource: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
};
DeleteButton.defaultProps = {
  className: null
};

export default DeleteButton;
