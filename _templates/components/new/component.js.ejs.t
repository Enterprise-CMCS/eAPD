---
to: "web/src/<%= componentType %>/<%= componentPath ? `${componentPath}/` : ''%><%= componentName %>.js"
---

import PropTypes from 'prop-types';
import React from 'react';

const <%= componentName %> = ({
  children
}) => (
  <div>
    {children}
  </div>
);

<%= componentName %>.propTypes = {
  children: PropTypes.node
};

<%= componentName %>.defaultProps = {
  children: null
};

export default <%= componentName %>;