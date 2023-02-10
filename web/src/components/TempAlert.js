import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert, Button, CloseIcon } from '@cmsgov/design-system';

import { getAPDId } from '../redux/reducers/apd';
import { resolveAlertMessage } from '../redux/actions/alert';
import { getTempAlerts } from '../redux/selectors/alerts.selectors';

const TempAlert = ({ alerts, apdId, resolveAlert }) => {
  if (!alerts) {
    return null;
  }

  const apdMessages = alerts.filter(function (item) {
    if (item.apdId === apdId) {
      return item;
    }
  });

  return (
    <div>
      {apdMessages.map((value, index) => (
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
                aria-label="Close and continue"
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
  alerts: PropTypes.array,
  apdId: PropTypes.string,
  resolveAlert: PropTypes.func
};

TempAlert.defaultProps = {
  alerts: [],
  apdId: null
};

const mapStateToProps = state => ({
  alerts: getTempAlerts(state),
  apdId: getAPDId(state)
});

const mapDispatchToProps = {
  resolveAlert: resolveAlertMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(TempAlert);

export { TempAlert as plain };
