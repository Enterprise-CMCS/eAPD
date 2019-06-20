import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

import Form from './StatePersonForm';
import Review from './StatePersonReview';

const StatePerson = ({ initialCollapsed, ...rest }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const collapse = useCallback(() => setCollapsed(true), []);
  const expand = useCallback(() => setCollapsed(false), []);

  if (collapsed) {
    return <Review {...rest} expand={expand} />;
  }
  return <Form {...rest} collapse={collapse} />;
};

StatePerson.propTypes = {
  initialCollapsed: PropTypes.bool
};

StatePerson.defaultProps = {
  initialCollapsed: true
};

export default StatePerson;
