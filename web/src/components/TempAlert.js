import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert, Button, CloseIcon } from '@cmsgov/design-system';

import { resolveAlertMessage } from '../redux/actions/alert';
import { getTempAlerts, removeAlert } from '../redux/reducers/alerts';

const TempAlert = ({ alerts }) => {
  if (!alerts) {
    return null;
  }

  // const removeMsg = i => {
  //   setTempAlertState([
  //     ...tempAlertState.slice(0, i),
  //     ...tempAlertState.slice(i + 1)
  //   ]);
  // };

  return (
    <div>
      {alerts.map((value, index) => (
        <Alert
          key={`tempAlert-${index + 1}`}
          className="ds-u-margin-y--2"
          variation={value.variation}
        >
          <div className="tempMessage">
            <div>{value.message}</div>
            <div>
              <Button
                onClick={() => resolveAlert(index)}
                className="tempMsgBtn"
              >
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

const mapDispatchToProps = {
  resolveAlert: resolveAlertMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(TempAlert);

export { TempAlert as plain };
