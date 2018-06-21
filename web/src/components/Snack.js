import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class Snack extends Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ open: false });
  };

  render() {
    const { duration, message } = this.props;
    const { open } = this.state;

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={duration}
        onClose={this.handleClose}
        ContentProps={{ 'aria-describedby': 'snack-msg' }}
        message={<span id="snack-msg">{message}</span>}
      />
    );
  }
}

Snack.propTypes = {
  duration: PropTypes.number,
  message: PropTypes.string.isRequired
};

Snack.defaultProps = {
  duration: 3000
};

export default Snack;
