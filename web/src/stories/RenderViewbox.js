import PropTypes from 'prop-types';
import React from 'react';

const RenderViewbox = ({ children }) => (
  <div
    className="m0 p0"
    style={{
      border: '1px dashed rgba(0,0,0,0.1)'
    }}
  >
    {children}
  </div>
);
RenderViewbox.propTypes = {
  children: PropTypes.node.isRequired
};

export default RenderViewbox;
