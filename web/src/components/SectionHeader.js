import PropTypes from 'prop-types';
import React from 'react';

const SectionHeader = ({ children }) => (
  <h3 className="my2 regular">{children}</h3>
);

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired
};

export default SectionHeader;
