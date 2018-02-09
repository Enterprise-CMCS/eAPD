import PropTypes from 'prop-types';
import React from 'react';
import { Measure } from 'rebass';

const SectionHeader = ({ children }) => (
  <Measure mt={4} mb={3} fontSize={3}>
    {children}
  </Measure>
);

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired
};

export default SectionHeader;
