import PropTypes from 'prop-types';
import React from 'react';

const SectionHeader = ({ children }) => (
  <h3 className="mt1 mb3 regular">{children}</h3>
);

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired
};

export default SectionHeader;
