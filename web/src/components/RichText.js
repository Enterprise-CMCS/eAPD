import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { EDITOR_CONFIG, htmlToEditor, editorToHtml } from '../util/editor';

class RichText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: htmlToEditor(props.content),
      lastContent: props.content
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { content, lastContent } = this.state;
    if (nextProps.content !== lastContent) {
      this.setState({
        content: htmlToEditor(nextProps.content),
        lastContent: nextProps.content
      });
    }
    return nextState.content !== content;
  }

  onEditorChange = newContent => {
    this.setState({ content: newContent });
  };

  onBlur = () => {
    const { onSync } = this.props;
    const { content } = this.state;

    const html = editorToHtml(content);
    onSync(html);
  };

  render() {
    const { editorClassName } = this.props;
    const { content } = this.state;

    return (
      <Editor
        toolbar={EDITOR_CONFIG}
        editorState={content}
        onEditorStateChange={this.onEditorChange}
        onBlur={this.onBlur}
        editorClassName={editorClassName}
      />
    );
  }
}

RichText.propTypes = {
  content: PropTypes.string,
  onSync: PropTypes.func,
  editorClassName: PropTypes.string
};

RichText.defaultProps = {
  content: '',
  onSync: () => {},
  editorClassName: 'rte-textarea-m'
};

export default RichText;
