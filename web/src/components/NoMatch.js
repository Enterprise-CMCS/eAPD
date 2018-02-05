import React from 'react';
import { Box, Heading, Text } from 'rebass';

const NoMatch = () => (
  <Box py={5}>
    <Heading mb={1} center>
      Whoops, we can’t find that page.
    </Heading>
    <Text center>
      You might want to double-check your link and try again. (404)
    </Text>
  </Box>
);

export default NoMatch;
