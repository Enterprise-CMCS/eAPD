import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import TextMask from 'react-text-mask';

import { EDITOR_CONFIG, htmlToEditor, editorToHtml } from '../util/editor';

class RichText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: htmlToEditor(props.content)
    };
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
  content: PropTypes.string.isRequired,
  onSync: PropTypes.func
};
RichText.defaultProps = {
  onSync: () => {}
};

const Input = props => <input className="m0 input" {...props} />;
const MaskedInput = props => <TextMask className="m0 input mono" {...props} />;
const Textarea = props => (
  <textarea className="m0 textarea" spellCheck="true" {...props} />
);

// a HOC for Text / Textarea input that includes
// div wrapper and accompanying label
const makeInput = InputInner => {
  const InputHolder = ({
    name,
    label,
    type,
    hideLabel,
    wrapperClass,
    ...rest
  }) => (
    <div className={wrapperClass || 'mb2'}>
      <label
        htmlFor={name}
        className={hideLabel ? 'sr-only' : 'block mb-tiny bold'}
      >
        {label}
      </label>
      <InputInner id={name} type={type} {...rest} />
    </div>
  );

  InputHolder.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    hideLabel: PropTypes.bool,
    wrapperClass: PropTypes.string
  };

  InputHolder.defaultProps = {
    type: 'text',
    hideLabel: false,
    wrapperClass: ''
  };

  return InputHolder;
};

makeInput.propTypes = {
  Component: PropTypes.element
};

const InputHolder = makeInput(Input);
const MaskedInputHolder = makeInput(MaskedInput);
const TextareaHolder = makeInput(Textarea);

export {
  InputHolder as Input,
  MaskedInputHolder as MaskedInput,
  TextareaHolder as Textarea,
  RichText
};
