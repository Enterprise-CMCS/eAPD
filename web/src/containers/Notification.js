import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import { processQueue, closeNotification } from '../actions/notification';

class Notification extends Component {
  handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    this.props.closeNotification();
  };

  handleExited = () => {
    this.props.processQueue();
  };

  render() {
    const { duration, messageInfo, open } = this.props;
    const { message, key } = messageInfo;

    if (!message) return null;

    return (
      <Snackbar
        key={key}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={duration}
        onClose={this.handleClose}
        onExited={this.handleExited}
        ContentProps={{ 'aria-describedby': 'notify-msg' }}
        message={
          <span className="sans" id="notify-msg">
            {message}
          </span>
        }
      />
    );
  }
}

Notification.propTypes = {
  duration: PropTypes.number,
  open: PropTypes.bool.isRequired,
  messageInfo: PropTypes.object.isRequired,
  processQueue: PropTypes.func.isRequired,
  closeNotification: PropTypes.func.isRequired
};

Notification.defaultProps = {
  duration: 3000
};

const mapStateToProps = ({ notification: { open, messageInfo } }) => ({
  open,
  messageInfo
});

const mapDispatchToProps = {
  processQueue,
  closeNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

export { Notification as raw, mapStateToProps, mapDispatchToProps };
