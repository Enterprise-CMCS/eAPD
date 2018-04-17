import PropTypes from 'prop-types';
import React from 'react';

const SectionTitle = ({ children }) => (
  <h2 className="mt1 mb2 fw-800">{children}</h2>
);

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired
};

export default SectionTitle;
