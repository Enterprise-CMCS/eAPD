import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { removeActivity as removeActivityAction } from '../actions/activities';
import { confirmAlert } from '../components/ConfirmAlert';

const DeleteConfirm = ({ onClose, onConfirm }) => (
  <div className="p2 sm-p3 bg-white rounded confirm-body">
    <h2 className="mt0">{t('activities.delete.header')}</h2>
    <p>{t('activities.delete.body')}</p>
    <button
      className="btn btn-small btn-primary bg-black h6"
      onClick={() => {
        onConfirm();
        onClose();
      }}
    >
      {t('activities.delete._yes')}
    </button>{' '}
    <button className="btn btn-small btn-outline h6" onClick={onClose}>
      {t('activities.delete._no')}
    </button>
  </div>
);

DeleteConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

class DeleteActivity extends Component {
  handleClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <DeleteConfirm onClose={onClose} onConfirm={this.handleConfirm} />
      )
    });
  };

  handleConfirm = () => {
    const { aId, removeActivity } = this.props;
    removeActivity(aId);
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-small btn-primary bg-black h6"
          onClick={this.handleClick}
        >
          {t('activities.deleteActivityButtonText')}
        </button>
      </div>
    );
  }
}

DeleteActivity.propTypes = {
  aId: PropTypes.number.isRequired,
  removeActivity: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  removeActivity: removeActivityAction
};

export default connect(null, mapDispatchToProps)(DeleteActivity);
