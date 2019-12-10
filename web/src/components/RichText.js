import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'tinymce/tinymce';
import { Editor } from '@tinymce/tinymce-react';

// A theme is required
import 'tinymce/themes/silver';

// Any plugins you want to use have to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/spellchecker';

import { uploadFile } from '../actions/editApd';
import { generateKey } from '../util';

require.context(
  'file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
  true,
  /.*/
);

const fileButtonOnClick = (button, editor, upload) => () => {
  const selectedFile = button.files[0];
  if (selectedFile) {
    const placeholderKey = `[uploading image {${generateKey()}}]`;
    editor.insertContent(placeholderKey);
    return upload(selectedFile).then(url => {
      const content = editor.getContent();
      const newContent = content.replace(placeholderKey, `<img src="${url}">`);
      editor.setContent(newContent);
    });
  }
  return Promise.resolve();
};

const setupTinyMCE = upload => editor => {
  editor.ui.registry.addButton('eapdImageUpload', {
    icon: 'image',
    onAction: () => {
      const fileButton = document.createElement('input');
      fileButton.setAttribute('type', 'file');
      fileButton.setAttribute('accept', 'image/*');
      fileButton.addEventListener(
        'change',
        fileButtonOnClick(fileButton, editor, upload),
        false
      );
      fileButton.click();
    },
    tooltip: 'Insert an image'
  });
};

const uploadImage = upload => (blob, success, failure) =>
  upload(blob.blob())
    .then(url => {
      success(url);
    })
    .catch(() => {
      failure();
    });

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
    const { uploadFile: upload } = this.props;
    const { content } = this.state;

    return (
      <Editor
        init={{
          browser_spellcheck: true,
          images_upload_handler: uploadImage(upload),
          menubar: '',
          paste_data_images: true,
          plugins: ['paste', 'spellchecker'],
          setup: setupTinyMCE(upload),
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
  onSync: PropTypes.func,
  uploadFile: PropTypes.func.isRequired
};

RichText.defaultProps = {
  content: '',
  onSync: () => {}
};

const mapDispatchToProps = { uploadFile };

export default connect(
  null,
  mapDispatchToProps
)(RichText);

export {
  RichText as plain,
  fileButtonOnClick,
  mapDispatchToProps,
  setupTinyMCE,
  uploadImage
};
