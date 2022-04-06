import React from 'react';
import PropTypes from 'prop-types';

// svg from https://design.cms.gov/style/icons/

const ArrowRightIcon = ({ transform, ...props }) => (
  <svg aria-hidden="true" viewBox="0 0 16 14" {...props}>
    <polygon
      points="16 6.66666667 9.32208 13.3333333 4.90592 13.3333333 9.99008 8 0 8 0 5.33333333 9.95408 5.33333333 4.8968 0 9.33333333 0"
      transform={transform}
    />
  </svg>
);

ArrowRightIcon.defaultProps = {
  transform: null
};

ArrowRightIcon.propTypes = {
  transform: PropTypes.string
};

export default ArrowRightIcon;
