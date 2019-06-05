import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

import Form from './MilestoneForm';
import Review from './MilestoneReview';

const Milestone = ({ initialCollapsed, ...rest }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const collapse = useCallback(() => setCollapsed(true), []);
  const expand = useCallback(() => setCollapsed(false), []);

  if (collapsed) {
    return <Review {...rest} expand={expand} />;
  }
  return <Form {...rest} collapse={collapse} />;
};

Milestone.propTypes = {
  initialCollapsed: PropTypes.bool
};

Milestone.defaultProps = { initialCollapsed: true };

export default Milestone;
