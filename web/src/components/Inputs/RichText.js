import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { EDITOR_CONFIG, htmlToEditor, editorToHtml } from '../../util/editor';

class RichText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: htmlToEditor(props.content),
      lastContent: props.content
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.state.lastContent) {
      this.setState({
        content: htmlToEditor(nextProps.content),
        lastContent: nextProps.content
      });
    }
    return nextState.content !== this.state.content;
  }

  onEditorChange = newContent => {
    this.setState({ content: newContent });
  };

  onBlur = () => {
    const html = editorToHtml(this.state.content);
    this.props.onSync(html);
  };

  render() {
    return (
      <Editor
        toolbar={EDITOR_CONFIG}
        editorState={this.state.content}
        onEditorStateChange={this.onEditorChange}
        onBlur={this.onBlur}
      />
    );
  }
}

RichText.propTypes = {
  content: PropTypes.string,
  onSync: PropTypes.func
};

RichText.defaultProps = {
  content: '',
  onSync: () => {}
};

export default RichText;
