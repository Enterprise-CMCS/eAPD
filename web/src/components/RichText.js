import PropTypes from 'prop-types';
import React, { Component } from 'react';
import 'tinymce/tinymce';
import { Editor } from '@tinymce/tinymce-react';

// A theme is also required
import 'tinymce/themes/silver';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/spellchecker';

require.context(
  'file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
  true,
  /.*/
);

const setupTinyMCE = editor => {
  editor.ui.registry.addButton('eapdImageUpload', {
    icon: 'image',
    onAction() {
      const fileButton = document.createElement('input');
      fileButton.setAttribute('type', 'file');
      fileButton.setAttribute('accept', 'image/*');
      fileButton.addEventListener(
        'change',
        () => {
          const selectedFile = fileButton.files[0];
          if (selectedFile) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
              editor.insertContent(`<img src="${reader.result}">`);
            });

            reader.readAsDataURL(selectedFile);
          }
        },
        false
      );
      fileButton.click();
    },
    tooltip: 'Insert an image'
  });
};

class RichText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content
    };
  }

  onEditorChange = newContent => {
    const { onSync } = this.props;
    this.setState({ content: newContent });
    onSync(newContent);
  };

  render() {
    const { content } = this.state;

    return (
      <Editor
        init={{
          browser_spellcheck: true,
          menubar: '',
          paste_data_images: true,
          plugins: ['paste', 'spellchecker'],
          setup: setupTinyMCE,
          toolbar:
            'undo redo | style | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | eapdImageUpload'
        }}
        value={content}
        onEditorChange={this.onEditorChange}
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
