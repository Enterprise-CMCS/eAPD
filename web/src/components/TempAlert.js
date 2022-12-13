import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert } from '@cmsgov/design-system';

import { getTempMessages } from '../redux/reducers/errors';

const TempAlert = props => {
  const { tempMessages } = props;

  if (tempMessages.length > 0) {
    let messages = [];

    function removeMsg () => {

    }

    tempMessages.forEach(el => {
      messages.push(<div>{el.message}</div>)
    })

    return (<Alert variation={tempMessages[0].variation} className="ds-u-margin-y--3">
      {messages}
    </Alert>)
  }

  return null;
};

TempAlert.propTypes = {
  tempMessages: PropTypes.array
}

TempAlert.defaultProps = {
  tempMessages: []
}

const mapStateToProps = state => ({
  tempMessages: getTempMessages(state)
})

export default connect(mapStateToProps)(TempAlert);

export { TempAlert as plain};
