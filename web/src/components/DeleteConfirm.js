import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Btn from './Btn';
import { confirmAlert } from './ConfirmAlert';
import { t } from '../i18n';

const DeleteConfirm = ({ onClose, onConfirm, resource }) => (
  <div className="p2 sm-p3 bg-white rounded confirm-body">
    <h2 className="mt0">{t(`${resource}.confirm.header`)}</h2>
    <p>{t(`${resource}.confirm.body`)}</p>
    <Btn
      size="small"
      extraCss="bg-black white h6"
      onClick={() => {
        onConfirm();
        onClose();
      }}
    >
      {t(`${resource}.confirm._yes`)}
    </Btn>{' '}
    <Btn kind="outline" size="small" extraCss="h6" onClick={onClose}>
      {t(`${resource}.confirm._no`)}
    </Btn>
  </div>
);

DeleteConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired
};

class DeleteButton extends Component {
  handleClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <DeleteConfirm
          onClose={onClose}
          onConfirm={this.handleConfirm}
          resource={this.props.resource}
        />
      )
    });
  };

  handleConfirm = () => {
    this.props.remove();
  };

  render() {
    const { resource, remove, ...rest } = this.props;

    return (
      <div>
        <Btn
          size="small"
          extraCss="bg-black white h6"
          onClick={this.handleClick}
          {...rest}
        >
          {t(`${resource}.text`)}
        </Btn>
      </div>
    );
  }
}

DeleteButton.propTypes = {
  resource: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
};

export default DeleteButton;
