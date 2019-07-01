import PropTypes from 'prop-types';
import React from 'react';

const NoDataMsg = ({ children }) => (
  <div className="mb2 p1 h6 alert alert-error">{children}</div>
);

NoDataMsg.propTypes = {
  children: PropTypes.node.isRequired
};

export default NoDataMsg;
