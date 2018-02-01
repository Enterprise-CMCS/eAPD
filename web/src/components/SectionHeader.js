import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'rebass';

const SectionHeader = ({ children }) => (
  <Text mb={2} fontSize={3}>
    {children}
  </Text>
);

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired
};

export default SectionHeader;
