import React from 'react';
import PropType from 'prop-types';
import Icon, { faSpinner } from './Icons';

const Loading = ({ children }) => (
  <div className="ds-h2 ds-u-margin-top--7 ds-u-padding--0 ds-u-padding-bottom--3 ds-u-text-align--center">
    <Icon icon={faSpinner} spin size="sm" className="ds-u-margin-right--1" />{' '}
    {children}
  </div>
);
Loading.propTypes = { children: PropType.node.isRequired };

export default Loading;
