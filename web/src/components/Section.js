import PropTypes from 'prop-types';
import React from 'react';

const Section = ({ children }) => (
  <div className="p2 sm-px3 border-bottom border-gray">{children}</div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired
};

export default Section;
