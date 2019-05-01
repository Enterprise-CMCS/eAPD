import PropTypes from 'prop-types';
import React from 'react';

import md from '../util/md';

const formatTags = {
  ol: 'ol',
  ul: 'ul'
};

const Md = ({ content, wrapper: Wrapper, ...rest }) => {
  const formatRegex = /\[([^\]]+)\]([^]*?)\[\/\1\]/g;
  let formattedString = content;

  let match = formatRegex.exec(content);
  while (match !== null) {
    const type = match[1];
    if (formatTags[type]) {
      const tag = formatTags[type];
      const formatted = match[2]
        .split('\n')
        .map(value => value.trim())
        .filter(value => !!value)
        .map(value => `<li>${value}</li>`)
        .join('');

      formattedString = formattedString.replace(
        `[${type}]${match[2]}[/${type}]`,
        `<${tag}>${formatted}</${tag}>`
      );
    }

    match = formatRegex.exec(content);
  }

  return (
    <Wrapper
      dangerouslySetInnerHTML={{ __html: md.renderInline(formattedString) }}
      {...rest}
    />
  );
};

Md.propTypes = {
  content: PropTypes.string.isRequired,
  wrapper: PropTypes.string
};

Md.defaultProps = {
  wrapper: 'p'
};

export default Md;
