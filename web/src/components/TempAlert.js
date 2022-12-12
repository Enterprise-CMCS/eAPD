import React from 'react';
import PropType from 'prop-types';

import { Alert } from '@cmsgov/design-system';

const TempAlert = ({ message, variation }) => {
  return <Alert variation={`${variation}`}>{{ message }}</Alert>;
};

TempAlert.propTypes = {
  message: PropType.string.isRequired,
  variation: PropType.string
};

export default TempAlert;
