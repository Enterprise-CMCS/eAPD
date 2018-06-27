import PropTypes from 'prop-types';
import React from 'react';

const SectionDesc = ({ children }) => <p className="mb4 h3">{children}</p>;

SectionDesc.propTypes = {
  children: PropTypes.node.isRequired
};

export default SectionDesc;
