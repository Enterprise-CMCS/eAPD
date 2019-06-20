import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

import Form from './NonPersonnelCostForm';
import Review from './NonPersonnelCostReview';

const NonPersonnelCost = ({ initialCollapsed, ...rest }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const collapse = useCallback(() => setCollapsed(true), []);
  const expand = useCallback(() => setCollapsed(false), []);

  if (collapsed) {
    return <Review {...rest} expand={expand} />;
  }
  return <Form {...rest} collapse={collapse} />;
};

NonPersonnelCost.propTypes = {
  initialCollapsed: PropTypes.bool
};

NonPersonnelCost.defaultProps = {
  initialCollapsed: true
};

export default NonPersonnelCost;
