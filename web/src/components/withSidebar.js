import PropTypes from 'prop-types';
import React from 'react';
import { Box, Flex } from 'rebass';

import Sidebar from './Sidebar';

const withSidebar = WrappedComponent => {
  const Wrapper = props => (
    <Flex mx={-2}>
      <Box p={2} width={[1, 1 / 3, 1 / 4]}>
        <Sidebar />
      </Box>
      <Box p={2} width={[1, 2 / 3, 3 / 4]}>
        <WrappedComponent {...props} />
      </Box>
    </Flex>
  );

  Wrapper.propTypes = {
    props: PropTypes.object
  };

  Wrapper.defaultProps = {
    props: {}
  };

  return Wrapper;
};

export default withSidebar;
