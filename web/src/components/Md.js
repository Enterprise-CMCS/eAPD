import PropTypes from 'prop-types';
import React from 'react';

import md from '../util/md';

const listTags = {
  ol: 'ol',
  ul: 'ul'
};

const Md = ({ content, wrapper: Wrapper, ...rest }) => {
  // Our Markdown library accepts HTML content, but it gets all muddled up
  // when there are linebreaks within the HTML.  Eg:
  //
  // <ul>
  //   <li>one</li>
  //   <li>two</li>
  //   <li>three</li>
  // </ul>
  //
  // ...ends up rendered as:
  //
  // <ul>
  //   <br>
  //   <li>one</li>
  //   <br>
  //   <li>two</li>
  //   <br>
  //   <li>three</li>
  //   <br>
  //  </ul>
  //
  // To workaround this, we can use some custom format tokens, such as [ul],
  // to mark where lists should be.  Then we can parse out the content, build
  // an HTML string with no extraneous whitespace or newlines, and put that
  // back into the content before passing it on to the Markdown library.
  //
  // Declare this regex locally since we will be using exec(), which relies on
  // internal regex state.  We don't want previous calls to impact this one!
  //
  // \[([^\]]+)\]
  //   Matches "[anything here]".  The backslashes around the outer square
  //   brackets are to escape them so they're matched instead of interpretted.
  //   Captures the "anything here" as group 1.
  //
  // ([^]*?)
  //   Matches anything, including newlines and beyond. This lets us do matches
  //   across multiple lines of text.  Non-greedy match, so it stops as soon as
  //   the next part of the regex is satisfied.  Captures the whole thing as
  //   group 2.
  //
  // [\/\1\]
  //   Matches "[/anything here]", using a backreference to group 1 to make
  //   the closing tag is the same as the opening tag.
  const formatRegex = /\[([^\]]+)\]([^]*?)\[\/\1\]/g;
  let formattedString = content;

  let match = formatRegex.exec(content);
  while (match !== null) {
    const formatTag = match[1];

    // make sure the [tag] matches a supported list tag
    if (listTags[formatTag]) {
      const htmlTag = listTags[formatTag];

      const formatted = match[2]
        .split('\n')
        .map(value => value.trim())
        .filter(value => !!value)
        .map(value => `<li>${value}</li>`)
        .join('');

      formattedString = formattedString.replace(
        `[${formatTag}]${match[2]}[/${formatTag}]`,
        `<${htmlTag}>${formatted}</${htmlTag}>`
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
