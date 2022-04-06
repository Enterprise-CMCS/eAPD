import React from 'react';
import ArrowRightIcon from './ArrowRightIcon';

const ArrowLeftIcon = ({ ...props }) => (
  <ArrowRightIcon transform="translate(16, 0) scale(-1, 1)" {...props} />
);

export default ArrowLeftIcon;
