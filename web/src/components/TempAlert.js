import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert, Button } from '@cmsgov/design-system';

import { getTempMessages } from '../redux/reducers/errors';

const TempAlert = ({ tempMessages }) => {
  const [tempMsgState, setTempMsgState] = useState(tempMessages);

  if (!tempMessages) {
    return null;
  }

  const removeMsg = i => {
    setTempMsgState([
      ...tempMsgState.slice(0, i),
      ...tempMsgState.slice(i + 1)
    ]);
  };

  return (
    <div>
      {tempMsgState.map((value, index) => (
        <Alert
          key={`tempMsg-${index + 1}`}
          className="ds-u-margin-y--2"
          variation={value.variation}
        >
          <div className="tempMessage">
            <div>{value.message}</div>
            <div>
              <Button onClick={() => removeMsg(index)} className="tempMsgBtn">
                X
              </Button>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

TempAlert.propTypes = {
  tempMessages: PropTypes.array
};

TempAlert.defaultProps = {
  tempMessages: []
};

const mapStateToProps = state => ({
  tempMessages: getTempMessages(state)
});

export default connect(mapStateToProps)(TempAlert);

export { TempAlert as plain };
