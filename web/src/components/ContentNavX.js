// import PropTypes from 'prop-types';
import React from 'react';
import { Tabs, TabItem } from 'rebass';

const ContentNavX = props => {
  console.log(props);

  return (
    <Tabs mt={4} mb={2}>
      <TabItem active>Beep</TabItem>
      <TabItem>Boop</TabItem>
      <TabItem>Bop</TabItem>
    </Tabs>
  );
};

export default ContentNavX;
