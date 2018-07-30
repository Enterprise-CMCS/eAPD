import PropTypes from 'prop-types';
import React from 'react';

const Btn = ({ extraCss, kind, size, ...rest }) => {
  const classes = ['btn', `btn-${kind}`, size && `btn-${size}`, extraCss]
    .filter(c => c)
    .join(' ');

  return <button type="button" className={classes} {...rest} />;
};

Btn.propTypes = {
  children: PropTypes.node,
  extraCss: PropTypes.string,
  kind: PropTypes.oneOf(['primary', 'outline']),
  size: PropTypes.oneOf([null, 'big', 'narrow', 'small'])
};

Btn.defaultProps = {
  children: 'Submit',
  extraCss: null,
  kind: 'primary',
  size: null
};

export default Btn;
