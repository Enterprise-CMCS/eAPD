import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'tinymce/tinymce';
import { Editor } from '@tinymce/tinymce-react';

// A theme is required
import 'tinymce/themes/silver';

// Any plugins you want to use have to be imported
import 'tinymce/plugins/autoresize';
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

class RichText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || `rte-${generateKey()}`
    };
  }

  uploadImage = () => async (blob, success, failure) => {
    const { uploadFile: upload, onSync } = this.props;
    const { id } = this.state;

    try {
      const url = await upload(blob.blob());
      success(url);
      /* global tinyMCE */
      // ☝️ lets eslint know that tinyMCE is defined. Once we've told Tiny the
      // URL of the uploaded image, it'll update the content of the textbox,
      // but it does NOT call the change event. That means that dropped images
      // aren't saved as IMG tags unless the user makes additional changes to
      // the textbox content. To get around that, we can get a reference to
      // the editor, pull the content, and manually trigger the event.
      const editor = tinyMCE.get(id);
      onSync(editor.getContent());
    } catch (e) {
      failure();
    }
  };

  onEditorChange = newContent => {
    const { onSync } = this.props;
    onSync(newContent);
  };

  render() {
    const { uploadFile: upload, content } = this.props;
    const { id } = this.state;

    return (
      <div className="rte--wrapper">
        <Editor
          id={id}
          init={{
            autoresize_bottom_margin: 0,
            browser_spellcheck: true,
            images_upload_handler: this.uploadImage(),
            menubar: '',
            paste_data_images: true,
            plugins: ['autoresize', 'paste', 'spellchecker'],
            setup: setupTinyMCE(upload),
            toolbar:
              'undo redo | style | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | eapdImageUpload'
          }}
          value={content}
          onEditorChange={this.onEditorChange}
        />
      </div>
    );
  }
}

RichText.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string,
  onSync: PropTypes.func,
  uploadFile: PropTypes.func.isRequired
};

RichText.defaultProps = {
  content: '',
  id: '',
  onSync: () => {}
};

const mapDispatchToProps = { uploadFile };

export default connect(null, mapDispatchToProps)(RichText);

export {
  RichText as plain,
  fileButtonOnClick,
  mapDispatchToProps,
  setupTinyMCE
};
