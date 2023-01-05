import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert, Button, CloseIcon } from '@cmsgov/design-system';

import { getTempAlerts } from '../redux/reducers/alerts';

const TempAlert = ({ alerts }) => {
  const [tempAlertState, setTempAlertState] = useState(alerts);

  if (!alerts) {
    return null;
  }

  const removeMsg = i => {
    setTempAlertState([
      ...tempAlertState.slice(0, i),
      ...tempAlertState.slice(i + 1)
    ]);
  };

  return (
    <div>
      {tempAlertState.map((value, index) => (
        <Alert
          key={`tempAlert-${index + 1}`}
          className="ds-u-margin-y--2"
          variation={value.variation}
        >
          <div className="tempMessage">
            <div>{value.message}</div>
            <div>
              <Button onClick={() => removeMsg(index)} className="tempMsgBtn">
                <CloseIcon />
              </Button>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

TempAlert.propTypes = {
  alerts: PropTypes.array
};

TempAlert.defaultProps = {
  alerts: []
};

const mapStateToProps = state => ({
  alerts: getTempAlerts(state)
});

export default connect(mapStateToProps)(TempAlert);

export { TempAlert as plain };
