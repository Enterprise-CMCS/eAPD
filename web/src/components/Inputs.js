import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import NumberFormat from 'react-number-format';
import TextMask from 'react-text-mask';

import { EDITOR_CONFIG, htmlToEditor, editorToHtml } from '../util/editor';
import MASKS from '../util/masks';

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

const Input = props => <input className="m0 input" {...props} />;

const Textarea = props => (
  <textarea className="m0 textarea" spellCheck="true" {...props} />
);

const makeNumberInput = formatProps => {
  class Numbo extends Component {
    handleChange = e => {
      if (!this.props.onChange) return;

      const newEvent = {
        target: { value: e.floatValue || 0, masked: e.formattedValue }
      };

      this.props.onChange(newEvent);
    };

    render() {
      const { onChange, ...rest } = this.props;

      return (
        <NumberFormat
          className="m0 input mono"
          onValueChange={this.handleChange}
          {...formatProps}
          {...rest}
        />
      );
    }
  }

  return Numbo;
};

// const makeMaskedInput = ({ mask, unmask }) => {
//   // TODO: split some of these components into their own file
//   // eslint-disable-next-line react/no-multi-comp
//   class MaskedInput extends Component {
//     handleChange = e => {
//       if (!this.props.onChange) return;

//       const { value } = e.target;
//       const newEvent = { target: { value: unmask(value), masked: value } };

//       this.props.onChange(newEvent);
//     };

//     render() {
//       const { onChange, ...rest } = this.props;

//       return (
//         <TextMask
//           mask={mask}
//           className="m0 input mono"
//           onChange={this.handleChange}
//           {...rest}
//         />
//       );
//     }
//   }

//   MaskedInput.propTypes = {
//     onChange: PropTypes.func
//   };

//   MaskedInput.defaultProps = {
//     onChange: null
//   };

//   return MaskedInput;
// };

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
        className={hideLabel ? 'sr-only' : 'block mb-tiny truncate'}
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
const TextareaHolder = makeInput(Textarea);
// const DollarInputHolder = makeInput(makeMaskedInput(MASKS.dollar));
const DollarInputHolder = makeInput(
  makeNumberInput({ decimalScale: 2, fixedDecimalScale: true, prefix: '$' })
);
const PercentInputHolder = makeInput(makeNumberInput({ suffix: '%' }));
// const PercentInputHolder = makeInput(makeMaskedInput(MASKS.percent));

export {
  InputHolder as Input,
  TextareaHolder as Textarea,
  DollarInputHolder as DollarInput,
  PercentInputHolder as PercentInput,
  RichText
};
