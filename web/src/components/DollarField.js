import React from 'react';
import NumberField from './NumberField';

const DollarField = ({ ...rest }) => {
  return <NumberField {...rest} mask="currency" round />;
};

export default DollarField;
