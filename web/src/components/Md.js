import PropTypes from 'prop-types';
import React from 'react';

import md from '../util/md';

const Md = ({ content, wrapper: Wrapper, ...rest }) => (
  <Wrapper
    dangerouslySetInnerHTML={{ __html: md.renderInline(content) }}
    {...rest}
  />
);

Md.propTypes = {
  content: PropTypes.string.isRequired,
  wrapper: PropTypes.string
};

Md.defaultProps = {
  wrapper: 'span'
};

export default Md;
