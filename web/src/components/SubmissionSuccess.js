import React from 'react';
import { Box, Heading, Text } from 'rebass';

const SubmissionSuccess = () => (
  <Box py={4}>
    <Heading mb={3}>Thanks! We’ve received your request.</Heading>
    <Text mb={2}>
      Some sort of confirmation number or note about checking email etc.
    </Text>
    <Text mb={2}>
      A sentence about how long it usually takes to receive a response.
    </Text>
    <Text mb={2}>A sentence about what to do if you have questions.</Text>
  </Box>
);

export default SubmissionSuccess;
