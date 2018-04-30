import PropTypes from 'prop-types';
import React from 'react';

const Section = ({ children, id }) => (
  <section id={id} className="p2 sm-px3 border-bottom border-gray">
    {children}
  </section>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string
};

Section.defaultProps = {
  id: null
};

export default Section;
